if (process.env.NODE_ENV !== 'production') {
  // Only load dotenv in development
  const path = require('path');
  const { config } = require('dotenv');
  config({ path: path.resolve(process.cwd(), '.env') });
}

export const { PORT, MONGO_URI, PINECONE_API_KEY, OPENAI_API_KEY, JWT_SECRET } =
  process.env;
