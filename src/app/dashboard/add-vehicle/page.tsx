"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Upload, Plus, X, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

const vehicleTypes = [
  { value: "van", label: "Van aménagé" },
  { value: "campervan", label: "Camping-car" },
  { value: "fourgon", label: "Fourgon" },
  { value: "4x4", label: "4x4 aménagé" },
  { value: "minivan", label: "Mini-van" },
]

const fuelTypes = [
  { value: "diesel", label: "Diesel" },
  { value: "essence", label: "Essence" },
  { value: "hybride", label: "Hybride" },
  { value: "electrique", label: "Électrique" },
]

const transmissionTypes = [
  { value: "manuelle", label: "Manuelle" },
  { value: "automatique", label: "Automatique" },
]

const equipmentOptions = [
  { id: "wifi", label: "WiFi", category: "connectivity" },
  { id: "cuisine", label: "Cuisine équipée", category: "comfort" },
  { id: "frigo", label: "Réfrigérateur", category: "comfort" },
  { id: "douche", label: "Douche", category: "hygiene" },
  { id: "wc", label: "WC", category: "hygiene" },
  { id: "chauffage", label: "Chauffage", category: "comfort" },
  { id: "climatisation", label: "Climatisation", category: "comfort" },
  { id: "lit_double", label: "Lit double", category: "sleeping" },
  { id: "lit_simple", label: "Lit simple", category: "sleeping" },
  { id: "convertible", label: "Banquette convertible", category: "sleeping" },
  { id: "table", label: "Table", category: "comfort" },
  { id: "rangements", label: "Espaces de rangement", category: "storage" },
  { id: "panneaux_solaires", label: "Panneaux solaires", category: "energy" },
  { id: "prise_220v", label: "Prise 220V", category: "energy" },
  { id: "usb", label: "Ports USB", category: "energy" },
  { id: "store", label: "Store extérieur", category: "exterior" },
  { id: "porte_velos", label: "Porte-vélos", category: "exterior" },
  { id: "coffre_toit", label: "Coffre de toit", category: "exterior" },
]

