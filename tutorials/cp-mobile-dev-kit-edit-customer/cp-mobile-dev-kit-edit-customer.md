---
title: Modify a Customer Record in an MDK App
description: Allow editing of customer details in an MDK app.
auto_validation: true
primary_tag: products>mobile-development-kit-client
tags: [ tutorial>beginner, operating-system>ios, operating-system>android, topic>mobile, products>sap-cloud-platform, products>mobile-development-kit-client, software-product-function>sap-cloud-platform-mobile-services ]
time: 25
author_name: Jitendra Kansal
author_profile: https://github.com/jitendrakansal
---

## Details
### You will learn
  - How to create a new page for modifying customer details such as name, email and phone number
  - How to store changes locally
  - How to sync local changes with backend

---

[ACCORDION-BEGIN [Step 1: ](Define a close page-cancel action)]

Regardless of whether your application is online or offline, you can allow users to modify data in the application.

For online applications, the changes are saved to the backend immediately.

For offline applications, the changes are stored locally until they are synced using an Upload action.

First, you will create a `CloseModalPage_Cancel.action` that closes the current page and cancels or interrupts any execution in process. This will be used with the cancel button on the **Edit Customer page**.

>You can close pages with the option to terminate ongoing events or wait until they are complete.

>You can find more details about [Close Page Action](https://help.sap.com/viewer/977416d43cd74bdc958289038749100e/Latest/en-US/2cd05c81255f49e3ae9258f9a5222a6c.html).

1. Right-click the **Actions** folder | **New MDK Action** | choose **MDK UI Actions** in **Category** | click **Close Page Action** | **Next**.

    ![MDK](img_000.gif)

2. Provide the below information:

    | Property | Value |
    |----|----|
    | `Action Name`| `CloseModalPage_Cancel` |
    | `DismissModal` | `Canceled` |
    | `CancelPendingActions`| `true` |

    ![MDK](img_000.1.png)

3. Click **Next** and then **Finish** on the confirmation step.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 2: ](Create a new page for modifying customer data)]

In this step, you will create the _Edit Customer Detail_ page as a **Form Cell Page**. This type of page allows for form input style changes. The page will provide only a subset of items available on the Customer Detail page. You will add the fields that will be editable by the end-user.

1. Right-click the **Pages** folder | **New MDK Page** | **Form Cell Page** | **Next**.

    ![MDK](img_001.1.png)

    >A Form Cell Page is suitable for pages that generate new objects or modify existing objects. It includes a form cell container by default. You can add form sections, multiple containers or action controls to this page. Under each container section, you can add various container items.

    >You can find more details about [Form Cell page](https://help.sap.com/viewer/977416d43cd74bdc958289038749100e/Latest/en-US/a0358d7a9c3b46e0819f28ae779def24.html).

2. Enter the Page Name `Customers_Edit` and click **Next** and the **Finish** on the Confirmation step.

    ![MDK](img_002.png)

3. In the **Properties** pane set the Caption to **Update Customer**.

    ![MDK](img_003.png)

4. Now, you will add the fields (like first name, last name, phone & email address) that will be editable by the end-user.

    In the Layout Editor, expand the **Control** | **Container Item** section.

    >You can find more details about [available controls in Form Cell page](https://help.sap.com/viewer/977416d43cd74bdc958289038749100e/Latest/en-US/a0358d7a9c3b46e0819f28ae779def24.html).

5. Drag and drop a **Simple Property** onto the Page area.

    ![MDK](img_005.gif)

6. Drag and drop three additional Simple Property controls onto the page so you have four total controls.

    ![MDK](img_005.png)

7. Select the first **Simple Property control** and provide the below information:

    | Property | Value |
    |----|----|
    | `Name`| `FCFirstName` |
    | `Caption` | `First Name` |
    | `isEditable`| `true` |
    | `Value`| bind it to `FirstName` property of the Customer entity |

    ![MDK](img_006.gif)

    >Make sure, Format should be set as _Binding_.
    ![MDK](img_006.1.png)

8. Select the second Simple Property control and provide the below information:

    | Property | Value |
    |----|----|
    | `Name`| `FCLastName` |
    | `Caption` | `Last Name` |
    | `isEditable`| `true` |
    | `Value`| bind it to `LastName` property of the Customer entity |

    ![MDK](img_008.png)

9. Select the third Simple Property control and provide the below information:

    | Property | Value |
    |----|----|
    | `Name`| `FCPhone` |
    | `Caption` | `Phone` |
    | `isEditable`| `true` |
    | `Value`| bind it to `PhoneNumber` property of the Customer entity |

    ![MDK](img_009.png)

10. Select the last Simple Property control and provide the below information:

    | Property | Value |
    |----|----|
    | `Name`| `FCEmail` |
    | `Caption` | `Email` |
    | `isEditable`| `true` |
    | `Value`| bind it to `EmailAddress` property of the Customer entity |

    ![MDK](img_010.png)

11. Save the changes to the `Customers_Edit.page`.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 3: ](Add cancel button on the Edit Customer page)]

