import { Router } from 'express';
import { googleStrategyPassport } from '../../middlewares';
import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from '../../utils';

const router = Router();

router.get(
  '/',
  googleStrategyPassport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/callback',
  googleStrategyPassport.authenticate('google', {
    session: true,
    successRedirect: 'https://www.google.com',
  }),
  (req, res) => {
    res.status(OK).json({ message: 'Logged in successfully!', user: req.user });
  }
);

router.get('/profile', (req, res) => {
  if (req.isUnauthenticated()) {
    res.status(UNAUTHORIZED).json({ message: 'Unauthorized' });
    return;
  }
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
