import { IJwtPayload } from '../interfaces';
import { userService, HashingService, JwtService } from '../services';

class AuthService {
  async generateTokens(payload: IJwtPayload) {
    const accessToken = JwtService.generateAccessToken(payload);
    const refreshToken = JwtService.generateRefreshToken(payload);

    await this.saveRefreshToken(payload.uuid, refreshToken);

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(uuid: string, refreshToken: string) {
    const hashedRefreshToken = await HashingService.hash(refreshToken);
    await userService.updateOne({ uuid }, { refreshToken: hashedRefreshToken });
  }
}

export const authService = new AuthService();
