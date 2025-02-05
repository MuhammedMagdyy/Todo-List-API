import asyncHandler from 'express-async-handler';
import { authService } from '../services';
import { ApiError, BAD_REQUEST } from '../utils';

export const generateAuthUrl = asyncHandler(async (req, res) => {
  const authorizeUrl = await authService.getGoogleAuthUrl();

  res.redirect(authorizeUrl);
});

export const handleGoogleCallback = asyncHandler(async (req, res, next) => {
  const code = req.query.code as string;

  if (!code) {
    return next(new ApiError('No code found in query parameters', BAD_REQUEST));
  }

  await authService.getGoogleTokens(code);
  const userInfo = await authService.getGoogleUserInfo();

  res.json({
    message: 'Logged in successfully!',
    data: userInfo.userResponse,
    tokens: {
      accessToken: userInfo.accessToken,
      refreshToken: userInfo.refreshToken,
    },
  });
});
