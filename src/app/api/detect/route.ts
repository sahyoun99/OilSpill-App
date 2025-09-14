// app/api/detect/route.ts
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const py = process.env.NEXT_PUBLIC_PY_URL // e.g. http://localhost:8000
  if (!py) return new Response('NEXT_PUBLIC_PY_URL not set', { status: 500 })

  const form = await req.formData() // contains "images": FileList
  const res = await fetch(`${py.replace(/\/$/, '')}/predict`, { method: 'POST', body: form })

  const text = await res.text()
  return new Response(text, {
    status: res.status,
    headers: { 'content-type': res.headers.get('content-type') ?? 'application/json' }
  })
}
