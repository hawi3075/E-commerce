import { supabase } from './supabaseClient.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // This replaces the MongoDB "User.create" method
  const { data, error } = await supabase
    .from('users') 
    .insert([{ name, email, password }])
    .select();

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.status(201).json(data[0]);
};