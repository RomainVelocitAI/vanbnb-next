import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Vehicle {
  id: string
  partner_id: string
  vehicle_type: 'camping_car' | 'van' | 'fourgon'
  brand: string
  model: string
  year: number
  capacity_passengers: number
  capacity_sleep: number
  price_per_day: number
  deposit_amount: number
  pickup_location_address: string
  status: 'draft' | 'active' | 'inactive' | 'maintenance'
  description?: string
  created_at: string
  partner?: Partner
  vehicle_photos?: VehiclePhoto[]
  reviews?: Review[]
  average_rating?: number
  total_reviews?: number
}

export interface Partner {
  id: string
  company_name: string
  status: 'pending' | 'verified' | 'suspended' | 'rejected'
  validated_at?: string
}

export interface VehiclePhoto {
  id: string
  vehicle_id: string
  photo_url: string
  is_primary: boolean
  caption?: string
}

export interface Review {
  id: string
  vehicle_id: string
  client_id: string
  rating_overall: number
  rating_cleanliness?: number
  rating_communication?: number
  rating_checkin?: number
  rating_value?: number
  comment?: string
  created_at: string
}

export async function getTopRatedVehicles(limit: number = 10) {
  const { data, error } = await supabase
    .from('vehicles')
    .select(`
      *,
      partner:partners!inner(
        id,
        company_name,
        status
      ),
      vehicle_photos(
        photo_url,
        is_primary,
        caption
      ),
      reviews(
        rating_overall
      )
    `)
    .eq('status', 'active')
    .eq('partner.status', 'verified')
    .limit(limit)

  if (error) {
    console.error('Error fetching top rated vehicles:', error)
    return []
  }

  // Calculate average ratings and sort by rating
  const vehiclesWithRatings = data?.map(vehicle => {
    const ratings = vehicle.reviews || []
    const averageRating = ratings.length > 0
      ? ratings.reduce((sum: number, review: Review) => sum + review.rating_overall, 0) / ratings.length
      : 0
    
    return {
      ...vehicle,
      average_rating: averageRating,
      total_reviews: ratings.length
    }
  }) || []

  // Sort by average rating (descending) and filter only vehicles with reviews
  return vehiclesWithRatings
    .filter(v => v.total_reviews > 0)
    .sort((a, b) => b.average_rating - a.average_rating)
    .slice(0, limit)
}

export async function searchVehicles(params: {
  location?: string
  startDate?: string
  endDate?: string
  vehicleType?: string
  minPrice?: number
  maxPrice?: number
  capacity?: number
}) {
  let query = supabase
    .from('vehicles')
    .select(`
      *,
      partner:partners!inner(
        id,
        company_name,
        status
      ),
      vehicle_photos(
        photo_url,
        is_primary,
        caption
      ),
      reviews(
        rating_overall
      )
    `)
    .eq('status', 'active')
    .eq('partner.status', 'verified')

  if (params.vehicleType) {
    query = query.eq('vehicle_type', params.vehicleType)
  }

  if (params.minPrice) {
    query = query.gte('price_per_day', params.minPrice)
  }

  if (params.maxPrice) {
    query = query.lte('price_per_day', params.maxPrice)
  }

  if (params.capacity) {
    query = query.gte('capacity_sleep', params.capacity)
  }

  if (params.location) {
    query = query.ilike('pickup_location_address', `%${params.location}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error searching vehicles:', error)
    return []
  }

  // Calculate average ratings
  return data?.map(vehicle => {
    const ratings = vehicle.reviews || []
    const averageRating = ratings.length > 0
      ? ratings.reduce((sum: number, review: Review) => sum + review.rating_overall, 0) / ratings.length
      : 0
    
    return {
      ...vehicle,
      average_rating: averageRating,
      total_reviews: ratings.length
    }
  }) || []
}