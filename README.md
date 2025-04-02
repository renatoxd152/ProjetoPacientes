### Considerations

Open 2 terminals (command-line) for this project, one for backend and other one to frontend.

#### Backend
The backend is in the root folder of the project.

It runs under Node v20 and [nvm](https://github.com/nvm-sh/nvm) can be used to manage Node versions:
```shell
nvm install 20
nvm use 20
```
Install SailsJS Framework in a globally way:
```shell
npm install sails -g
```
Start SailsJS Framework to start backend:
```shell
sails lift
```
#### Frontend
In the second terminal, enter on frontend folder
```shell
cd frontend
```
Set to user Node Node v20 and to start Vue v3 frontend:
```shell
nvm use 20
npm run serve
```

----------------------------------------------------------------
### Some tests for the backend and frontend were configured:

To run the backend tests, be in the main folder of the program and type:
```shell
npm test
```
The backend tests were done in the javascript testing framework called mocha. All endpoints were tested successfully.
In addition, some tests were also done on the frontend. To run the frontend tests, type:
```shell
cd frontend
```
And after that, type:
```shell
npm run test:unit
```
The tests were written using Jest as the testing framework and Vue Test Utils to test Vue components.

### Notes
The project was separated into folders
### In the frontend I created:
* A folder for the modal separated for easy editing in the future.
* I created a folder to separate the patients and place the files correctly. * I only saw the need to use 2 routes that were written in the routes folder, because I thought it would be better for the project.
* In the App.vue file, I improved the navigation bar and added bootstrap to the project. With that, the project has an interface for all types of devices with their respective dimensions.
* I created a separate folder in the main frontend folder, called tests, where the tests I performed on the frontend are located. In addition, I created 2 configuration files, babel.config.js and jest.config.js to configure the framework.
* I created an http folder to separate the application logic. In this folder, there is the base URL of the project that makes the request on the frontend, so just change this URL and the endpoints that are already configured to another backend if necessary, contributing to a better organization in the software.
* And finally, in the services folder, I created the service class, along with the functions of the respective backend endpoints.

### In the backend:
* I created a folder called patient and created the API endpoints in it, I just followed the logic that was at the beginning and created separate files for each endpoint.

### Therefore, the project is very well organized, separated into folders with clean and easy to understand code.

## Backend -  SailsJs - v1.5.14.
This is a [Sails v1](https://sailsjs.com) application

### Documentation

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)

## Frontend - VueJs - v3.0

### Documentation
[Documentation Reference](https://vuejs.org/guide/introduction).


----