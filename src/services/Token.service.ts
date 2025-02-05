import { sign, verify, Secret } from 'jsonwebtoken';
import {
  accessTokenSecret,
  refreshTokenSecret,
  accessTokenExpiry,
  refreshTokenExpiry,
} from '../config';
import { JwtType } from '../types';
import { IJwtPayload } from '../interfaces';

export class JwtService {
  static generateAccessToken(payload: IJwtPayload) {
    return sign(payload, accessTokenSecret as Secret, {
      expiresIn: accessTokenExpiry,
    });
  }

  static generateRefreshToken(payload: IJwtPayload) {
    return sign(payload, refreshTokenSecret as Secret, {
      expiresIn: refreshTokenExpiry,
    });
  }

  static verify(token: string, type: JwtType): IJwtPayload {
    const secret = type === 'access' ? accessTokenSecret : refreshTokenSecret;

    return verify(token, secret as Secret) as IJwtPayload;
  }
}
