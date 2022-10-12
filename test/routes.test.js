const { PrismaClient } = require('@prisma/client');
const request = require('supertest');

const { app } = require('../lib/index');

const prisma = new PrismaClient();

describe('pushing data and retrieving data', () => {
	beforeAll(async () => {
		await prisma.incident.deleteMany({});
	});
	afterAll(async () => {
		await prisma.$disconnect();
	});

	it('create two incident entries', async () => {
		// Create user two incidents
		const { body: firstIncident } = await request(app)
			.post('/incidents')
			.send({
				client_id: 123,
				incident_desc: 'hello world',
				city: 'accra',
				country: 'ghana',
			})
			.expect(201);
		const { body: SecondIncident } = await request(app)
			.post('/incidents')
			.send({
				client_id: 321,
				incident_desc: 'hello world',
				city: 'lisbon',
				country: 'ghana',
			})
			.expect(201);
		expect(firstIncident.client_id).toBe(123);
		expect(SecondIncident.client_id).toBe(321);
	});

	it('create two incident entries with same client ids', async () => {
		// Create user two incidents
		await request(app)
			.post('/incidents')
			.send({
				client_id: 1233,
				incident_desc: 'hello world',
				city: 'accra',
				country: 'ghana',
			})
			.expect(201);
		await request(app)
			.post('/incidents')
			.send({
				client_id: 1233,
				incident_desc: 'hello world',
				city: 'lisbon',
				country: 'ghana',
			})
			.expect(400);
	});

	it('create an incident with an invalid city', async () => {
		await request(app)
			.post('/incidents')
			.send({
				client_id: 1233,
				incident_desc: 'hello world',
				city: 'non existing city',
				country: 'ghana',
			})
			.expect(404);
	});

	it('retrieves all incidents', async () => {
		const { body } = await request(app).get('/incidents').expect(200);
		expect(body.length).toBe(3);
	});
});
