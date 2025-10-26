import fetch from "node-fetch";

export default async function handler(req, res) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const body = new URLSearchParams({
    grant_type: 'client_credentials'
  });

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${authString}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch token" });
  }
}
