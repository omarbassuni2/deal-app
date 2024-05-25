## Running the app
## 1. Using Docker

```bash
$ go into the project directory

# init the docker instance
$ docker-compose up -d

# Load database 
$ npm run import-mongo-database

# Go to swagger 
$ go to swagger: http://localhost:3000/api 
```

## 2. Using MongoDB and NestJs

```bash
$ Start your mongoDB instance

# Load database 
$ npm run import-mongo-database

$ npm run start

# Go to swagger 
$ go to swagger: http://localhost:3000/api 
```

## Test

```bash
# unit tests
$ npm run test
```
