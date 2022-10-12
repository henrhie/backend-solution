require('dotenv');
const express = require('express');
const { Prisma } = require('@prisma/client');
const { AxiosError } = require('axios');

const { postRouter, getRouter } = require('./routes');

const app = express();
app.use(express.json());

app.use(postRouter);
app.use(getRouter);

//error handler
app.use((err, req, res, next) => {
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		return res.send(err.message);
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

module.exports = { app };
