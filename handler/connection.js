export const toCursorHash = (string) => Buffer.from(string).toString('base64');

export const fromCursorHash = (string) => Buffer.from(string, 'base64').toString('ascii');

export const Connection = async (model_cb, model_count_cb, orderBy, cursor, limit, subs = null) => {
  const dir = orderBy.direction.toLowerCase() === 'asc' ? 1 : -1;
  let where = orderBy.field === 'CRAETED_AT' ? 'createdAt' : 'updatedAt';
  let sortOpt = {};

  // timestamp가 다른 이름으로 바뀌어 있을 경우에 대한 처리
  where = subs ? subs[where] : where;
  if (subs) {
    if (orderBy.field === 'CREATED_AT') {
      sortOpt[subs.createdAt] = dir;
    } else {
      sortOpt[subs.updatedAt] = dir;
    }
  } else {
    sortOpt = orderBy.field === 'CRAETED_AT' ? { createdAt: dir } : { updatedAt: dir };
  }

  let findOpts = {};
  if (cursor) {
    const clause = {};
    const point = Date.parse(fromCursorHash(cursor));
    clause[where] = dir > 0 ? { $gt: point } : { $lt: point };
    findOpts = {
      ...findOpts,
      ...clause,
    };
  }

  const datas = await model_cb(findOpts, sortOpt, limit ? limit + 1 : 0);
  const total = await model_count_cb(findOpts);

  const hasNextPage = limit ? datas.length > limit : false;
  const nodes = hasNextPage ? datas.slice(0, -1) : datas;

  // data가 null일 경우는 cursor 처리를 하지 않는다
  let endCursor = null;
  let startCursor = null;
  if (nodes.length) {
    endCursor = toCursorHash(nodes[nodes.length - 1][where].toString());
    startCursor = toCursorHash(nodes[0][where].toString());
  }

  const edges = nodes.map((item) => ({
    cursor: toCursorHash(item[where].toString()),
    node: item,
  }));

  return {
    totalCount: total,
    edges,
    nodes,
    pageInfo: {
      hasNextPage,
      endCursor,
      startCursor,
    },
  };
};
