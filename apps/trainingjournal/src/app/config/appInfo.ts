const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
const websiteDomain = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;
if (apiDomain === undefined || websiteDomain === undefined) {
  throw new Error('NEXT_PUBLIC_API_DOMAIN and NEXT_PUBLIC_WEBSITE_DOMAIN must be defined');
}
export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: 'trainingjournal',
  apiDomain,
  websiteDomain,
  apiBasePath: '/api/auth',
  websiteBasePath: '/login',
};
