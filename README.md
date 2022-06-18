# api
The api behind the MuniBoard App

This api lets you create municipalities and post ideas and other general info on those municipalities.

The root of the api is at https://muniboardapi.herokuapp.com/

Consult the [API Documentation](https://muniboardapi.herokuapp.com/api-docs/) for more info on how to use each api request.

Consult the [Wiki](https://github.com/MuniBoard/api/wiki) for more information about the api.

## How to contribute

### To be able to contribute : 

#### Install the project
1. Clone this git repository
2. Run ```npm install```

#### Run one of the development scripts in package.json :
- ```dev``` is to run the app on your local machine and interact with it locally
- ```start``` is the script that Heroku uses to run the api
- ```build``` creates build files in /build and applies prettier linting
- ```test``` runs the jest tests that are used to make sure the application is working properly
- ```build:test:and:dev``` runs ```build```, ```test``` and ```dev``` one after the other

#### Make your changes to the project
- Your changes need to be covered by the jest tests to make sure that when other people contribute, they can easily fix broken features
- Document the api when you add requests

### Heroku deployment

Heroku deployment is automatically done when pushing to the main branch, so be careful of what you push into the main branch in order to not break the production api.
