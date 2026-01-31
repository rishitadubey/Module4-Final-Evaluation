import { supabase } from '../config/supabase.js'

export const createTrip = async (req, res) => {
  const { vehicle_id, passengers, distance_km } = req.body

  const { data: vehicle } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', vehicle_id)
    .single()

  if (!vehicle.isAvailable)
    return res.status(400).json({ message: 'Vehicle not available' })

  if (passengers > vehicle.allowed_passengers)
    return res.status(400).json({ message: 'Passenger limit exceeded' })

  await supabase.from('vehicles').update({ isAvailable: false }).eq('id', vehicle_id)

  await supabase.from('trips').insert([
    { ...req.body, customer_id: req.user.id }
  ])

  res.status(201).json({ message: 'Trip created' })
}

export const endTrip = async (req, res) => {
  const { data: trip } = await supabase
    .from('trips')
    .select('*, vehicles(rate_per_km)')
    .eq('id', req.params.tripId)
    .single()

  const tripCost = trip.distance_km * trip.vehicles.rate_per_km

  await supabase.from('trips').update({
    isCompleted: true,
    tripCost
  }).eq('id', trip.id)

  await supabase.from('vehicles').update({ isAvailable: true }).eq('id', trip.vehicle_id)

  res.json({ message: 'Trip ended', tripCost })
}