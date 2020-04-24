---
title: Extend Your MDK App With a Map Custom Control (Using Metadata Approach)
description: Build and run the Mobile Development Kit client with Map custom control functionality for Android and iOS platforms.
auto_validation: true
primary_tag: products>mobile-development-kit-client
tags: [ tutorial>advanced, operating-system>ios, operating-system>android, topic>mobile, products>sap-cloud-platform, products>mobile-development-kit-client, software-product-function>sap-cloud-platform-mobile-services ]
time: 35
author_name: Jitendra Kansal
author_profile: https://github.com/jitendrakansal
---

## Prerequisites
- **Tutorial**: [Set Up for the Mobile Development Kit (MDK)](group.mobile-dev-kit-setup)
- **Download the latest version of Mobile Development Kit SDK** either from [SAP Software Content Downloads](https://developers.sap.com/trials-downloads.html?search=Mobile%20development%20kit) or [SAP Marketplace](https://launchpad.support.sap.com/#/softwarecenter/template/products/%20_APP=00200682500000001943&_EVENT=DISPHIER&HEADER=Y&FUNCTIONBAR=N&EVENT=TREE&NE=NAVIGATE&ENR=73555000100900002601&V=MAINT&TA=ACTUAL&PAGE=SEARCH/MDK%20CLIENT%203.0) if you are a SAP Cloud Platform Mobile Services customer

## Details
### You will learn
  - How to register and consume an Extension control in MDK Metadata
  - How to write an extension via NativeScript
  - How to build a Mobile development kit client for iOS and Android
  - How to connect to SAP Cloud Platform Mobile application

You may clone an existing metadata project from [GitHub repository](https://github.com/SAP-samples/cloud-mdk-tutorial-samples/tree/master/6-Create-Extension-Controls-in-Mobile-Development-Kit-Apps/3-Extend-Your-MDK-App-With-Map-Custom-Control-using-Metadata-approach) and start directly with step 5 in this tutorial.

---

To extend the functionality, or customize the look and feel, and behavior of your client app, you can create extension controls other than the already existing MDK built-in controls using the following:

-  NativeScript (TypeScript/JavaScript applicable for both Android and iOS)

-  Swift class (iOS only)

In this tutorial, you will create a Map extension via NativeScript (in TypeScript language), you will view the Map in Apple Maps on iOS devices and in Google Maps on Android devices.

![MDK](img_045.gif)

[ACCORDION-BEGIN [Step 1: ](Set up the application foundation)]

This step includes creating the Mobile Development Kit project in the Editor.

Launch the SAP Web IDE and select the **MDK perspective** by clicking on the icon in the left panel.

  1. Right-click the workspace folder and select **New** | **MDK List-Detail Project**.

    ![MDK](img_001.png)

    > More details on _MDK template_ is available in [help documentation](https://help.sap.com/viewer/977416d43cd74bdc958289038749100e/Latest/en-US/cfd84e66bde44d8da09f250f1b8ecee6.html).

  2. Enter the **Project Name** as `mdk_maps` and click **Next**.

    ![MDK](img_002.png)

  3. Leave the default values in _Application Creation_ step as it is, click **Next**.

  4. In _Service Configuration_ step, provide and select the below information:

    | Field | Value |
    |----|----|
    | `Name`| `SampleServiceV2` |
    | `Service URL` | select `/destinations/mobileservices_cf` destination |
    | `Application ID` | `com.sap.mdk.demo` |
    | `Destination Name` | `com.sap.edm.sampleservice.v2` |
    | `Enable Offline Store` | `Uncheck it` |

    >If you do not find `mobileservices_cf` destination, please ensure that you have followed [this tutorial](fiori-ios-hcpms-setup) to setup this destination in SAP Cloud Platform cockpit.

    >If you see a _Authentication Required_ pop-up, then enter your cloud platform User Name and password to authenticate.

    ![MDK](img_004.png)

  5. Click **Check Service** to validate the service properties. If all the details are fine, you will see a success message. Click **Next**.

    ![MDK](img_005.png)

  6. In the **Metadata Source** step, select  **Customers** Entity Type, overwrite default binding of page elements from properties of dataset as per below screenshot and then click **Next**.

    ![MDK](img_006.png)

  7. In the **Customization** step, click **Next**, let's stick to the defaults.

    ![MDK](img_006.1.png)

    >In this step, You can customize your template, for instance, just ask for the first 10 customers, so that the list is not too long. You can also add other page properties or change the list of the pages that will be generated.

  8. In the **Feature** step, click **Finish**, let's stick to the defaults.

    ![MDK](img_006.2.png)

    >In this step, you can rename the Folder name which will have initialize offline data details, you can also select which defining queries you want to get initialized.

    After clicking **Finish**, the wizard will generate your MDK Application based on your selections. You should now see the `mdk_maps` project in the project explorer.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 2: ](Register an Extension Control)]

The extension control that you will be creating to extend the functionality of your app can be used as base controls by registering it using the MDK editor.

1. In the editor, right-click the project folder, and select **New** | **MDK Extension Control**.

    ![MDK](img_007.png)

2. Provide the below information:

    | Field | Value |
    |----|----|
    | `Control Name`| `mdk_maps` |
    | `Module` | `MyMapModule` |
    | `Control` | `MyMapExtension` |
    | `Class` | `MyMapClass` |
    | `Display` | leave it blank |

    Here is the basic definition for properties you defined above:

      **Module**: It is used to identify the extension control.
      The path to the extension module under `<MetadataProject>/Extensions/`.

    **Control**: The name of the file under the `<MetadataProject>/Extensions/<Module>/controls` that contains the extension class. If not specified, module name would be used as the value for this property.

    **Class**: The class name of your custom extension class. The client will check for this class at runtime and if it's found, your extension will be instantiated. Otherwise, a stub with an error message will be shown.

    **Display**: This property is used for the image to be displayed on the page editor to represent the extension control. Use the binding button to select an image from the `Workspace\MDKExtensionControls\Image` folder.

      ![MDK](img_008.png)

    >You will refer all these properties in step 4.

3. In **Schema Information** window, click **Next**. For this tutorial, you will not need any schema.

      ![MDK](img_009.png)

    >Here you can define the properties of the extension control or import a property sample.

4. Click **Finish** to confirm.

The first time you create an extension control, a directory named `MDKExtensionControls` is automatically created under the MDK app project workspace. Also, a file named `ControlName.extension` (`mdk_maps.extension`) is generated based on the control name you provided.

![MDK](img_010.png)

>You can find more details about registering extension control in [this](https://help.sap.com/viewer/977416d43cd74bdc958289038749100e/Latest/en-US/bcc1a204cb614cd99f75c6b2120c5f2e.html) guide.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 3: ](Consume Extension Control in MDK Metadata)]

You will add this registered control in the generated `Customers_Detail.page`.

  1. Navigate to **Pages** folder | **Customers** | `Customers_Detail.page`.

  2. Remove the body section of the page.

    ![MDK](img_003.gif)

  3. Drag & drop **Section Extension** control on the page area.

    ![MDK](img_004.gif)

    >You can find more details about the **Section Extension** in [this](https://help.sap.com/viewer/977416d43cd74bdc958289038749100e/Latest/en-US/6152a1276ad2442ca9bcd0fb08029284.html) guide.

  4. You will now set the height and  bind it the registered Extension control properties.

    In the **Properties** section, provide the below information:

    | Field | Value |
    |----|----|
    | `Height`| `600` |
    | `Module` | `MyMapModule` |
    | `Control` | `MyMapExtension` |
    | `Class` | `MyMapClass` |

    Scroll down to the **Extension Properties**, switch to **Text** mode and paste the following information:

    ```JSON
    {
  	"Prop": {
  	"City": "{City}",
  	"Country": "{Country}",
  	"HouseNumber": "{HouseNumber}",
  	"LastName": "{LastName}",
  	"PostalCode": "{PostalCode}",
  	"Street": "{Street}"
  	  }
    }
    ```

    ![MDK](img_012.png)

  5. Save the changes to the `Main.page`.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 4: ](Implement Extension using metadata approach)]

1. In **Extensions** folder, create files & folders as per below.

    ![MDK](img_018.png)



          MyMapModule
            controls
              MyMapExtension.ts



2. In `MyMapExtension.ts` file, copy and paste the following code.

    ```JavaScript / TypeScript
    import * as app from 'tns-core-modules/application';
    import { IControl } from 'mdk-core/controls/IControl';
    import { BaseObservable } from 'mdk-core/observables/BaseObservable';
    import { EventHandler } from 'mdk-core/EventHandler'

    export class MyMapClass extends IControl {
    private _observable: BaseObservable;
    private _mapView: any;
    private _geo: any;
    private _gMap: any;
    private _marker: any;
    private _customerInfo = {
        lastName: "",
        houseNumber: "",
        street: "",
        city: "",
        country: "",
        postalCode: "",
        latitiude: "",
        longitude: ""
    }

    public initialize(props: any): any {
        super.initialize(props);

         //Access the properties passed from Customers_Detail.page to the extension control.
         //in this tutorial, you will be accessing the customer's last name and address
        if (this.definition().data.ExtensionProperties.Prop) {
            var property = this.definition().data.ExtensionProperties.Prop;
            this._customerInfo.lastName = property.LastName;
            this._customerInfo.houseNumber = property.HouseNumber;
            this._customerInfo.street = property.Street;
            this._customerInfo.city = property.City;
            this._customerInfo.country = property.Country;
            this._customerInfo.postalCode = property.PostalCode;
        }

        if (app.android) {    
            //You will display the Google Maps in a MapView.For more details on Google Maps API for android, visit
            //https://developers.google.com/android/reference/com/google/android/gms/maps/package-summary

            this._mapView = new com.google.android.gms.maps.MapView(this.androidContext());
            var localeLanguage = java.util.Locale;

            //GeoCoder is required to convert a location to get latitude and longitude
            this._geo = new android.location.Geocoder(this.androidContext(), localeLanguage.ENGLISH);
            this._mapView.onCreate(null);
            this._mapView.onResume();

            //when mapview control is used, all the lifecycle activities has to be frowaded to below methods.
            app.android.on(app.AndroidApplication.activityPausedEvent, this.onActivityPaused, this);
            app.android.on(app.AndroidApplication.activityResumedEvent, this.onActivityResumed, this);
            app.android.on(app.AndroidApplication.saveActivityStateEvent, this.onActivitySaveInstanceState, this);
            app.android.on(app.AndroidApplication.activityDestroyedEvent, this.onActivityDestroyed, this);
            var that = this;

            //A GoogleMap must be acquired using getMapAsync(OnMapReadyCallback).
            //The MapView automatically initializes the maps system and the view

            var mapReadyCallBack = new com.google.android.gms.maps.OnMapReadyCallback({
                onMapReady: (gMap) => {
                    console.log("inside onMapReady function");
                    that._gMap = gMap;
                    var zoomValue = 6.0;
                    that._gMap.setMinZoomPreference = zoomValue;
                    var customerAddress = that._customerInfo.houseNumber + ' ' + that._customerInfo.street + ' ' + that._customerInfo.city + ' ' + that._customerInfo.country + ' ' + that._customerInfo.postalCode;
                    var data = that._geo.getFromLocationName(customerAddress, 1);
                    var latLng = new com.google.android.gms.maps.model.LatLng(data.get(0).getLatitude(), data.get(0).getLongitude());
                    that._gMap.addMarker(new com.google.android.gms.maps.model.MarkerOptions().position(latLng).title(this._customerInfo.lastName + "'s " + "location"));
                    that._gMap.moveCamera(new com.google.android.gms.maps.CameraUpdateFactory.newLatLng(latLng));
                }
            });
            this._mapView.getMapAsync(mapReadyCallBack);
        }


        if (app.ios) {

            /*initiating Apple Maps
            For more details on the Apple Maps visit
            https://developer.apple.com/documentation/mapkit */
            this._mapView = MKMapView.alloc().initWithFrame(CGRectMake(0, 0, 1000, 1000));  
        }
    }

    private onActivityPaused(args) {
        console.log("onActivityPaused()");
        if (!this._mapView || this != args.activity) return;
        this._mapView.onPause();
    }

    private onActivityResumed(args) {
        console.log("onActivityResumed()");
        if (!this._mapView || this != args.activity) return;
        this._mapView.onResume();
    }

    private onActivitySaveInstanceState(args) {
        console.log("onActivitySaveInstanceState()");
        if (!this._mapView || this != args.activity) return;
        this._mapView.onSaveInstanceState(args.bundle);
    }

    private onActivityDestroyed(args) {
        console.log("onActivityDestroyed()");
        if (!this._mapView || this != args.activity) return;
        this._mapView.onDestroy();
    }

    //In case of iOS you'll use CLGeocoder API to convert a address to get latitude and longitude.
    //NOTE - API getlatlang is called only on ios devices

    private getlatlang(customerAddress) {
        const that = this;
        return new Promise((resolve, reject) => {
        var latLng = new CLGeocoder();
            latLng.geocodeAddressStringCompletionHandler(customerAddress, function (placemarks, error){
                if(error === null && placemarks && placemarks.count > 0) {
                    var pm = placemarks[0];
                    var cordinates = {
                        latitiude: "",
                        longitude: ""
                    }
                    cordinates.latitiude = pm.location.coordinate.latitude;
                    cordinates.longitude = pm.location.coordinate.longitude;
                    resolve(cordinates);
                }
                else {
                    reject();
                }
            });
        });
    }

    public view() {
        this.valueResolver().resolveValue([this._customerInfo.houseNumber, this._customerInfo.street, this._customerInfo.city, this._customerInfo.country, this._customerInfo.postalCode, this._customerInfo.lastName], this.context)
        .then((address) => {

            this._customerInfo.houseNumber = address[0];
            this._customerInfo.street = address[1];
            this._customerInfo.city = address[2];
            this._customerInfo.country = address[3];
            this._customerInfo.postalCode = address[4];
            this._customerInfo.lastName = address[5];

            var customerAddress = address[0] + ' ' + address[1] + ' ' + address[2] + ' ' + address[3] + ' ' + address[4];
            console.log("customer's address = " + customerAddress);

            if (app.ios){
                return this.getlatlang(customerAddress)
                    .then((cordinates) => {   
                        /* below code is for the apple maps */
                        var latlong = CLLocationCoordinate2DMake(cordinates.latitiude, cordinates.longitude);
                        var annotation = MKPointAnnotation.alloc().init();
                        annotation.coordinate = latlong;
                        annotation.title = this._customerInfo.lastName + "'s" + " location";
                        this._mapView.centerCoordinate = latlong;
                        this._mapView.addAnnotation(annotation);
                    });
            }
        });

        if (app.android) {
            return this._mapView;
        }
        if (app.ios) {
            return this._mapView;
        }
    }

    public viewIsNative() {
        return true;
    }

    public observable() {
        if (!this._observable) {
            this._observable = new BaseObservable(this, this.definition(), this.page());
        }
        return this._observable;
    }

    public setContainer(container: IControl) {
        // do nothing
    }

    public setValue(value: any, notify: boolean, isTextValue?: boolean): Promise<any> {
        // do nothing
        return Promise.resolve();
    }
}
    ```

3. Save the `MyMapExtension.ts` file.

[VALIDATE_1]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 5: ](Deploy and activate application)]

