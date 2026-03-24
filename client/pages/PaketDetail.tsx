import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { StandardLayout } from "@/layouts/StandardLayout";
import { DEALS } from "@/constants/data";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Star, Clock, MapPin, Users, CheckCircle2,
  XCircle, ChevronDown, ChevronUp, Calendar, ArrowRight,
  Share2, Heart, Phone, MessageCircle
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { packagesApi, bookingsApi } from "@/lib/api";

import { useToast } from "@/components/ui/use-toast";
import { useSettings } from "@/hooks/use-settings";

export default function PaketDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { settings } = useSettings();
  const [activeDay, setActiveDay] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"itinerary" | "fasilitas">("itinerary");
  const [liked, setLiked] = useState(false);
  const [pax, setPax] = useState(2);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: apiPackage } = useQuery({
    queryKey: ["package", id],
    queryFn: () => packagesApi.get(id!),
    enabled: !!id,
  });

  const trip = apiPackage || DEALS.find((d) => d.id === id);

  if (!trip) {
    return (
      <StandardLayout>
        <div className="min-h-screen flex items-center justify-center flex-col gap-6">
          <h1 className="text-4xl font-black text-[#064E3B]">Paket Tidak Ditemukan</h1>
          <Link to="/paket-wisata">
            <Button className="bg-emerald-600 text-white rounded-full px-8">Kembali ke Daftar Paket</Button>
          </Link>
        </div>
      </StandardLayout>
    );
  }

  const totalPrice = (trip.priceNum * pax).toLocaleString("id-ID");
  const related = DEALS.filter((d) => d.id !== trip.id && d.category === trip.category).slice(0, 3);

  const waNumber = settings?.whatsappNumber || "626251234567";

  const handleBooking = async () => {
    if (!date || !name || !phone) {
      toast({
        variant: "destructive",
        title: "Data Kurang Lengkap",
        description: "Harap isi tanggal, nama, dan whatsapp anda.",
      });
      return;
    }

    setLoading(true);
    try {
      await bookingsApi.create({
        booking_type: "package",
        item_name: trip.title,
        date_start: date,
        quantity: pax,
        consumer_name: name,
        consumer_whatsapp: phone,
        total_price: trip.priceNum * pax,
      });
      
      toast({
        title: "Pesanan Terkirim ke Admin",
        description: "Data pesanan anda sudah tersimpan. Mengalihkan ke WhatsApp...",
      });

      const text = `Halo, saya ingin memesan Paket Wisata:
*${trip.title}*
- Tanggal Berangkat: ${date || "-"}
- Jumlah Peserta: ${pax} Orang
- Nama: ${name || "-"}
- WhatsApp: ${phone || "-"}
- Estimasi Harga: Rp ${totalPrice}

Mohon informasi lebih lanjut.`;
      const encodedText = encodeURIComponent(text);
      
      setTimeout(() => {
        window.open(`https://wa.me/${waNumber}?text=${encodedText}`, "_blank");
      }, 1500);
    } catch (err) {
      console.error("Failed to save booking to DB:", err);
      toast({
        variant: "destructive",
        title: "Gagal Mengambil Pesanan",
        description: "Terjadi kesalahan saat menyimpan data pesanan.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConsultation = () => {
    const text = `Halo, saya ingin bertanya tentang Paket Wisata *${trip.title}*.`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${waNumber}?text=${encodedText}`, "_blank");
  };

  return (
    <StandardLayout>
      <div className="bg-[#064E3B] px-8 py-3 hidden md:block">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400/60">
          <Link to="/" className="hover:text-emerald-300">Home</Link>
          <span>/</span>
          <Link to="/paket-wisata" className="hover:text-emerald-300">Paket Wisata</Link>
          <span>/</span>
          <span className="text-emerald-300">{trip.title}</span>
        </div>
      </div>
      {/* ── HERO ── */}
      <section className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${trip.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full hover:bg-white/20 transition-all"
        >
          <ArrowLeft size={14} /> Kembali
        </button>

        {/* Like & Share */}
        <div className="absolute top-8 right-8 z-20 flex gap-3">
          <button
            onClick={() => setLiked(!liked)}
            className={`w-12 h-12 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all ${liked ? "bg-red-500 border-red-500" : "bg-white/10 border-white/20 hover:bg-white/20"}`}
          >
            <Heart size={18} className="text-white" fill={liked ? "white" : "none"} />
          </button>
          <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
            <Share2 size={18} className="text-white" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-20 pb-16">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-emerald-500 text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest">
              {trip.region}
            </span>
            <span className="bg-white/10 backdrop-blur-xl text-white text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-widest border border-white/20">
              {trip.category}
            </span>
            <span className="bg-white/10 backdrop-blur-xl text-white text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-widest border border-white/20 flex items-center gap-2">
              <Star size={10} fill="white" /> {trip.rating} ({trip.reviews} ulasan)
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter uppercase leading-tight mb-4 max-w-4xl">
            {trip.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold tracking-widest uppercase text-white/60">
            <span className="flex items-center gap-2"><Clock size={13} />{trip.duration}</span>
            <span className="w-1 h-1 bg-white/30 rounded-full" />
            <span className="flex items-center gap-2"><MapPin size={13} />{trip.region}</span>
            <span className="w-1 h-1 bg-white/30 rounded-full" />
            <span className="flex items-center gap-2"><Users size={13} />Min. {trip.minPax} Orang</span>
          </div>
        </div>
      </section>

      {/* ── STICKY BOOKING BAR ── */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-2xl border-b border-emerald-100 shadow-sm px-8 md:px-20 py-4 flex items-center justify-between gap-6">
        <div>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Mulai dari</p>
          <p className="text-2xl font-black text-[#064E3B]">{trip.price}<span className="text-sm font-normal text-slate-400">/orang</span></p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Durasi</span>
          <span className="text-sm font-black text-[#064E3B]">{trip.duration}</span>
        </div>
        <a
          href="#booking"
          className="bg-[#064E3B] hover:bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
        >
          Pesan Sekarang
        </a>
      </div>

      {/* ── MAIN CONTENT ── */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16">

          {/* LEFT: Content */}
          <div className="space-y-16">

            {/* Highlights */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.6em] text-emerald-600 uppercase mb-4">Yang Akan Anda Alami</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#064E3B] tracking-tighter uppercase mb-8">Highlight Perjalanan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trip.highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-emerald-50 border border-emerald-100 hover:border-emerald-300 transition-colors group">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={16} className="text-white" />
                    </div>
                    <span className="text-sm font-bold text-[#064E3B]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab Navigation */}
            <div>
              <div className="flex gap-2 mb-10 border-b border-slate-100 pb-0">
                {(["itinerary", "fasilitas"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all border-b-2 -mb-px ${
                      activeTab === tab
                        ? "border-emerald-500 text-emerald-600"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {tab === "itinerary" ? "Itinerary" : "Fasilitas"}
                  </button>
                ))}
              </div>

              {/* ITINERARY */}
              {activeTab === "itinerary" && (
                <div className="space-y-4">
                  {trip.itinerary.map((day, i) => (
                    <div key={i} className="border border-slate-100 rounded-3xl overflow-hidden hover:border-emerald-200 transition-colors">
                      <button
                        onClick={() => setActiveDay(activeDay === i ? null : i)}
                        className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-emerald-50/50 transition-colors"
                      >
                        <div className="flex items-center gap-5">
                          <span className="w-12 h-12 rounded-2xl bg-[#064E3B] text-white text-[11px] font-black flex items-center justify-center shrink-0 tracking-wider">
                            {i + 1}
                          </span>
                          <div>
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{day.day}</span>
                            <p className="text-base font-extrabold text-[#064E3B] uppercase tracking-tight">{day.title}</p>
                          </div>
                        </div>
                        {activeDay === i ? <ChevronUp size={20} className="text-emerald-500 shrink-0" /> : <ChevronDown size={20} className="text-slate-300 shrink-0" />}
                      </button>
                      {activeDay === i && (
                        <div className="px-8 pb-8 space-y-5 border-t border-emerald-50">
                          <p className="text-slate-500 leading-relaxed text-sm pt-6">{day.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {day.points.map((pt, j) => (
                              <span key={j} className="bg-[#064E3B]/5 text-[#064E3B] text-[11px] font-bold px-4 py-2 rounded-full">
                                {pt}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* FASILITAS */}
              {activeTab === "fasilitas" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-base font-extrabold text-[#064E3B] uppercase tracking-tight mb-5 flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-emerald-500" /> Sudah Termasuk
                    </h3>
                    <div className="space-y-3">
                      {trip.included.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                            <CheckCircle2 size={12} className="text-emerald-600" />
                          </div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#064E3B] uppercase tracking-tight mb-5 flex items-center gap-3">
                      <XCircle size={18} className="text-red-400" /> Tidak Termasuk
                    </h3>
                    <div className="space-y-3">
                      {trip.excluded.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-slate-500">
                          <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                            <XCircle size={12} className="text-red-400" />
                          </div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Gallery */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.6em] text-emerald-600 uppercase mb-4">Galeri</p>
              <h2 className="text-3xl font-extrabold text-[#064E3B] tracking-tighter uppercase mb-8">Foto Perjalanan</h2>
              <div className="grid grid-cols-3 gap-4">
                {trip.gallery.map((img, i) => (
                  <div key={i} className={`rounded-3xl overflow-hidden ${i === 0 ? "col-span-2 row-span-2 h-80" : "h-36"} group`}>
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Booking Card */}
          <div id="booking">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-white border border-emerald-100 rounded-[40px] p-8 shadow-xl">
                <div className="flex items-end justify-between mb-8 pb-8 border-b border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Harga Per Orang</p>
                    <p className="text-4xl font-black text-[#064E3B]">{trip.price}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                    <span className="text-xs font-black text-slate-500 ml-1">{trip.rating}</span>
                  </div>
                </div>

                <div className="space-y-5 mb-8">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Tanggal Berangkat</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border border-slate-200 rounded-2xl h-14 pl-11 pr-4 text-sm font-bold text-[#064E3B] focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
                      Jumlah Peserta ({trip.minPax}–{trip.maxPax} orang)
                    </label>
                    <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden h-14">
                      <button
                        onClick={() => setPax(Math.max(trip.minPax, pax - 1))}
                        className="w-14 h-full flex items-center justify-center font-black text-xl text-[#064E3B] hover:bg-emerald-50 transition-colors"
                      >
                        −
                      </button>
                      <span className="flex-1 text-center font-black text-[#064E3B] text-lg">{pax}</span>
                      <button
                        onClick={() => setPax(Math.min(trip.maxPax, pax + 1))}
                        className="w-14 h-full flex items-center justify-center font-black text-xl text-[#064E3B] hover:bg-emerald-50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Nama Lengkap</label>
                    <input
                      type="text"
                      placeholder="Nama Anda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-slate-200 rounded-2xl h-14 px-5 text-sm font-bold text-[#064E3B] placeholder:text-slate-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Nomor WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+62 8xx-xxxx-xxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-slate-200 rounded-2xl h-14 px-5 text-sm font-bold text-[#064E3B] placeholder:text-slate-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>
                </div>

                {/* Total Price */}
                <div className="flex items-center justify-between py-5 border-y border-dashed border-emerald-100 mb-6">
                  <span className="text-sm font-bold text-slate-500">Total ({pax} orang)</span>
                  <span className="text-2xl font-black text-[#064E3B]">Rp {totalPrice}</span>
                </div>

                <Button 
                  onClick={handleBooking} 
                  disabled={loading}
                  className="w-full bg-[#064E3B] hover:bg-emerald-600 text-white font-black h-14 rounded-full uppercase tracking-widest text-[11px] shadow-lg transition-all hover:scale-105 mb-4"
                >
                  {loading ? "Memproses..." : "Pesan Paket Ini"}
                </Button>
                <Button onClick={handleConsultation} variant="outline" className="w-full border-emerald-200 text-[#064E3B] h-14 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-emerald-50 flex items-center justify-center gap-2">
                  <MessageCircle size={16} /> Konsultasi WhatsApp
                </Button>
              </div>

              {/* Contact Card */}
              <div className="bg-[#064E3B] rounded-[32px] p-7 text-white space-y-4">
                <p className="text-xs font-black uppercase tracking-widest text-emerald-300">Butuh Bantuan?</p>
                <p className="text-sm text-white/70 leading-relaxed">Tim kami siap membantu Anda merencanakan perjalanan terbaik.</p>
                <a href="tel:+626251234567" className="flex items-center gap-3 text-white font-bold text-sm hover:text-emerald-300 transition-colors">
                  <Phone size={16} /> +62 625 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED PACKAGES ── */}
      {related.length > 0 && (
        <section className="py-24 px-6 md:px-16 bg-[#f9faf8]">
          <div className="max-w-[1440px] mx-auto">
            <p className="text-[11px] font-bold tracking-[0.6em] text-emerald-600 uppercase mb-4">Rekomendasi Lainnya</p>
            <h2 className="text-3xl font-extrabold text-[#064E3B] tracking-tighter uppercase mb-12">Paket Serupa</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((rel, i) => (
                <Link to={`/paket-wisata/${rel.id}`} key={i} className="group block">
                  <div className="relative h-64 rounded-[32px] overflow-hidden mb-6 shadow-lg">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110"
                      style={{ backgroundImage: `url(${rel.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <span className="text-[10px] font-black bg-emerald-500 px-3 py-1 rounded-full uppercase tracking-wider">{rel.region}</span>
                      <h3 className="text-lg font-extrabold mt-2 leading-tight group-hover:text-emerald-300 transition-colors">{rel.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-2">
                    <span className="text-xl font-black text-[#064E3B]">{rel.price}</span>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Clock size={12} />{rel.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </StandardLayout>
  );
}
