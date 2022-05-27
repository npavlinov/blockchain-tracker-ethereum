## Prerequisites

Docker compose file is provided in the repository, otherwise you need Postgresql installed.

## In order to launch the API: 

1. Copy .env.example and fill infura credentials
2. Run:
  ```
  npm(yarn) install

  npm(yarn) run migration:up // migrate db

  npm(yarn) run start:dev // start nest server

```
## CRUD routes

The API exposes the following routes:

```
GET /configurations
GET /configurations/:id
POST /configurations
PATCH /configurations/:id
DELETE /configurations/:id
```

## Payload for creating a configuration is:

```
fromAddress?: string;
toAddress?: string;
value?: number;
hash?: string;
age?: Date;
```
