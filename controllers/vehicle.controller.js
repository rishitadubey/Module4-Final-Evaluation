import { supabase } from '../config/supabase.js'

export const addVehicle = async (req, res) => {
  const vehicle = { ...req.body, owner_id: req.user.id }

  const { error } = await supabase.from('vehicles').insert([vehicle])
  if (error) return res.status(400).json({ error: error.message })

  res.status(201).json({ message: 'Vehicle added' })
}

export const assignDriver = async (req, res) => {
  const { driver_id } = req.body

  const { error } = await supabase
    .from('vehicles')
    .update({ driver_id })
    .eq('id', req.params.vehicleId)

  if (error) return res.status(400).json({ error: error.message })
  res.json({ message: 'Driver assigned' })
}

export const getVehicle = async (req, res) => {
  const { data } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', req.params.vehicleId)
    .single()

  res.json(data)
}