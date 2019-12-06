---
title: Create OData Entities with the SAP Cloud SDK's Virtual Data Model
description: Create OData entities with the SAP Cloud SDK's virtual data model to build an address manager application.
auto_validation: true
time: 20
tags: [ tutorial>intermediate, topic>javascript, products>sap-cloud-platform, topic>odata]
primary_tag: products>sap-s-4hana-cloud-sdk
---

## Prerequisites
 - Have `Node.js` and `npm` [installed on your machine](s4sdkjs-prerequisites).
 - Have access to an SAP S/4HANA Cloud system or the [SAP API Business Hub Sandbox](https://api.sap.com/getting-started), or use the [Business Partner Mock Service](https://sap.github.io/cloud-s4-sdk-book/pages/mock-odata.html).
 - Basic knowledge of OData is recommended, but not required.

## Details
### You will learn
  - How to use the Virtual Data Model to create a new entity
  - How to trigger a create request from an API endpoint exposed by your application

The goal of this tutorial group is to show you how to implement a JavaScript application that allows you to manage the addresses of business partners. This application will be using `Express.js` and the SAP Cloud SDK for JavaScript. In this tutorial, we use the SAP Cloud SDK's OData Virtual Data Model to create a new address and make this functionality available via an API endpoint.

---

[ACCORDION-BEGIN [Step 1: ](Add an API endpoint)]

[OPTION BEGIN [TypeScript]]
Create a file called `create-business-partner-address-route.ts` in the `src` folder of your application. Then, copy the following code into it:

```JavaScript / TypeScript
import { Request, Response } from 'express';
import { BusinessPartnerAddress } from '@sap/cloud-sdk-vdm-business-partner-service';

export function createBusinessPartnerAddressRoute(req: Request, res: Response) {
  res.status(200).send(req.params.id);
}
```

Now open `application.ts` again, import the function and add the following route definition:

```JavaScript / TypeScript
import { businessPartnersRoute } from './business-partners-route';
import { singleBusinessPartnerRoute } from './single-business-partner-route';
import { createBusinessPartnerAddressRoute } from './create-business-partner-address-route';

// ...

private routes(): void {
  const router = express.Router();

  router.get('/', indexRoute);
  router.get('/hello', helloWorld);
  router.get('/business-partners', businessPartnersRoute);
  router.get('/business-partners/:id', singleBusinessPartnerRoute);
  // add the following line
  router.post('/business-partners/:id/address', createBusinessPartnerAddressRoute);
  this.app.use('/', router);
}
```
[OPTION END]

[OPTION BEGIN [JavaScript]]
Create a file called `create-business-partner-address-route.js` in the `src` folder of your application. Then, copy the following code into it:

```JavaScript
const { BusinessPartnerAddress } = require('@sap/cloud-sdk-vdm-business-partner-service');

function createBusinessPartnerAddressRoute(req, res) {
  res.status(200).send(req.params.id);
}

module.exports.createBusinessPartnerAddressRoute = createBusinessPartnerAddressRoute;
```

Now open `application.js` again, import the function and add the following route definition:

```JavaScript
const { businessPartnersRoute } = require('./business-partners-route');
const { singleBusinessPartnerRoute } = require('./single-business-partner-route');
const { createBusinessPartnerAddressRoute } = require('./create-business-partner-address-route');

// ...

private routes() {
  const router = express.Router();

  router.get('/', indexRoute);
  router.get('/hello', helloWorld);
  router.get('/business-partners', businessPartnersRoute);
  router.get('/business-partners/:id', singleBusinessPartnerRoute);
  // add the following line
  router.post('/business-partners/:id/address', createBusinessPartnerAddressRoute);
  this.app.use('/', router);
}
```
[OPTION END]

Following the best practices for RESTful APIs, we used `router.post` for this route, so we need to send a `POST` request. We recommend [Postman](https://www.getpostman.com/) for testing APIs, but you can also use similar tools or `curl`.

![Example POST request using Postman](postman.png)

Restart your server and send a `POST` request to `http://localhost:8080/business-partners/1/address`. The server should respond with the ID that you have used in the URL, so in this case with "1".

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 2: ](Create a business partner address)]

[OPTION BEGIN [TypeScript]]
Next, we use the VDM to create a new business partner address. Open `create-business-partner-address-route.ts` and add the following function:

```JavaScript / TypeScript
function createBusinessPartnerAddress(address: BusinessPartnerAddress): Promise<BusinessPartnerAddress> {
  return BusinessPartnerAddress.requestBuilder()
    .create(address)
    .execute({
      url: 'https://my.s4hana.ondemand.com/'
    });
}
```
[OPTION END]

[OPTION BEGIN [JavaScript]]
Next, we use the VDM to create a new business partner address. Open `create-business-partner-address-route.js` and add the following function:

```JavaScript
function createBusinessPartnerAddress(address) {
  return BusinessPartnerAddress.requestBuilder()
    .create(address)
    .execute({
      url: 'https://my.s4hana.ondemand.com/'
    });
}
```
[OPTION END]

The `create` function takes as parameter the entity that should be created. When creating a new entity, the service will automatically generate things like key fields, the creation date, etc. and return it. The VDM makes this available to you by returning a `Promise<BusinessPartnerAddress>`.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 3: ](Build a business partner address from the request)]

So far, there's an API endpoint and a function that takes an address and creates it in SAP S/4HANA Cloud. To connect the two, we need a function that constructs a `BusinessPartnerAddress` object. Add the following function to your code:

