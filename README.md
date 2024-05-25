## Running the app
## Install Mongorestore for the DB Backup restore command to work
```
$ Follow to this link: https://www.mongodb.com/docs/database-tools/installation/installation-linux/
```
## 1. Using Docker

```bash
$ go into the project directory

# init the docker instance
$ docker-compose up -d

# Load database 
$ npm run import-mongo-database

$ You are now ready to create HTTP requests

# Go to swagger for documentation
$ go to swagger: http://localhost:3000/api

```

## 2. Locally yourself

```bash
$ npm i

$ Start your mongoDB instance on port 27017

# Load database 
$ npm run import-mongo-database

$ npm run start

$ You are now ready to create HTTP requests

# Go to swagger for documentation
$ go to swagger: http://localhost:3000/api
```

## Test
## 1. Run tests in docker
```bash
# After composing deal-app image from running the app in docker
$ start deal-app container

$ Click on subcontainer named Backend

$ Go to the terminal tab

$ Run this command: npm run start
```

## 2. Run tests locally
```bash
# After running deal-app locally
$ Start your mongodb instance on port 27017

$ Go to deal-app project directory

$ Run this command: npm run start
```
