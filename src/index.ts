import app from './app';
import { port } from './config';

app.listen(port, () => {
  console.log(`Server is running on port ${port || 8080}`);
});
