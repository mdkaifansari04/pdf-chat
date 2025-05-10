import { Schema, model } from 'mongoose';

const resourceSchema = new Schema(
  {
    documentName: {
      type: String,
      required: true,
    },
    documentUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    namespace: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Resource = model('Resource', resourceSchema);

export default Resource;
