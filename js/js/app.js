// Lingua Letters — Main App
// This file loads the right page based on whether the user is logged in

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Initialize Supabase
const SUPABASE_URL = document.querySelector('meta[name="supabase-url"]').content
const SUPABASE_ANON_KEY = document.querySelector('meta[name="supabase-key"]').content
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Check if user is logged in and route them to the right page
export async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession()
  const currentPage = window.location.pathname

  if (session) {
    if (currentPage === '/' || currentPage === '/index.html' || currentPage === '/login.html') {
      window.location.href = '/dashboard.html'
    }
  } else {
    if (currentPage === '/dashboard.html') {
      window.location.href = '/login.html'
    }
  }
}

// Get the current logged in user with their profile
export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return null

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single()

  return user
}

// Sign out
export async function signOut() {
  await supabase.auth.signOut()
  window.location.href = '/login.html'
}
