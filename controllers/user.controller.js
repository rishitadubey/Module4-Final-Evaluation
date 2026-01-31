import {supabase} from '../suoabase'
 export const signup = async (req, res) =>{
      const {name, email,password,role} =req.body 
      if(!['customer', 'owner', 'driver'].includes(role)){
            returnres.status(400).json({
                  message:'Invalid role'})
      }
      const {date, error} =await supabase
      .from('users')
      .insert([{name, email, password , role}])
      if(error) returnres.status(400).json({error: error.message})
            res.status(201).json({message:'User created successfully'})
 }