Now, you will add a button on the Edit Customer page and set it's `onPress` to `CloseModalPage_Cancel.action` created in step 1.

1. Drag and drop an **Action Bar Item** control to the upper left corner of the action bar.

    >Action Bar Item is a button that users can use to fire actions when pressed. You can add an Action Bar Item only to the Action Bar (at the top of the page).

    ![MDK](img_011.1.gif)

2. In the Properties pane, click the **link icon** to open the object browser for the **System Item** property.

    Double click the **Cancel** type and click **OK**.

    ![MDK](img_013.gif)

    >System Item are predefined system-supplied icon or text. Overwrites _Text_ and _Icon_ if specified.

3. Now, you will set the `onPress` event to `CloseModalPage_Cancel.action`.

    In **Events** tab, click the **link icon** for the `OnPress` property to open the object browser.

    Double click the `CloseModalPage_Cancel.action` and click **OK** to set it as the `OnPress` Action.

    ![MDK](img_015.gif)

4. Save the changes to the `Customers_Edit.page`.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 4: ](Create navigation action)]

Now, create a navigation action that will open the `Customers_Edit.page` when executed.

1. Right-click the **Actions** folder | **New MDK Action** | choose **MDK UI Actions** in **Category** | click **Navigation Action** | **Next**.

    ![MDK](img_017.1.gif)

2. Provide the below information:

    | Property | Value |
    |----|----|
    | `Action Name`| `NavToCustomers_Edit` |
    | `Page To Open` | select `Customers_Edit.page` |
    | `ModalPage`| check this option |

    ![MDK](img_016.png)

3. Click **Next** and then **Finish** on the confirmation step.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 5: ](Add edit button to customer details page)]

You will add a button to the `Customers_Detail.page` called **Edit**. You will link this button to the navigation action you just created. This event will open the `Customers_Edit.page` when the Edit button is pressed by the end-user.

1. In `Customers_Detail.page`, drag and drop an **Action Bar Item** to the upper right of the action bar.

    ![MDK](img_016_1.gif)

2. Click the **link icon** to open the object browser for the **System Item** property.

    Double click the **Edit** type and click **OK**.

    ![MDK](img_017.png)

3. In the Properties pane, click the **Events** tab, click the **link icon** for the `OnPress` property to open the object browser.

    Double click the `NavToCustomers_Edit.action` and click **OK** to set it as the `OnPress` Action.

    ![MDK](img_019.gif)

4. Save the changes to the `Customers_Detail.page`.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 6: ](Store the updated data locally)]

The next step is to store newly updated record locally for an offline application or send the updated record directly back to the backed for online applications. You will now create an action to map the changes received from the `Customers_Edit.page` to the corresponding field in the OData service. You will also show a failure message if the update action fails to save the changes.

First, define a failure message.

1. Right-click the **Actions** folder | **New MDK Action** | choose **MDK Message Actions** in **Category** | click **Message Action** | **Next**.

    ![MDK](img_020.png)

2. Provide the below information:

    | Property | Value |
    |----|----|
    | `Action Name`| `UpdateCustomerEntityFailureMessage` |
    | `Type` | select `Message` |
    | `Message` | `Failed to Save Customer Updates` |
    | `Title` | `Update Customer` |
    | `OKCaption` | `OK` |
    | `OnOK` | `--None--` |
    | `CancelCaption` | leave it blank |
    | `OnCancel` | `--None--` |

    ![MDK](img_021.png)

