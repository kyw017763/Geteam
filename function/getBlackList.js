import redisClient from '../redis';

export default function getBlackList() {
  return new Promise((resolve, reject) => {
    redisClient.lrange('jwtBlack', 0, -1, (err, result) => {
      resolve(result);
    });
  });
}
