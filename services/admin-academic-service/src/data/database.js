import mongoose from 'mongoose';

const URL = `mongodb+srv://sebastianbellotrejo:WeAwqsLqx3BWh6bR@cluster0.6gyoyua.mongodb.net/admin-academic?retryWrites=true&w=majority`;

export const connectToAtlas = (callback) => {
  mongoose
    .connect(URL)
    .then(() => callback())
    .catch((error) => callback(error));
};