So far, you have learned how to build an MDK application in the SAP Web IDE editor. Now, we deploy this application definition to Mobile Services.

  1. Right-click the `mdk_maps` MDK Application in the project explorer pane and select **MDK Deploy and Activate**.

    ![MDK](img_014.png)

  2. Let the default configuration as it is and click **Next**.

    ![MDK](img_015.png)

    >**Filter Files**: will be filtered and ignored in web packing process.

    >**Externals**: are the list of NPM modules that are part of the MDK Client application and should not be validated in the bundle.

  3. Click the drop down for Destination Name and select the `mobileservices_cf` destination, you will find list of existing application IDs, select the one you have chosen while creating the project.

    ![MDK](img_016.png)

    >By default, automatically deploy option is selected, In other words, the application is automatically deployed from Mobile Services to your MDK client.

  4. Click **Next** to finish the deployment from SAP Web IDE.

    You should see **Application deployed successfully** message in console log.

      ![MDK](img_017.png)

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 6: ](Get the API Key to use the Maps SDK for Android (Required only for Android client))]

Since you will display the customer's address in Google Maps on Android device, you will need to provide an API key in generated MDK project (step 8).

  1. Visit the [Google Cloud Platform Console](https://cloud.google.com/console/google/maps-apis/overview).

  2. Click the project drop-down and select or create the project for which you want to add an API key.

    ![MDK](img_017.0.png)

  3. Enable **Maps SDK for Android** API.

    ![MDK](img_018.0.png)

  4. Open [Credentials console](https://console.cloud.google.com/apis/credentials), click **CREATE CREDENTIALS** and click **API Key**.

    ![MDK](img_019.0.png)

  5. Copy this generated key and save it locally. This will be required in step 8.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 7: ](Create Your Branded MDK Client)]

