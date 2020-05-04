---
title: Set Up Initial Configuration for an MDK App
description: Configure a new app in the SAP Cloud Platform Mobile Services cockpit and assign some server side features.
auto_validation: true
primary_tag: products>mobile-development-kit-client
tags: [ tutorial>beginner, operating-system>ios, operating-system>android, topic>mobile, products>sap-cloud-platform, products>mobile-development-kit-client, software-product-function>sap-cloud-platform-mobile-services ]
time: 10
author_name: Jitendra Kansal
author_profile: https://github.com/jitendrakansal
---

## Prerequisites
- **Tutorial:** If you don't have an SAP Cloud Platform account, follow the tutorial to [set up a free developer account](hcp-create-trial-account).
- **Tutorial:** [Enable SAP Cloud Platform Mobile Services](fiori-ios-hcpms-setup)

## Details
### You will learn
  - How to configure MDK apps in the Mobile Services cockpit

---

[ACCORDION-BEGIN [Step 1: ](Understand the mobile development kit feature)]

Mobile Development Kit (MDK) allows developers and technical business users to build new native mobile apps and customize select SAP native mobile applications in a highly productive environment. It's architecture is based on `NativeScript`, so it supports native cross platform development which means you build your native mobile application once and deploy it to Android and iOS devices.

Mobile Development Kit provides robust online and offline capabilities, business logic, and mobile qualities such as access to the camera and barcode scanner. The first application developed with the Mobile Development Kit is [SAP Asset Manager](https://www.sap.com/products/asset-manager.html) and can easily be customized using the Mobile Development Kit.

You can find more details in the [Mobile Development Kit developer page](https://developers.sap.com/topics/mobile-development-kit.html).

![MDK](MDK.png)

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 2: ](Configure a new MDK app in Mobile Services cockpit)]

Make sure that you have completed required pre-Prerequisites mentioned in this tutorial.

1. Navigate to [SAP Cloud Platform Mobile Services cockpit on Cloud Foundry environment](fiori-ios-hcpms-setup).

2. On the home screen, select **Create new app**.

    ![MDK](img_008.1.png)

3. Provide the required information and click **Next**.

    | Field | Value |
    |----|----|
    | `ID` | `com.sap.mdk.demo` |
    | `Name` | `SAP MDK Demo App` |

    !![MDK](img_009.1.png)

    >Other fields are optional. For more information about these fields, see [Defining Applications](https://help.sap.com/viewer/468990a67780424a9e66eb096d4345bb/Cloud/en-US/17ccff786448442ab2c665ed1cce1505.html) in the SAP Cloud Platform documentation.

4. Select **Mobile Development Kit Application** from the dropdown and Click **Finish**.

    ![MDK](img_009.2.png)

5. Once you have created your application, you see a list of default features have been automatically assigned to the app.

    ![MDK](img_0013.png)

    >You can find more information on available features in SAP Cloud Platform Mobile Services in [help documentation](https://help.sap.com/viewer/468990a67780424a9e66eb096d4345bb/Cloud/en-US/99f9cedcd0974faeb12c20cb3efa94b3.html).

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 3: ](Add a sample backend to your MDK app)]

A sample OData service is available for developers to use during development and testing. The sample OData service also lets you evaluate how delta tokens are handled in your test application.

>For more information about these fields, see [Sample Back End](https://help.sap.com/viewer/468990a67780424a9e66eb096d4345bb/Cloud/en-US/1c2e51a24361487f8b0649702d59dd0f.html) in the SAP Cloud Platform documentation.

click the **+** icon to add **Mobile Sample OData ESPM** feature to your MDK app.

Here, you can view the root service and metadata URLs, and generate sample sales orders and purchase orders for multiple entity sets. You can view the data for each entity in a separate text file, and even can reset the sample data.

![MDK](img_0014.gif)

Click `com.sap.mdk.demo` to navigate back to app configuration page.

[VALIDATE_1]
[ACCORDION-END]

---
