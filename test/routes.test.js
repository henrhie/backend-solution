import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

describe('pushing data and retrieving data', () => {
	beforeAll(async () => {
		await prisma.incident.deleteMany({});
	});
	afterAll(async () => {
		await prisma.$disconnect();
	});
});