Follow steps 1 to 4 from [this tutorial](cp-mobile-dev-kit-build-client).

[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 8: ](Run the MDK Client)]

>Make sure you are choosing the right device platform tab above.

[OPTION BEGIN [Android]]

In this step, you will run the app on an android device.

  1. Navigate to `/Demo Sample App/app/App_Resources/Android/app.gradle`.

    ![MDK](img_1.png)

  2. Provide below information at the end of this file.

    ```Java
    dependencies { implementation 'com.google.android.gms:play-services-maps:17.0.0' }
    ```

    ![MDK](img_2.png)

   3. Navigate to `/Demo Sample App/app/App_Resources/Android/src/main/AndroidManifest.xml`.

     ![MDK](img_3.png)

   4. Provide below information at the end of this file.


    ```XML
     <meta-data android:name="com.google.android.geo.API_KEY" android:value="Enter your API Key generated in step 6" />
    ```

     ![MDK](img_4.png)

  5. Attach the device to your Mac or Windows machine and run `tns device android` command to print a list of attached devices.

    ![MDK](img_020.3.png)

    >Make sure **Developer option** and **USB debugging** option is enabled in android device.

  6. Copy the **Device Identifier** value for your device.

    In terminal or command line window, navigate to the app name folder **Demo Sample App** (in `MDClient_SDK` path) and use `tns run android --device <device identifier>` command to run the MDK client on android device.

    ![MDK](img_020.4.png)

    >To run the MDK client on Android emulator, you need to first create the client for emulator and then use `tns run android --emulator` command. Before trying to launch the client on Android emulator, make sure that you have already configured a virtual device (Android Studio>AVD Manager). Otherwise, you may get error like No emulator image available for device identifier.

  7. Once, above command gets successfully executed, you will see new MDK client up and running in Android device.

    ![MDK](img_029.jpg)

    Here, you will notice that **app name**, **detailed label text** and **signing button text** have been updated as per changes done in step 3.

    Tap **START** to connect MDK client to SAP Cloud Platform.

  8. Enter Email address and password to login to SAP Cloud Platform and tap **Log On** to authenticate.

    ![MDK](img_030.1.1.png)

  9. Tap **AGREE** on `End User License Agreement`.

    ![MDK](img_031.jpg)

  10. Choose a passcode with at least 8 characters for unlocking the app and tap **NEXT**.

    ![MDK](img_032.jpg)

  11. Confirm the passcode and tap **DONE**.

    ![MDK](img_033.jpg)

