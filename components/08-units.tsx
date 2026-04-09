"use client"

import Image from "next/image"
import { MapPin, Clock, Phone, ExternalLink } from "lucide-react"
import { GoogleMapsIcon } from "@/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const locations = [
  {
    name: "Unidade Novo Horizonte (disponível Tomografia)",
    address: "Av. Tocantins, 611 - B - Novo Horizonte, Marabá - PA",
    city: "Marabá - PA, 68503-660",
    hours: "Segunda a Sexta: 8h às 19h | Sábado: 8h às 12h",
    phone: "(94) 99160-8181",
    phoneHref: "tel:+5594991608181",
    googleMapsUrl: "https://maps.app.goo.gl/iPAz1Lxu121KQbFU7",
    images: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fachada-rx-digital-maraba-avenida-tocantins-WchXEzk3GQIDsheA7lXI4w18YdKvmd.jpeg",
        alt: "Fachada da RX Digital - Unidade Novo Horizonte",
      },
    ],
  },
  {
    name: "Unidade Nova Marabá - Shopping Verdes Mares",
    subtitle: "Shopping Verdes Mares",
    address: "Folha 27 quadra especial - Nova - Nova Marabá, Marabá - PA",
    city: "Nova Marabá, Marabá - PA, 68509-100",
    hours: "Segunda a Sexta: 8h às 19h | Sábado: 8h às 12h",
    phone: "(94) 99155-8181",
    phoneHref: "tel:+5594991558181",
    googleMapsUrl: "https://maps.app.goo.gl/FmDhoYT8MdvJTXi6A",
    images: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fachada-rx-digital-maraba-shopping-verdes-mares-86rLNIQUnWSCcOxZMRLQ3jEZBGTOfV.jpg",
        alt: "Fachada da RX Digital - Unidade Shopping Verdes Mares",
      },
    ],
  },
]

export function Units() {
  return (
    <section id="unidades" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Nossas Unidades em Marabá
          </h2>
          <p className="text-lg text-muted-foreground">
            Duas localizações estratégicas para melhor atender você e toda a região.
          </p>
        </div>

        {/* Units Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <Card key={index} className="overflow-hidden border-border hover:shadow-lg transition-shadow">
              {/* Image Gallery */}
              <div className="relative aspect-video">
                <Image
                  src={location.images[0].src}
                  alt={location.images[0].alt}
                  fill
                  className="object-cover"
                />
                {location.subtitle && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {location.subtitle}
                  </div>
                )}
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-foreground">
                  {location.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground">{location.address}</p>
                    <p className="text-muted-foreground">{location.city}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{location.hours}</p>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <a 
                    href={location.phoneHref} 
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {location.phone}
                  </a>
                </div>

                {/* Google Maps Button */}
                <Button
                  asChild
                  variant="outline"
                  className="w-full mt-4 rounded-full"
                >
                  <a 
                    href={location.googleMapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <GoogleMapsIcon className="!size-[1.05rem] text-[#1a73e8]" />
                    Abrir no Google Maps
                    <ExternalLink className="!size-4 opacity-70" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
