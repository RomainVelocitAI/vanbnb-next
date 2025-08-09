import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createServiceClient()
  
  // Test fetching vehicles
  const { data: vehicles, error } = await supabase
    .from('vehicles')
    .select('id, brand, model')
    .limit(5)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Test fetching a specific vehicle with the first ID
  if (vehicles && vehicles.length > 0) {
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .select(`
        *,
        vehicle_photos (
          photo_url,
          photo_order
        ),
        vehicle_equipment (*),
        partners (
          id,
          company_name,
          created_at
        )
      `)
      .eq('id', vehicles[0].id)
      .single()

    if (vehicleError) {
      return NextResponse.json({ 
        vehicles,
        vehicleError: vehicleError.message,
        vehicleErrorCode: vehicleError.code
      })
    }

    return NextResponse.json({ 
      vehicles,
      specificVehicle: vehicle
    })
  }

  return NextResponse.json({ vehicles })
}