[OPTION BEGIN [TypeScript]]
```JavaScript / TypeScript
function buildAddress(body: any, businessPartnerId: string): BusinessPartnerAddress {
  const address = BusinessPartnerAddress.builder().fromJson(body);
  address.businessPartner = businessPartnerId;
  return address;
}
```
[OPTION END]

[OPTION BEGIN [JavaScript]]
```JavaScript
function buildAddress(body, businessPartnerId) {
  const address = BusinessPartnerAddress.builder().fromJson(body);
  address.businessPartner = businessPartnerId;
  return address;
}
```
[OPTION END]

This function takes some form of body and a business partner ID. First, using the `BusinessPartnerAddress.builder().fromJson(body)`, you can create a new address from the given body. Note, that this requires the keys of the object passed to the `fromJson` function to match the respective keys of the business partner address object. We will present a working example later. Second, since we want the address to be related to a given business partner, we need to set the business partner ID on the entity.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 4: ](Wire everything up)]

With all the building blocks in place, you can connect everything in the `createBusinessPartnerAddressRoute` function. Your final code should look like this:

[OPTION BEGIN [TypeScript]]
```JavaScript / TypeScript
import { Request, Response } from 'express';
import { BusinessPartnerAddress } from '@sap/cloud-sdk-vdm-business-partner-service';

export function createBusinessPartnerAddressRoute(req: Request, res: Response) {
  createBusinessPartnerAddress(buildAddress(req.body, req.params.id))
    .then(address => {
      res.status(200).send(address);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
}

function createBusinessPartnerAddress(address: BusinessPartnerAddress): Promise<BusinessPartnerAddress> {
  return BusinessPartnerAddress.requestBuilder()
    .create(address)
    .execute({
      url: 'https://my.s4hana.ondemand.com/'
    });
}

function buildAddress(body: any, businessPartnerId: string): BusinessPartnerAddress {
  const address = BusinessPartnerAddress.builder().fromJson(body);
  address.businessPartner = businessPartnerId;
  return address;
}
```
[OPTION END]

[OPTION BEGIN [JavaScript]]
```JavaScript
const { BusinessPartnerAddress } = require('@sap/cloud-sdk-vdm-business-partner-service');

function createBusinessPartnerAddressRoute(req, res) {
  createBusinessPartnerAddress(buildAddress(req.body, req.params.id))
    .then(address => {
      res.status(200).send(address);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
}

module.exports.createBusinessPartnerAddressRoute = createBusinessPartnerAddressRoute;

function createBusinessPartnerAddress(address) {
  return BusinessPartnerAddress.requestBuilder()
    .create(address)
    .execute({
      url: 'https://my.s4hana.ondemand.com/'
    });
}

function buildAddress(body, businessPartnerId) {
  const address = BusinessPartnerAddress.builder().fromJson(body);
  address.businessPartner = businessPartnerId;
  return address;
}
```
[OPTION END]

`createBusinessPartnerAddressRoute` takes the body of the incoming request as well as the ID from the URL and passes it to `buildAddress` to construct a `BusinessPartnerAddress` entity. This is then passed to `createBusinessPartnerAddress` to send the create request to SAP S/4HANA Cloud.

Restart your server and send a `POST` request to `http://localhost:8080/business-partners/1/address` with the following body:

```JSON
{
	"country": "DE",
	"postalCode": "14469",
	"cityName": "Potsdam",
	"streetName": "Konrad-Zuse-Ring",
	"houseNumber": "10"
}
```

If there is a business partner with ID "1" in your destination system, this will create a new address. Alternatively, replace the ID in the URL with the ID of an existing business partner in your system.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 5: ](Optional: Deep create)]

The VDM also supports creating an entity together with related entities in a single request. In OData lingo, this is called "deep create". Consider the following example, where a business partner is created together with one related address:

[OPTION BEGIN [TypeScript]]
```JavaScript / TypeScript
import { BusinessPartner, BusinessPartnerAddress } from '@sap/cloud-sdk-vdm-business-partner-service';

const businessPartner = BusinessPartner.builder()
  .firstName('John')
  .lastName('Doe')
  .businessPartnerCategory('1')
  .toBusinessPartnerAddress([
    BusinessPartnerAddress.builder()
      .country('DE')
      .postalCode('14469')
      .cityName('Potsdam')
      .streetName('Konrad-Zuse-Ring')
      .houseNumber('10')
      .build()
  ])
  .build();

BusinessPartner.requestBuilder()
  .create(businessPartner)
  .execute({
    url: 'https://my.s4hana.ondemand.com/',
    username: 'USERNAME',
    password: 'PASSWORD'
  });
```
[OPTION END]

[OPTION BEGIN [JavaScript]]
```JavaScript
const { BusinessPartner, BusinessPartnerAddress } = require('@sap/cloud-sdk-vdm-business-partner-service');

const businessPartner = BusinessPartner.builder()
  .firstName('John')
  .lastName('Doe')
  .businessPartnerCategory('1')
  .toBusinessPartnerAddress([
    BusinessPartnerAddress.builder()
      .country('DE')
      .postalCode('14469')
      .cityName('Potsdam')
      .streetName('Konrad-Zuse-Ring')
      .houseNumber('10')
      .build()
  ])
  .build();

BusinessPartner.requestBuilder()
  .create(businessPartner)
  .execute({
    url: 'https://my.s4hana.ondemand.com/',
    username: 'USERNAME',
    password: 'PASSWORD'
  });
```
[OPTION END]

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Appendix: ](Test yourself)]

[VALIDATE_1]

[ACCORDION-END]
---
