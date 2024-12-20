## Paire de clé pour JWT

```bash
# clé privée
$ openssl genpkey -algorithm RSA -out jwt/private.pem -pkeyopt rsa_keygen_bits:2048

# clé publique
$ openssl rsa -pubout -in jwt/private.pem -out jwt/public.pem


## Installation

```bash
$ npm install
```

## Running the app

```pm2
$ pm2 stop api-bbapp
$ pm2 start ecosystem.config.cjs
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
