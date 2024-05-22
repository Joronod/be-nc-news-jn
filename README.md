In order to use this repo, you will need to create enviroment variables.

To do this, you will need to install `dotenv` by running :
``` 
npm install dotenv --save
```
This will handle the configuration of environmental variables.

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