3. Click **Next** and then **Finish** on the confirmation step.

4. Next, you will define **Close Page-Complete Action** which allows the end-user to close the page and allow any execution to continue.

    >You can close pages with the option to terminate ongoing events or wait until they are complete.

    Create a **Close Page–Complete action**.

    Right-click the **Actions** folder | **New MDK Action** | choose **MDK UI Actions** in **Category** | click **Close Page Action** | **Next**.

      ![MDK](img_000.gif)

5. Provide the below information:

    | Property | Value |
    |----|----|
    | `Action Name` | `CloseModalPage_Complete` |
    | `DismissModal` | `Completed` |
    | `CancelPendingActions` | `false` |

    ![MDK](img_022.png)

6. Click **Next** and then **Finish** on the confirmation step.

7. Next, you will create the **OData Update action** to update entity action that will map the changes to the correct entities in the OData service and save the changes.

    >You can find more details about [Update Entity Action](https://help.sap.com/viewer/977416d43cd74bdc958289038749100e/Latest/en-US/20da3bdc0ced44858952f06fe63033d8.html).

    Right-click the **Actions** folder | **New MDK Action** | choose **MDK Data Actions** in **Category** | click **OData Action** | **Next**.

    ![MDK](img_023.png)

8. Provide the below information:

    | Property | Value |
    |----|----|
    | `Action Name`| `Customers_UpdateEntity` |
    | `Type` | `UpdateEntity` |
    | `Service`| `SampleServiceV2` |
    | `EntitySet`| `Customers` |
    | `ReadLink`| click link icon and double click `readLink` |

    ![MDK](img_024.gif)

    >The `readLink` is a direct reference to an individual entity set entry.

9. Click **Next**.

10. In **Property and Update Links** step, uncheck **City**.

11. Since in `Customers_Detail.page`, we defined four properties (First Name, Last Name, Phone & Email) to be edited, now, in this step, we will bind them to respective UI Controls.

    Check the `EmailAddress` property and click the **link icon** to open the object browser.

    Change the drop down in the object browser to `Controls & ClientData`, click the **Current Page** radio button.

    In the search box start typing the control name `FCEmail`. The list will filter down to show the matching values. Double click the **Value (Value)** entry under the `FCEmail` field and click **OK** to set binding.

    ![MDK](img_026.gif)

12. Repeat the above step for remaining properties: `FirstName`, `LastName` and `PhoneNumber`.

    ![MDK](img_027.png)

    Click **Next** and **Finish** on the confirmation screen. The action editor will open with the `Customers_UpdateEntity.action` loaded.

13. Next, define _Success_ and _Failure_ actions for `Customers_UpdateEntity.action`.

    In the action editor for the new action, expand the **Common Action Properties** and provide the below information:

    | Property | Value |
    |----|----|
    | `Success Action` | `CloseModalPage_Complete.action` |
    | `Failure Action` | `UpdateCustomerEntityFailureMessage.action` |

    >When `Customers_UpdateEntity.action` gets executed successfully then `CloseModalPage_Complete.action` will be triggered or if `Customers_UpdateEntity.action` fails then `UpdateCustomerEntityFailureMessage.action` will be triggered.

    ![MDK](img_028.png)

14. Next, you will set the `OnPress` event of the _Save_ button.

    Now, that the Update action is created, you will need to call the Update action when the end-user presses the **Save** button. You will add a **Save** button on the `Customers_Edit.page` and link it to the `Customers_UpdateEntity.action`.

    In `Customers_Edit.page`, **drag and drop** an **Action Bar Item** to the upper right corner of the action bar.

    ![MDK](img_029.png)

    Click the **link** icon to open the object browser for the **System Item** property.

    Double click the **Save** type and click **OK**.

    ![MDK](img_030.png)

15. In the Properties pane | **Events** tab, click the **link** icon for the `OnPress` property to open the object browser, bind it to `Customers_UpdateEntity.action`.

    ![MDK](img_031.png)

16. Save the changes to the `Customers_Edit.page`.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 7: ](Deploy and activate the application)]

