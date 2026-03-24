import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { StandardLayout } from "@/layouts/StandardLayout";
import { CARS } from "@/constants/data";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Users, Fuel, Settings, Wind, CheckCircle2,
  Calendar, Phone, MessageCircle, Share2, ChevronLeft, ChevronRight,
  Zap, ShieldCheck
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { carsApi, bookingsApi } from "@/lib/api";

import { useToast } from "@/components/ui/use-toast";
import { useSettings } from "@/hooks/use-settings";

export default function RentalDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { settings } = useSettings();
  const [activeImage, setActiveImage] = useState(0);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [days, setDays] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: apiCar } = useQuery({
    queryKey: ["car", id],
    queryFn: () => carsApi.get(id!),
    enabled: !!id,
  });

  const car = apiCar || CARS.find((c) => c.id === id);

  if (!car) {
    return (
      <StandardLayout>
        <div className="min-h-screen flex items-center justify-center flex-col gap-6">
          <h1 className="text-4xl font-black text-[#064E3B]">Armada Tidak Ditemukan</h1>
          <Link to="/rental-mobil">
            <Button className="bg-emerald-600 text-white rounded-full px-8">Kembali ke Daftar Armada</Button>
          </Link>
        </div>
      </StandardLayout>
    );
  }

  const totalPrice = (car.pricePerDayNum * days).toLocaleString("id-ID");
  const relatedCars = CARS.filter((c) => c.id !== car.id).slice(0, 3);

  const waNumber = settings?.whatsappNumber || "626251234567";

  const handleBooking = async () => {
    if (!pickupDate || !returnDate || !name || !phone) {
      toast({
        variant: "destructive",
        title: "Data Kurang Lengkap",
        description: "Harap isi tanggal mulai, tanggal selesai, nama, dan whatsapp anda.",
      });
      return;
    }

    setLoading(true);
    try {
      await bookingsApi.create({
        booking_type: "car",
        item_name: car.title,
        date_start: pickupDate,
        date_end: returnDate,
        quantity: 1,
        consumer_name: name,
        consumer_whatsapp: phone,
        total_price: car.pricePerDayNum * days,
      });

      toast({
        title: "Pesanan Terkirim ke Admin",
        description: "Data pesanan sewa mobil anda sudah tersimpan. Mengalihkan ke WhatsApp...",
      });

      const text = `Halo, saya ingin memesan Rental Mobil:
*${car.title}* (${car.unit})
- Tanggal Mulai: ${pickupDate || "-"}
- Tanggal Selesai: ${returnDate || "-"}
- Jumlah Hari: ${days} Hari
- Nama: ${name || "-"}
- WhatsApp: ${phone || "-"}
- Estimasi Harga: Rp ${totalPrice}

Mohon informasi ketersediaan unit.`;
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
    const text = `Halo, saya ingin bertanya tentang Rental Mobil *${car.title}*.`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${waNumber}?text=${encodedText}`, "_blank");
  };

  return (
    <StandardLayout>
      <div className="bg-[#064E3B] px-8 py-3 hidden md:block">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400/60">
          <Link to="/" className="hover:text-emerald-300">Home</Link>
          <span>/</span>
          <Link to="/rental-mobil" className="hover:text-emerald-300">Rental Mobil</Link>
          <span>/</span>
          <span className="text-emerald-300">{car.title}</span>
        </div>
      </div>
      {/* ── HERO ── */}
      <section className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-all duration-[2s]"
          style={{ backgroundImage: `url(${car.imgDetail || car.img})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full hover:bg-white/20 transition-all"
        >
          <ArrowLeft size={14} /> Kembali
        </button>

        <button className="absolute top-8 right-8 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
          <Share2 size={18} className="text-white" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-20 pb-16">
          <span className="inline-block bg-emerald-500 text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest mb-4">
            {car.unit}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter uppercase leading-tight mb-6">
            {car.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold tracking-widest uppercase text-white/60">
            <span className="flex items-center gap-2"><Users size={13} />{car.seats} Kursi</span>
            <span className="w-1 h-1 bg-white/30 rounded-full" />
            <span className="flex items-center gap-2"><Fuel size={13} />{car.fuelType}</span>
            <span className="w-1 h-1 bg-white/30 rounded-full" />
            <span className="flex items-center gap-2"><Settings size={13} />{car.transmission}</span>
          </div>
        </div>
      </section>

      {/* ── STICKY BAR ── */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-2xl border-b border-emerald-100 shadow-sm px-8 md:px-20 py-4 flex items-center justify-between gap-6">
        <div>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Harga Per Hari</p>
          <p className="text-2xl font-black text-[#064E3B]">{car.pricePerDay}<span className="text-sm font-normal text-slate-400">/hari</span></p>
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span className="flex items-center gap-2"><Users size={14} className="text-emerald-500" />{car.seats} Penumpang</span>
          <span className="flex items-center gap-2"><Wind size={14} className="text-emerald-500" />Full AC</span>
        </div>
        <a href="#booking" className="bg-[#064E3B] hover:bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg">
          Pesan Sekarang
        </a>
      </div>

      {/* ── MAIN CONTENT ── */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">

          {/* LEFT */}
          <div className="space-y-16">

            {/* Gallery */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.6em] text-emerald-600 uppercase mb-4">Galeri Unit</p>
              <div className="relative rounded-[40px] overflow-hidden h-[420px] mb-4 shadow-2xl group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105"
                  style={{ backgroundImage: `url(${car.gallery[activeImage]})` }}
                />
                <button
                  onClick={() => setActiveImage((activeImage - 1 + car.gallery.length) % car.gallery.length)}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/40 transition-all"
                >
                  <ChevronLeft size={20} className="text-white" />
                </button>
                <button
                  onClick={() => setActiveImage((activeImage + 1) % car.gallery.length)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/40 transition-all"
                >
                  <ChevronRight size={20} className="text-white" />
                </button>
              </div>
              <div className="flex gap-3">
                {car.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-1 h-24 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === i ? "border-emerald-500 scale-95" : "border-transparent hover:border-emerald-200"}`}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.6em] text-emerald-600 uppercase mb-4">Tentang Unit Ini</p>
              <h2 className="text-3xl font-extrabold text-[#064E3B] tracking-tighter uppercase mb-6">{car.title}</h2>
              <p className="text-slate-500 leading-relaxed text-base">{car.desc}</p>
            </div>

            {/* Specs Grid */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.6em] text-emerald-600 uppercase mb-4">Spesifikasi</p>
              <h2 className="text-3xl font-extrabold text-[#064E3B] tracking-tighter uppercase mb-8">Detail Kendaraan</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <Users size={24} />, label: "Kapasitas", value: `${car.seats} Penumpang` },
                  { icon: <Fuel size={24} />, label: "Bahan Bakar", value: car.fuelType },
                  { icon: <Settings size={24} />, label: "Transmisi", value: car.transmission },
                  { icon: <Wind size={24} />, label: "AC", value: car.ac ? "Full AC" : "Non-AC" },
                ].map((spec, i) => (
                  <div key={i} className="bg-[#f9faf8] rounded-3xl p-6 text-center hover:bg-emerald-50 transition-colors group">
                    <div className="w-12 h-12 bg-[#064E3B] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      {spec.icon}
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{spec.label}</p>
                    <p className="text-base font-extrabold text-[#064E3B]">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features & Best For */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-[11px] font-bold tracking-[0.6em] text-emerald-600 uppercase mb-4">Fasilitas Termasuk</p>
                <div className="space-y-3">
                  {car.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span className="text-sm font-bold text-slate-600">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-[0.6em] text-emerald-600 uppercase mb-4">Cocok Untuk</p>
                <div className="space-y-3">
                  {car.bestFor.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                      <Zap size={14} className="text-emerald-600 shrink-0" />
                      <span className="text-sm font-bold text-[#064E3B]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Safety */}
            <div className="bg-[#064E3B] rounded-[40px] p-10 text-white flex flex-col md:flex-row items-center gap-8">
              <ShieldCheck size={60} className="text-emerald-400 shrink-0" />
              <div>
                <h3 className="text-xl font-extrabold uppercase tracking-tighter mb-2">Standar Keamanan Kami</h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  Semua armada kami dilengkapi asuransi penumpang penuh, diperiksa secara berkala oleh mekanik bersertifikat, dan dikemudikan oleh supir profesional yang berpengalaman di medan Sumatera Utara.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Booking */}
          <div id="booking">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white border border-emerald-100 rounded-[40px] p-8 shadow-xl">
                <div className="pb-8 mb-8 border-b border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Harga Per Hari</p>
                  <p className="text-4xl font-black text-[#064E3B]">{car.pricePerDay}</p>
                  <p className="text-xs text-slate-400 mt-1">*Sudah termasuk sopir & BBM</p>
                </div>

                <div className="space-y-5 mb-8">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Tanggal Mulai Sewa</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full border border-slate-200 rounded-2xl h-14 pl-11 pr-4 text-sm font-bold text-[#064E3B] focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Tanggal Selesai Sewa</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full border border-slate-200 rounded-2xl h-14 pl-11 pr-4 text-sm font-bold text-[#064E3B] focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Jumlah Hari</label>
                    <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden h-14">
                      <button
                        onClick={() => setDays(Math.max(1, days - 1))}
                        className="w-14 h-full flex items-center justify-center font-black text-xl text-[#064E3B] hover:bg-emerald-50 transition-colors"
                      >
                        −
                      </button>
                      <span className="flex-1 text-center font-black text-[#064E3B] text-lg">{days} Hari</span>
                      <button
                        onClick={() => setDays(days + 1)}
                        className="w-14 h-full flex items-center justify-center font-black text-xl text-[#064E3B] hover:bg-emerald-50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Nama Pemesan</label>
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-slate-200 rounded-2xl h-14 px-5 text-sm font-bold text-[#064E3B] placeholder:text-slate-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+62 8xx-xxxx-xxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-slate-200 rounded-2xl h-14 px-5 text-sm font-bold text-[#064E3B] placeholder:text-slate-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-5 border-y border-dashed border-emerald-100 mb-6">
                  <span className="text-sm font-bold text-slate-500">Total ({days} hari)</span>
                  <span className="text-2xl font-black text-[#064E3B]">Rp {totalPrice}</span>
                </div>

                <Button 
                  onClick={handleBooking} 
                  disabled={loading}
                  className="w-full bg-[#064E3B] hover:bg-emerald-600 text-white font-black h-14 rounded-full uppercase tracking-widest text-[11px] shadow-lg transition-all hover:scale-105 mb-4"
                >
                  {loading ? "Memproses..." : "Pesan Unit Ini"}
                </Button>
                <Button onClick={handleConsultation} variant="outline" className="w-full border-emerald-200 text-[#064E3B] h-14 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-emerald-50 flex items-center justify-center gap-2">
                  <MessageCircle size={16} /> Chat WhatsApp
                </Button>
              </div>

              <div className="bg-[#064E3B] rounded-[32px] p-7 text-white space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-emerald-300">24/7 Support</p>
                <p className="text-sm text-white/70">Hubungi kami kapan saja untuk informasi ketersediaan unit.</p>
                <a href="tel:+626251234567" className="flex items-center gap-3 text-white font-bold text-sm hover:text-emerald-300 transition-colors">
                  <Phone size={16} /> +62 625 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED CARS ── */}
      <section className="py-24 px-6 md:px-16 bg-[#f9faf8]">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-[11px] font-bold tracking-[0.6em] text-emerald-600 uppercase mb-4">Pilihan Lainnya</p>
          <h2 className="text-3xl font-extrabold text-[#064E3B] tracking-tighter uppercase mb-12">Armada Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedCars.map((rel, i) => (
              <Link to={`/rental-mobil/${rel.id}`} key={i} className="group block bg-white rounded-[32px] p-4 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-slate-100">
                <div className="h-48 rounded-[24px] overflow-hidden mb-6 relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110"
                    style={{ backgroundImage: `url(${rel.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-white text-[10px] font-black bg-emerald-600 px-3 py-1 rounded-full uppercase tracking-wider">{rel.unit}</span>
                </div>
                <div className="px-2 pb-4">
                  <h3 className="text-lg font-extrabold text-[#064E3B] uppercase tracking-tight mb-2 group-hover:text-emerald-500 transition-colors">{rel.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-[#064E3B]">{rel.pricePerDay}<span className="text-xs font-normal text-slate-400">/hari</span></span>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Users size={12} />{rel.seats} Kursi</span>
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
