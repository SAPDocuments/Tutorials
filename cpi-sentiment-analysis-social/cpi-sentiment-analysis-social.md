---
title: Get access to social media channel APIs
description: Request the keys and tokens from Twitter.
primary_tag: topic>cloud
tags: [  tutorial>beginner, topic>cloud]
---

## Prerequisites  
 - **Proficiency:** Beginner

## Details
### You will learn  
How to request the tokens and keys from a Twitter account. The keys will give access permission to the Twitter APIs.   Twitter can change their documentation and processes so it might be necessary to check their documentation on how to set up the API access in the correct way.  

### Time to Complete
**15 Min**

---

[ACCORDION-BEGIN [Step 1: ](Apply authorization for Twitter API)]  

Go to [Dev Twitter](https://dev.twitter.com), click on the [**My Apps**](https://apps.twitter.com/) navigation link, and log in with your Twitter credentials.

[ACCORDION-END]

[ACCORDION-BEGIN [Step 2: ](Create an application for Twitter)]

Fill out the form. For sentiment intelligence, all fields are only needed internally for administrative purposes.

Field Name     | Value
:------------- | :-------------
Name           | `twitter-app`
Description    | `Twitter sentiment analysis app`
Website        | Your company's publicly accessible web site
Callback URL   | Leave this field blank.  This field is not needed for this scenario.

Read and accept the developer agreement by selecting the **Yes I agree** checkbox then, click on **New App**.

[ACCORDION-END]
[ACCORDION-BEGIN [Step 3: ](Get the keys and tokens)]

Navigate to the **keys and Access tokens** tab.  Click on the two locations to generate your own keys.  This will generate the key and access tokens.

>Write down the keys and access token.  These keys will be used in the next tutorial.
[ACCORDION-END]
