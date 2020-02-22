import redis from 'redis';
import config from './src/config';

const redisClient: any = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});

redisClient.auth(process.env.REDIS_PWD || config.REDIS_PWD, (err: any) => {
  if (err) {
    throw err;
  }
});

redisClient.on('error', (err: any) => {
  if (err) {
    throw new Error(err);
  }
});

export default redisClient;
