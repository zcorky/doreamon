import { Context, Middleware } from '@zodash/onion';
import { getLogger, Logger, Options } from '@zodash/logger';

const MAX_MEMORY_LOG_LENGTH = 1000;
const main = 'main';

const createMemoryStorage = (
  namespace: string,
): Middleware<Context<any, any, any>> => {
  if (!(window as any).__DOREAMON_LOGGER__._storage) {
    (window as any).__DOREAMON_LOGGER__._storage = [];
  }

  const storage = (window as any).__DOREAMON_LOGGER__._storage as any[];
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
  if ((window as any).__DOREAMON_LOGGER__[name]) {
    return (window as any).__DOREAMON_LOGGER__[name];
  }

  const lg = getLogger(name, options);
  lg.use(createMemoryStorage(name));

  if (!(window as any).__DOREAMON_LOGGER__)
    (window as any).__DOREAMON_LOGGER__ = logger;
  if (!(window as any).__DOREAMON_LOGGER__._namespaces)
    (window as any).__DOREAMON_LOGGER__._namespaces = {};
  (window as any).__DOREAMON_LOGGER__._namespaces[name] = lg;
  return lg;
};

logger.setDisable = Logger.setDisable;

logger.use(createMemoryStorage(main));

if (typeof window !== 'undefined') {
  (window as any).__DOREAMON_LOGGER__ = logger;
}

export default logger;
