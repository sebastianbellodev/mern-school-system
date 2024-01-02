import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const URL = `mongodb+srv://${process.env.CLUSTER_USER}:${process.env.CLUSTER_PASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

const connectToAtlas = (callback) => {
  mongoose
    .connect(URL)
    .then(() => callback())
    .catch((error) => callback(error));
};

export default connectToAtlas;
