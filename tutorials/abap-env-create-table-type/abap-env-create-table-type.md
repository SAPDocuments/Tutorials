---
title: Create an ABAP Table Type
description: Create a table type and use it to retrieve data from a database table.
auto_validation: true
time: 20
primary_tag: products>sap-cloud-platform--abap-environment
tags: [  tutorial>beginner, topic>abap-development, products>sap-cloud-platform ]
---
## Prerequisites
- You have a sub-account with the entitlement SAP Cloud Platform, ABAP environment, release 1902 or higher. For more details, see [Getting Started with a Customer Account: Workflow in the ABAP Environment](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/e34a329acc804c0e874496548183682f.html).
- You have installed [ABAP Development Tools 3.0](https://tools.hana.ondemand.com/#abap).
- You have created an ABAP Cloud Project pointing to this ABAP environment. For more details, see  [Connect to the ABAP System](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/7379dbd2e1684119bc1dd28874bbbb7b.html).
- **Tutorial**: [Create a Simple Database Table for ABAP Environment](abap-environment-create-table)

## Details
### You will learn
  - How to create and edit a table type for an internal table in the new, form-based Table Types editor
  - How to use this table type to retrieve data from a database table

Table types can also be defined in, for example, an ABAP program or class. The differences between the two approaches include:
-	Table types in the ABAP Data Dictionary are maintained in a form-based editor, table types in ABAP in a text-based editor
-	**Reuse**: Table types can only be used by other Dictionary types if they are defined in the Data Dictionary
-	**Modularization**: Table types in the Dictionary are stand-alone objects, whereas table types in ABAP are always part of another Repository object

Throughout this tutorial, objects have the suffix **`XXX`**. Remember to always replace this with your initials or group number.

---

[ACCORDION-BEGIN [Step 1: ](Create a table type)]

1. Open your ABAP Cloud Project from the previous tutorial, then open the package in which you created the database table.

    ![Image depicting step1a-package](step1a-package.png)

2. Select your package and choose **New > Other ABAP Repository Object > Dictionary > Table Type** from the context menu.

    ![Image depicting step1-new-table-type](step1-new-table-type.png)

2. Enter a name and description and choose **Next**.

    ![Image depicting step1b-name](step1b-name.png)

3. Create or assign a transport request and choose **Finish**.

The table type appears in a new editor.  

![Image depicting step1e-table-type-editor](step1e-table-type-editor.PNG)

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 2: ](Define a type)]
Choose the category **Dictionary Type** For the type name, choose the database table you created in a previous tutorial, for example **`Z_BOOKING_XXX`** (replacing `XXX` with your group number or initials).

![Image depicting step2a-search-type](step2a-search-type.png)
.
![Image depicting step2-define-type](step2-define-type.png)

Note that, in the ABAP Environment, you can only work with whitelisted objects. The majority of tables you might expect, such as `SFLIGHT` are not whitelisted. For a complete list of whitelisted objects, see the folder **Released Objects**. To sort objects by object type, not package, use a Duplicate Tree:

![Image depicting step2b-released-objects](step2b-released-objects.png)

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 3: ](Define a primary key)]
1. You cannot define your own primary key for a standard table. First, change the access type to **Sorted Table**.

    ![Image depicting step3-change-access](step3-change-access.png)

2. Change the Primary Key type to **Key Components**.

    ![Image depicting step3b-change-key-type](step3b-change-key-type.png)

3. You can now choose the key fields from a drop-down list, by choosing **Auto-complete (Ctrl+Space)**.

    ![Image depicting step3c-change-key-comps](step3c-change-key-comps.png)

4. Choose each key field in turn:

    ![Image depicting step3d-choose-key-comps](step3d-choose-key-comps.png)


This is for test purposes only. The access type you choose in real life affects performance. For more information, see:

  - [ABAP Keyword Documentation: Internal Tables, Selection of Table Category](https://help.sap.com/doc/abapdocu_752_index_htm/7.52/en-US/index.htm?file=abenitab_kind.htm)

  - [ABAP Examples: Internal Tables, Key Accesses](https://help.sap.com/doc/abapdocu_752_index_htm/7.52/en-US/index.htm?file=abenitab_kind.htm)

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 4: ](Define a secondary key)]
Users may want to query a database table using something other than the primary key. To enable this, create a secondary key.

1. First, select **Secondary Key** and choose **Create...** from the context menu:

    ![Image depicting step4-secondary-key](step4-secondary-key.png)

2. Enter a name and choose the component(s) (or fields):

    ![Image depicting step4b-secondary-key-comps](step4b-secondary-key-comps.png)

The keys are listed.

  ![Image depicting step4c-keys-list](step4c-keys-list.png)

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 5: ](Create an ABAP class)]
Finally, you will test your table type by using it to:

- define an internal table
- get database data into this table
- output the table content to the console

1. First create the ABAP Class, by selecting your package and choosing **New > ABAP Class** from the context menu:

    ![Image depicting step5-create-class](step5-create-class.png)

2. Enter a name, such as **`ZCL_OUTPUT_BOOKINGS_XXX`** and description for your class (replacing `XXX` with your group number or initials).

    ![Image depicting step5-name-class](step5-name-class.png)

3. Assign a transport request and choose **Finish**.

The class appears in a new editor.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 6: ](Add an interface)]
Add the following interface to your class:

```ABAP
 interfaces if_oo_adt_classrun.
```

This interface provides a light-weight solution for executing an ABAP program without launching a full user interface.
It also lets you display text or data in the Console View.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 7: ](Implement the method)]
You will now add the following code to the `main` method, remembering to rename the table type and database table to your own (for example, replacing `XXX` with your group number or initials)..

1. Create an internal table `lt_bookings` with the table type that you just created, `ZTT_BOOKING_XXX`.

    `DATA: lt_bookings type ZTT_BOOKING_XXX.`

2. Select data from the database table from the previous tutorial `ZTBOOKING_XXX` and add it to the internal table.

    `select * from ZTBOOKING_XXX`

    `into table @lt_bookings.`

3. Output the internal table to the console.

    `out->write( EXPORTING`

    `data = lt_bookings`

    `name = 'Bookings:' ).`

4. Then save and activate your class using **`Ctrl+S, Ctrl+F3`**.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 8: ](Check your code)]
The complete class should look like this:

```ABAP

CLASS zcl_output_bookings_xxx DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.
    INTERFACES if_oo_adt_classrun.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.

CLASS zcl_output_bookings_xxx IMPLEMENTATION.

  METHOD if_oo_adt_classrun~main.
     DATA:
         lt_bookings type ZTT_BOOKING_XXX.

  select * from ZTBOOKING_XXX
  into table @lt_bookings.
  out->write( EXPORTING
                  data = lt_bookings
                  name = 'Bookings:' ).
  ENDMETHOD.

ENDCLASS.

```


[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 9: ](Test your class)]
Run your class in the console by choosing **`F9`**. Your output should look like this:

  ![Image depicting step9-console](step9-console.png)

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 10: ](Test yourself)]

[VALIDATE_1]
[ACCORDION-END]




---
