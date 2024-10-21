import * as fetch from 'node-fetch';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
}

export async function getToken(authUrl: string) {
  const tokenUrl = `${authUrl}/protocol/openid-connect/token`;
  const body = new URLSearchParams({
    client_id: 'admin-cli',
    username: process.env.KC_BOOTSTRAP_ADMIN_USERNAME || 'admin',
    password: process.env.KC_BOOTSTRAP_ADMIN_PASSWORD || 'admin',
    grant_type: 'password',
  });

  const response = await fetch.default(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const data = await response.json() as TokenResponse;
  return data?.access_token;
}