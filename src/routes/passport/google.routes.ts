import { Router } from 'express';
import { googleStrategyPassport, isAuth } from '../../middlewares';
import { FORBIDDEN, MAGIC_NUMBERS, NOT_FOUND, OK } from '../../utils';
import { userService } from '../../services';
import { nodeEnv } from '../../config';

const router = Router();

router.get(
  '/',
  googleStrategyPassport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/callback',
  googleStrategyPassport.authenticate('google', {
    session: false,
  }),
  (req, res) => {
    const refreshToken = req.authInfo?.refreshToken;

    if (!refreshToken) {
      res.status(FORBIDDEN).json({ message: 'Forbidden' });
      return;
    }

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: nodeEnv === 'production',
      sameSite: 'lax',
      path: '/auth/refresh-token',
      maxAge: MAGIC_NUMBERS.SEVEN_DAYS,
    });

    res.status(OK).json({
      message: 'Logged in successfully!',
      token: req.authInfo?.accessToken,
    });
  }
);

router.get('/profile', isAuth, async (req, res) => {
  const uuid = req.user?.uuid;

  if (!uuid) {
    res.status(FORBIDDEN).json({ message: 'Forbidden' });
    return;
  }

  const isUserExists = await userService.findUserByUUID(uuid);

  if (!isUserExists) {
    res.status(NOT_FOUND).json({ message: 'User not found' });
    return;
  }

  const user = {
    uuid: isUserExists.uuid,
    email: isUserExists.email,
    name: isUserExists.name,
    picture: isUserExists.picture,
  };

  res.status(OK).json({ message: 'User profile', user });
});

router.get('/logout', (req, res) => {
  res.status(OK).json({ message: 'Logged out successfully' });
});

export { router as googleRouter };
