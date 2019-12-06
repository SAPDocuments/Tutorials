---
title: Store Sensor Data in Cloud Storage in SAP Data Hub, Trial Edition
description: Use Cloud Storage to store sensor data by using SAP Data Hub, trial edition.
auto_validation: true
primary_tag: products>SAP-data-hub
tags: [  tutorial>beginner, topic>big-data, products>SAP-data-hub, products>SAP-vora ]
---

## Details
### You will learn  
- How to store sensor data in **`CLOUD_STORAGE`**
- How to use the operators **Write File** and **Read File**

Please note that this tutorial is similar to the `Store sensor data in HDFS` tutorial from [SAP Data Hub, developer edition tutorial group](https://developers.SAP.com/group.datahub-pipelines.html).
Also note here in this tutorial GCP refers to Google Cloud platform and AWS refers to Amazon Web Services, Azure refers to Microsoft Azure.

### Time to Complete
**30 Mins**

---

[ACCORDION-BEGIN [Step 1: ](Collect GCS or AWS S3 or Azure WASB Details)]
The SAP Data Hub, trial edition is deployed on AWS EKS, Google Cloud Platform or Microsoft Azure platform. Therefore we will use AWS S3 or Google Cloud Storage or Windows Azure Storage Blob for storing sensor data. You can note down the name of the bucket by going to the Connection Management in SAP Data Hub , clicking on **`CLOUD_STORAGE`**, on the `Edit` button under `Action` and looking at the ROOT PATH. Bucket name is required when you use the operators **Write File** and **Read File**.

[DONE]

[ACCORDION-END]

[ACCORDION-BEGIN [Step 2: ](Add and configure Write File Operator)]

Open the pipeline which you have created in the [previous tutorial](datahub-trial-v2-pipelines-part01) `(test.myFirstPipeline)`, in the modelling environment. To access the SAP Data Hub Launchpad in AWS or GCP or Azure you need go to the chapters 3.3 and 3.4 as described in the [Getting Started with SAP Data Hub, trial edition] (https://caldocs.hana.ondemand.com/caldocs/help/8772c957-0de5-459b-b98a-27180932f0da_Getting_Started_Guide_v28.pdf) guide. From SAP Data Hub Launchpad you could access the SAP Data Hub Modeler.

>As the above URL is a local URL, it will be accessible only if you are doing the tutorials and have already configured the hosts file. If not, please refer to [Getting Started with SAP Data Hub, trial edition 2.5](https://caldocs.hana.ondemand.com/caldocs/help/8772c957-0de5-459b-b98a-27180932f0da_Getting_Started_Guide_v28.pdf) guide.

>**Attention (only relevant for Microsoft Azure)**: Due to a bug in SAP Data Hub, the **Write File** operator (as well as the **Read File** operator) has a problem with the `CLOUD_STORAGE` connection used in SAP Data Hub, trial edition. To avoid this problem, please open **Connection Management** via the SAP Data Hub Launchpad. Edit the `CLOUD_STORAGE` connection and maintain the **Endpoint Suffix** as `core.windows.net`. Save the connection. Then continue with this tutorial.

Now drag and drop **Write File** operator to the existing graph, and connect output port of the `Data Generator` to the `inFile` input port of the **Write File**

![picture1](datahub-trial-v2-pipelines-part02-1.png)

Configure the **Write File** operator by maintaining the following properties :

|  Field Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     | Value
|  :------------- | :-------------
| service  | `GCS or S3 or WASB`
| connection | Check the connection specific details after this table
|  path  | `sensordata/file_<counter>.txt`

> **Attention**: do **not** put a leading `/` in front of the path. On some platforms this can create problems (planned to be fixed with a future release).

To specify connection details you can utilize the connections established in the Configuration Manager .

In case you are willing to re-use the Configuration Manager connections, click on the **Connection** input field and select **Configuration Type** as **Configuration Manager** and select the desired connection from the **Connection ID** dropdown box.

The **Write File** operator will write the received data to files in the `sensordata` directory in the specified GCS or AWS S3 bucket or Azure container. The files follow the scheme `file_<counter>.txt` (where counter is an incremental integer).

[DONE]

[ACCORDION-END]


[ACCORDION-BEGIN [Step 3: ](Add and configure Read File Operator)]

Now drag and drop **Read File** operator to the existing graph `(test.myFirstPipeline)`. Then connect `outFile` output port of the **Read File** operator to the `inMessage` input port of the `ToString Converter`, and connect output port of the `ToString Converter` to **Terminal**.

![picture2](datahub-trial-v2-pipelines-part02-2.png)

Configure the **Read File** operator by maintaining the following properties :

|  Field Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     | Value
|  :------------- | :-------------
| service  | `GCS or S3 or WASB`
| connection | Use the same method as Read File operator that is described in previous step
|  path  | `sensordata/`
|  `only Read On Change`  | True
|  `Terminate on Error`  | True (set this to False if you are using WASB connection)

Afterwards click **Save**.

[DONE]

[ACCORDION-END]

[ACCORDION-BEGIN [Step 4: ](Execute the data pipeline)]

Click **Run** to execute the pipeline

When the **Status** tab indicates that the pipeline is running, use the context menu **Open UI** of the **Terminal** operator to see the generated sensor data.

![picture3](datahub-trial-v2-pipelines-part02-3.png)

In contrast to the previous tutorial, this time the generated sensor data is not sent from the **Data Generator** operator to the **Terminal** operator directly, but via **GCS or AWS S3 or WASB**. Hence the **Terminal** also shows you information about the created files.

For GCP open [http://console.cloud.google.com](http://console.cloud.google.com) and navigate to **GCP Left menu** > **Storage** > **Browser** > **Your Bucket name** > `sensordata folder`. The longer the pipeline runs, the more files you will find there.

![picture4](datahub-trial-v2-pipelines-part02-4.png)

For AWS open [https://s3.console.aws.amazon.com](https://s3.console.aws.amazon.com) and navigate to **Search for Buckets** > **Your Bucket name** > `sensordata folder`. The longer the pipeline runs, the more files you will find there.

![picture4](datahub-trial-v2-pipelines-part02-5.png)

For Azure open [https://portal.azure.com/](https://portal.azure.com/) and navigate to **Storage accounts** > **filter your Storage account** > **Blob service** > **click Blob** > **Your Container name** > `sensordata folder`. The longer the pipeline runs, the more files you will find there.

![picture4](datahub-trial-v2-pipelines-part02-6.png)

Open the output **Terminal**. Copy any row from the output and paste it in the frame below and click on **Submit Answer**.

[VALIDATE_1]

Stop the pipeline by clicking **Stop**.

[ACCORDION-END]

---
