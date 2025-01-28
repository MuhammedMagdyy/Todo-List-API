import * as server from './app';
import colors from 'colors';
import { databaseConnection } from './database/client';

databaseConnection()
  .then(() => {
    return server.up();
  })
  .catch((error) => {
    console.error(
      colors.red(
        `${error instanceof Error ? error.message : (error as string)}`
      )
    );
    process.exit(1);
  });
