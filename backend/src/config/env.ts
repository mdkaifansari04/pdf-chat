import { config } from 'dotenv';
import path from 'path';

// Resolve the correct .env file from the root directory
const envFile = path.resolve(process.cwd(), `.env`);

config({ path: envFile });

export const { PORT, MONGO_URI, PINECONE_API_KEY, OPENAI_API_KEY, JWT_SECRET } =
  process.env;
