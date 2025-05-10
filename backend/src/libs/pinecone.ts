import { Pinecone } from '@pinecone-database/pinecone';
import { PINECONE_API_KEY } from 'config/env';

const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY!,
});

export default pinecone;
