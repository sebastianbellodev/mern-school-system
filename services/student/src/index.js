import app from './app.js';
import { connectToAtlas } from './data/database.js';

const PORT = 3000;

connectToAtlas((error) => {
  if (!error) {
    app.listen(PORT);
    console.log('Server on port', PORT);
  }
});
