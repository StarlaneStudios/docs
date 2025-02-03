---
sidebar_position: 1
---

# Installation Guide
This part of the docs is about creating your own instance. If you are just trying to add an existing instance to Transago, you may ignore this step and continue to the next section. Before proceeding to the installation process, it is important to understand how Transago functions. Transago is not a traditional app in the sense that it does not rely on a proprietary backend to function. Our app instead utilizes a pre-configured SurrealDB instance which can be hosted locally / on-site for free or by using cloud hosting provided by [SurrealDB Cloud](https://surrealist.app/referral?code=3osfm8svd71jmp56), which includes a very generous free tier that should be suitable for most users. We will dive more into SurrealDB and how to set it up in the next steps.

# What We'll Cover
Throughout the installation section of these docs, we will cover how to setup your free or paid SurrealDB Cloud instance, walk you through how to configure SurrealDB to be used with Transago, and adding your first instance to Transago.

# What We Won't Cover
This guide will not cover how to setup a SurrealDB instance locally or hosted on your own server since that can vary drastically on each system and your desired setup style. If you want to setup a SurrealDB database locally or on your own server, please follow the steps in the official [SurrealDB Installation Guide](https://surrealdb.com/docs/surrealdb/installation). If you choose to go this route, you can skip to the [Configuring SurrealDB](/transago/installation/configuration) step.