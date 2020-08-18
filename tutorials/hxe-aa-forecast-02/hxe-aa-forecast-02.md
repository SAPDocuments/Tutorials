---
title: Create a Multi-Target Application Project and Modules in the Web IDE (Forecast App)
description: Learn how to create a Multi-Target Application Project and link it to your GitHub repository
auto_validation: true
primary_tag: topic>machine-learning
tags: [ tutorial>intermediate, products>sap-hana\, express-edition, topic>machine-learning ]
time: 15
---

## Prerequisites
 - [Use Machine Learning to Build a Forecasting application using the XS advanced development model](https://developers.sap.com/group.hxe-aa-forecast.html)
 - You are familiar with git version management,
 - You have an access to a personal account on [GitHub](https://github.com/).

## Details
### You will learn
- Create a Multi-Target Application Project
- Save your Web IDE project in a GIT repository

[ACCORDION-BEGIN [Step 1: ](Create a GitHub repository)]

Open the GitHub <https://github.com/> home page in your browser and either sign in or sign-up for a new account.

Once logged in, on the top right corner click the ![GitHub](00-github-plus.png) icon, and select **New repository**:

![GitHub](01-01.png)

Enter **`forecast`** as **Repository Name**, check **Initialize this repository with a README**, then click on **Create Repository**.

![GitHub](01-02.png)

Once the repository is created, get the repository web URL from **Clone with HTTS** field by clicking on **Code**.

![GitHub](01-03.png)

Save this URL locally or keep the GitHub repository page open.

Follow the instruction below, then click on **Validate**.

[VALIDATE_1]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 1: ](Set your Preferences)]

Open the Web IDE and login using the `XSA_DEV` credentials.

As a reminder the default URL for the Web IDE is `https://hxehost:53075`.

A link to the Web IDE can also be found on the XSA Controller web page at `https://hxehost:39030`.

In Web IDE switch to the **Preferences** tool using the ![Web IDE Preference](00-preference.png) icon.

### Enable Extensions

Select **Extensions** and turn on the following, if needed:

 - Tools for SAP HANA Database Development
 - Tools for Node.js Development
 - Layout Editor
 - SAP HANA Database Explorer

Click on **Save**. The Web IDE will need to refresh.

![Web IDE](02-01__2020-08-07_15-07-28.png)

#### Set your Git Committer

Click on **Git Committer** and select **Use the following user name and e-mail:**. Enter your Git email address and the user name.

![Web IDE](02-02__2020-08-07_15-16-01.png)

Click on **Save**.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 1: ](Create your project)]

In Web IDE switch to the **Development** tool using the ![Web IDE Development](00-development.png) icon.

![Web IDE](03-01.png)

Open the Project template wizard using the **File > New > Project From Template** menu.

Select **Multi-Target Application Project**, then click on **Next**.

![MTA](03-02.png)

Set your project name to `forecast`, then click on **Next**.

![MTA](03-03.png)

Leave the MTA default details, set the **Space** to **development**.

Click on **Finish**.

![MTA](03-04.png)

Now, right click on the **`forecast`** project folder and select **Build** from the drop down menu or use the **Build** menu to build your project.

The console should output the following:

```
2:35:40 PM (Project Space) Workspace settings set successfully
2:41:13 PM (Builder) Build of /forecast started.
...
2:41:16 PM (Builder) Build of /forecast completed successfully.
```

> ### **Note:**
>If you get the following error: ***Could not start the build because no builder is installed in your space***, it probably mean that the builders are not deployed in the ***development*** space.
>&nbsp;
>You will need to complete the first step (Verify the builders deployment) from the [***Check your environment*** tutorial](https://developers.sap.com/tutorials/hxe-aa-forecast-01.html).

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 1: ](Initialize your local repository)]

Before linking your project to your GitHub repository, you will need to initialize a local repository.

Right click on the `forecast` project and select **Git > Initialize Local Repository**.

![Web IDE](04-01.png)

The console should output the following:

```
...
2:40:14 PM (git) Project : Initialize repository completed successfully
```

Right click on the `forecast` project and select **Project > Project Setting**.

You should see the new **Git Repository** section added there under **Project** category. Make sure the **`user.email`** is not set to `null`. If so, update the value with your email address.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 1: ](Set the Git Remote URL)]

Right click on the **`forecast`** project and select **Git > Set Remote**.

![Web IDE](05-01__2020-08-07_15-31-41.png)

Enter the URL of previously created GitHub `forecast` repository , and click on **OK**.

![Web IDE](05-02.png)

Enter your GitHub credentials, if requested, and click on **OK**.

> ### **Note:**
> Make sure you use a **token authentication**, if a two-factor authentication is enabled in your GitHub account!

![Web IDE](05-03.png)

Click on **OK** on the **Changes Fetched** window.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step 1: ](Commit your changes)]

On the icon bar located on the right side of the Web IDE, click on the **Git Pane** icon ![Web IDE](00-webide-git.png).

![Web IDE](06-01.png)

Click on **Pull** ![Web IDE](00-webide-git-pull.png).

Click on **Stage All**, enter a **Commit message** `initial commit`, then click on **Commit and Push > origin master**.

[DONE]
[ACCORDION-END]
