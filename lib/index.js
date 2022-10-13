require('dotenv');
const express = require('express');
const { Prisma } = require('@prisma/client');
const { AxiosError } = require('axios');
const cors = require('cors');

const { postRouter, getRouter } = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(postRouter);
app.use(getRouter);

//error handler
app.use((err, req, res, next) => {
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		return res.status(400).send(err.message);
	}
	if (err instanceof AxiosError) {
		if (err.response) {
			return res.status(err.response.status).send(err.message);
		}
		if (err.request) {
			return res.send(err.message);
		}
	}
	return res.send(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

//exported for use by supertest for testing
module.exports = { app };
