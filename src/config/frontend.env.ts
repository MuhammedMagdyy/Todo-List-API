import env from './env';

export const frontendUrl = env('FRONTEND_URL');
export const frontendSuccessRedirectUrl = env('FRONTEND_SUCCESS_REDIRECT_URL');
export const frontendErrorRedirectUrl = env('FRONTEND_FAILURE_REDIRECT_URL');
