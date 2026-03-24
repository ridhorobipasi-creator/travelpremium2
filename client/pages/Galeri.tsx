import { useState } from "react";
import { StandardLayout } from "@/layouts/StandardLayout";
import { HeroPageSection } from "@/components/HeroPageSection";
import { IMG } from "@/constants/data";
import { Camera, Instagram, Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { galleryItemsApi } from "@/lib/api";

export default function Galeri() {
  const [activeFilter, setActiveFilter] = useState("Semua");

  const { data: apiGallery, isLoading } = useQuery({
    queryKey: ["gallery-items"],
    queryFn: () => galleryItemsApi.getAll(),
  });

  const GALLERY_IMAGES = [
    { src: IMG.toba,      cols: "md:col-span-2", rows: "md:row-span-2", tag: "Alam" },
    { src: IMG.waterfall, cols: "md:col-span-1", rows: "md:row-span-1", tag: "Alam" },
    { src: IMG.highlands, cols: "md:col-span-1", rows: "md:row-span-2", tag: "Aktivitas" },
    { src: IMG.elephant,  cols: "md:col-span-1", rows: "md:row-span-1", tag: "Wildlife" },
    { src: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80", cols: "md:col-span-1", rows: "md:row-span-1", tag: "Budaya" },
    { src: IMG.orangutan, cols: "md:col-span-2", rows: "md:row-span-1", tag: "Wildlife" },
    { src: IMG.jungle,    cols: "md:col-span-1", rows: "md:row-span-1", tag: "Alam" },
    { src: IMG.toba,      cols: "md:col-span-1", rows: "md:row-span-1", tag: "Aktivitas" },
  ];

  const gallerySource = (apiGallery && apiGallery.length > 0) ? apiGallery : GALLERY_IMAGES;

  const filteredImages = activeFilter === "Semua"
    ? gallerySource
    : gallerySource.filter((img: any) => img.tag === activeFilter);

  return (
    <StandardLayout>
      <HeroPageSection 
        title="Galeri Visual"
        subtitle="Saksikan keindahan Sumatera Utara melalui lensa — dari puncak gunung berapi hingga kedalaman danau purba."
        image={IMG.toba}
      />

      <section className="py-32 px-6 md:px-16 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto text-center mb-24 animate-fade-in-up">
          <p className="text-[11px] font-bold tracking-[0.6em] text-emerald-600 uppercase mb-4 stagger-1">Momen Berharga</p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#064E3B] tracking-tighter uppercase leading-none mb-12 stagger-2">
            Tangkap <span className="text-emerald-500 italic underline decoration-emerald-200 decoration-8">Keajaiban</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 stagger-3">
            {["Semua", "Alam", "Budaya", "Wildlife", "Aktivitas"].map((cat, i) => (
              <button 
                key={i} 
                onClick={() => setActiveFilter(cat)}
                className={`text-[10px] font-black uppercase tracking-widest px-8 py-4 border-2 border-slate-100 rounded-full transition-all duration-300 ${
                  activeFilter === cat ? "bg-[#064E3B] text-white" : "hover:bg-[#064E3B] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 content-start min-h-[500px]">
          {filteredImages.map((img, i) => (
            <div key={i} className={`group relative h-full min-h-[300px] overflow-hidden rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 cursor-pointer animate-fade-in-up stagger-${(i % 5) + 1} ${img.cols} ${img.rows}`}>
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] group-hover:scale-110"
                style={{ backgroundImage: `url(${img.src})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8 right-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:translate-y-0 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">{img.tag}</p>
                  <div className="flex items-center gap-3">
                    <Camera size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest">North Sumatra</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-emerald-500 transition-all">
                  <Play size={16} fill="white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 max-w-[1440px] mx-auto bg-[#064E3B] rounded-[60px] p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          <div className="space-y-6 relative z-10 max-w-2xl text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter uppercase italic leading-[0.9]">
              Bagikan Momen Anda <br /><span className="text-emerald-400">#WonderfullToba</span>
            </h2>
            <p className="text-lg text-emerald-100/60 leading-relaxed font-normal">
              Tag kami di Instagram dan tampilkan petualangan Anda di halaman ini. Mari tunjukkan dunia keajaiban Tanah Batak.
            </p>
          </div>
          <button className="relative z-10 flex items-center gap-4 bg-white text-[#064E3B] font-bold h-20 px-12 rounded-full uppercase tracking-widest shadow-2xl hover:bg-emerald-400 hover:text-white transition-all transform hover:scale-110">
            <Instagram size={24} />
            Follow @wonderfulltoba
          </button>
        </div>
      </section>
    </StandardLayout>
  );
}
