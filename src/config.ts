import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      PORT: process.env.DATABASE_PORT,
    },
    apiKey: process.env.API_KEY,
  };
});
