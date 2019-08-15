---
title: SAP TechEd, Connect to SAP Web IDE and clone a project
description: Log in to SAP Cloud Platform and use SAP Web IDE to clone a project into your workspace
auto_validation: true
time: 10
tags: [ tutorial>beginner, products>sap-cloud-platform--sap-hana-service, products>sap-web-ide]
primary_tag: products>sap-hana
---

## Prerequisites
 - You are at the Developer Garage and your workstation has a number assigned to it

## Details
### You will learn
  - How to log in to SAP Web IDE
  - How to clone a pre-configured project and edit it to create your own application

**This mission can only be completed at SAP TechEd.**

---

[ACCORDION-BEGIN [Step 1: ](Log in to the SAP Community)]

Register or log in to the SAP Community. This will allow you to track progress of the tutorials and earn prizes at the Developer Garage

![Log on](zoomlogin.gif)

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 2: ](Log in to SAP Cloud Platform)]

Open a new incognito window in Google Chrome

![Log in to SCP](1.png)

Navigate to [https://account.hana.ondemand.com/](https://account.hana.ondemand.com/). Click **Log in**

![Log in to SCP](2.png)

You will find a number assigned to your terminal at the App Space

Use the following email. **Replace the XXX placeholder with the number assigned to your terminal**.

```text
dat365-XXX@teched.cloud.sap
```


Use the password **Welcome19**

![Log in to SCP](3.png)

[DONE]
[ACCORDION-END]


[ACCORDION-BEGIN [Step 3: ](Open SAP Web IDE)]

Navigate into the global account

![Log in to SCP](4.png)

Then into the **Neo** subaccount

![Log in to SCP](5.png)

In **Services**, click on **SAP Web IDE Full-Stack**

![Log in to SCP](6.png)

Click **Go to Service**

![Log in to SCP](7.png)

SAP Web IDE Full-Stack will open in a new window. Log in with the same credentials if prompted:

User:
```text
dat365-XXX@teched.cloud.sap
```

Password: Welcome19

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 4: ](Clone a project)]

If you see any open tabs, **close them**

![Log in to SCP](8.png)

If you see an existing project, remove it by right-clicking on it and choosing **Edit -> Delete**

![Log in to SCP](9.png)

Right-click on the workspace and choose **Git -> Clone repository**

![Log in to SCP](10.png)

Clone the following repository

```text
TBC - pending approval
```

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 5: ](Configure the project for your user)]

Expand the contents in the project. Right-click on the file `mta.yaml` and choose **Open Code Editor**

![Edit yaml](11.png)

Press **`CTRL+H`** and paste the following in the **Search for** input:

```text
<<XXX>>
```
![Edit yaml](12.png)

Enter your assigned number in the **Replace with** box. **Remember to include the leading 0** if you have one.

![Edit yaml](13.png)

Click **Replace All**

![Edit yaml](14.png)


[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 6: ](Build the project)]

Right-click on the **`db`** module and choose **Build**

![Edit yaml](16.png)

Check the last two lines of the build log to complete the validation below.

![Edit yaml](18.png)


[VALIDATE_1]
[ACCORDION-END]


---
