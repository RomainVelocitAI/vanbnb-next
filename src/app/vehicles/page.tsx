import { Suspense } from "react"
import { createServiceClient } from "@/lib/supabase/server"
import VehiclesClient from "./vehicles-client"

async function getVehicles() {
  const supabase = await createServiceClient()
  
  const { data: vehicles, error } = await supabase
    .from('vehicles')
    .select(`
      *,
      vehicle_photos (
        photo_url,
        photo_order,
        is_primary
      ),
      vehicle_equipment (
        equipment_name,
        equipment_category
      )
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching vehicles:", error)
    return []
  }

  // Transform data to match our interface
  const transformedVehicles = (vehicles || []).map(v => {
    // Get the primary photo or first available photo
    const photos = v.vehicle_photos || []
    const photoUrls = photos
      .sort((a: any, b: any) => a.photo_order - b.photo_order)
      .map((p: any) => p.photo_url)
    
    // Map equipment to features
    const equipment = v.vehicle_equipment || []
    const features = equipment.map((e: any) => {
      // Map equipment categories to our feature icons
      const categoryMap: { [key: string]: string } = {
        'kitchen': 'kitchen',
        'bathroom': 'shower',
        'comfort': 'bed',
        'technology': 'wifi',
        'heating': 'heating'
      }
      
      // Map specific equipment names to features
      if (e.equipment_name.toLowerCase().includes('wifi')) return 'wifi'
      if (e.equipment_name.toLowerCase().includes('douche')) return 'shower'
      if (e.equipment_name.toLowerCase().includes('wc')) return 'wc'
      if (e.equipment_name.toLowerCase().includes('cuisine') || e.equipment_name.toLowerCase().includes('réfrigérateur')) return 'kitchen'
      if (e.equipment_name.toLowerCase().includes('lit')) return 'bed'
      if (e.equipment_name.toLowerCase().includes('chauffage') || e.equipment_name.toLowerCase().includes('climatisation')) return 'heating'
      if (e.equipment_name.toLowerCase().includes('café')) return 'coffee'
      
      return categoryMap[e.equipment_category] || 'bed'
    }).filter((f: string, index: number, self: string[]) => self.indexOf(f) === index) // Remove duplicates
    
    return {
      id: v.id,
      name: `${v.brand} ${v.model} ${v.year}`,
      type: v.vehicle_type || "van",
      location: v.pickup_location_address?.split(',').slice(-2).join(',').trim() || "France",
      price_per_day: parseFloat(v.price_per_day) || 100,
      capacity: v.capacity_passengers || 2,
      rating: v.average_rating || 4.5,
      reviews_count: v.total_reviews || 0,
      images: photoUrls.length > 0 
        ? photoUrls 
        : ["https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600"],
      features: features.length > 0 ? features : ['bed', 'kitchen'],
      fuel_type: v.fuel_type || "diesel",
      transmission: v.transmission || "manual",
      available: true
    }
  })

  return transformedVehicles
}

export default async function VehiclesPage() {
  const vehicles = await getVehicles()

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <VehiclesClient initialVehicles={vehicles} />
    </Suspense>
  )
}