---
title: Create an MDK Online App
description: Use the mobile development kit editor to create a mobile app for online use case.
auto_validation: true
primary_tag: products>mobile-development-kit-client
tags: [ tutorial>beginner, operating-system>ios, operating-system>android, topic>mobile, products>sap-cloud-platform, products>mobile-development-kit-client, software-product-function>sap-cloud-platform-mobile-services ]
time: 20
author_name: Jitendra Kansal
author_profile: https://github.com/jitendrakansal
---

## Prerequisites
- **Tutorial group:** [Set Up for the Mobile Development Kit (MDK)](group.mobile-dev-kit-setup)
- **Download and install:** **SAP Mobile Services Client** on your [iOS](https://apps.apple.com/us/app/sap-mobile-services-client/id1413653544) or [Android](https://play.google.com/store/apps/details?id=com.sap.mobileservices.client) device
- **Download and install** [Barcode Scanner](https://play.google.com/store/apps/details?id=com.google.zxing.client.android&hl=en) (required only for Android device)

## Details
### You will learn
  - How to create an MDK Online app using an existing template in SAP Web IDE
  - How to deploy an MDK app to Mobile Services and run it in a client

You may clone an existing project from [GitHub repository](https://github.com/SAP-samples/cloud-mdk-tutorial-samples/tree/master/4-Level-Up-with-the-Mobile-Development-Kit/1-Create-an-MDK-Online-App) and start directly with step 4 in this tutorial.

---

[ACCORDION-BEGIN [Step 1: ](Get familiar with use case)]

With Mobile Development Kit, you can also create applications that are online or always connected and make calls to the backend servers for each action you take in the application.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 2: ](Set up the application foundation)]

1. Make sure that you have already created a new destination `mobileservices_cf` as per [previous tutorial](fiori-ios-hcpms-setup). This is required to connect SAP Web IDE to Mobile Services  on Cloud Foundry environment.

    This step includes creating the Mobile Development Kit project in the Editor.

2. Launch the SAP Web IDE and select the **MDK perspective** by clicking on the icon in the left panel.

3. Right click Workspace folder and select **New** | **MDK Base Project**.

    ![MDK](img_001.png)

    >The _MDK Base Project_ template creates the offline or online actions, rules, messages and an empty page (`Main.page`). After using this template, you can focus on creating your pages, other actions, and rules needed for your application.

    >More details on _MDK template_ is available in [help documentation](https://help.sap.com/viewer/977416d43cd74bdc958289038749100e/Latest/en-US/cfd84e66bde44d8da09f250f1b8ecee6.html).

4. Enter the **Project Name** as `MDKOnlineApp` and click **Next**.

    ![MDK](img_002.png)

5. Leave the default values in _Application Creation_ step as it is, click **Next**.

6. In _Service Creation_ step, provide and select the below information:

    | Field | Value |
    |----|----|
    | `Name`| `SampleServiceV2` |
    | `Service URL` | `/destinations/mobileservices_cf` |
    | `Application ID` | `com.sap.mdk.demo` |
    | `Destination Name` | `com.sap.edm.sampleservice.v2` |

    > If you do not find `mobileservices_cf` destination, please ensure that you have followed [this tutorial](fiori-ios-hcpms-setup) to setup this destination in SAP Cloud Platform cockpit.

    >If you see a _Authentication Required_ pop-up, then enter your cloud platform User Name and password to authenticate.

    >For Offline OData capability only OData V2 is supported. OData V2 and V4 are supported for Online OData.

    ![MDK](img_004.1.png)

    >In [previous tutorial](cp-mobile-dev-kit-ms-setup), server-side configuration for this MDK app were already done.

    Regardless of whether you are creating an online or offline application, this step is needed app to connect to an OData service. When building an Mobile Development Kit application, it assumes the OData service created and the destination that points to this service is setup in Mobile Services and SAP Cloud Platform.

7. Click **Check Service** to validate the service properties. If all the details are fine, you will see a success message. Click **Next**.

    ![MDK](img_005.png)

    >Wondering how _Service URL_, _Application ID_ & _Destination Name_ were populated? As part of [this](fiori-ios-hcpms-setup) tutorial, you created a destination `mobileservices_cf` in Cloud Platform cockpit, SAP Web IDE fetches all these details based on this destination.
    ![MDK](img_0031.1.png)

    >You can look in SAP Cloud Platform Mobile Services cockpit for the destination belongs to the MDK app by clicking on **Mobile Connectivity** feature.
    ![MDK](img_0032.png)

    >More details on _Sample Back End_ is available in [help documentation](https://help.sap.com/viewer/468990a67780424a9e66eb096d4345bb/Cloud/en-US/1c2e51a24361487f8b0649702d59dd0f.html).

8. Leave the default configuration as it is and click **Next** and then click **Finish**.

    ![MDK](img_006.png)

    After clicking Finish, the wizard will generate your MDK Application based on your selections. You should now see the `MDKOnlineApp` project in the project explorer.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 3: ](Get familiar with generated project structure)]

This is how the project structure looks like within the workspace.

![MDK](img_007.png)

These are the metadata definitions available in the editor and the format in which these metadata definitions are stored in the editor. Just to brief on some of these:

  - **`CreateService.action`**: This action binds the OData service to your application.

  - **`OpenService.action`**: This action allows your application to see the data within the OData service.

  - **`CreateOpenService Success & Failure Message action`**: Here are some messages showing up in the app on a successful or failure of application data service initialization.

  - **`Main.page`**: This is the first page of your Mobile Development Kit application that is shown. For this application we will use this as a launching page to get to application functionality. We will add the logout action to this page.

  - **`OnWillUpdate.js`**: MDK applications automatically download updates and apply them to the client without the end-user needing to take any action. The `OnWillUpdate` rule empowers the user to run business logic before the new definitions are applied. This allows the application designer to include logic to prompt the user to accept or defer applying the new definitions based on their current activity. For example, if the end-user is currently adding new customer details or in the middle of a transaction, they will be able to defer the update. The application will prompt again the next time it checks for updates.

  - **`Application.app`**: this is the main configuration file for your application from within SAP Web IDE. Here you set your start page (here in this tutorial, it is main.page), action settings for different stages of the application session lifecycle, push notifications, and more.

>You can find more details about [metadata definitions](https://help.sap.com/viewer/977416d43cd74bdc958289038749100e/Latest/en-US/78e21fae61044df8ae8a78a43157fe8f.html).

Open the application settings in the application editor by double clicking on the Application.app in the project explorer pane.

![MDK](img_008.png)

>In MDK online use case, you need **create** and **open** service actions chained together for your online provider.

>`CreateService.action` should be set at `OnLaunch` and success of this action should call `OpenService.action`.
![MDK](img_008.1.png)

>You can find more details about [OData actions](https://help.sap.com/viewer/977416d43cd74bdc958289038749100e/Latest/en-US/3f462c086df846439d59fa88a2b4536b.html).

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 4: ](Deploy and activate the application)]

So far, you have learnt how to build an MDK application in the SAP Web IDE editor. Now, we deploy this application definition to Mobile Services.

1. Right click the `MDKOnlineApp` MDK Application in the project explorer pane and select **MDK Deploy and Activate**.

    ![MDK](img_009.png)

2. Let the default configuration as it is and click **Next**.

    ![MDK](img_010.png)

    >_Filter Files_ will be filtered and ignored in web packing process.

    >_Externals_ are the list of NPM modules that are part of the MDK Client application and should not be validated in the bundle.

3. Click the drop down for Destination Name and select the `mobileservices_cf` destination, you will find list of existing application IDs, select the one you have chosen while creating the project.

    ![MDK](img_014.1.png)

    >By default, automatically deploy option is selected, In other words, the application is automatically deployed from Mobile Services to your MDK client.

4. Click **Next** to finish the deployment from SAP Web IDE.

    You should see **Application deployed successfully** message in console log.

    ![MDK](img_015.png)

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 5: ](Populate the QR code for app on-boarding)]

