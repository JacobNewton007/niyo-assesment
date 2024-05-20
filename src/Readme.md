# NIYO API

## Description 



## Tech Stack

- [Nest.js](https://nestjs.com/) as the Node.js framework
- [Db-migrate](https://db-migrate.readthedocs.io/en/latest/) for database database migration
- [Pg-Promise](https://github.com/vitaly-t/pg-promise) for database access
- Swagger for API documentation from Nest.js. See [documentation on nest.js website](https://docs.nestjs.com/openapi/introduction)
  - Used the nest-cli plugin as well to avoid redundant decorators
- Compodoc for application code documentation. See [documentation here]

## Links


1. Access the Swagger documentation at `{BASE_URL}/api`
2. You can also get the json version of the Swagger API docs at `BASE_URL/api-json`. This URL can be used to import the entire API into a postman collection


## Installation

```bash
-- run yarn to install all the dependency
$ yarn 
```

## Running the app

```bash
$ yarn add db-migrate-pg -g 

#Create a database 
$ psql 
$ CREATE DATABASE niyo_db;

# migrate up
$ yarn migrate:up 

# migrate down
$ yarn migrate:down

# seed up
$ yarn seed:up

# seed down
$ yarn seed:down
```

```bash
# development without docker
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Testing

```bash
# All tests
$ yarn run test

# Unit tests
$ yarn run test:unit

# Integration tests
$ yarn run test:integration

```

## Architectural Overview

The following things should be noted and adhered to when working on this API:

1. Follow the existing modular structure, and create new modules/sub-modules when it makes sense.

2. **Controllers** are to be "lean" i.e they are primarily for request validation (done by a combination of DTOs and the class-validator package), and routing requests to the appropriate business domain/service classes.

3. **Service** classes should handle all the custom business logic, but should **NEVER** directly interact with the database.

4. **Repository** classes are used to interact with the dataase via

5. **Ensure** you follow a Test driven approach, and at least write E2E tests to validate that the APIs defined in the controllers work as expected.

6. Automatic linting/error checking has been setup when making commits/pushes to the remote repository, **ENSURE** you fix any reported issues before attempting a push.

7. **NEVER** create a function without adding a documentation block for it, especially controller functions, as the doc blocks there are used in the swagger API documentation.


## Tools Used

- Db migrate
- Pg Promise