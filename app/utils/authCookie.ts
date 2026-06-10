import Cookies from 'js-cookie';

const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
};

export const setAuthCookies = (accessToken: string, refreshToken: string) => {
  Cookies.set('accessToken', accessToken, { ...COOKIE_OPTIONS, expires: 1 });
  Cookies.set('refreshToken', refreshToken, { ...COOKIE_OPTIONS, expires: 7 });
};

export const removeAuthCookies = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};
