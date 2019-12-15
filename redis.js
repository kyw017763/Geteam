import redis from 'redis';
import config from './config';

const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});

redisClient.auth(config.redisPwd, (err) => {
  if (err) throw err;
});

redisClient.on('error', (err) => {
  console.log(`Redis error: ${err}`);
});

export default redisClient;
