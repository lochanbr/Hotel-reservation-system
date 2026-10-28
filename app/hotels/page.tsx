import { ArrowRight, MapPin, ShieldCheck, Sparkles, Star, Wifi } from 'lucide-react';
import Link from 'next/link';

const sampleHotels = [
  {
    name: 'Azure Cove Resort',
    location: 'Bali, Indonesia',
    rating: 4.9,
    price: 420,
    amenities: ['Ocean view', 'Infinity pool', 'Breakfast'],
    accent: 'from-sky-400 to-cyan-600'
  },
  {
    name: 'Harbor & Haven',
    location: 'Santorini, Greece',
    rating: 4.8,
    price: 390,
    amenities: ['Sunset deck', 'Spa', 'Airport transfer'],
    accent: 'from-violet-400 to-indigo-600'
  },
  {
    name: 'Summit Pine Lodge',
    location: 'Aspen, Colorado',
    rating: 4.7,
    price: 360,
    amenities: ['Fireplace', 'Mountain trails', 'Ski access'],
    accent: 'from-amber-400 to-orange-600'
  }
];

export default async function HotelsPage({
  searchParams
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = (await searchParams) ?? {};

  const destination = typeof params.destination === 'string' ? params.destination : 'Luxury escapes';
  const checkIn = typeof params.checkIn === 'string' ? params.checkIn : '2026-11-04';
  const checkOut = typeof params.checkOut === 'string' ? params.checkOut : '2026-11-09';
  const adults = typeof params.adults === 'string' ? params.adults : '2';
  const rooms = typeof params.rooms === 'string' ? params.rooms : '1';

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-3">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            StayEase
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            Back to home
          </Link>
        </div>

        <section className="mb-8 overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.25)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-100">
                <Sparkles className="h-3.5 w-3.5" />
                Handpicked stays
              </p>
              <h1 className="text-3xl font-semibold sm:text-4xl">{destination}</h1>
            </div>

            <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-[0.7rem] uppercase tracking-[0.15em] text-slate-300">Dates</div>
                <div className="mt-1 font-medium">
                  {checkIn} → {checkOut}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-[0.7rem] uppercase tracking-[0.15em] text-slate-300">Guests</div>
                <div className="mt-1 font-medium">{adults} adults</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-[0.7rem] uppercase tracking-[0.15em] text-slate-300">Rooms</div>
                <div className="mt-1 font-medium">{rooms} rooms</div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          {sampleHotels.map((hotel) => (
            <article
              key={hotel.name}
              className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_40px_rgba(15,23,42,0.06)]"
            >
              <div className={`h-52 bg-gradient-to-br ${hotel.accent} p-4`}>
                <div className="flex h-full items-end justify-between rounded-[24px] border border-white/20 bg-slate-900/10 p-4 backdrop-blur-sm">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {hotel.rating}
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">{hotel.name}</h2>
                    <div className="mt-1 inline-flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="h-4 w-4 text-sky-500" />
                      {hotel.location}
                    </div>
                  </div>
                  <div className="rounded-full bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-700">
                    ${hotel.price}
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity) => (
                    <span
                      key={`${hotel.name}-${amenity}`}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">
                  <Wifi className="h-4 w-4 text-sky-500" />
                  Fast Wi-Fi • Concierge • Housekeeping
                </div>

                <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Reserve now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
