## About

Agra College (Session 2022-23) : Front-End (Client / Student Side)

## Quick start

- npm install

- npm run local-dev-start

## Configure Port

Go to "webpack.config.js" (Line No. 121)
Just change the "port" to your desired value.

## Create Build Across Envs

npm run build:test (For TEST environment)

npm run build:production (For PRODUCTION environment)

## About Secrets

All the Envs Variables / Secrets are stored under the "config" folder.
According to the environments name.

E.g.
config/<env>.js
--> develop.js
--> test.js
--> production.js

(Contact ADMIN to get the secrets info)