Deploy the updated application to your MDK client.

1. Right-click the `DemoSampleApp` MDK Application in the project explorer pane and select **MDK Deploy and Activate**.

    ![MDK](img_026.1.png)

2. Since we have deployed already both the destination and app id should be pre-selected based on the last time you deployed our application.  Confirm the **Destination Name** is `mobileservices_cf` and the **Application Id** is `com.sap.mdk.demo` and click **Next**.

    ![MDK](img_014.1.png)

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 8: ](Test the application)]

>Make sure you are choosing the right device platform tab above.

[OPTION BEGIN [Android]]

1. Re-launch the app on your device, you may asked to authenticate with passcode or Fingerprint. You will see a _Confirmation_ pop-up, tap **OK**.

2. Tap **CUSTOMER LIST**, tap one of the available customer record,  you will then navigate to Customer detail page. Tap edit icon.

    ![MDK](img_032.1.jpg)

3. For example, updating First Name from `Sebastien` to `Rob`. Tap save icon.

    ![MDK](img_033.1.jpg)

    Local record gets updated accordingly.

    ![MDK](img_034.1.jpg)

4. You can cross verify if a record has been updated in the backend.

    >Backend URL can be found in [Mobile Services Cockpit](https://developers.sap.com/tutorials/cp-mobile-dev-kit-ms-setup.html).

    >Mobile Applications | Native/Hybrid | click the MDK App com.sap.mdk.demo | Mobile Sample OData ESPM | click Root URL `v2` | add `/Customers`/ at the end of the URL

    But here result is pointing to old First Name (`Sebastien`).

    ![MDK](img_035.png)

    Since this is an Offline application, new entry is added to the request queue of the local store which needs to be sent or uploaded to the backend explicitly.  

    >MDK base template has added a **Sync** button on main page of the app to upload local changes from device to the backend and to download the latest changes from backend to the device. Actions | Service | `UploadOffline.action` & `DownloadOffline.action`.

5. On Main page, tap **SYNC**, a successful message will be shown.

    ![MDK](img_036.1.png)

[OPTION END]

[OPTION BEGIN [iOS]]

1. Re-launch the app on your device, you may asked to authenticate with passcode or Touch ID. You will see a _Confirmation_ pop-up, tap **OK**.

2. Tap **Customer List**, tap one of the available customer record,  you will then navigate to Customer detail page. Tap **Edit**..

    ![MDK](img_032.png)

3. For example, updating First Name from `Sebastien` to `Rob`. Tap **Save**.

    ![MDK](img_033.png)

    Local record gets updated accordingly.

    ![MDK](img_034.png)

4. You can cross verify if a record has been updated in the backend.

    >Backend URL can be found in [Mobile Services Cockpit](https://developers.sap.com/tutorials/cp-mobile-dev-kit-ms-setup.html).

    >Mobile Applications | Native/Hybrid | click the MDK App com.sap.mdk.demo | Mobile Sample OData ESPM | click Root URL `v2` | add `/Customers`/ at the end of the URL

    But here result is pointing to old First Name (`Sebastien`).

    ![MDK](img_035.png)

    Since this is an Offline application, new entry is added to the request queue of the local store which needs to be sent or uploaded to the backend explicitly.  

    >MDK base template has added a **Sync** button on main page of the app to upload local changes from device to the backend and to download the latest changes from backend to the device. Actions | Service | `UploadOffline.action` & `DownloadOffline.action`.

5. On Main page, tap **Sync**, a successful message will be shown.

    ![MDK](img_036.png)

[OPTION END]

Now, refresh the URL to check if record has been updated in the backend. As Sync is pressed, `UploadOffline.action` gets triggered to upload local changes from device to the backend and on success of this call, `DownloadOffline.action` is being called.

![MDK](img_037.png)

You have successfully modified a Customer Record and you are now all set to [Define a Validation Rule in an MDK App](cp-mobile-dev-kit-add-validation).

[VALIDATE_1]
[ACCORDION-END]

---
