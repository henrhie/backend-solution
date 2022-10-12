const express = require('express');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const { validateData } = require('./utils');

const prisma = new PrismaClient();
const router = express.Router();

const createURL = (city) =>
	`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_KEY}`;

const postRouter = router.post('/incidents', async (req, res, next) => {
	const { client_id, incident_desc, city, country } = req.body;
	if (!validateData(req.body)) {
		return res.status(400).send({ msg: 'invalid request' });
	}

	let data;
	let incident;
	try {
		const response = await axios.get(createURL(city));
		data = response.data;
	} catch (error) {
		return next(error);
	}

	try {
		incident = await prisma.incident.create({
			data: {
				client_id,
				incident_desc,
				city,
				country,
				weather_report: JSON.stringify(data),
			},
		});
	} catch (error) {
		return next(error);
	}
	res
		.status(201)
		.send({ ...incident, weather_report: JSON.parse(incident.weather_report) });
});

const getRouter = router.get('/incidents', async (req, res, next) => {
	let incidents;
	try {
		incidents = await prisma.incident.findMany();
		if (incidents.length === 0) {
			return res.status(200).send('no entries found');
		}
		incidents = incidents.map((incident) => ({
			...incident,
			weather_report: JSON.parse(incident.weather_report),
		}));
		return res.status(200).send(incidents);
	} catch (error) {
		return next(error);
	}
});

module.exports = { postRouter, getRouter };
