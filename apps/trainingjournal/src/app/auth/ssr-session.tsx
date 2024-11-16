import { cookies } from 'next/headers';
import jwksClient from 'jwks-rsa';
import JsonWebToken from 'jsonwebtoken';
import type { JwtHeader, JwtPayload, SigningKeyCallback } from 'jsonwebtoken';

const client = jwksClient({
  jwksUri: 'https://st-dev-ac2e0940-7aa7-11ef-ab9e-9bd286159eeb.aws.supertokens.io/.well-known/jwks.json',
});

async function getAccessToken(): Promise<string | undefined> {
  const c = await cookies();
  return c.get('sAccessToken')?.value;
}

function getPublicKey(header: JwtHeader, callback: SigningKeyCallback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
    } else {
      const signingKey = key?.getPublicKey();
      callback(null, signingKey);
    }
  });
}

async function verifyToken(token: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    JsonWebToken.verify(token, getPublicKey, {}, (err: unknown, decoded: unknown) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as JwtPayload);
      }
    });
  });
}

/**
 * A helper function to retrieve session details on the server side.
 *
 * NOTE: This function does not use the getSession / verifySession function from the supertokens-node SDK
 * because those functions may update the access token. These updated tokens would not be
 * propagated to the client side properly, as request interceptors do not run on the server side.
 * So instead, we use regular JWT verification library
 */
export async function getSSRSessionHelper(): Promise<{
  accessTokenPayload: JwtPayload | undefined;
  hasToken: boolean;
  error: Error | undefined;
}> {
  const accessToken = await getAccessToken();
  const hasToken = !!accessToken;
  try {
    if (accessToken) {
      const decoded = await verifyToken(accessToken);
      return { accessTokenPayload: decoded, hasToken, error: undefined };
    }
    return { accessTokenPayload: undefined, hasToken, error: undefined };
  } catch (error) {
    return { accessTokenPayload: undefined, hasToken, error: undefined };
  }
}

export const getSSRUserId = async (): Promise<string | null> => {
  const { accessTokenPayload } = await getSSRSessionHelper();
  if (accessTokenPayload != null && accessTokenPayload.sub != null) {
    return accessTokenPayload.sub;
  }
  return null;
};
