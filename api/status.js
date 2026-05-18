export default async function handler(req, res) {
  const MAGNIFIC_API_KEY = process.env.MAGNIFIC_API_KEY;
  const { job_id } = req.query;

  if (!job_id) {
    return res.status(400).json({ error: 'job_id required' });
  }

  try {
    const response = await fetch(`https://api.magnific.com/v1/ai/video/status/${job_id}`, {
      headers: { 'x-magnific-api-key': MAGNIFIC_API_KEY }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
