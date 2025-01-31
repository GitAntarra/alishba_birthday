import { PrismaClient } from '@prisma/client';

const databaseUrl = process.env.NODE_ENV === "production" 
  ? process.env.ALISHBA_DB 
  : process.env.DATABASE_URL;

let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasources:{
      db: {
        url: databaseUrl,
      },
  
    }
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
export default prisma;