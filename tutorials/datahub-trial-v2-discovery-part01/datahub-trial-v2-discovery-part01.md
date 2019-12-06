---
title: Explore Data in Cloud Storage in SAP Data Hub, Trial Edition
description: Explore data in Cloud Storage (including profiling) by using SAP Data Hub, trial edition.
auto_validation: true
primary_tag: products>SAP-data-hub
tags: [  tutorial>beginner, topic>big-data, products>SAP-data-hub, products>SAP-vora ]
---

## Next Steps
 - [Explore data in SAP Vora](https://developers.SAP.com/tutorials/datahub-trial-v2-discovery-part02.html)

## Details
### You will learn  
During this tutorial, you will learn how to use SAP Data Hub Metadata Explorer. This application allows you to learn more about data residing in external storages, for example, Google Cloud Storage, AWS S3 or Windows Azure Storage Blob by profiling, previewing and viewing the metadata. You will use data residing in Cloud Storage. The Metadata Explorer gathers information about the location, attributes, quality, and sensitivity of data. With this information, you can make informed decisions about which datasets to publish and determine who has access to use or view information about the datasets.
Please note here in this tutorial GCP refers to Google Cloud platform, AWS refers to Amazon Web Services and Azure refers to Microsoft Azure.


### Time to Complete
**30 Min**

---

[ACCORDION-BEGIN [Step 1: ](Discover data in Cloud Storage)]
Open the SAP Data Hub App Launchpad via a web browser. To access the SAP Data Hub App Launchpad in AWS or GCP or Azure you need go to the chapters 3.3 and 3.4 as described in the [Getting Started with SAP Data Hub, trial edition] (https://caldocs.hana.ondemand.com/caldocs/help/8772c957-0de5-459b-b98a-27180932f0da_Getting_Started_Guide_v28.pdf) guide.

Enter **DEFAULT** as the **Tenant**, `DATAHUB` as **Username** and the password which you have selected during system setup as **Password** to logon to the Launchpad. The system displays the **Application Launchpad** page.

![picture_01](./datahub-trial-v2-discovery-part01_01.png)  

Navigate to **Metadata Explorer** by clicking on the icon from the launchpad.

![picture_02](./datahub-trial-v2-discovery-part01_02.png)

Click on **Browse Connections**.

![picture_03](./datahub-trial-v2-discovery-part01_03.png)

Click the `Cloud_Storage` connection to display the directories / files on Google Cloud Storage or AWS S3 or Azure. Once the connection opens, click on your bucket from GCS or AWS S3 or Azure.

[DONE]

[ACCORDION-END]

[ACCORDION-BEGIN [Step 2: ](Profile files)]
Next you profile the files. Profiling determines all kind of metadata about the files.

Click on the **More Actions(1)** button for `Devices.csv` and from the context menu, click on **Start Profiling(2)**. The system indicates that profiling has started. It can take several minutes for profiling to complete.

![picture_04](./datahub-trial-v2-discovery-part01_04.png)

As soon as the profiling completes, you will see a notification in the top right corner and you will see more details after you click on the icon.

![picture_05](./datahub-trial-v2-discovery-part01_05.png)  

The file size is 20,493 bytes.

[DONE]

[ACCORDION-END]

[ACCORDION-BEGIN [Step 3: ](Display metadata and fact sheet)]
You can display the **Metadata** of the files by clicking the highlighted button in each file row.

![picture_06](./datahub-trial-v2-discovery-part01_06.png)  

The metadata is displayed in a popup. You see the number of columns, corresponding types as well as the size of the `Devices.csv` file. The `Devices.csv` file has five columns. The file size is 20,744 bytes.

After the profiling completes, you can also check the **Fact sheet** for the `Devices.csv` file. Click the **More Actions** button for the file `Devices.csv` and click on **View Fact Sheet**

![picture_07](./datahub-trial-v2-discovery-part01_07.png)  

The fact sheet again displays the columns as well as corresponding types. But it also displays much more information such as minimum and maximum values of the columns, percentage of null values and top 10 distinct values.

As you can see the `Devices.csv` file has a lot of null values (18.4%) in the `COUNTRY` column. There seems to be a problem with the quality of the data in this particular column.

From the fact sheet for `Devices.csv`, click on the column **Type** and open details about that column.

![picture_08](./datahub-trial-v2-discovery-part01_08.png)

[VALIDATE_1]

Next also profile the content of the two other files and afterwards take a look at metadata and fact sheet. You will in particular notice that the `Customers.csv` file is complete in terms of the `COUNTRY` column.

[ACCORDION-END]
---