SAP Web IDE has a feature to generate QR code for app on-boarding.

Right click the `MDKOnlineApp` MDK Application in the project explorer pane and select **MDK Show QR Code**.

![MDK](img_009.1.png)

>**MDK Show QR Code** option is greyed out if MDK project is not yet deployed and activated as per step 3.

![MDK](img_012.1.png)

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 6: ](Run the app in MDK client)]

>Make sure you are choosing the right device platform tab above. Once you have scanned and onboarded using the onboarding URL, it will be remembered. When you Log out and onboard again, same onboarding URL settings will be reused without the need to scan. You will need to use 3rd party QR scanner app in Android or device Camera in iOS, if you would like to scan a different onboarding URL.

[OPTION BEGIN [Android]]

1. Launch **`Mobile Svcs`** app on your Android device. Tap **GET STARTED** to connect MDK client to SAP Cloud Platform.

    ![MDK](img_016.1.jpg)

2. Tap **QR CODE SCAN** to start the device camera for scanning the on-boarding QR code.

    ![MDK](img_013.2.png)

3. Once scan is succeeded, tap **CONTINUE**.

    ![MDK](img_013.3.png)

4. Enter Email address and password to login to SAP Cloud Platform and tap **Log On** to authenticate.

    ![MDK](img_017.1.png)

