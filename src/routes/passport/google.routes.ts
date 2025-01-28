import { Router } from 'express';
import { googleStrategyPassport, isAuth } from '../../middlewares';
import { INTERNAL_SERVER_ERROR, OK } from '../../utils';

const router = Router();

router.get(
  '/',
  googleStrategyPassport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/callback',
  googleStrategyPassport.authenticate('google', {
    session: true,
  }),
  (req, res) => {
    res.status(OK).json({ message: 'Logged in successfully!' });
  }
);

router.get('/profile', isAuth, (req, res) => {
  res.status(OK).json({ message: 'User profile', user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Logout failed', error: err });
    }

    res.status(OK).json({ message: 'Logged out successfully' });
  });
});

export { router as googleRouter };
