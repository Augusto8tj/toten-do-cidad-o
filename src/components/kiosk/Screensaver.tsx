
"use client"

import Image from 'next/image'
import { ScreensaverItem, TranslationType } from '@/store/kiosk-store'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

interface Props {
  items: ScreensaverItem[];
  onDismiss: () => void;
  t: TranslationType;
}

export function Screensaver({ items, onDismiss, t }: Props) {
  return (
    <div 
      className="fixed inset-0 z-[200] bg-black cursor-pointer overflow-hidden"
      onClick={onDismiss}
    >
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full h-full"
      >
        <CarouselContent className="h-screen m-0">
          {items.map((item) => (
            <CarouselItem key={item.id} className="p-0 h-full relative">
              <Image
                src={item.imageUrl}
                alt={item.caption || "Kiosk content"}
                fill
                className="object-cover brightness-75"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-24">
                <h2 className="text-white text-7xl font-headline font-bold mb-8 max-w-4xl">
                  {item.caption}
                </h2>
                <p className="text-white/80 text-3xl font-medium animate-pulse">
                  {t.touchToStart}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
