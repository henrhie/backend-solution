# Backend solution

contains the solution for the take-home assignment

## Run Locally

Clone the project

```bash
  git clone https://github.com/henrhie/backend-solution.git
```

Go to the project directory

```bash
  cd backend-solution
```

Install dependencies

```bash
  npm install
```

Configure Prisma - create a .env file with `DATABASE_URL` pointing to PostgreSQL instance.
Also add `OPEN_WEATHER_KEY` API key to your .env file.
Run the following after configuring.

```bash
  npx prisma migrate dev --name init
```

Start the server

```bash
  npm run start:dev
```
