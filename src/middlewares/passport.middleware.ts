import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { userService } from '../services';
import { IGoogleStrategy } from '../interfaces';
import {
  googleCallbackUrl,
  googleClientId,
  googleClientSecret,
} from '../config';
import { ApiError, BAD_REQUEST, NOT_FOUND } from '../utils';

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

        const userSessionData = {
          uuid: user.uuid,
          name: user.name,
          email: user.email,
          picture: user.picture,
        };

        done(null, userSessionData);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser(async (sessionData: IGoogleStrategy, done) => {
  try {
    if (!sessionData.providerId) {
      return done(new ApiError('Invalid data', BAD_REQUEST));
    }

    const user = await userService.findUserByProviderId(sessionData.providerId);

    if (!user) {
      return done(new ApiError('User not found', NOT_FOUND));
    }

    const userSessionData = {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      picture: user.picture,
    };
    done(null, userSessionData);
  } catch (error) {
    done(error);
  }
});

export { passport as googleStrategyPassport };
