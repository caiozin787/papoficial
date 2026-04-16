export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { name, email } = req.body || {}
  if (!name || !email) return res.status(400).json({ error: 'name and email required' })

  const SUPABASE_URL = process.env.SUPABASE_URL
  const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!SUPABASE_URL || !SERVICE_ROLE) return res.status(500).json({ error: 'Server not configured' })

  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE,
        'Authorization': `Bearer ${SERVICE_ROLE}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({ name, email })
    })

    const data = await r.json()
    if (!r.ok) return res.status(r.status).json(data)
    return res.status(201).json(data)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
