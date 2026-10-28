'use client';

import Image from 'next/image';
import { useMemo } from 'react';

export type HotelImage = {
  src: string;
  alt: string;
};

type ImageStreamHeroProps = {
  images?: HotelImage[];
  speed?: number;
  cardsPerRail?: number;
  axisPercent?: number;
  cardRadius?: string;
  railGap?: number;
  className?: string;
};

const defaultImages: HotelImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    alt: 'Luxury hotel bedroom with elegant furnishings'
  },
  {
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    alt: 'Premium resort with contemporary architecture'
  },
  {
    src: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    alt: 'Ocean-view hotel room with balcony seating'
  },
  {
    src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    alt: 'Mountain resort and scenic getaway'
  },
  {
    src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    alt: 'Luxury hotel pool surrounded by lush landscaping'
  },
  {
    src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    alt: 'Executive suite in a modern hospitality venue'
  }
];

export function ImageStreamHero({
  images = defaultImages,
  speed = 22,
  cardsPerRail = 9,
  axisPercent = 52,
  cardRadius = '28px',
  railGap = 18,
  className = ''
}: ImageStreamHeroProps) {
  const rails = useMemo(
    () => [
      { direction: 'left', top: 8, rotate: 'rotateX(58deg) rotateY(2deg)', translateY: 0, opacity: 1 },
      { direction: 'right', top: 34, rotate: 'rotateX(54deg) rotateY(-4deg)', translateY: 0, opacity: 0.96 },
      { direction: 'left', top: 60, rotate: 'rotateX(52deg) rotateY(2deg)', translateY: 0, opacity: 0.92 }
    ],
    []
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-900/20" />
      <div className="hero-grid absolute inset-0 opacity-30" />

      {rails.map((rail, idx) => (
        <div
          key={idx}
          className="absolute inset-x-0"
          style={{
            top: `${rail.top}%`,
            left: `${(100 - axisPercent) / 2}%`,
            width: `${axisPercent}%`,
            transform: `translateY(${rail.translateY}px)`,
            opacity: rail.opacity,
            perspective: '1800px',
            height: '28%'
          }}
        >
          <div
            className={`rail-track rail-track-${rail.direction} flex items-center`}
            style={{
              width: '180%',
              minWidth: '1400px',
              gap: `${railGap}px`,
              animationDuration: `${speed}s`,
              transform: rail.rotate,
              transformOrigin: 'center center'
            }}
          >
            {Array.from({ length: cardsPerRail * 2 }, (_, cardIndex) => {
              const image = images[cardIndex % images.length];

              return (
                <div
                  key={`${rail.direction}-${cardIndex}`}
                  className="relative shrink-0 overflow-hidden border border-white/10 bg-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.35)]"
                  style={{
                    width: '220px',
                    height: '280px',
                    borderRadius: cardRadius,
                    boxShadow: '0 25px 60px rgba(15,23,42,0.25)'
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={idx === 0 && cardIndex < 2}
                    className="object-cover"
                    sizes="(max-width: 768px) 180px, 220px"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#07111f]/90 via-[#07111f]/35 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#07111f]/90 via-[#07111f]/30 to-transparent" />
    </div>
  );
}
