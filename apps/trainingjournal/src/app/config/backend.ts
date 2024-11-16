import SuperTokens from 'supertokens-node';
import PasswordlessNode from 'supertokens-node/recipe/passwordless';
import SessionNode from 'supertokens-node/recipe/session';
import { appInfo } from './appInfo';
import { TypeInput } from 'supertokens-node/types';

const { SUPERTOKENS_CONNECTION_URL, SUPERTOKENS_API_KEY } = process.env;

if (SUPERTOKENS_CONNECTION_URL === undefined || SUPERTOKENS_API_KEY === undefined) {
  throw new Error('SUPERTOKENS_CONNECTION_URL and SUPERTOKENS_API_KEY must be defined');
}

export const backendConfig = (): TypeInput => {
  return {
    framework: 'custom',
    supertokens: {
      // These are the connection details of the app you created on supertokens.com
      connectionURI: SUPERTOKENS_CONNECTION_URL,
      apiKey: SUPERTOKENS_API_KEY,
    },
    appInfo,
    recipeList: [
      PasswordlessNode.init({
        flowType: 'MAGIC_LINK',
        contactMethod: 'EMAIL',
      }),
      SessionNode.init(),
    ],
    isInServerlessEnv: true,
  };
};

let initialized = false;
// This function is used in your APIs to make sure SuperTokens is initialised
export function ensureSuperTokensInit() {
  if (!initialized) {
    SuperTokens.init(backendConfig());
    initialized = true;
  }
}
