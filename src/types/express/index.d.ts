declare namespace Express {
  interface Request {
    user?: { uuid: string };
  }
}
