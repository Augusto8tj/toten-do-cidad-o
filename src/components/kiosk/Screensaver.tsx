
"use client"

import Image from 'next/image'
import { ScreensaverItem, TranslationType } from '@/store/kiosk-store'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from '@/lib/utils'

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
                className="object-cover"
                priority
              />
              <div 
                className="absolute inset-0 flex flex-col justify-end p-24 transition-colors duration-500"
                style={{ backgroundColor: `rgba(0,0,0,${(item.overlayOpacity || 60)/100})` }}
              >
                <h2 
                  className={cn(
                    "mb-8 max-w-5xl leading-tight transition-all",
                    item.fontFamily || 'font-headline',
                    item.fontSize || 'text-7xl',
                    item.textAlignment === 'center' ? 'text-center' : item.textAlignment === 'right' ? 'text-right' : 'text-left',
                    item.textAlignment === 'center' ? 'mx-auto' : item.textAlignment === 'right' ? 'ml-auto' : ''
                  )}
                  style={{ color: item.textColor || '#ffffff' }}
                >
                  {item.caption}
                </h2>
                <p 
                  className={cn(
                    "text-white/60 text-3xl font-medium animate-pulse",
                    item.textAlignment === 'center' ? 'text-center' : item.textAlignment === 'right' ? 'text-right' : 'text-left'
                  )}
                >
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
