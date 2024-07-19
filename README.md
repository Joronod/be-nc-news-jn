# NC News API

Welcome to the NC News API, a RESTful API for interacting with articles, as well as associated users, topics and comments. This API was built using Express and PostgreSQL.

## Hosted Version

```
https://be-nc-news-jn.onrender.com/api
```

## Summary

This project is a backend application that serves endpoints for articles, comments, topics, and users. The API supports CRUD operations and handles various query parameters for filtering and sorting the data.

Refer to the endpoints.json file for a detailed list of available endpoints and their respective descriptions.

## Setup

Begin by cloning the repository.
```
git clone https://github.com/your-username/nc-news-api.git
```

In order to use this repo, you will need to create enviroment variables.

To do this, you will need to install the dependencies by running :
``` 
npm install
```
Once this is done, you will need to create two files in the main be-nc-news repo. Each one will contain one variable.

The first file will be called `.env.development` and will contain the following:
```
PGDATABASE=nc_news
```

The second file will be called `.env.test` and will contain the following:

```
PGDATABASE=nc_news_test
```
Ensure **not** to include a semi-colon at the end of these paths, as this will prevent the databases being read.

To seed the local database, run:
```
npm run seed
```

To run any tests, please use

```
npm run test
```

You will need:
* Node.js: v14.x or higher
* PostgreSQL: v12.x or higher

