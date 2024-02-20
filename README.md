# User management API

## Description

[Nest](https://github.com/nestjs/nest).js API to manage users in database. See demo [here](https://user-management-backend-steel.vercel.app/api/v1/docs)

## Installation

```bash
$ npm install
```

## Configuration

See the `.env.example` file for the environment variables that need to be set.

## Database

Set the `MONGO_URL` environment variable to the connection string of your MongoDB database or use Docker Compose to set up database on localhost.


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# Docker
$ docker compose up -d
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

[MIT licensed](LICENSE).
