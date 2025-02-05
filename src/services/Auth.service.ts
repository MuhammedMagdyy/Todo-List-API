import { IGoogleStrategy, IJwtPayload, IUser } from '../interfaces';
import { userService, JwtService } from '../services';
import { OAuth2Client } from 'google-auth-library';
import {
  googleCallbackUrl,
  googleClientId,
  googleClientSecret,
} from '../config';
import {
  API_INTEGRATION,
  ApiError,
  BAD_REQUEST,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from '../utils';
import { Provider } from '@prisma/client';

class AuthService {
  private oAuth2Client: OAuth2Client;

  constructor() {
    this.oAuth2Client = new OAuth2Client(
      googleClientId,
      googleClientSecret,
      googleCallbackUrl
    );
  }

  async getGoogleAuthUrl() {
    const authorizeUrl = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: API_INTEGRATION.GOOGLE.USER_INFO_SCOPES,
    });
    return authorizeUrl;
  }

  async getGoogleTokens(code: string) {
    const tokensResponse = await this.oAuth2Client.getToken(code);
    this.oAuth2Client.setCredentials(tokensResponse.tokens);
    return tokensResponse.tokens;
  }

  async getGoogleUserInfo() {
    const response = await this.oAuth2Client.request({
      url: API_INTEGRATION.GOOGLE.USER_INFO_URL,
    });

    switch (response.status) {
      case UNAUTHORIZED:
        throw new ApiError('Unauthorized', UNAUTHORIZED);
      case FORBIDDEN:
        throw new ApiError('Access denied', FORBIDDEN);
      case BAD_REQUEST:
        throw new ApiError('Bad request', BAD_REQUEST);
      case INTERNAL_SERVER_ERROR:
        throw new ApiError(
          'Something went wrong: Please try agian later...',
          INTERNAL_SERVER_ERROR
        );
      default: {
        const data = response.data as IGoogleStrategy;
        return this.handleUserLogin(data);
      }
    }
  }

  async handleUserLogin(user: IGoogleStrategy) {
    let existingUser = await userService.findUserByProviderId(user.id);

    if (!existingUser) {
      existingUser = await userService.createOne({
        name: user.name,
        email: user.email,
        provider: Provider.GOOGLE,
        providerId: user.id,
        picture: user.picture,
        isVerified: user.verified_email,
      });
    }

    const payload: IJwtPayload = {
      uuid: existingUser.uuid,
    };

    const accessToken = JwtService.generateAccessToken(payload);
    const refreshToken = JwtService.generateRefreshToken(payload);

    const userResponse: IUser = {
      uuid: existingUser.uuid,
      name: existingUser.name as string,
      email: existingUser.email,
      picture: existingUser.picture as string,
    };

    return { userResponse, accessToken, refreshToken };
  }
}

export const authService = new AuthService();
