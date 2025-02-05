declare namespace Express {
  interface Request {
    user?: {
      uuid: string;
    };
    authInfo?: {
      accessToken: string;
      refreshToken: string;
    };
  }

  interface User {
    uuid: string;
    providerId?: string;
    tokens?: { accessToken: string; refreshToken: string };
  }
}
