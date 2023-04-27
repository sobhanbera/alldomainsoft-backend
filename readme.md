# AllDomainSoft.com Backend Project

### Requirement

Create Node Express JS server. Start the server and have following APIs:

1.  `/populate` **[GET]** : This should perform following data fetch steps in parallel

-   It will get data from the url: https://jsonplaceholder.typicode.com/comments and store it in database

-   It will get csv file from url and save the csv file locally, then read the data from local .csv file and save it in same database. csv file location: http://console.mbwebportal.com/deepak/csvdata.csv

-   Optional (For extra points): Do same steps for a big data file located at: http://console.mbwebportal.com/deepak/bigcsvdata.csv

2. `/search` **[POST]**
    - Take parameters like name, email, body to search from database and return result in json format Blank parameter should return all the results
    - Add ‘limit’ and sort parameters too.

### Pre-requisites

1. NodeJS
2. NPM or Yarn (I am using yarn commands)

### Environment Setup

1. Set env variables in [.env](/.env) file.

```txt
DATABASE_HOST=here_your_database_host
DATABASE_NAME=here_your_database_name
DATABASE_USER=here_your_database_username
DATABASE_PASSWORD=here_your_database_actual_password

PORT = 8000
```

2. Install dependencies

```bash
yarn install
```

3. Start the server

```bash
yarn start
```

4. That's it! You are good to go.

### Solution

1. Added two endpoints `/populate` and `/search` in `index.js` file.

2. `/populate` takes these optional data from header. If the `getfromcsv` is a truthy value then it will store data from the given csv else it will store data from the given url.

```json
getfromcsv: true
```

3. `/search` takes these data from its body and everything is as per requirements above.

```json
{
    "name": "NAME_GOES_HERE",
    "email": "EMAIL_FILTER_GOES_HERE",
    "body": "THE_BODY_GOES_HERE",
    "limit": 25,
    "offset": 1,
    "asc": 1
}
```

-   **`asc`**: You can toggle sorting direction by changing the value of `asc` to `0` or `1`. `1` means ascending and `0` means descending.
-   **`limit`**: You can limit the number of results by changing the value of `limit` to any number you want.
-   **`offset`**: You can offset the results by changing the value of `offset` to any number you want.

### Improvements that could be done

1. We can optimize the queries further so that only single query is executed for each request.
2. I have added [.env](/.env) for environmental setup. In real cases we should ignore this file from git and add it to `.gitignore` file.

##### Thank You!!!
