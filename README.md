# Welcome to testGPTW

## How to use this app
1. Clone the project
2. Install the dependencies
* run npm install in the root, authentification and crud directories
3. Create an .env at the root and fill it (use .env.example as an example)
4. Start the app
* Run at the root "npm run dev"

## What it is about ?
This is a technical test to develop two micro service, one is about authentification and the second one is a basic CRUD
* authentification
This is a 3 endpoints API
1. /user
* To post a new user
* To get all users
2. /Login (1st authentification step)
* To log the app: The app will send a 4 digits code to the user email
3. /validation (2nd authentification step)
* To post the 4 digits code and receive the token

* crud
This is a 1 endpoint API
1. To post a new product
2. To get one specific product
3. To get all products
4. To update one specific product
5. To remove one specific product

# How to work in development and production Environment
- In development environment, the microservice will use Environment variables defined in the file .env
- In production environment, the microservice will use Environment variables defined in the production environment (AWS, Heroku…)

* To run in development environment
1. Create and fill a file .env (at the root). One example is available .env.example at the root
2. Execute npm run dev   

* To run in production environment
1. Define the Environment variable in production NODE_ENV = production
2. Define in production environment all Environment variables used by the app (list of is available .env.example at the root)

