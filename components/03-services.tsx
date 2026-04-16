"use client"

import { useState } from "react"
import Image from "next/image"
import { 
  Box, 
  Scan, 
  FileText, 
  Monitor,
  ChevronRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WhatsAppIcon } from "@/components/icons"
import { useLeadModal } from "./13-lead-modal"

const serviceCategories = [
  {
    id: "tomografia",
    label: "Tomografia / 3D",
    icon: Box,
    services: [
      {
        title: "Tomografia Computadorizada (Cone Beam / CBCT)",
        description: "Imagens 3D de alta resolução para diagnósticos precisos e planejamento de tratamentos complexos.",
        indications: ["Planejamento de implantes", "Avaliação de lesões", "Cirurgias bucomaxilofaciais"],
        image: "/exames_e_servicos/Tomografia Computadorizada (Cone Beam  CBCT).webp",
      },
      {
        title: "Arquivos 3D e Impressão 3D",
        description: "Biomodelos e planejamento cirúrgico com tecnologia de impressão 3D para maior precisão nos procedimentos.",
        indications: ["Planejamento cirúrgico", "Próteses personalizadas", "Estudo anatômico"],
        image: "/exames_e_servicos/Arquivos 3D e Impressão 3D.webp",
      },
    ],
  },
  {
    id: "radiografias",
    label: "Radiografias",
    icon: Scan,
    services: [
      {
        title: "Radiografia Panorâmica",
        description: "Visão completa de toda a arcada dentária, maxilares e estruturas adjacentes em uma única imagem.",
        indications: ["Avaliação geral", "Planejamento ortodôntico", "Detecção de cáries e lesões"],
        image: "/exames_e_servicos/radiografia-panoramica-maraba.webp",
      },
      {
        title: "Radiografia Periapical",
        description: "Imagem detalhada de dentes específicos, raízes e osso circundante para diagnósticos precisos.",
        indications: ["Tratamento de canal", "Avaliação de raízes", "Diagnóstico de abscessos"],
        image: "/exames_e_servicos/Radiografia Panorâmica (Raio x).webp",
      },
    ],
  },
  {
    id: "ortodontia",
    label: "Ortodontia",
    icon: FileText,
    services: [
      {
        title: "Documentação Ortodôntica Completa",
        description: "Pacote completo com todas as radiografias, fotos e análises necessárias para o tratamento ortodôntico.",
        indications: ["Início de tratamento ortodôntico", "Planejamento de aparelho", "Controle de tratamento"],
        image: "/exames_e_servicos/Documentação Ortodôntica Completa.webp",
      },
      {
        title: "Telerradiografia + Traçado Cefalométrico",
        description: "Análise lateral do crânio com traçado digital para planejamento ortodôntico e cirúrgico.",
        indications: ["Análise facial", "Planejamento ortodôntico", "Cirurgia ortognática"],
        image: "/exames_e_servicos/Telerradiografia + Traçado Cefalométrico.webp",
      },
    ],
  },
  {
    id: "digital",
    label: "Escaneamento intraoral",
    icon: Monitor,
    services: [
      {
        title: "Scanner e Entrega Digital",
        description: "Escaneamento intraoral e entrega de arquivos digitais para agilizar o fluxo de trabalho do consultório.",
        indications: ["Próteses digitais", "Alinhadores transparentes", "CAD/CAM"],
        image: "/exames_e_servicos/Scanner e Entrega Digital.webp",
      },
    ],
  },
]

export function Services() {
  const [activeTab, setActiveTab] = useState("tomografia")
  const { openModal } = useLeadModal()

  return (
    <section id="servicos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Exames e Serviços
          </h2>
          <p className="text-lg text-muted-foreground">
            Escolha o serviço que você precisa. Se estiver em dúvida, nossa equipe orienta no WhatsApp.
          </p>
        </div>

        {/* Services Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0 mb-8">
            {serviceCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary transition-all"
              >
                <category.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">{category.label.split(" ")[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {serviceCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid md:grid-cols-2 gap-6">
                {category.services.map((service, index) => (
                  <Card 
                    key={index} 
                    className="group hover:shadow-lg transition-shadow duration-300 border-border"
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary">
                          <category.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-foreground mb-2">
                            {service.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground leading-relaxed">
                            {service.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {service.image && (
                        <div className="mb-4 overflow-hidden rounded-xl border border-border/70 bg-secondary/30">
                          <div className="relative aspect-video w-full">
                            {/**
                             * Arquivos com '+' no nome podem falhar em alguns ambientes
                             * se o caractere não for codificado explicitamente.
                             * aspect-video padroniza todas as imagens em 16:9 (800x450).
                             */}
                            <Image
                              src={encodeURI(service.image).replace(/\+/g, "%2B")}
                              alt={`Imagem do serviço ${service.title}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        </div>
                      )}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-foreground mb-2">Indicado para:</p>
                        <div className="flex flex-wrap gap-2">
                          {service.indications.map((indication, i) => (
                            <span
                              key={i}
                              className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                            >
                              {indication}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button
                        onClick={openModal}
                        variant="outline"
                        className="w-full rounded-full border-2 transition-colors duration-200 group-hover:border-[#25D366] group-hover:bg-[#25D366] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#25D366]/25"
                      >
                        <WhatsAppIcon className="size-4! opacity-90 group-hover:text-white" />
                        Agendar este exame
                        <ChevronRight className="size-4! opacity-80 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
