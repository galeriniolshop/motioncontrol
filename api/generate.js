export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const MAGNIFIC_API_KEY = process.env.MAGNIFIC_API_KEY;
  if (!MAGNIFIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { image_url, video_url, prompt, character_orientation, cfg_scale } = req.body;

  try {
    const response = await fetch('https://api.magnific.com/v1/ai/video/kling-v2-6-motion-control-std', {
      method: 'POST',
      headers: {
        'x-magnific-api-key': MAGNIFIC_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_url,
        video_url,
        prompt,
        character_orientation,
        cfg_scale
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Magnific API error' });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
