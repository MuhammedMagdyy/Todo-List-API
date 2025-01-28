import { PrismaClient } from '@prisma/client';
import colors from 'colors';

const prisma: PrismaClient = new PrismaClient();

export async function databaseConnection() {
  try {
    await prisma.$connect();
    console.log(colors.green(`Database connected successfully! ✅`));
  } catch (error) {
    console.error(colors.red(`Error connecting to the database: ${error}`));
    await prisma.$disconnect();
    throw new Error(
      `Error connecting to the database: ${
        error instanceof Error ? error.message : (error as string)
      }`
    );
    process.exit(1);
  }
}

export default prisma;
