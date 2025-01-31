import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { userService } from '../services';
import {
  googleCallbackUrl,
  googleClientId,
  googleClientSecret,
} from '../config';
import { ApiError, NOT_FOUND } from '../utils';

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
            provider: profile.provider,
            providerId: googleId,
            name: profile.displayName,
            email: profile.emails?.[0].value || '',
            picture: profile.photos?.[0].value || '',
          });
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.providerId));

passport.deserializeUser(async (providerId: string, done) => {
  try {
    const user = await userService.findUserByProviderId(providerId);

    if (!user) {
      return done(new ApiError('User not found', NOT_FOUND));
    }

    done(null, user);
  } catch (error) {
    done(error);
  }
});

export { passport as googleStrategyPassport };
