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

## Bug
Currently, the api is experiencing an internal issue that is scheduled for fixing. In the meantime, the /api route is unavailable.

Please use the following endpoints to access the data stored in the api:

GET:

/api/topics : Serves an array of all topics.

/api/users : Serves an array of all users.

/api/articles : Serves an array of all articles, ordered by created_at in descening order, and without the body of the article.

/api/articles/:article_id : Serves an object containing the article associated with the given article_id and the number of comments it has.

/api/articles/:article_id/comments : Serves an array of objects containing the comments associated with the given article_id.

/api/articles? topic query : Allows a user to query the articles and return any articles with a matching topic.

POST:

/api/articles/:article_id/comments : Allows a user to post a comment to a given article by article number.

PATCH:

/api/articles/:article_id : Allows a user to patch the number of votes on an article.

DELETE:

/api/comments/:comment_id : Allows a user to delete a comment by the comment_id.

