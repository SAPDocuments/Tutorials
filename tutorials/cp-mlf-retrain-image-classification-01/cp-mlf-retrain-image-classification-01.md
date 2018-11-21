---
title: Prepare your Dataset for the Image Classification Retraining scenario
description: Discover how to prepare your dataset for the SAP Leonardo Machine Learning foundation Image Classification Retraining scenario
auto_validation: true
time: 15
tags: [tutorial>beginner, topic>cloud, topic>machine-learning, products>sap-cloud-platform, products>sap-cloud-platform-for-the-cloud-foundry-environment]
primary_tag: products>sap-leonardo-machine-learning-foundation
---

## Prerequisites
 - [Download and Install Python](https://www.python.org/downloads/)

## Details
### You will learn
  - Where to download and how to install `Minio` Client
  - How to connect `Minio` Client to your SAP Leonardo Machine Learning foundation storage area

[ACCORDION-BEGIN [Step](The Image Classification Dataset)]

Before you can start with the Image Classification retraining process, you'll need a set of labeled images to retrain the existing model with new classes.

The training data needs to be structured into 3 folders: ***training***, ***validation*** and ***test*** with the following split:

 - training: 80%
 - validation: 10%
 - test: 10%

As the classification categories are derived automatically from the training data and used as output categories for the retrained model, you will need to create a dedicated folder for each category as below:

```
+-- <dataset name>/
    +-- training/
        +-- <category name 1>/<image files>
        +-- <category name 2>/<image files>
        .
        +-- <category name N>/<image files>        
    +-- test/
        +-- <category name 1>/<image files>
        +-- <category name 2>/<image files>
        .
        +-- <category name N>/<image files>  
    +-- validation/
        +-- <category name 1>/<image files>
        +-- <category name 2>/<image files>
        .
        +-- <category name N>/<image files>  
```

You could potentially prepare your own set of labelled images, but to keep it simple, you will reuse the images used in the [How to Retrain an Image Classifier for New Categories](https://www.tensorflow.org/tutorials/image_retraining) tutorial from the TensorFlow website.

It contains flower photos available under the creative-commons license.

[DONE]
[ACCORDION-END]

[ACCORDION-BEGIN [Step](Download and install Python)]

In order to download and prepare the image dataset, a Python script example will be provided, therefore you will first need to [download and install Python](https://www.python.org/downloads/).

Once Python is installed, you might need to install the following packages using the following `pip` command:

Open a terminal console.

Execute the following command

```shell
pip install wget numpy
```

Now, execute the following command to validate that Python is properly installed:

```shell
python -V
```

Provide an answer to the question below then click on **Validate**.

[VALIDATE_1]
[ACCORDION-END]

[ACCORDION-BEGIN [Step](Download and prepare the training dataset)]

You can now save the below Python script then run it as a Python script.

Save the below Python script in a file named **`prepare_data.py`**:

```python
import os
import shutil
import wget
import tarfile
import numpy as np

# cleanup before starting
if os.path.exists('./flower_photos.tgz'): os.remove('./flower_photos.tgz')
shutil.rmtree('./flower_photos', ignore_errors=True)
shutil.rmtree('./flowers', ignore_errors=True)

# download the dataset file with flowers
archive = wget.download('http://download.tensorflow.org/example_images/flower_photos.tgz')

# extract the tar file content
archivetar = tarfile.open(archive, "r:gz")
archivetar.extractall()
archivetar.close()

# fill the data directory with 10 files for try, 90% of the remainder for training, 5% for validation and 5% for test
flowerdirs = ['daisy', 'dandelion', 'roses', 'sunflowers', 'tulips']
targetdirs = ['training', 'validation', 'test']
targetdirs_split = [.8, .5, 1]

for flowerdir in flowerdirs:
    # list all files in dir
    files = [f for f in os.listdir('./flower_photos/' + flowerdir)]

    # create the try directory
    os.makedirs('./flowers/try/' + flowerdir)

    # move file to the try directory
    random_files = np.random.choice(files, 10)    
    for idx_fname, fname in enumerate(random_files):
        ffname = os.path.join('./flower_photos/' + flowerdir, fname)
        shutil.move(ffname, './flowers/try/' + flowerdir)
        files.remove(fname)

    # for targetdir in targetdirs:
    for idx_targetdir, targetdir in enumerate(targetdirs):
        # create the data directory
        os.makedirs('./flowers/' + targetdir + '/' + flowerdir)

        # move file to the targetdir directory
        random_files = np.random.choice(files, int(len(files) * targetdirs_split[idx_targetdir]), replace=False)
        for fname in random_files:
            ffname = os.path.join('./flower_photos/' + flowerdir, fname)
            shutil.move(ffname, './flowers/' + targetdir + '/' + flowerdir)
            files.remove(fname)

if os.path.exists('./flower_photos.tgz'): os.remove('./flower_photos.tgz')
shutil.rmtree('./flower_photos', ignore_errors=True)
```

Then run it as a Python script from your terminal console using the following command:

```shell
python prepare_data.py
```

It will download the `flower_photos.tgz` file locally, extract its contents then split it into the ***training***, ***validation***, ***test*** sample.
It will also create an addition directory (the ***try*** folder) for you to use later when testing your retrained model.

Provide an answer to the question below then click on **Validate**.

[VALIDATE_2]
[ACCORDION-END]
