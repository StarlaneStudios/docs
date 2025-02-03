---
sidebar_position: 2
---
# Add an Instance
This section will guide you through the process of adding an instance to Transago. 

## Step 1: Locate Your Hostname / Server IP
If you are trying to connect to an instance that you did not create, you can ignore this step of the process and find the URL provided by your Transago administrator. Otherwise, continue reading.

If you are continuing here from the last step or have already setup your SurrealDB Cloud instance, you can find your hostname by clicking on Surreal Cloud at the top left of the Surrealist page, navigating to the Instances tab, clicking on the three vertical dots next to the instance you have created, and clicking copy hostname. If you are hosting your own SurrealDB instance, you should locate your server's IP or local IP as well as the port your SurrealDB instance is running on.

If you are using SurrealDB Cloud, your hostname should look something like this:

`some-instance-gh98y498hq2347234q.aws-use1.surreal.cloud`

If you are hosting your own SurrealDB, your hostname should look something like either of these below:

`111.111.111.111:8000` OR
`transago.example.com`

## Step 2: Adding to Transago
Head over to your Transago app or head to [transago.app](https://transago.app/). Click on add an instance, then paste the URL you retreived above. If you aren't using SurrealDB Cloud, you may need to change the wss:// to ws:// depending on if you have a SSL certificate for your instance. If you are unsure what this means, it likely means you don't need to do this. Click on Create.

## Step 3: Setting a Name
You will be prompted to name your instance. This name is only visible to you and won't be visible to anyone else.

## Step 4: Configuring a Custom Namespace and Database (Advanced)
If your SurrealDB instance doesn't use the default namespace "transago" or database "transago", you will need to click on advanced options and enter the namespace and databse that you provided when setting up your SurrealDB instance. Otherwise, you can skip this step and leave the defaults.

## Step 5: Register an Account
You will now be asked to register a new user account. Enter your name, email, and password then click on continue. This will be the login that you use to login to Transago from now on. 

## Finished!
You have now added your first instance to Transago and are ready to begin using it!