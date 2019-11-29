import { ApolloServer } from 'apollo-server-lambda';
// import * as AWS from 'aws-sdk';
import { merge } from 'lodash';

import models from '../models/index';
// import { AuthDirective } from './directives';

import { typeDef as indexSchema, resolverMap as dateResolver } from '../graphql/graphql.index';
import { typeDef as ApplyContest, resolver as applyContestResolver } from '../graphql/applyContest/index';
import { typeDef as ApplyStudy, resolver as applyStudyResolver } from '../graphql/applyStudy/index';
import { typeDef as Contest, resolver as contestResolver } from '../graphql/contest/index';
import { typeDef as Member, resolver as memberResolver } from '../graphql/member/index';
import { typeDef as Note, resolver as noteResolver } from '../graphql/note/index';
import { typeDef as Secession, resolver as secessionResolver } from '../graphql/secession/index';
import { typeDef as Study, resolver as studyResolver } from '../graphql/study/index';
// $IMPORT$ add new graphql definition here...

const mem = () => process.memoryUsage();
// const schemaDirectives = {
//   auth: AuthDirective,
// };
const schema = [
  indexSchema,
  ApplyContest,
  ApplyStudy,
  Contest,
  Member,
  Note,
  Secession,
  Study,
  // $MODEL$ add new schema here
];
const resolvs = merge({},
  dateResolver,
  applyContestResolver,
  applyStudyResolver,
  contestResolver,
  memberResolver,
  noteResolver,
  secessionResolver,
  studyResolver,
  // $RESOLVER$ add new resolver here
// eslint-disable-next-line function-paren-newline
);

// Lambda의 경우 handler 밖에 정의한 variable은 lambda instance간에 유지가 된다.
// eslint-disable-next-line max-len
// (Any variable outside the handler function will be frozen in between Lambda invocations and possibly reused.)
// Lambda를 사용할 경우 db.disconnect를 처리하면 안된다.
//
// let cachedDb = null;
// if (!cachedDb) cachedDb = database;

const Logging = {
  requestDidStart(requestContext) {
    const { request } = requestContext;

    if (request.operationName !== 'IntrospectionQuery') {
      console.log(request);
      console.log(JSON.stringify(request.variables));
    }
  },
};

// S3 관련
// const s3 = new AWS.S3();


const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvs,
  // schemaDirectives,
  introspection: true,
  playground: true,
  context: ({ context, event }) => {
    // eslint-disable-next-line no-param-reassign
    context.callbackWaitsForEmptyEventLoop = false;
    return {
      functionName: context.functionName,
      // db: cachedDb,
      // s3: s3,
      models,
      context,
      meminfo: mem(),
    };
  },
  engine: {
    generateClientInfo: ({ request }) => {
      // console.log(request);
      const headers = request.http && request.http.headers;
      if (headers) {
        // console.log(headers['apollographql-client-name']);
        return {
          clientName: headers['apollographql-client-name'],
          clientVersion: headers['apollographql-client-version'],
        };
      }
      return {
        clientName: 'Unknown Client',
        clientVersion: 'Unversioned',
      };
    },
  },
  plugins: [
    Logging,
  ],
  // extensions: [() => new BasicLogging()]
  // db connection을 freeze하기 위해 db.disconnect를 제거한다.
  // plugins: [{
  //  requestDidStart: () => ({
  //    willSendResponse: async (response: any) => {
  //      if (response.context.db) { await response.context.db.disconnect(); }
  //    }
  //  })
  // }]
});

exports.graphql = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
