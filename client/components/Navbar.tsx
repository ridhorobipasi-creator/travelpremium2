import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Instagram, Facebook, Menu, X, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/use-settings";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { settings } = useSettings();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLinks = [
    { path: "/", label: "Beranda" },
    { path: "/paket-wisata", label: "Paket Wisata" },
    { path: "/rental-mobil", label: "Rental Mobil" },
    { path: "/galeri", label: "Galeri" },
    { path: "/blog", label: "Blog" }
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Topbar */}
      <div className={cn(
        "hidden md:flex items-center justify-between text-white/60 text-[11px] font-semibold tracking-widest uppercase px-16 py-3 transition-colors",
        isHome ? "bg-[#064E3B]" : "bg-[#042f24]"
      )}>
        <div className="flex items-center gap-10">
          {settings?.whatsappNumber && (
            <a href={`https://wa.me/62${settings.whatsappNumber}`} className="flex items-center gap-2 hover:text-emerald-300 transition-colors">
              <Phone size={12} strokeWidth={2.5} /> +62 {settings.whatsappNumber}
            </a>
          )}
          <span className="w-px h-3.5 bg-white/15" />
          {settings?.email && (
            <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-emerald-300 transition-colors">
              <Mail size={12} strokeWidth={2.5} /> {settings.email}
            </a>
          )}
        </div>
        <div className="flex items-center gap-8">
          {settings?.instagramUrl && (
            <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer">
              <Instagram size={14} className="hover:text-white cursor-pointer transition-colors hover:scale-125 transform" />
            </a>
          )}
          {settings?.facebookUrl && (
            <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer">
              <Facebook  size={14} className="hover:text-white cursor-pointer transition-colors hover:scale-125 transform" />
            </a>
          )}
          <span className="w-px h-3.5 bg-white/15" />
          <span className="text-emerald-400 font-black">Explore North Sumatra</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="glass px-8 md:px-16 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3.5 cursor-pointer group">
          <div className="w-11 h-11 bg-[#064E3B] rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
            <Leaf size={22} fill="white" color="white" />
          </div>
          <div className="leading-none">
            <p className="text-[17px] font-extrabold tracking-tight text-[#064E3B] uppercase">Wonderfull Toba v2.1</p>
            <p className="text-[9px] font-bold tracking-[0.45em] text-emerald-600 opacity-70 uppercase mt-0.5">Nature Travel Lab</p>
          </div>
        </Link>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map(l => (
            <Link 
              key={l.path} 
              to={l.path} 
              className={cn(
                "text-[11px] font-bold tracking-[0.3em] uppercase transition-colors relative group",
                location.pathname === l.path ? "text-[#064E3B]" : "text-slate-600 hover:text-[#064E3B]"
              )}
            >
              {l.label}
              <span className={cn(
                "absolute -bottom-1.5 left-0 h-0.5 bg-emerald-500 rounded-full transition-all",
                location.pathname === l.path ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-5">
          <Button className="hidden md:flex bg-[#064E3B] hover:bg-emerald-600 text-white text-[11px] font-bold tracking-widest uppercase h-12 px-8 rounded-full shadow-md transition-all hover:scale-105 hover:shadow-xl">
            Rencanakan Perjalanan
          </Button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800 hover:bg-emerald-100 transition">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          {navLinks.map(l => (
            <Link 
              key={l.path} 
              to={l.path} 
              onClick={() => setMenuOpen(false)}
              className="text-sm font-bold tracking-widest uppercase text-slate-700 hover:text-emerald-600"
            >
              {l.label}
            </Link>
          ))}
          <Button className="bg-[#064E3B] text-white font-bold h-12 uppercase tracking-widest text-[10px]">Rencanakan Perjalanan</Button>
        </div>
      )}
    </header>
  );
};
