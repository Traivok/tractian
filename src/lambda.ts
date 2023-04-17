import serverlessExpress from '@vendia/serverless-express';
import { server }        from './index';

exports.handler = serverlessExpress({ app: server });
