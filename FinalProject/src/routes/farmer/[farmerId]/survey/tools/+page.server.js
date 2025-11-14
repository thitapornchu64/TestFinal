import { farmers } from '$lib/farmers.js'

// @ts-ignore
export async function load({ params }) {
  const farmer = farmers.find(f => f.id === params.farmerId)
  const aspect = farmer?.surveys.find(a => a.category === 'tools')
  return { farmer, aspect }
}
