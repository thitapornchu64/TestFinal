// @ts-nocheck
import { farmers } from '$lib/farmers.js'

export async function load({ params }) {
  const farmer = farmers.find(f => f.id === params.farmerId)
  const aspect = farmer?.surveys.find(a => a.category === 'postharvest')
  return { farmer, aspect }
}
