# Strava Segments

## Setup

Set your Strava API information in `src/config.js`. Otherwise set the corresponding environment variables when you start the server.

```js
// src/config.js
strava: {
  client_id: process.env.STRAVA_CLIENT_ID || 'client_id_here',
  client_secret: process.env.STRAVA_CLIENT_SECRET || 'client_secret_here',
  refresh_token: process.env.STRAVA_REFRESH_TOKEN || 'refresh_token_here',
};
```

Make sure you have Node.js installed (version >= 8.16.2) and run `npm install` in the project folder.

Run `npm start` to start the server, by default it's accessible at `localhost:3000`.
