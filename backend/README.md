# Backend

This implementation is for NodeJS based on [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) and uses [mongoose](https://mongoosejs.com/) as the ODM.

## Project setup
```
npm install
```

### Before startup 
Setup a .env file with the following variables, e.g.:

```
MONGO_URL = mongodb+srv://<username>:<password>@cluster0.abcdc.mongodb.net/dbname

Three different organization variables(only use one per instance)
ORG_ID = 50acad70-42ae-11ed-9419-f17976354230
ORG_ID = 1ad7b1c0-42c4-11ed-a805-bb9eeb9a45bd
ORG_ID = 3c3c6e50-42c4-11ed-b715-0d8c70bb56bc

also change port number in app.js for each instance
PORT = 3000
PORT = 3001
PORT = 3002
```

### Compiles and hot-reloads for development
```
npm start
```
### API Documentation for all API routes
```
https://documenter.getpostman.com/view/17571565/2s83zfRQvs
```
### Link for Mongo Atlas connection
```
mongodb+srv://TestUser:TestPassword@cluster0.dmsz3xp.mongodb.net/test
```
The Mongo Atlas has data already in it but If you would like to run a local instance, that is also fine.
