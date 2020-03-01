import redis from 'redis';
import config from './config';

class RedisClient {
  public client: redis.RedisClient;
  private pwd: string;

	constructor (pwd: string) {
    this.pwd = pwd;

    this.client = redis.createClient({
      host: '127.0.0.1',
      port: 6379,
    });

    this.client.auth(this.pwd, (err) => {
      if (err) {
        throw err;
      }
    });
    
    this.client.on('error', (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  }
}

const redisClient = new RedisClient(process.env.REDIS_PWD || config.REDIS_PWD);

export default redisClient;
