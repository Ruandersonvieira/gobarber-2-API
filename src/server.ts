import express from 'express';
import routes from './routes';

const app = express();

app.get('/', (req, res) => res.json({ message: 'Working' }));

app.listen(3333, () => {
  console.log('Server on');
});
