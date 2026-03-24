import { useState } from "react";
import { StandardLayout } from "@/layouts/StandardLayout";
import { HeroPageSection } from "@/components/HeroPageSection";
import { BLOG_POSTS, IMG } from "@/constants/data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Calendar, User, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { blogsApi } from "@/lib/api";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: apiBlogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogsApi.getAll(),
  });

  const blogsSource = (apiBlogs && apiBlogs.length > 0) ? apiBlogs : BLOG_POSTS;

  const filteredPosts = activeCategory 
    ? blogsSource.filter((post: any) => post.label === activeCategory)
    : blogsSource;
  return (
    <StandardLayout>
      <HeroPageSection 
        title="Catatan Perjalanan"
        subtitle="Temukan inspirasi, tips wisata, dan cerita mendalam dari setiap sudut Sumatera Utara."
        image={IMG.jungle}
      />

      <section className="py-32 px-6 md:px-16 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-24">
            
            {/* Main Content */}
            <div className="lg:w-2/3 space-y-24">
              {filteredPosts.map((post, i) => (
                <Link to={`/blog/${post.id}`} key={i} className="group block cursor-pointer">
                  <div className="relative h-[480px] rounded-[60px] overflow-hidden mb-12 shadow-2xl transition-all duration-700 hover:-translate-y-4">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] group-hover:scale-110"
                      style={{ backgroundImage: `url(${post.img})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute top-10 left-10 bg-white/90 backdrop-blur-md text-[#064E3B] text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-full shadow-xl">
                      {post.label}
                    </div>
                  </div>
                  
                  <div className="px-6 space-y-6">
                    <div className="flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">
                      <span className="flex items-center gap-2 text-emerald-600"><Calendar size={12} /> {post.date || "12 Maret 2024"}</span>
                      <span className="flex items-center gap-2"><User size={12} /> {post.author || "Admin Toba"}</span>
                      <span className="flex items-center gap-2"><Clock size={12} /> {post.readTime || "6 Menit Baca"}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#064E3B] tracking-tighter uppercase leading-tight hover:text-emerald-500 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-xl text-slate-500 leading-relaxed font-normal max-w-2xl line-clamp-3">
                      {post.desc}
                    </p>
                    <button className="flex items-center gap-4 text-[#064E3B] font-black uppercase tracking-widest text-xs hover:text-emerald-500 transition-all group-hover:gap-6">
                      Selengkapnya <ChevronRight size={16} className="group-hover:translate-x-3 transition-transform duration-500" />
                    </button>
                  </div>
                </Link>
              ))}
              
              <div className="flex justify-center pt-16">
                <Button variant="outline" className="border-emerald-200 text-[#064E3B] h-16 px-16 rounded-full uppercase tracking-widest text-xs font-black shadow-none hover:bg-emerald-50 transition-all">
                  Tampilkan Lebih Banyak
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-1/3 space-y-16">
              <div className="bg-[#f9faf8] rounded-[40px] p-10 space-y-8 animate-in slide-in-from-right duration-700">
                <h4 className="text-xl font-black text-[#064E3B] uppercase tracking-tighter">Kategori Populer</h4>
                <div className="space-y-4">
                  {["Semua", "Budaya", "Kuliner", "Alam", "Wildlife", "Tips", "Event"].map((cat, i) => {
                    const count = cat === "Semua" ? blogsSource.length : blogsSource.filter((p: any) => p.label === cat).length;
                    const isActive = activeCategory === cat || (cat === "Semua" && !activeCategory);
                    
                    return (
                      <div 
                        key={i} 
                        onClick={() => setActiveCategory(cat === "Semua" ? null : cat)}
                        className="flex items-center justify-between py-4 border-b border-emerald-100 group cursor-pointer"
                      >
                        <span className={`text-sm font-bold transition-colors ${isActive ? "text-emerald-600" : "text-slate-600 group-hover:text-emerald-600"}`}>
                          {cat}
                        </span>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${isActive ? "bg-emerald-600 text-white" : "bg-emerald-100/50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white"}`}>
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#064E3B] rounded-[40px] p-10 text-white space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl -translate-y-10 translate-x-10" />
                <h4 className="text-xl font-black uppercase tracking-tighter">Berlangganan Newsletter</h4>
                <p className="text-sm text-emerald-100/60 leading-relaxed font-normal">
                  Dapatkan penawaran eksklusif dan tips perjalanan terbaru langsung ke email Anda.
                </p>
                <input className="w-full bg-emerald-900/50 border-emerald-800 rounded-2xl h-14 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all placeholder:text-emerald-700" placeholder="Email Anda" />
                <Button className="w-full bg-emerald-400 hover:bg-emerald-300 text-[#064E3B] font-black h-14 rounded-2xl uppercase tracking-widest text-[10px]">Daftar Sekarang</Button>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </StandardLayout>
  );
}
