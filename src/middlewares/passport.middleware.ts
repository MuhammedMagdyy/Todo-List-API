import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { userService } from '../services';
import { IGoogleStrategy } from '../interfaces';
import {
  googleCallbackUrl,
  googleClientId,
  googleClientSecret,
} from '../config';

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: googleCallbackUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const providerId = profile.id;
        let user = await userService.findUserByProviderId(providerId);

        if (!user) {
          user = await userService.createOne({
            provider: profile.provider,
            providerId,
            name: profile.displayName,
            email: profile.emails?.[0].value ?? '',
            picture: profile.photos?.[0].value ?? '',
          });

          return done(null, user);
        }

        const theOneAndOnlyUser = {
          uuid: user.uuid,
          name: user.name,
          email: user.email,
          picture: user.picture,
        };

        done(null, theOneAndOnlyUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser(async (user: IGoogleStrategy, done) => {
  try {
    const existingUser = await userService.findUserByProviderId(
      user.providerId
    );

    done(null, existingUser);
  } catch (error) {
    done(error);
  }
});

export { passport as googleStrategyPassport };
