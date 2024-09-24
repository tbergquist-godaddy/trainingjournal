if (
  process.env.NEXT_PUBLIC_API_DOMAIN === undefined ||
  process.env.NEXT_PUBLIC_WEBSITE_DOMAIN === undefined
) {
  throw new Error(
    'NEXT_PUBLIC_API_DOMAIN and NEXT_PUBLIC_WEBSITE_DOMAIN must be defined'
  );
}
export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: 'trainingjournal',
  apiDomain: process.env.NEXT_PUBLIC_API_DOMAIN,
  websiteDomain: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN,
  apiBasePath: '/api/auth',
  websiteBasePath: '/login',
};
