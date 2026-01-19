// assets/js/supabase-client.js - UPDATED VERSION
import { createClient } from '@supabase/supabase-js'

// === REPLACE THESE WITH YOUR ACTUAL CREDENTIALS ===
// Get these from: Supabase Dashboard → Project Settings → API
const supabaseUrl = 'https://YOUR-PROJECT-REF.supabase.co'  // ← Replace with your URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'  // ← Replace with your anon/public key

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Improved test function
export async function testConnection() {
    console.log('🔌 Testing Supabase connection...')
    console.log('📋 URL:', supabaseUrl)
    console.log('🔑 Key exists:', !!supabaseAnonKey)
    
    try {
        // Method 1: Try to fetch server info
        const { data: health, error: healthError } = await supabase
            .from('_health')
            .select('*')
            .limit(1)
        
        if (!healthError) {
            console.log('✅ Supabase is connected! Health check passed.')
            return { connected: true, error: null }
        }
        
        // Method 2: Try a simple query on a common table
        const { error: tableError } = await supabase
            .from('appointments')
            .select('id')
            .limit(1)
        
        if (tableError) {
            // Check if it's just "table doesn't exist" error
            if (tableError.code === '42P01' || tableError.message.includes('does not exist')) {
                console.log('✅ Supabase is connected! (Tables not created yet)')
                console.log('ℹ️  Expected error:', tableError.message)
                return { connected: true, error: tableError }
            }
            
            console.log('⚠️  Connection issue:', tableError.message)
            return { connected: false, error: tableError }
        }
        
        console.log('✅ Supabase is connected and tables are accessible!')
        return { connected: true, error: null }
        
    } catch (err) {
        console.error('❌ Supabase connection failed:', err.message)
        return { connected: false, error: err }
    }
}

// Simple connection status for UI
export async function getConnectionStatus() {
    const { connected, error } = await testConnection()
    
    return {
        connected,
        message: connected ? 
            'Database connected successfully' : 
            `Connection failed: ${error?.message || 'Unknown error'}`,
        timestamp: new Date().toISOString()
    }
}