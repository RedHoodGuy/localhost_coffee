This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

In order to install this app locally, take the following steps:

- Ensure you have a postgres database running, check `.env` for connection details
- In a terminal in the project directory, run `make db-setup`
- Run `yarn dev` or `npm run dev` to start the server
- Visit `localhost:3000` in your browser

## Running and creating migrations

There are two commands for migrations:

- `make migrate` will run any outstanding migrations that were not run on your system. Use this after pulling from a branch with new changes in order to update your database and the Prisma client.
- `make migrate-dev MIGRATION_NAME=<migration_name>` Example: `make migrate-dev MIGRATION_NAME=test_migration` this command will create, and run, a new migration. This is used when changing the Prisma models. 

## Resetting the db

Run `make db-reset` in order to wipe & reset the database.

## Viewing the app

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

