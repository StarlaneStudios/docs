---
sidebar_position: 3
---
# Configuring SurrealDB
This section of the setup process has been deemed as too complicated and will be simplified in a later release. 

Now that you have setup your SurrealDB instance and have connected to it using Surrealist, you are ready to configure your SurrealDB instance to be used with Transago!

## Step 1: Setup your Namespace and Database
At the top of Surrealist, you should see a button which says "Create namespace". Click on this button, and enter `transago`. This is the default value and customizing this value will result in anyone connecting to your Transago instance having to manually change their namespace. Click on create. Now, do the same for the database.

## Step 2: Copy this Schema
Below you will find a SurrealDB schema which will provision your SurrealDB instance so that Transago can connect to it. Copy the contents below and paste them into a new file on your device called `transago.surql`. Don't worry! You won't need to touch much in this file.


```surql
-- ------------------------------
-- OPTION
-- ------------------------------

OPTION IMPORT;

-- ------------------------------
-- ACCESSES
-- ------------------------------
DEFINE ACCESS user ON DATABASE TYPE RECORD
SIGNUP (
    IF (SELECT count() FROM profile) THEN
        CREATE profile SET name = $name, email = $email, password = crypto::argon2::generate($password), role = 'user'        
    ELSE
		CREATE profile SET name = $name, email = $email, password = crypto::argon2::generate($password), role = 'admin'
    END
)
SIGNIN (
	SELECT * FROM profile WHERE email = $email AND crypto::argon2::compare(password, $password)
) WITH JWT ALGORITHM HS256 KEY 'nnuGLb82Y@dmssf$A8P^sm59B' WITH ISSUER KEY 'nnuGLb82Y@dmssf$A8P^sm59B' DURATION FOR TOKEN 4w2d, FOR SESSION 4w2d;

-- ------------------------------
-- TABLE: profile 
-- ------------------------------

DEFINE TABLE profile TYPE NORMAL SCHEMALESS PERMISSIONS FOR select, update WHERE id = $auth.id OR $auth.role = 'admin', FOR create, delete WHERE $auth.role = 'admin';
DEFINE FIELD email ON profile TYPE string ASSERT string::is::email($value);
DEFINE INDEX email ON profile FIELDS email UNIQUE;

-- ------------------------------
-- TABLE bill
-- ------------------------------

DEFINE TABLE bill TYPE NORMAL SCHEMALESS PERMISSIONS FOR select, update, delete WHERE createdBy = $auth.id OR $auth.role = 'admin', FOR create FULL;

-- ------------------------------
-- TABLE: payment
-- ------------------------------

DEFINE TABLE payment TYPE NORMAL SCHEMALESS PERMISSIONS FOR select, update, delete WHERE paidBy = $auth.id OR $auth.role = 'admin', FOR create FULL;
```

## Step 3: Replace the Key
In this file you will see the following string: `nnuGLb82Y@dmssf$A8P^sm59B`. This is a placeholder key which should not be used in production. Replace both occurrances of this key with any random string of characters that you wish. Then, save the file.

## Step 4: Import the Schema
Now that you have saved this schema file with the modified key to your device, return to Surrealist. On the left side of your screen, you will see a button called "Explorer" which has an icon of four squares. Click on this button. Now, you should be brought to a page, and at the bottom you should see an option labeled "Import database". Click on this button, select the file you just created, and then click on "Start Import". You should see three tables created: bill, payment, and profile. If you do not see these, your file is invalid and you should repeat steps 2 and 3. 

## Finished!
Now that you have setup the SurrealDB database to work with Transago, it is time to continue to the next step in which you will add this instance to Transago.