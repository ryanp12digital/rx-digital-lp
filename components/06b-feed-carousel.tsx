"use client"

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const feedImages = [
  "/carrossel/img feed carrol 01.png",
  "/carrossel/img feed carrol 02.png",
  "/carrossel/img feed carrol 03.png",
  "/carrossel/img feed carrol 04.png",
  "/carrossel/img feed carrol 05.png",
  "/carrossel/img feed carrol 06.png",
  "/carrossel/img feed carrol 07.png",
  "/carrossel/img feed carrol 08.png",
  "/carrossel/img feed carrol 09.png",
  "/carrossel/img feed carrol 10.png",
  "/carrossel/img feed carrol 11.png",
  "/carrossel/img feed carrol 12.png",
  "/carrossel/img feed carrol 13.png",
  "/carrossel/img feed carrol 14.png",
]

export function FeedCarousel() {
  return (
    <section id="carrossel-feed" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Casos e Bastidores
          </h2>
          <p className="text-lg text-muted-foreground">
            Confira alguns registros do dia a dia da RX Digital.
          </p>
        </div>

        <div className="mx-auto max-w-6xl px-10 sm:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {feedImages.map((image, index) => (
                <CarouselItem
                  key={image}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                    <div className="relative aspect-4/5 w-full">
                      <Image
                        src={image}
                        alt={`Imagem do feed RX Digital ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:left-3 md:left-4" />
            <CarouselNext className="right-2 sm:right-3 md:right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
