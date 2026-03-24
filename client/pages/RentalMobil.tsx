import { StandardLayout } from "@/layouts/StandardLayout";
import { HeroPageSection } from "@/components/HeroPageSection";
import { CARS, IMG } from "@/constants/data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, UserCheck, CalendarCheck, HelpCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { carsApi } from "@/lib/api";

export default function RentalMobil() {
  const { data: apiCars, isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: () => carsApi.getAll(),
  });

  const displayCars = (apiCars && apiCars.length > 0) ? apiCars : CARS;
  return (
    <StandardLayout>
      <HeroPageSection 
        title="Layanan Transportasi"
        subtitle="Armada premium dengan supir profesional untuk perjalanan aman dan nyaman melintasi lekuk indah Sumatera Utara."
        image={IMG.highlands}
      />

      <section className="py-24 px-6 md:px-16 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 animate-in slide-in-from-left duration-700">
            <p className="text-[11px] font-bold tracking-[0.6em] text-emerald-600 uppercase">Mengapa Kami?</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#064E3B] tracking-tighter uppercase leading-none">
              Standar <br /><span className="text-emerald-500 underline decoration-emerald-200">Keamanan Tertinggi</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-normal">
              Kami memahami beratnya medan jalan di Sumatera Utara. Seluruh armada kami dipelihara secara rutin dan dikemudikan oleh supir lokal yang hafal setiap jengkal jalan.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {[
                { icon: <ShieldCheck />, title: "Asuransi Penuh", desc: "Perlindungan maksimal untuk setiap penumpang selama perjalanan." },
                { icon: <UserCheck />,   title: "Supir Lokal",    desc: "Bebas biaya makan supir, mereka tahu jalur tercepat & teraman." },
                { icon: <CalendarCheck />, title: "Booking Mudah", desc: "Konfirmasi instan tanpa biaya admin tambahan." },
                { icon: <HelpCircle />,   title: "24/7 Support",  desc: "Layanan bantuan darurat di seluruh jangkauan wilayah SUMUT." },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group hover:bg-emerald-50 transition-colors p-4 rounded-3xl -ml-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#064E3B] text-white flex items-center justify-center shrink-0 shadow-lg group-hover:rotate-12 transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#064E3B] text-sm mb-1 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-x-0 bottom-0 h-[80%] bg-[#064E3B] rounded-[60px] translate-y-10 rotate-3 transition-transform group-hover:rotate-6 group-hover:bg-emerald-900 group-hover:translate-x-4 group-hover:translate-y-6" />
            <img 
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=90&auto=format&fit=crop" 
              className="relative w-full h-[600px] object-cover rounded-[60px] shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-4"
              alt="Innova Reborn" 
            />
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-16 bg-[#f9faf8]">
        <div className="max-w-[1440px] mx-auto text-center mb-20">
          <p className="text-[11px] font-bold tracking-[0.6em] text-emerald-600 uppercase mb-4">Pilihan Armada</p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#064E3B] tracking-tighter uppercase leading-none">
            Unit <span className="text-emerald-500">Premium Kami</span>
          </h2>
        </div>
        
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayCars.map((car: any, i: number) => (
            <Link to={`/rental-mobil/${car.id}`} key={i} className="group block bg-white rounded-[40px] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-slate-100 flex flex-col">
              <div className="h-64 rounded-[32px] overflow-hidden mb-8 relative shadow-lg">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110"
                  style={{ backgroundImage: `url(${car.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <span className="absolute bottom-6 left-8 text-white text-[10px] font-black uppercase tracking-widest bg-emerald-600/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-xl">
                  {car.unit}
                </span>
              </div>
              <div className="px-6 pb-10 flex flex-col flex-1">
                <h3 className="text-2xl font-black text-[#064E3B] tracking-tight mb-8 group-hover:text-emerald-500 transition-colors uppercase italic">{car.title}</h3>
                <div className="space-y-4 mb-10 flex-1">
                  {car.features?.slice(0, 4).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-xs font-bold text-slate-500 tracking-wide uppercase">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {feat}
                    </div>
                  )) || ["Sopir + BBM included", "AC Dingin & Kabin Bersih", "Mineral Water", "Max 6 Orang & 3 Bagasi"].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-xs font-bold text-slate-500 tracking-wide uppercase">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {feat}
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-[#064E3B] hover:bg-emerald-600 text-white font-bold h-14 rounded-full uppercase tracking-widest text-[11px] shadow-lg transition-all hover:scale-105 pointer-events-none">
                  Lihat Detail Unit
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </StandardLayout>
  );
}