export default function AddVehiclePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState("informations")
  
  // Form state
  const [formData, setFormData] = useState({
    // Informations générales
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    type: "",
    registration: "",
    
    // Caractéristiques
    capacity: 2,
    beds: 2,
    fuel_type: "",
    transmission: "",
    mileage: "",
    
    // Tarification
    price_per_day: "",
    price_per_week: "",
    deposit: "",
    
    // Localisation
    location: "",
    latitude: "",
    longitude: "",
    
    // Description
    title: "",
    description: "",
    
    // Équipements
    equipment: [] as string[],
    
    // Photos
    photos: [] as File[],
    photoUrls: [] as string[],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEquipmentToggle = (equipmentId: string) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.includes(equipmentId)
        ? prev.equipment.filter(id => id !== equipmentId)
        : [...prev.equipment, equipmentId]
    }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newPhotos = Array.from(files)
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }))
      
      // Create preview URLs
      newPhotos.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            photoUrls: [...prev.photoUrls, reader.result as string]
          }))
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
      photoUrls: prev.photoUrls.filter((_, i) => i !== index)
    }))
  }

  const validateForm = () => {
    // Validation basique
    if (!formData.brand || !formData.model || !formData.type) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      setCurrentStep("informations")
      return false
    }
    
    if (!formData.fuel_type || !formData.transmission) {
      toast.error("Veuillez remplir les caractéristiques du véhicule")
      setCurrentStep("caracteristiques")
      return false
    }
    
    if (!formData.price_per_day || !formData.deposit) {
      toast.error("Veuillez définir les tarifs")
      setCurrentStep("tarification")
      return false
    }
    
    if (!formData.location) {
      toast.error("Veuillez indiquer la localisation")
      setCurrentStep("localisation")
      return false
    }
    
    if (!formData.title || !formData.description) {
      toast.error("Veuillez ajouter un titre et une description")
      setCurrentStep("description")
      return false
    }
    
    if (formData.photos.length === 0) {
      toast.error("Veuillez ajouter au moins une photo")
      setCurrentStep("photos")
      return false
    }
    
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    
    setLoading(true)
    const supabase = createClient()
    
    try {
      // Vérifier l'authentification
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error("Vous devez être connecté pour ajouter un véhicule")
        router.push("/auth")
        return
      }
      
      // Récupérer l'ID du partenaire
      const { data: partner, error: partnerError } = await supabase
        .from("partners")
        .select("id")
        .eq("user_id", user.id)
        .single()
      
      if (partnerError || !partner) {
        toast.error("Profil partenaire non trouvé")
        return
      }
      
      // Upload des photos
      const uploadedPhotoUrls = []
      for (let i = 0; i < formData.photos.length; i++) {
        const file = formData.photos[i]
        const fileName = `${partner.id}/${Date.now()}_${i}_${file.name}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("vehicle-photos")
          .upload(fileName, file)
        
        if (uploadError) {
          console.error("Erreur upload photo:", uploadError)
          continue
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from("vehicle-photos")
          .getPublicUrl(fileName)
        
        uploadedPhotoUrls.push(publicUrl)
      }
      
      // Créer le véhicule
      const vehicleData = {
        partner_id: partner.id,
        brand: formData.brand,
        model: formData.model,
        year: formData.year,
        type: formData.type,
        registration: formData.registration,
        capacity: formData.capacity,
        beds: formData.beds,
        fuel_type: formData.fuel_type,
        transmission: formData.transmission,
        mileage: parseInt(formData.mileage) || 0,
        price_per_day: parseFloat(formData.price_per_day),
        price_per_week: parseFloat(formData.price_per_week) || parseFloat(formData.price_per_day) * 7 * 0.9,
        deposit: parseFloat(formData.deposit),
        location: formData.location,
        latitude: parseFloat(formData.latitude) || null,
        longitude: parseFloat(formData.longitude) || null,
        title: formData.title,
        description: formData.description,
        status: "active",
        created_at: new Date().toISOString(),
      }
      
      const { data: vehicle, error: vehicleError } = await supabase
        .from("vehicles")
        .insert([vehicleData])
        .select()
        .single()
      
      if (vehicleError) {
        console.error("Erreur création véhicule:", vehicleError)
        toast.error("Erreur lors de la création du véhicule")
        return
      }
      
      // Ajouter les photos
      if (uploadedPhotoUrls.length > 0 && vehicle) {
        const photoData = uploadedPhotoUrls.map((url, index) => ({
          vehicle_id: vehicle.id,
          photo_url: url,
          photo_order: index + 1,
        }))
        
        await supabase.from("vehicle_photos").insert(photoData)
      }
      
      // Ajouter les équipements
      if (formData.equipment.length > 0 && vehicle) {
        const equipmentData = formData.equipment.map(equipmentId => ({
          vehicle_id: vehicle.id,
          [equipmentId]: true,
        }))
        
        await supabase.from("vehicle_equipment").insert(equipmentData)
      }
      
      toast.success("Véhicule ajouté avec succès !")
      router.push("/dashboard")
      
    } catch (error) {
      console.error("Erreur:", error)
      toast.error("Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au dashboard
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900">Ajouter un véhicule</h1>
          <p className="text-gray-600 mt-2">
            Complétez les informations de votre véhicule pour le proposer à la location
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl">
            {["informations", "caracteristiques", "tarification", "localisation", "description", "equipements", "photos"].map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${index !== 6 ? "flex-1" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                    ${currentStep === step 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-200 text-gray-600"}`}
                >
                  {index + 1}
                </div>
                {index !== 6 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    ["informations", "caracteristiques", "tarification", "localisation", "description", "equipements"].indexOf(currentStep) > index
                      ? "bg-blue-600" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <Tabs value={currentStep} onValueChange={setCurrentStep}>
              <TabsList className="grid grid-cols-7 w-full mb-8">
                <TabsTrigger value="informations">Infos</TabsTrigger>
                <TabsTrigger value="caracteristiques">Specs</TabsTrigger>
                <TabsTrigger value="tarification">Tarifs</TabsTrigger>
                <TabsTrigger value="localisation">Lieu</TabsTrigger>
                <TabsTrigger value="description">Desc.</TabsTrigger>
                <TabsTrigger value="equipements">Équip.</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>

              {/* Informations générales */}
              <TabsContent value="informations" className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="brand">Marque *</Label>
                    <Input
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      placeholder="Ex: Volkswagen"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="model">Modèle *</Label>
                    <Input
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      placeholder="Ex: California"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="year">Année</Label>
                    <Input
                      id="year"
                      name="year"
                      type="number"
                      value={formData.year}
                      onChange={handleInputChange}
                      min="1990"
                      max={new Date().getFullYear() + 1}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="type">Type de véhicule *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => handleSelectChange("type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="registration">Immatriculation</Label>
                    <Input
                      id="registration"
                      name="registration"
                      value={formData.registration}
                      onChange={handleInputChange}
                      placeholder="Ex: AB-123-CD"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    onClick={() => setCurrentStep("caracteristiques")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Suivant
                  </Button>
                </div>
              </TabsContent>

              {/* Caractéristiques */}
              <TabsContent value="caracteristiques" className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="capacity">Nombre de places *</Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      min="1"
                      max="9"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="beds">Nombre de couchages</Label>
                    <Input
                      id="beds"
                      name="beds"
                      type="number"
                      value={formData.beds}
                      onChange={handleInputChange}
                      min="0"
                      max="8"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fuel_type">Type de carburant *</Label>
                    <Select
                      value={formData.fuel_type}
                      onValueChange={(value) => handleSelectChange("fuel_type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="transmission">Transmission *</Label>
                    <Select
                      value={formData.transmission}
                      onValueChange={(value) => handleSelectChange("transmission", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        {transmissionTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="mileage">Kilométrage</Label>
                    <Input
                      id="mileage"
                      name="mileage"
                      type="number"
                      value={formData.mileage}
                      onChange={handleInputChange}
                      placeholder="Ex: 50000"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("informations")}
                  >
                    Précédent
                  </Button>
                  <Button
                    onClick={() => setCurrentStep("tarification")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Suivant
                  </Button>
                </div>
              </TabsContent>

              {/* Tarification */}
              <TabsContent value="tarification" className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Définissez vos tarifs de location. Vous pourrez les modifier à tout moment.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="price_per_day">Prix par jour (€) *</Label>
                    <Input
                      id="price_per_day"
                      name="price_per_day"
                      type="number"
                      value={formData.price_per_day}
                      onChange={handleInputChange}
                      placeholder="Ex: 80"
                      min="1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="price_per_week">Prix par semaine (€)</Label>
                    <Input
                      id="price_per_week"
                      name="price_per_week"
                      type="number"
                      value={formData.price_per_week}
                      onChange={handleInputChange}
                      placeholder={`Ex: ${parseInt(formData.price_per_day || "0") * 7 * 0.9}`}
                      min="1"
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="deposit">Caution (€) *</Label>
                    <Input
                      id="deposit"
                      name="deposit"
                      type="number"
                      value={formData.deposit}
                      onChange={handleInputChange}
                      placeholder="Ex: 1500"
                      min="100"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("caracteristiques")}
                  >
                    Précédent
                  </Button>
                  <Button
                    onClick={() => setCurrentStep("localisation")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Suivant
                  </Button>
                </div>
              </TabsContent>

              {/* Localisation */}
              <TabsContent value="localisation" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="location">Ville ou adresse *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Ex: Lyon, France"
                      required
                    />
                  </div>
                  
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      L'adresse exacte ne sera communiquée qu'aux locataires confirmés.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="latitude">Latitude (optionnel)</Label>
                      <Input
                        id="latitude"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleInputChange}
                        placeholder="Ex: 45.764043"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="longitude">Longitude (optionnel)</Label>
                      <Input
                        id="longitude"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleInputChange}
                        placeholder="Ex: 4.835659"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("tarification")}
                  >
                    Précédent
                  </Button>
                  <Button
                    onClick={() => setCurrentStep("description")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Suivant
                  </Button>
                </div>
              </TabsContent>

              {/* Description */}
              <TabsContent value="description" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Titre de l'annonce *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Ex: Van aménagé tout confort pour vos aventures"
                      maxLength={100}
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.title.length}/100 caractères
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description détaillée *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Décrivez votre véhicule, ses équipements, ses avantages..."
                      rows={8}
                      maxLength={2000}
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.description.length}/2000 caractères
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("localisation")}
                  >
                    Précédent
                  </Button>
                  <Button
                    onClick={() => setCurrentStep("equipements")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Suivant
                  </Button>
                </div>
              </TabsContent>

              {/* Équipements */}
              <TabsContent value="equipements" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Sélectionnez les équipements disponibles
                  </h3>
                  
                  <div className="space-y-6">
                    {["connectivity", "comfort", "hygiene", "sleeping", "storage", "energy", "exterior"].map(category => (
                      <div key={category}>
                        <h4 className="text-sm font-medium text-gray-700 mb-3 capitalize">
                          {category === "connectivity" ? "Connectivité" :
                           category === "comfort" ? "Confort" :
                           category === "hygiene" ? "Hygiène" :
                           category === "sleeping" ? "Couchage" :
                           category === "storage" ? "Rangement" :
                           category === "energy" ? "Énergie" : "Extérieur"}
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {equipmentOptions
                            .filter(eq => eq.category === category)
                            .map(equipment => (
                              <div key={equipment.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={equipment.id}
                                  checked={formData.equipment.includes(equipment.id)}
                                  onCheckedChange={() => handleEquipmentToggle(equipment.id)}
                                />
                                <Label
                                  htmlFor={equipment.id}
                                  className="text-sm font-normal cursor-pointer"
                                >
                                  {equipment.label}
                                </Label>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("description")}
                  >
                    Précédent
                  </Button>
                  <Button
                    onClick={() => setCurrentStep("photos")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Suivant
                  </Button>
                </div>
              </TabsContent>

              {/* Photos */}
              <TabsContent value="photos" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Ajoutez des photos de votre véhicule
                  </h3>
                  
                  <Alert className="mb-4">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Ajoutez au moins 3 photos de bonne qualité. La première photo sera l'image principale.
                    </AlertDescription>
                  </Alert>
                  
                  {/* Upload zone */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">
                      Glissez vos photos ici ou cliquez pour parcourir
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Label htmlFor="photo-upload">
                      <Button variant="outline" asChild>
                        <span>Choisir des photos</span>
                      </Button>
                    </Label>
                  </div>
                  
                  {/* Photos preview */}
                  {formData.photoUrls.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                      {formData.photoUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          {index === 0 && (
                            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                              Photo principale
                            </span>
                          )}
                          <button
                            onClick={() => removePhoto(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("equipements")}
                  >
                    Précédent
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Création en cours...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Publier le véhicule
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}