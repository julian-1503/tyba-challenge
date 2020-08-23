# tyba-challenge
Tyba challenge for backend position


## Run

clone the application and cd into the directory `cd tyba-challenge`
to run the app you can either:

### Run manually
1. rename the .env.example file to .env and add the proper values. 
2. run `npm install`
3. run `npm start`

### Run with docker

simply run `docker-compose up`

## Api

- `POST /api/users` allows you to create a new user in the app (AKA register)
- `POST /api/oauth/token` generates a jwt token. you neet to provide an email/password for an existing user.

For the following routes you need to pass the auth token in the Authorization header.

- `GET /api/users` list all users.
- `DELETE /api/users/:id` delete a user.
- `GET /api/users/:id` get a single user.
- `GET /users/:id/transactions` get all transactions for a particular user.
- `GET /restaurants` get all nearby restaurants by city.
