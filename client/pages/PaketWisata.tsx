import { useState } from "react";
import { StandardLayout } from "@/layouts/StandardLayout";
import { HeroPageSection } from "@/components/HeroPageSection";
import { DEALS, IMG } from "@/constants/data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Clock, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { packagesApi } from "@/lib/api";

export default function PaketWisata() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  
  const { data: apiPackages, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: () => packagesApi.getAll(),
  });

  if (isLoading) {
    return (
      <StandardLayout>
        <div className="h-screen w-full flex items-center justify-center bg-slate-50">
          <div className="w-96 h-2 animate-skeleton rounded-full" />
        </div>
      </StandardLayout>
    );
  }

  const displayDeals = apiPackages && apiPackages.length > 0 ? apiPackages : DEALS;
  
  const filteredDeals = activeFilter === "Semua"
    ? displayDeals
    : displayDeals.filter((trip: any) => trip.category === activeFilter);
  return (
    <StandardLayout>
      <HeroPageSection 
        title="Paket Perjalanan"
        subtitle="Petualangan yang disusun khusus untuk Anda yang mencari kemewahan dan keaslian alam Sumatera Utara."
        image={IMG.waterfall}
      />
      
      <section className="py-32 px-6 md:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <p className="text-[11px] font-bold tracking-[0.6em] text-emerald-600 uppercase mb-4">Pilihan Terbaik</p>
              <h2 className="text-4xl md:text-6xl font-extrabold text-[#064E3B] tracking-tighter uppercase leading-none">
                Jelajahi <br /><span className="text-emerald-500">Koleksi Trip Kami</span>
              </h2>
            </div>
            <div className="flex gap-4">
              {["Semua", "Danau Toba", "Wildlife", "Adventure"].map(filter => (
                <button 
                  key={filter} 
                  onClick={() => setActiveFilter(filter)}
                  className={`text-[10px] font-bold uppercase tracking-widest px-6 py-3 border border-slate-100 rounded-full transition-all ${
                    activeFilter === filter ? "bg-[#064E3B] text-white" : "hover:bg-[#064E3B] hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredDeals.map((trip, i) => (
              <Link to={`/paket-wisata/${trip.id}`} key={i} className="group block cursor-pointer">
                <div className="relative h-[420px] rounded-[40px] overflow-hidden mb-8 shadow-2xl transition-all duration-500 hover:-translate-y-4">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110"
                    style={{ backgroundImage: `url(${trip.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-8 left-8 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-[#064E3B] text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                      {trip.region}
                    </span>
                    <span className="bg-emerald-500 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl flex items-center gap-2">
                      <Star size={10} fill="white" /> {trip.rating || "4.9"}
                    </span>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10 text-white">
                    <div className="flex items-center gap-4 mb-4 text-[10px] font-bold tracking-widest uppercase text-white/60">
                      <span className="flex items-center gap-1.5"><Clock size={12} /> {trip.duration || "4 Hari 3 Malam"}</span>
                      <span className="w-1 h-1 bg-white/30 rounded-full" />
                      <span className="flex items-center gap-1.5"><MapPin size={12} /> {trip.region}</span>
                    </div>
                    <h3 className="text-3xl font-extrabold tracking-tight mb-6 leading-tight group-hover:text-emerald-300 transition-colors">
                      {trip.title}
                    </h3>
                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                      <div>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Mulai Dari</p>
                        <p className="text-2xl font-black text-emerald-400">{trip.price}</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-500">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </StandardLayout>
  );
}
