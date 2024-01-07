import app from './app.js';
import connectToAtlas from './data/database.js';
import dotenv from 'dotenv';

const PORT = process.env.PORT;

connectToAtlas((error) => {
  if (!error) {
    app.listen(PORT);
    console.log('Server on port', PORT);
  } else {
    console.log(error);
  }
});