5. Tap **AGREE** on `End User License Agreement`.

    ![MDK](img_018.1.jpg)

6. Choose a passcode with at least 8 characters for unlocking the app and tap **NEXT**.

    ![MDK](img_019.1.jpg)

7. Confirm the passcode and tap **DONE**.

    ![MDK](img_020.1.jpg)

    Optionally, you can enable fingerprint to get faster access to the app data.

    ![MDK](img_021.1.jpg)

8. Tap **OK**.

    ![MDK](img_022.1.jpg)

    The MDK client receives deployed metadata definitions as a bundle.

    Now, you will see **Main** page being displayed and application data service is initialized.

    ![MDK](img_023.1.jpg)

    >Once you have scanned and onboarded using the onboarding URL, it will be remembered. When you Log out and onboard again, same onboarding URL settings will be reused without the need to scan. You will need to use 3rd party QR scanner app in Android or device Camera in iOS, if you would like to scan a different onboarding URL.

[OPTION END]

[OPTION BEGIN [iOS]]

1. Launch **`Mobile Svcs`** app on your iOS device. Tap **Scan** to start the device camera for scanning the on-boarding QR code.

    ![MDK](img_013.png)

2. Once scan is succeeded, tap **Continue**.

    ![MDK](img_013.1.png)

3. Enter Email address and password to login to SAP Cloud Platform and tap **Log On** to authenticate.

    ![MDK](img_029.png)

4. Tap **Agree** on `End User License Agreement`.

    ![MDK](img_018.png)

5. Choose a passcode with at least 8 characters for unlocking the app and tap **Next**.

    ![MDK](img_019.png)

6. Confirm the passcode and tap **Done**.

    ![MDK](img_020.png)

    Optionally, you can enable Touch ID to get faster access to the app data, tap **Enable**.

    ![MDK](img_021.png)

7. Tap **OK**.

    ![MDK](img_022.png)

    The MDK client receives deployed metadata definitions as a bundle.

    Now, you will see **Main** page being displayed and application data service is initialized.

    ![MDK](img_023.png)

    >Once you have scanned and onboarded using the onboarding URL, it will be remembered. When you Log out and onboard again, same onboarding URL settings will be reused without the need to scan. You will need to use 3rd party QR scanner app in Android or device Camera in iOS, if you would like to scan a different onboarding URL.

[OPTION END]

You have successfully created an MDK online app and you are now all set to [Handle Error Archive in an MDK App](cp-mobile-dev-kit-error-archive).

[VALIDATE_1]
[ACCORDION-END]

---
