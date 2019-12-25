import fetch from 'node-fetch';

const stravaConfig = {
  client_id: process.env.STRAVA_CLIENT_ID || '',
  client_secret: process.env.STRAVA_CLIENT_SECRET || '',
  refresh_token: process.env.STRAVA_REFRESH_TOKEN || '',
};

const url = 'https://www.strava.com/oauth/token';

let accessToken;
let expiresAt = 0;
let lastFetch = null;

async function getStravaToken() {
  if (lastFetch !== null) {
    return lastFetch;
  }

  if (Math.floor(Date.now() / 1000) > expiresAt) {
    lastFetch = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...stravaConfig, grant_type: 'refresh_token' }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        expiresAt = data.expires_at;
        accessToken = data.access_token;
        return accessToken;
      })
      .finally(() => {
        lastFetch = null;
      });
    return lastFetch;
  }

  return accessToken;
}

export default getStravaToken;
