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
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_35%,_rgba(14,116,144,0.18),_transparent_38%)]" />
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
        <nav aria-label="Main navigation" className="relative rounded-2xl border border-white/15 bg-slate-950/35 px-4 py-3 shadow-[0_15px_50px_rgba(15,23,42,0.2)] backdrop-blur-xl sm:rounded-full sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-cyan-600 text-sm font-bold text-white shadow-lg shadow-sky-500/20">
                S
              </div>
              <div>
                <p className="text-base font-semibold tracking-[0.18em] text-white">STAYEASE</p>
                <p className="hidden text-[0.65rem] font-medium tracking-[0.12em] text-white/55 sm:block">STAYS, MADE SIMPLE</p>
              </div>
            </div>

            <div className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
              <Link href="/" className="transition hover:text-white">Home</Link>
              <Link href="/hotels" className="transition hover:text-white">Hotels</Link>
              <Link href="/hotels" className="transition hover:text-white">Experiences</Link>
              <Link href="/hotels" className="transition hover:text-white">Offers</Link>
            </div>

            <div className="flex items-center gap-3">
              <button type="button" className="hidden rounded-full px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white sm:inline-flex">
                Sign In
              </button>
              <Link
                href={`/hotels?${exploreUrl}`}
                className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-sky-50"
              >
                Book Now
              </Link>
            </div>
          </div>
        </nav>

        <section className="relative py-12 md:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-xl lg:pl-5">
              <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-slate-950/30 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-sky-300" />
                Your Next Getaway Starts Here
              </div>

              <h1 className="max-w-xl font-serif text-5xl font-medium leading-[1.02] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-[4.5rem]">
                Find your
                <span className="block italic text-sky-200">perfect stay.</span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-200/85 sm:text-lg sm:leading-8">
                Discover exceptional hotels, explore beautiful destinations, and book your next stay with confidence.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={`/hotels?${exploreUrl}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-sky-50"
                >
                  Explore Hotels
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/25 px-5 py-3.5 text-sm font-medium text-white/90 backdrop-blur-sm">
                  <ShieldCheck className="h-4 w-4 text-sky-300" />
                  Flexible Booking
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-200/85">
                <div className="inline-flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-sky-300" />
                  Complimentary Wi-Fi
                </div>
                <div className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-sky-300" />
                  250+ curated stays
                </div>
              </div>
            </div>

            <div className="relative w-full lg:justify-self-end">
              <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-xl rounded-[28px] border border-white/70 bg-white p-5 shadow-[0_30px_90px_rgba(2,12,27,0.28)] sm:p-7"
              >
                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Start planning</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Plan your stay</h2>
                  <p className="mt-1 text-sm text-slate-500">A few details, then you’re on your way.</p>
                </div>

                <div className="grid gap-3.5">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 transition focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/10">
                    <label htmlFor="destination" className="mb-2 flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-slate-500">
                      <MapPin className="h-4 w-4 text-sky-700" />
                      Destination
                    </label>
                    <input
                      id="destination"
                      value={destination}
                      onChange={(event) => setDestination(event.target.value)}
                      placeholder="Where are you going?"
                      className="w-full border-0 bg-transparent text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 transition focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/10">
                      <label htmlFor="check-in" className="mb-2 flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-slate-500">
                        <CalendarDays className="h-4 w-4 text-sky-700" />
                        Check-in
                      </label>
                      <input
                        id="check-in"
                        type="date"
                        min={today}
                        value={checkIn}
                        onChange={(event) => setCheckIn(event.target.value)}
                        className="w-full border-0 bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
                      />
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 transition focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/10">
                      <label htmlFor="check-out" className="mb-2 flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-slate-500">
                        <CalendarDays className="h-4 w-4 text-sky-700" />
                        Check-out
                      </label>
                      <input
                        id="check-out"
                        type="date"
                        min={checkIn || today}
                        value={checkOut}
                        onChange={(event) => setCheckOut(event.target.value)}
                        className="w-full border-0 bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5">
                    <div className="flex items-center text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-slate-500">
                      <Users className="mr-2 h-4 w-4 text-sky-700" />
                      Guests & Rooms
                    </div>

                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      <div className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-900">
                        <div className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-slate-500">Adults</div>
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            aria-label="Remove one adult"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-lg text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800"
                            onClick={() => setAdults((value) => Math.max(1, value - 1))}
                          >
                            −
                          </button>
                          <span aria-live="polite" className="text-base font-semibold">{adults}</span>
                          <button
                            type="button"
                            aria-label="Add one adult"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-lg text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800"
                            onClick={() => setAdults((value) => value + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-900">
                        <div className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-slate-500">Children</div>
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            aria-label="Remove one child"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-lg text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800"
                            onClick={() => setChildren((value) => Math.max(0, value - 1))}
                          >
                            −
                          </button>
                          <span aria-live="polite" className="text-base font-semibold">{children}</span>
                          <button
                            type="button"
                            aria-label="Add one child"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-lg text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800"
                            onClick={() => setChildren((value) => value + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-900">
                        <div className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-slate-500">Rooms</div>
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            aria-label="Remove one room"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-lg text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800"
                            onClick={() => setRooms((value) => Math.max(1, value - 1))}
                          >
                            −
                          </button>
                          <span aria-live="polite" className="text-base font-semibold">{rooms}</span>
                          <button
                            type="button"
                            aria-label="Add one room"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-lg text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800"
                            onClick={() => setRooms((value) => value + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {error ? (
                    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
                  ) : null}

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
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
