## Running the app
## 1. Using Docker

```bash
$ go into the project directory

# init the docker instance
$ docker-compose up -d

# Load database 
$ npm run import-mongo-database

$ You are now ready to create HTTP request

# Go to swagger for documentation
$ go to swagger: http://localhost:3000/api

```

## 2. Using MongoDB and NestJs

```bash
$ Start your mongoDB instance

# Load database 
$ npm run import-mongo-database

$ npm i

$ npm run start

$ You are now ready to create HTTP request

# Go to swagger for documentation
$ go to swagger: http://localhost:3000/api
```

## Test
## 1. Run tests in docker
```bash
# After composing deal-app image from running the app part
$ start deal-app container

$ Click on subcontainer named Backend

$ Go to Terminal tab

$ Run this command: npm run start
```

## 2. Run tests locally
```bash
# After running deal-app locally
$ Start your mongodb instance
$ Go to deal-app project directory
$ Run this command: npm run start
```
