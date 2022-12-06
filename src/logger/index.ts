import { Context, Middleware } from '@zodash/onion';
import { getLogger, Logger, Options } from '@zodash/logger';

import global from '../global';

const MAX_MEMORY_LOG_LENGTH = 1000;
const main = 'main';

const createMemoryStorage = (
  namespace: string,
): Middleware<Context<any, any, any>> => {
  if (!global.__DOREAMON_LOGGER__._storage) {
    global.__DOREAMON_LOGGER__._storage = [];
  }

  const storage = global.__DOREAMON_LOGGER__._storage as any[];
  return async (ctx, next) => {
    // add namespace
    ctx.input.namespace = namespace;

    if (storage.length > MAX_MEMORY_LOG_LENGTH) {
      storage.shift();
    }

    storage.push(ctx.input);

    await next();
  };
};

const logger: Logger & {
  getLogger: typeof getLogger;
  setDisable: typeof Logger.setDisable;
} = new Logger(main) as any;

logger.getLogger = (name: string, options?: Options): Logger => {
  if (global.__DOREAMON_LOGGER__[name]) {
    return global.__DOREAMON_LOGGER__[name];
  }

  const lg = getLogger(name, options);
  lg.use(createMemoryStorage(name));

  if (!global.__DOREAMON_LOGGER__) {
    global.__DOREAMON_LOGGER__ = logger;
  }

  if (!global.__DOREAMON_LOGGER__._namespaces) {
    global.__DOREAMON_LOGGER__._namespaces = {};
  }

  global.__DOREAMON_LOGGER__._namespaces[name] = lg;
  return lg;
};

logger.setDisable = Logger.setDisable;

logger.use(createMemoryStorage(main));

if (typeof global !== 'undefined') {
  global.__DOREAMON_LOGGER__ = logger;
}

export default logger;
