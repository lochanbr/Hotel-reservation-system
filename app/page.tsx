'use client';

import { ImageStreamHero } from '@/components/ui/image-stream-hero';
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const hotelImages = [
  {
    src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    alt: 'Luxury hotel bedroom with elegant modern furniture'
  },
  {
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    alt: 'Premium resort with contemporary design and warm lighting'
  },
  {
    src: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    alt: 'Ocean-view hotel room overlooking the sea'
  },
  {
    src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    alt: 'Scenic mountain resort with panoramic views'
  },
  {
    src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    alt: 'Luxury poolside hotel amenity surrounded by tropical landscaping'
  },
  {
    src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    alt: 'Elegant modern suites in a premium hospitality property'
  }
];

function getTodayString() {
  const today = new Date();
  return new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];
}

function addDays(dateString: string, days: number) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
}

export default function Page() {
  const router = useRouter();

  const today = useMemo(() => getTodayString(), []);
  const [destination, setDestination] = useState('Bali');
  const [checkIn, setCheckIn] = useState(addDays(today, 7));
  const [checkOut, setCheckOut] = useState(addDays(today, 11));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!destination.trim()) {
      setError('Please enter a destination or hotel name.');
      return;
    }

    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates.');
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out date must be later than the check-in date.');
      return;
    }

    if (adults < 1 || rooms < 1) {
      setError('Please include at least one adult and one room.');
      return;
    }

    setError('');
    const params = new URLSearchParams({
      destination: destination.trim(),
      checkIn,
      checkOut,
      adults: String(adults),
      children: String(children),
      rooms: String(rooms)
    });

    router.push(`/hotels?${params.toString()}`);
  };

  const exploreUrl = new URLSearchParams({
    destination,
    checkIn,
    checkOut,
    adults: String(adults),
    children: String(children),
    rooms: String(rooms)
  }).toString();

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_42%)]" />
      <ImageStreamHero
        images={hotelImages}
        speed={22}
        cardsPerRail={9}
        axisPercent={52}
        cardRadius="28px"
        railGap={18}
        className="z-0"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        <nav className="relative rounded-full border border-white/25 bg-white/10 px-4 py-3 shadow-[0_15px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-sky-500/20">
                S
              </div>
              <div>
                <p className="text-lg font-semibold tracking-[0.2em] text-white/80">STAYEASE</p>
              </div>
            </div>

            <div className="hidden items-center gap-8 text-sm font-medium text-white/80 md:flex">
              <Link href="/" className="transition hover:text-white">Home</Link>
              <Link href="/hotels" className="transition hover:text-white">Hotels</Link>
              <Link href="/hotels" className="transition hover:text-white">Experiences</Link>
              <Link href="/hotels" className="transition hover:text-white">Offers</Link>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 sm:inline-flex">
                Sign In
              </button>
              <Link
                href={`/hotels?${exploreUrl}`}
                className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Book Now
              </Link>
            </div>
          </div>
        </nav>

        <section className="relative pt-10 md:pt-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div className="max-w-xl lg:pl-5">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-white/75 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Your Next Getaway Starts Here
              </div>

              <h1 className="font-serif text-5xl leading-[0.92] text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
                Find Your Perfect Stay
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-8 text-slate-200/90">
                Discover exceptional hotels, explore beautiful destinations, and book your next stay with confidence.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={`/hotels?${exploreUrl}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-xl shadow-sky-900/10 transition hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Explore Hotels
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  <ShieldCheck className="h-4 w-4" />
                  Flexible Booking
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-200/80">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
                  <Wifi className="h-4 w-4 text-sky-300" />
                  Complimentary Wi-Fi
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
                  <MapPin className="h-4 w-4 text-sky-300" />
                  250+ curated stays
                </div>
              </div>
            </div>

            <div className="relative lg:justify-self-end">
              <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-xl rounded-[30px] border border-white/20 bg-white/12 p-4 shadow-[0_30px_90px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:p-5"
              >
                <div className="grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                    <label className="mb-2 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-200/75">
                      <MapPin className="h-4 w-4 text-sky-300" />
                      Destination
                    </label>
                    <input
                      value={destination}
                      onChange={(event) => setDestination(event.target.value)}
                      placeholder="Where are you going?"
                      className="w-full border-0 bg-transparent text-base text-white placeholder:text-slate-300/70 focus:outline-none"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                      <label className="mb-2 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-200/75">
                        <CalendarDays className="h-4 w-4 text-sky-300" />
                        Check-in
                      </label>
                      <input
                        type="date"
                        min={today}
                        value={checkIn}
                        onChange={(event) => setCheckIn(event.target.value)}
                        className="w-full border-0 bg-transparent text-base text-white focus:outline-none"
                      />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                      <label className="mb-2 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-200/75">
                        <CalendarDays className="h-4 w-4 text-sky-300" />
                        Check-out
                      </label>
                      <input
                        type="date"
                        min={checkIn || today}
                        value={checkOut}
                        onChange={(event) => setCheckOut(event.target.value)}
                        className="w-full border-0 bg-transparent text-base text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                    <div className="flex items-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-200/75">
                      <Users className="mr-2 h-4 w-4 text-sky-300" />
                      Guests & Rooms
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-xl border border-white/10 bg-slate-900/10 p-2.5 text-white">
                        <div className="mb-2 text-[0.65rem] uppercase tracking-[0.16em] text-slate-200/80">Adults</div>
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-white/15"
                            onClick={() => setAdults((value) => Math.max(1, value - 1))}
                          >
                            −
                          </button>
                          <span className="text-lg font-semibold">{adults}</span>
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-white/15"
                            onClick={() => setAdults((value) => value + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-slate-900/10 p-2.5 text-white">
                        <div className="mb-2 text-[0.65rem] uppercase tracking-[0.16em] text-slate-200/80">Children</div>
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-white/15"
                            onClick={() => setChildren((value) => Math.max(0, value - 1))}
                          >
                            −
                          </button>
                          <span className="text-lg font-semibold">{children}</span>
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-white/15"
                            onClick={() => setChildren((value) => value + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-slate-900/10 p-2.5 text-white">
                        <div className="mb-2 text-[0.65rem] uppercase tracking-[0.16em] text-slate-200/80">Rooms</div>
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-white/15"
                            onClick={() => setRooms((value) => Math.max(1, value - 1))}
                          >
                            −
                          </button>
                          <span className="text-lg font-semibold">{rooms}</span>
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-white/15"
                            onClick={() => setRooms((value) => value + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {error ? (
                    <div className="rounded-xl border border-red-300/30 bg-red-500/10 px-3 py-2 text-sm text-red-100">{error}</div>
                  ) : null}

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
                  >
                    <Search className="h-4 w-4" />
                    Search Hotels
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
