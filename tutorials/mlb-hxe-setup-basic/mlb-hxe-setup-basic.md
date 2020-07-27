---
title: Prepare Your SAP HANA, express edition Instance for Machine Learning
description: Check that your instance is properly configured and meets the minimum requirements to execute built-in Machine Learning algorithms.
auto_validation: true
primary_tag: topic>machine-learning
tags: [ tutorial>intermediate, topic>machine-learning, products>sap-hana\, express-edition, products>sap-hana ]
time: 10
---

## Prerequisites  
- [Select and Install a SQL query tool for SAP HANA, express edition](https://developers.sap.com/tutorials/mlb-hxe-tools-sql.html).

## Details
### You will learn
In this tutorial, you will enable your SAP HANA, express edition instance to use the Machine Learning libraries available and verify that your system meets the minimum requirements.

[ACCORDION-BEGIN [Info: ](Which SAP HANA flavor and version?)]

In order to complete this tutorial series, you need to use as a minimum version:

 - **SAP HANA, express edition 2.0 SPS03**

This version will allow you to complete all the steps described in the series.

As you may already know, SAP HANA, express edition comes in two different flavors.

In this series, you will be leveraging the SAP Web IDE to complete both the execution of SQL and SAP HANA XSA development tasks. Therefore, you will need:

 - **Server only**

If you don't have an instance up and running, be aware that you don't need to complete the installation of all optional packages (this will be described when needed).

You can check the [SAP HANA, express edition installation](https://developers.sap.com/topics/hana.html) to find all the installation details.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Prerequisite: ](Install a SQL query tool)]

In order to interact with your SAP HANA, express edition instance, you will be running a series of SQL statement.

As a number of options are available, you can check the following link: [Install a SQL query tool for SAP HANA, express edition](https://developers.sap.com/tutorials/mlb-hxe-tools-sql.html).

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 1: ](Check your tenant database)]

In earlier release of SAP HANA, express edition, the HXE tenant didn't exist or was not started by default.

Connect to the **SYSTEMDB** using the **SYSTEM** user credentials and execute the following SQL statement:

```sql
SELECT DATABASE_NAME, DESCRIPTION, ACTIVE_STATUS, RESTART_MODE FROM SYS.M_DATABASES ORDER BY 1;
```

The result should return:

|---------------------|-----------------------|---------------------|--------------------|
| **`DATABASE_NAME`** | **`DESCRIPTION`**     | **`ACTIVE_STATUS`** | **`RESTART_MODE`** |
| `HXE`               | `HXE-90`              | `YES`               | `DEFAULT`          |
| `SYSTEMDB`          | `SystemDB-HXE-90`     | `YES`               | `DEFAULT`          |

If the **HXE** tenant is not listed, you can run the following statement to create it:

```sql
CREATE DATABASE HXE SYSTEM USER PASSWORD <password>;
```

If the **HXE** tenant is listed, but with the **`ACTIVE_STATUS`** set to **NO**, then you can run the following statement to start it:

```sql
ALTER SYSTEM START DATABASE HXE;
```

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 2: ](Enable the Script Server)]

The **Script Server** is an auxiliary service that is required to execute **Application Function Libraries** (**AFL**).

For example, this applies to the SAP HANA AFL component like the ***SAP HANA Predictive Analysis Library*** (PAL) and other similar libraries.

By default, the Script Server is not activated on the **HXE** tenant.

Connect to the **SYSTEMDB** using the **SYSTEM** user credentials and execute the following SQL statement:

```sql
ALTER DATABASE HXE ADD 'scriptserver';
```

Now, you can now verify that the service is started;

Connect to the **HXE** tenant using the **SYSTEM** user credentials and execute the following SQL statement:

```sql
SELECT SERVICE_NAME, PORT, ACTIVE_STATUS FROM SYS.M_SERVICES ORDER BY 1;
```

The result should return a list of service names, their associated port numbers and their statuses:

Provide an answer to the question below then click on **Validate**.

[VALIDATE_1]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 3: ](Check the installed AFL libraries)]

SAP HANA, express edition is setup by default with a series of AFL pre-installed.

Connect to the **HXE** tenant using the **SYSTEM** user credentials and execute the following SQL statement:

```sql
SELECT * FROM SYS.AFL_PACKAGES;
```

The pre-installed AFL includes:

 - ***Business Function Library (BFL)***: contains pre-built parameter-driven functions in the financial area
 - ***Predictive Analysis Library (PAL)***: defines functions that can be called to perform analytic algorithms.
 - ***Optimization Function Library (OFL)*** : defines a series of optimization function like Simplex

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 4: ](Create a dedicated user)]

In order to perform your Machine Learning activities, it is recommended to create a dedicated user account on your SAP HANA, express edition instance.

Connect to the **HXE** tenant using the **SYSTEM** user credentials and execute the following SQL statement:

```sql
-- Uncomment this if you want to start from scratch
-- DROP USER ML_USER CASCADE;

CREATE USER ML_USER PASSWORD Welcome19Welcome19;

-- Use this if you don't want to be forced to update your password on the first connection.
-- CREATE USER ML_USER PASSWORD Welcome19Welcome19 NO FORCE_FIRST_PASSWORD_CHANGE;
-- or
ALTER USER ML_USER DISABLE PASSWORD LIFETIME;

GRANT AFLPM_CREATOR_ERASER_EXECUTE TO ML_USER;
GRANT AFL__SYS_AFL_AFLPAL_EXECUTE TO ML_USER;
GRANT DATA ADMIN TO ML_USER;
GRANT IMPORT TO ML_USER;

GRANT EXECUTE on _SYS_REPO.GRANT_ACTIVATED_ROLE TO ML_USER;
```

Connect to the **HXE** tenant using the **`ML_USER`** user credentials (default password is ***`Welcome19Welcome19`*** )

> You should be prompted to update you password on the first connection.
&nbsp;


```sql
SELECT * FROM SYS.PROCEDURES WHERE SCHEMA_NAME = '_SYS_AFL';
```

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 5: ](Create a dedicated schema)]

In order to perform your Machine Learning activities, it is recommended to create a dedicated schema that will host your data sets on your SAP HANA, express edition instance.

Connect to the **HXE** tenant using the **`ML_USER`** user credentials and execute the following SQL statement:

```sql
-- Uncomment this if you want to start from scratch
-- DROP SCHEMA ML_DATA CASCADE;

CREATE SCHEMA ML_DATA;
SET SCHEMA ML_DATA;
```

Execute the following SQL and provide an answer to the question below then click on **Validate**.

```sql
SELECT CURRENT_USER || ' / ' ||  CURRENT_SCHEMA FROM DUMMY;
```

[VALIDATE_2]
[ACCORDION-END]
