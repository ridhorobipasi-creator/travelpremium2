import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Search, MapPin, ChevronRight, ChevronLeft,
  Mountain, Waves, Coffee, Play, Heart
} from "lucide-react";
import { StandardLayout } from "@/layouts/StandardLayout";
import { HERO_SLIDES, DEALS, FEATURES, IMG } from "@/constants/data";

import { useQuery } from "@tanstack/react-query";
import { packagesApi, homeHeroesApi, featuresApi } from "@/lib/api";

export default function Index() {
  const [heroIdx, setHeroIdx]     = useState(0);
  const [slideIdx, setSlideIdx]   = useState(0);

  const { data: apiPackages } = useQuery({
    queryKey: ["packages"],
    queryFn: () => packagesApi.getAll(),
  });

  const { data: apiHeroes } = useQuery({
    queryKey: ["home-heroes"],
    queryFn: () => homeHeroesApi.getAll(),
  });

  const { data: apiFeatures } = useQuery({
    queryKey: ["features"],
    queryFn: () => featuresApi.getAll(),
  });

  const dealsSource = apiPackages && apiPackages.length > 0 ? apiPackages : DEALS;
  const heroSource = apiHeroes && apiHeroes.length > 0 ? apiHeroes : HERO_SLIDES;
  const featureSource = apiFeatures && apiFeatures.length > 0 
    ? apiFeatures.map((f: any) => ({
      ...f,
      icon: f.icon === 'Mountain' ? <Mountain /> : 
            f.icon === 'Waves' ? <Waves /> : 
            f.icon === 'Coffee' ? <Coffee /> : 
            f.icon === 'Heart' ? <Heart /> : <Mountain />
    })) 
    : FEATURES;

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(p => (p + 1) % heroSource.length), 9000);
    return () => clearInterval(t);
  }, [heroSource.length]);

  const next = () => setSlideIdx(p => (p + 1) % dealsSource.length);
  const prev = () => setSlideIdx(p => (p - 1 + dealsSource.length) % dealsSource.length);

  const slide = dealsSource[slideIdx];

  if (!apiPackages || !apiHeroes || !apiFeatures) {
    return (
      <StandardLayout>
        <div className="h-screen w-full flex items-center justify-center bg-slate-50">
          <div className="w-96 h-2 animate-skeleton rounded-full" />
        </div>
      </StandardLayout>
    );
  }

  return (
    <StandardLayout>
      {/* ─── Hero ────────────────────────────────────────────── */}
      <section id="beranda" className="relative h-[92vh] min-h-[640px]">
        {/* Backgrounds */}
        {heroSource.map((s: any, i: number) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-all duration-[2500ms]"
            style={{
              backgroundImage: `url(${s.image})`,
              opacity: i === heroIdx ? 1 : 0,
              transform: i === heroIdx ? "scale(1)" : "scale(1.07)",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/75 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-24">
          <div className="max-w-4xl space-y-10 animate-fade-in-up">
            <div className="flex items-center gap-5 stagger-1">
              <span className="h-px w-16 bg-emerald-400 opacity-50" />
              <p className="text-[11px] font-bold tracking-[0.7em] text-white uppercase italic opacity-80">{heroSource[heroIdx].label}</p>
            </div>
            
            <h1 className="text-7xl md:text-[140px] font-black text-white tracking-tighter uppercase leading-[0.8] stagger-2 animate-float">
              {heroSource[heroIdx].headline[0]}<br />
              <span className="text-emerald-500 italic lowercase font-light drop-shadow-[0_2px_40px_rgba(16,185,129,0.4)]">
                {heroSource[heroIdx].headline[1]}.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl font-medium leading-relaxed stagger-3">
              {heroSource[heroIdx].sub}
            </p>

            <div className="flex flex-wrap gap-8 pt-6 stagger-4">
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-[#064E3B] font-bold h-20 px-14 rounded-full text-sm tracking-widest uppercase shadow-[0_20px_60px_-15px_rgba(16,185,129,0.5)] transition-all transform hover:scale-110">
                Mulai Petualangan <ChevronRight size={18} className="ml-3" />
              </Button>
              <button className="flex items-center gap-6 group text-white">
                <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#064E3B] transition-all duration-500">
                  <Play size={20} fill="currentColor" />
                </div>
                <span className="text-[11px] font-bold tracking-widest uppercase">Tonton Film Toba</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute right-16 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20">
          {heroSource.map((_: any, i: number) => (
            <div key={i} className="flex items-center justify-end gap-6 group cursor-pointer" onClick={() => setHeroIdx(i)}>
              <div className={`h-px w-10 transition-all duration-700 ${i === heroIdx ? "bg-emerald-400 w-24" : "bg-white/20 group-hover:w-16 group-hover:bg-white/50"}`} />
              <p className={`text-[10px] font-black transition-all ${i === heroIdx ? "text-emerald-400" : "text-white/20"}`}>0{i + 1}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Search Bar Pill ────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100 shadow-sm relative z-30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-10">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50 border border-slate-200 p-4 rounded-3xl md:rounded-full group/search transition-all hover:border-emerald-200">
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 uppercase">
              <div className="px-8 py-3 flex items-center gap-4 group">
                <MapPin className="text-emerald-600 group-hover:scale-125 transition-transform" size={24} />
                <div className="text-left">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Destinasi</p>
                  <p className="text-sm font-bold text-[#064E3B]">Ke mana Anda pergi?</p>
                </div>
              </div>
              <div className="px-8 py-3 flex items-center gap-4 group">
                <Waves className="text-emerald-600 group-hover:scale-125 transition-transform" size={24} />
                <div className="text-left">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pengalaman</p>
                  <p className="text-sm font-bold text-[#064E3B]">Kultural & Air</p>
                </div>
              </div>
              <div className="hidden lg:flex px-8 py-3 items-center gap-4 group">
                <Search className="text-emerald-600 group-hover:scale-125 transition-transform" size={24} />
                <div className="text-left">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pencarian</p>
                  <p className="text-sm font-bold text-[#064E3B] opacity-40">Trip Impian...</p>
                </div>
              </div>
            </div>
            <Button className="w-full md:w-auto bg-[#064E3B] hover:bg-emerald-600 text-white font-bold text-sm rounded-2xl h-12 px-8 shadow-none transition-all hover:scale-105 shrink-0">
              Temukan Paket
            </Button>
          </div>
        </div>
      </div>

      {/* ─── Slider ──────────────────────────────────────────── */}
      <div id="paket-wisata" className="nif-slider h-[840px] animate-fade-in stagger-2">
        {/* BG layers */}
        {dealsSource.map((d: any, i: number) => (
          <div
            key={i}
            className={`bg-slide ${i === slideIdx ? "is-active" : "is-hidden"}`}
            style={{ backgroundImage: `url("${d.image}")` }}
          />
        ))}
        <div className="overlay" />

        <div className="inner">
          {/* Left panel */}
          <div className="left-panel" key={slideIdx}>
            <span className="slide-tag animate-fade-in-left stagger-1">{slide.region}</span>
            <h3 className="slide-title animate-fade-in-up stagger-2">{slide.title}</h3>
            <p className="slide-desc animate-fade-in-up stagger-3">{slide.desc}</p>
            <p className="slide-price-label">Mulai dari</p>
            <p className="slide-price animate-fade-in-up stagger-4">{slide.price}</p>
            <div className="slide-actions animate-fade-in-up stagger-5">
              <Link to={`/paket-wisata/${slide.id}`}>
                <button className="btn-primary-slider">Pesan Sekarang</button>
              </Link>
              <Link to={`/paket-wisata/${slide.id}`}>
                <button className="btn-more">
                  <span className="btn-more-icon"><ChevronRight size={18} /></span>
                  Lihat Itinerary
                </button>
              </Link>
            </div>
          </div>

          {/* Cards rail */}
          <div className="right-panel">
            <div
              className="cards-rail"
              style={{ transform: `translateX(calc(-${slideIdx * 300}px))` }}
            >
              {dealsSource.map((d: any, i: number) => (
                <div
                  key={i}
                  className={`deal-card ${i === slideIdx ? "is-active" : ""}`}
                  style={{ backgroundImage: `url("${d.image}")` }}
                  onClick={() => setSlideIdx(i)}
                >
                  <div className="card-body">
                    <p className="card-region">{d.region}</p>
                    <p className="card-title">{d.title}</p>
                    <p className="card-price">{d.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nav controls */}
        <div className="nav-controls">
          <div className="nav-dots">
            {dealsSource.map((_: any, i: number) => (
              <button key={i} className={`dot ${i === slideIdx ? "is-active" : ""}`} onClick={() => setSlideIdx(i)} />
            ))}
          </div>
          <button className="nav-btn" onClick={prev}><ChevronLeft  size={22} /></button>
          <button className="nav-btn" onClick={next}><ChevronRight size={22} /></button>
        </div>
      </div>

      {/* ─── Features ────────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-16 bg-[#f9faf8]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {featureSource.map((f: any, i: number) => (
              <div key={i} className={`group bg-white rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-3 border border-slate-100 hover:border-emerald-100 flex flex-col items-start gap-6 animate-fade-in-up stagger-${(i % 5) + 1}`}>
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-[#064E3B] group-hover:text-white transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                  {f.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-[#064E3B] text-base tracking-tight mb-2">{f.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-normal">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </StandardLayout>
  );
}
