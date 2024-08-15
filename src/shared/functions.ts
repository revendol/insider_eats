import logger from 'jet-logger';
// **** Functions **** //
/**
 * Print an error object if it's truthy. Useful for testing.
 */
export function pErr(err?: Error): void {
  if (!!err) {
    logger.err(err);
  }
}
