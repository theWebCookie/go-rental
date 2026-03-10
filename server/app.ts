import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnect } from './config/dbConnect.ts';
import { startApolloServer } from './apollo/apolloServer.ts';

dotenv.config({ path: 'config/.env.local' });

const app = express();

// CORS configuration
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:3000';
if (!process.env.CLIENT_URL) {
  console.warn('[CORS] process.env.CLIENT_URL is not set. Falling back to http://localhost:3000');
}

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());

dbConnect();

const PORT = process.env.PORT || 4000;

async function startServer() {
  await startApolloServer(app);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} at http://localhost:${PORT}`);
  });
}

startServer();
