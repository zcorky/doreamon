import { Context, Middleware } from '@zodash/onion';
import { getLogger, Logger, Options } from '@zodash/logger';

const memoryStorage: Middleware<Context<any, any, any>> = async (
  ctx,
  next,
) => {
  if (!(window as any).__DOREAMON_LOGGER__._storage) {
    (window as any).__DOREAMON_LOGGER__._storage = [];
  } else if ((window as any).__DOREAMON_LOGGER__._storage.length > 1000) {
    (window as any).__DOREAMON_LOGGER__._storage.shift();
  }

  (window as any).__DOREAMON_LOGGER__._storage.push(ctx.input);
  await next();
};

const logger: Logger & {
  getLogger: typeof getLogger;
  setDisable: typeof Logger.setDisable;
} = new Logger('main') as any;

logger.getLogger = (name: string, options?: Options): Logger => {
  if ((window as any).__DOREAMON_LOGGER__[name]) {
    return (window as any).__DOREAMON_LOGGER__[name];
  }

  const lg = getLogger(name, options);
  lg.use(memoryStorage);

  if (!(window as any).__DOREAMON_LOGGER__)
    (window as any).__DOREAMON_LOGGER__ = logger;
  if (!(window as any).__DOREAMON_LOGGER__._namespaces)
    (window as any).__DOREAMON_LOGGER__._namespaces = {};
  (window as any).__DOREAMON_LOGGER__._namespaces[name] = lg;
  return lg;
};

logger.setDisable = Logger.setDisable;

logger.use(memoryStorage);

if (typeof window !== 'undefined') {
  (window as any).__DOREAMON_LOGGER__ = logger;
}

export default logger;