12. Tap **OK** to update the client with new MDK metadata.

    ![MDK](img_044.png)

13. Navigate to the Customer Details page to see the Customer's address loading in Apple Maps.

    ![MDK](img_044.gif)

    >You can always interrupt running process in terminal window by pressing `control + C`.

    >To build an **`APK` for an Android device**, use `tns build android --release`. More information about archiving can be found in `NativeScript` documentation [here](https://docs.nativescript.org/tooling/docs-cli/project/testing/build-android).

[OPTION END]

[OPTION BEGIN [iOS]]

  1. In this step, you will run the app on an iOS device. Attach the device to your Mac and run `tns device ios` command to print a list of attached devices.

    ![MDK](img_020.1.png)

  2. Copy the **Device Identifier** value for your device.

  3. In terminal window, navigate to the app name folder **Demo Sample App** (in `MDClient_SDK` path) and use `tns run ios --device <device identifier>` command to run the MDK client on iOS device.

    ![MDK](img_020.2.png)

    You can also run the app in Xcode. Open the project in Xcode with the command `open platforms/ios/<app name>.xcworkspace`, or open the workspace using the `File -> Open...` dialog in Xcode. Configure the application's code signing settings, then run the application for the target device.

    >To run the MDK client on iOS simulator, use `tns run ios --emulator` command.

  4. Once, above command gets successfully executed, you will see new MDK client up and running in your device.

    ![MDK](img_022.png)

    Here, you will notice that **app name**, **detailed label text** and **signing button text** have been updated as per changes done in step 3.

  5. Tap **Start** to connect MDK client to SAP Cloud Platform.

  6. Enter Email address and password to login to SAP Cloud Platform and tap **Log On** to authenticate.

    ![MDK](img_023.1.1.png)

  7. Tap **Agree** on `End User License Agreement`.

    ![MDK](img_024.png)

  8. Choose a passcode with at least 8 characters for unlocking the app and tap **Next**.

    ![MDK](img_025.png)

  9. Confirm the passcode and tap **Done**.

    ![MDK](img_026.png)

  10. Tap **OK** to update the client with new MDK metadata.

    ![MDK](img_044.png)

  11. Navigate to the Customer Details page to see the Customer's address loading in Apple Maps.

    ![MDK](img_045.gif)

    >You can always interrupt running process in terminal window by pressing `control + C`.

    >To build an **IPA for an iOS device**, use `tns build ios --for-device --release`. This can also be accomplished in Xcode by opening the workspace and selecting the Archive option. More information about archiving can be found in Apple's documentation [here](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/UploadingYourApptoiTunesConnect/UploadingYourApptoiTunesConnect.html).

[OPTION END]

Congratulations, you have completed **Create Extension Controls in Mobile Development Kit (MDK) Apps** mission.

[DONE]
[ACCORDION-END]

---
