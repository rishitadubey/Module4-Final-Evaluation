import { supabase } from '../config/supabase.js'

export const getAnalytics = async (req, res) => {
  const users = await supabase.rpc('count_users_by_role')
  const vehicles = await supabase.from('vehicles').select('*', { count: 'exact', head: true })
  const trips = await supabase.from('trips').select('*', { count: 'exact', head: true })

  res.json({
    ...users.data,
    totalVehicles: vehicles.count,
    totalTrips: trips.count
  })
}