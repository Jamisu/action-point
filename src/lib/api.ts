import { AppData } from '@/types/types'

export async function fetchData(): Promise<AppData> {
  const res = await fetch('/data/data.json', {
    next: { revalidate: 3600 } // refresh every hour
  })

  if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`)

  return res.json() as Promise<AppData>
}
