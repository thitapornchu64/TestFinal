import { farmers } from '$lib/farmers.js'

// @ts-ignore
export async function load({ params }) {
  const farmer = farmers.find(f => f.id === params.farmerId)
  if (!farmer) throw new Error('ไม่พบเกษตรกร')

  return { farmer }
}
