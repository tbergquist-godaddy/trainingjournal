const getVercelBranchUrl = () => {
  const branchUrl = process.env.VERCEL_BRANCH_URL;
  if (branchUrl === undefined) {
    return undefined;
  }
  return `https://${branchUrl}`;
};
const apiDomain = getVercelBranchUrl() ?? process.env.NEXT_PUBLIC_API_DOMAIN;
const websiteDomain =
  getVercelBranchUrl() ?? process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;
if (apiDomain === undefined || websiteDomain === undefined) {
  throw new Error(
    'NEXT_PUBLIC_API_DOMAIN and NEXT_PUBLIC_WEBSITE_DOMAIN must be defined'
  );
}
export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: 'trainingjournal',
  apiDomain,
  websiteDomain,
  apiBasePath: '/api/auth',
  websiteBasePath: '/login',
};
