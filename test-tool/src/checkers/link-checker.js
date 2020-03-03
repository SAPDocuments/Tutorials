const https = require('https');
const { URL } = require('url');
const fetch = require('node-fetch');

const { regexp: { content: { internalLink, remoteImage } }, linkCheck } = require('../constants');
const { domains } = require('../../config/trusted.links.json');
const { linkUtils } = require('../utils');

process.env.UV_THREADPOOL_SIZE = linkCheck.UV_THREADPOOL_SIZE;

const checkLinks = async (links, onCheck) => {
  let processingLinks = links.map(link => checkLink(link));
  if (onCheck) {
    processingLinks = processingLinks.map(checkPromise => checkPromise.then(result => {
      onCheck(result);
      return result;
    }));
  }
  const processedResults = await Promise.all(processingLinks);
  const results = processedResults.filter(({ err, code }) => err || linkUtils.isErrorStatusCode(code)).map(({ link, code, err }) => {
    const isTrusted = !!domains.find(domain => link.includes(domain));
    return {
      link,
      code,
      isTrusted,
      reason: (err && (err.message || err)),
    };
  });
  return results;
};

const checkLink = (link, reqOptions = {}, maxAttempts = 2) => {
  try {
    const { hostname } = new URL(link);

    if (internalLink.regexp.test(hostname)) {
      return {
        link,
        code: 0,
        err: internalLink.message,
      };
    }
  } catch (e) {
    return {
      link,
      code: 0,
      err: e.message,
    };
  }

  return checkAttempt({ ...reqOptions, uri: link }, 1, maxAttempts);
};

const checkAttempt = async (options, attempt, maxAttempts) => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const fetchOptions = {
    ...linkCheck.defaultClientOptions,
    ...options,
    agent: (linkUtils.isHttps(options.uri) ? httpsAgent : null),
  };

  try {
    let response = await fetch(options.uri, { ...fetchOptions, method: 'head' });

    if (!response.ok) {
      response = await fetch(options.uri, { ...fetchOptions, method: 'get' });
    }

    return {
      response,
      link: options.uri,
      code: response.status
    };
  } catch (error) {
    if (error.message.startsWith('Protocol')) {
      fetchOptions.agent = null;
    }

    try {
      const response = await fetch(options.uri, { ...fetchOptions, method: 'get' });

      return {
        response,
        link: options.uri,
        code: response.status,
      };
    } catch (error) {
      if (attempt <= maxAttempts) {
        // some sites will work without user-agent header
        return checkAttempt({ ...options, headers: {} }, ++attempt, maxAttempts);
      } else {
        return {
          link: options.uri,
          code: 0,
          err: error.message,
        };
      }
    }
  }
};

const checkImageLink = async (link) => {
  const result = await checkLink(link);
  result.error = result.error || result.err;

  if (result.error) {
    // ignore, in case of error link checker will throw it
    delete result.error;
    return result;
  }

  if (result.response && !linkUtils.isErrorStatusCode(result.response.status)) {
    const { response } = result;
    const contentType = (response.headers.get('Content-Type') || '');

    if (contentType.includes('image/')) {
      return result;
    } else {
      result.error = remoteImage.message;
    }
  }

  return result;
};

module.exports = {
  checkLinks,
  checkLink,
  checkImageLink,
};

