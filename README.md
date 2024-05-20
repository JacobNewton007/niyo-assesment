<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description



## Tech Stack

- [Nest.js](https://nestjs.com/) as the Node.js framework
- [Db-migrate](https://db-migrate.readthedocs.io/en/latest/) for database database migration
- [Pg-Promise](https://github.com/vitaly-t/pg-promise) for database access
- Swagger for API documentation from Nest.js. See [documentation on nest.js website](https://docs.nestjs.com/openapi/introduction)
  - Used the nest-cli plugin as well to avoid redundant decorators
- Compodoc for application code documentation. See [documentation here]

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
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
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
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


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
