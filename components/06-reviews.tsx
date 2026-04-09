"use client"

import { Star, ExternalLink } from "lucide-react"
import { GoogleIcon } from "@/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const units = [
  {
    name: "Unidade Novo Horizonte (disponível Tomografia)",
    location: "Av. Tocantins, 611 - B - Novo Horizonte, Marabá - PA",
    rating: 5.0,
    totalReviews: 77,
    googleUrl: "https://maps.app.goo.gl/iPAz1Lxu121KQbFU7",
    reviews: [
      {
        name: "Dra. Camila Souza",
        initials: "CS",
        rating: 5,
        text: "Indico para todos os meus pacientes. Laudos precisos, entrega rápida e a equipe sempre disponível para tirar dúvidas. Parceria que facilita muito o trabalho no consultório.",
        date: "2 semanas atrás",
      },
      {
        name: "Marcos Oliveira",
        initials: "MO",
        rating: 5,
        text: "Fiz a tomografia para implante e fiquei impressionado com a qualidade. O técnico explicou todo o procedimento e recebi o arquivo no mesmo dia pelo WhatsApp.",
        date: "1 mês atrás",
      },
      {
        name: "Juliana Mendes",
        initials: "JM",
        rating: 5,
        text: "Atendimento humanizado de verdade. Minha filha estava nervosa e a equipe deixou ela super tranquila. Estrutura moderna e organizada.",
        date: "1 mês atrás",
      },
    ],
  },
  {
    name: "Unidade Nova Marabá - Shopping Verdes Mares",
    location: "Folha 27 quadra especial - Nova - Nova Marabá, Marabá - PA",
    rating: 5.0,
    totalReviews: 43,
    googleUrl: "https://maps.app.goo.gl/FmDhoYT8MdvJTXi6A",
    reviews: [
      {
        name: "Dr. Ricardo Alves",
        initials: "RA",
        rating: 5,
        text: "Excelente localização e praticidade. Meus pacientes agradecem a facilidade de fazer o exame no shopping. Qualidade impecável nos laudos.",
        date: "3 semanas atrás",
      },
      {
        name: "Patrícia Lima",
        initials: "PL",
        rating: 5,
        text: "Vim de Parauapebas fazer a documentação ortodôntica do meu filho. Valeu cada quilômetro! Tudo pronto em poucas horas e atendimento nota 10.",
        date: "1 mês atrás",
      },
      {
        name: "Fernando Costa",
        initials: "FC",
        rating: 5,
        text: "Precisei de uma panorâmica urgente e consegui encaixe no mesmo dia. Equipe muito profissional e ambiente super agradável.",
        date: "2 meses atrás",
      },
    ],
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating 
              ? "fill-yellow-400 text-yellow-400" 
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

export function Reviews() {
  return (
    <section id="avaliacoes" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Avaliações no Google
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja o que nossos pacientes dizem sobre a experiência na RX Digital.
          </p>
        </div>

        {/* Overall Rating Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12 p-6 bg-secondary rounded-2xl">
          <div className="text-center">
            <div className="text-5xl font-bold text-foreground mb-2">5,0</div>
            <div className="flex justify-center mb-2">
              <StarRating rating={5} />
            </div>
            <p className="text-sm text-muted-foreground">Nota máxima</p>
          </div>
          <div className="h-16 w-px bg-border hidden sm:block" />
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground mb-2">120</div>
            <p className="text-sm text-muted-foreground">Avaliações no Google</p>
          </div>
          <div className="h-16 w-px bg-border hidden sm:block" />
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground mb-2">2</div>
            <p className="text-sm text-muted-foreground">Unidades em Marabá</p>
          </div>
        </div>

        {/* Unit Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {units.map((unit, unitIndex) => (
            <Card key={unitIndex} className="border-border">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-foreground mb-1">
                      {unit.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{unit.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl font-bold text-foreground">{unit.rating}</span>
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </div>
                    <p className="text-xs text-muted-foreground">{unit.totalReviews} avaliações</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Reviews */}
                {unit.reviews.map((review, reviewIndex) => (
                  <div 
                    key={reviewIndex}
                    className="p-4 bg-secondary/50 rounded-xl"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-accent/10 text-accent text-sm font-medium">
                          {review.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground text-sm">
                            {review.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {`"${review.text}"`}
                    </p>
                  </div>
                ))}

                {/* Google Button */}
                <Button
                  asChild
                  variant="outline"
                  className="w-full mt-4 rounded-full"
                >
                  <a href={unit.googleUrl} target="_blank" rel="noopener noreferrer">
                    <GoogleIcon className="!size-[1.05rem]" />
                    Ver no Google
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
