import { Provider } from '@prisma/client';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { authService, userService } from '../../services';
import {
  googleCallbackUrl,
  googleClientId,
  googleClientSecret,
} from '../../config';
import { ApiError, NOT_FOUND } from '../../utils';

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: googleCallbackUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;

        let user = await userService.findUserByProviderId(googleId);

        if (!user) {
          user = await userService.createOne({
            email: profile.emails?.[0].value || '',
            name: profile.displayName,
            picture: profile.photos?.[0].value || '',
            provider: Provider.GOOGLE,
            providerId: googleId,
            isVerified: true,
          });
        }

        const tokens = await authService.generateTokens({ uuid: user.uuid });

        done(
          null,
          { uuid: user.uuid },
          { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }
        );
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.uuid);
});

passport.deserializeUser(async (uuid: string, done) => {
  try {
    const user = await userService.findUserByUUID(uuid);

    if (!user) {
      return done(new ApiError('User not found', NOT_FOUND));
    }

    done(null, user as Express.User);
  } catch (error) {
    done(error);
  }
});

export { passport as googleStrategyPassport };
