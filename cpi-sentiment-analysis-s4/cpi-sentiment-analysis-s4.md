---
title: Set up an SAP Hybris Marketing Cloud system
description: Set up the communication user on the SAP Hybris Marketing Cloud system.
primary_tag: products>sap-hybris-as-a-service-on-sap-cloud-platform
tags: [  tutorial>beginner, products>sap-hybris-as-a-service-on-sap-cloud-platform, products>sap-s-4hana ]
---

## Prerequisites  
 - **Proficiency:** Beginner

## Details
### You will learn  
How to set up the communication user in your SAP Hybris Marketing Cloud system with the necessary roles.

### Time to Complete
**15 Min**

---

[ACCORDION-BEGIN [Step 1: ](Create communication user)]

Log on on to your SAP Hybris Marketing Cloud system.

![SAP S/4HANA logon](1.png)

In the SAP Fiori launchpad, select the **Maintain Communication Users** tile.

![Communication Management](2.png)

Choose **New** to create a new user: `yMkt_Credential`
![Communication User](3.png)

Assign a password for the user in the password field for basic authentication. Enter `CPI Inbound connection` on the description field.

![user password](4.png)  

Choose **Create**.
>It is also possible to use an existing user.  If an existing user is used, the password of this user is required as well. Secondly, it is also possible to upload the Cloud Platform Integration client certificate as well. For more information, please view the [documentation](https://help.sap.com/http.svc/rc/458b77f3adbd436ab2e3c6473132237c/1708/en-US/IntC4ChybrisMktCloudviaCPI.pdf).

[ACCORDION-END]

[ACCORDION-BEGIN [Step 2: ](Create communication system)]

This step enables the Hybris system to communicate to the Integration system.

Log on to your Hybris Marketing Cloud System and in the SAP Fiori launchpad select the **Communication Systems** tile.
![communication tile](5.png)  

Choose **New** to create a new system. Enter the value as shown below and choose **Create**.  Please remember the information here for later usage.  

Field Name             | Entry Value
---------              | -------------
System ID              | `CPI-GLOBAL`
System Name            | `CPI-inbound`

![communication system name](6.png)

In the **Technical Data** section, enter the URL of your SAP CPI tenant under the **Host Name** field.
![communication system Host](7.png)

In the **User for Inbound Communication** section, add the technical user that was created in Step 1, and choose **Save**.
![tech user](8.png)


[ACCORDION-END]


[ACCORDION-BEGIN [Step 3: ](Create marketing master data integration)]  

For communication with the OData Web service, a technical user must be created in the SAP Hybris Marketing Cloud System.
This user needs to have two communication scenarios assigned:  

 - `SAP_COM_0003 Marketing` – Master Data Integration   
 - `SAP_COM_0004 Marketing` – Business Data Integration  

Log on to your SAP Hybris Marketing Cloud system.  
![s/4 logon](1.png)

In the SAP Fiori launchpad, select the **Communication Arrangements** tile.  
![communication Arrangements](9.png)  

Choose **New** to create a new communication arrangement.
![communication Arrangements popup](10.png)  

Select **`SAP_COM_0003 (Marketing - Master Data Integration)`** and choose **Create**.
![mdi](11.png)  

Under **Common Data**, select the communication system via value help that was created in Step 2.

![system](12.png)  

The technical user, which was created in step 1, should be automatically filled in under **Inbound Communication**.
![system USER](13.png)

Choose **Save**.

[ACCORDION-END]

[ACCORDION-BEGIN [Step 4: ](Assign the Business Data Integration scenario)]


Select the **Home** icon on the top of the screen.
![home](18.png)

In the SAP Fiori launchpad, select the **Communication Arrangements** tile.  
![communication Arrangements](9.png)  

Choose **New** to create a new communication arrangement.

Select **`SAP_COM_0004 (Marketing - Business Data Integration)``** and choose **Create**.  
![marketing business data integration](14.png)

Under **Common Data**, select the **Communication System** via value help that was created in Step 2.
![marketing BID](16.png)

Under **Inbound Communication**, use the technical user that was created in Step 1.  The user field should be automatically added.
![marketing BID 2](17.png)  

Choose **Save**.

[ACCORDION-END]
---
