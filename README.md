# Perennial

A [Nashville SoftWare School Cohort 38](https://github.com/nss-day-cohort-38) front end capstone project by [Sofia Candiani](https://github.com/sncandiani/).

## Overview

A site wherein users can keep track of their personal gardens through a community created plant database.


## Purpose
* Manage current, past, and future gardens 
* Contribute to a larger source of information on plants 
* Learn more about plants simple searches

## React Technologies Incorporated

* Bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
* Hooks, state, props, routes, components, modules
* [Reactstrap](https://reactstrap.github.io/)
* [Reactrouter](https://reacttraining.com/react-router/)

## Other Technologies Incorporated
* Firebase for authentification
* JSON Server for data storage
* Javascript
    * Functions
    * Arrays
    * Mapping
    * Filtering
* API calls which include: POST, PUT, DELETE, and GET (with expand, embed)
* Semantic HTML
* Valid HTML5
* CSS4
* Modules

## Local Setup 
In order to test locally, the following steps are recommended: 
1. git clone git@github.com:sncandiani/perennial.git && cd perennial
2. npm install
3. npm start
In a seperate tab or window: 
4. cd into /src/api
5. json-server -p 8088 -w database.json