import { Instagram, Facebook, Leaf, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useSettings } from "@/hooks/use-settings";

export const Footer = () => {
  const { settings } = useSettings();

  return (
    <footer className="bg-[#061c16] text-white pt-24 pb-12 border-t-8 border-[#064E3B]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-16">
        {/* Brand */}
        <div className="md:col-span-1 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Leaf size={22} fill="white" color="white" />
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight uppercase">{settings?.siteName || "Obaja Tour"}</p>
              <p className="text-[9px] font-bold tracking-[0.4em] text-emerald-400 uppercase">Sumatera Utara</p>
            </div>
          </div>
          <p className="text-white/40 text-sm leading-relaxed italic font-light">
            {settings?.footerText || "Menemukan ketenangan di kaldera purba. Wonderfull Toba — gerbang menuju kedamaian sejati Sumatera Utara."}
          </p>
          <div className="flex gap-6">
            {settings?.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer">
                <Instagram size={22} className="opacity-40 hover:opacity-100 hover:text-emerald-400 cursor-pointer transition-all" />
              </a>
            )}
            {settings?.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer">
                <Facebook size={22} className="opacity-40 hover:opacity-100 hover:text-emerald-400 cursor-pointer transition-all" />
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-black tracking-[0.55em] uppercase text-emerald-500 mb-7">Hubungi Kami</p>
          <ul className="space-y-4">
            {settings?.address && (
              <li className="flex items-start gap-3 text-xs text-white/40 leading-relaxed uppercase tracking-wider font-semibold">
                <MapPin size={14} className="shrink-0 text-emerald-500" />
                <span>{settings.address}</span>
              </li>
            )}
            {settings?.whatsappNumber && (
              <li className="flex items-center gap-3 text-xs text-white/40 uppercase tracking-wider font-semibold">
                <Phone size={14} className="shrink-0 text-emerald-500" />
                <a href={`https://wa.me/62${settings.whatsappNumber}`} className="hover:text-emerald-400">
                  +62 {settings.whatsappNumber}
                </a>
              </li>
            )}
            {settings?.email && (
              <li className="flex items-center gap-3 text-xs text-white/40 uppercase tracking-wider font-semibold">
                <Mail size={14} className="shrink-0 text-emerald-500" />
                <a href={`mailto:${settings.email}`} className="hover:text-emerald-400">
                  {settings.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="mt-20 pt-8 border-t border-white/5 text-center">
        <p className="text-white/15 text-[10px] font-bold tracking-[0.7em] uppercase">
          © 2024 Wonderfull Toba · Sumatera Utara Premium Travel · Horas! Mejuah-juah! Ya'ahowu!
        </p>
      </div>
    </footer>
  );
};
