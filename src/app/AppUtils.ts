import morgan from 'morgan';

export const httpLogger = () => {
  return morgan
    .token('headers', (req) => JSON.stringify(req.headers))
    // @ts-ignore
    .token('protocol', (req) => req.protocol)
    .token(
      'host',
      // @ts-ignore
      (req) => req.get('host')!,
    )(
    ':headers:\n:protocol :host :method :url :status :res[content-length] - :response-time ms',
  );
};
