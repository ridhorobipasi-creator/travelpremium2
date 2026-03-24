import { useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { 
  Briefcase, 
  Car, 
  CreditCard, 
  Home, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  Settings, 
  Users 
} from "lucide-react";

const chartData = [
  { name: "Senin", total: 1200000 },
  { name: "Selasa", total: 2100000 },
  { name: "Rabu", total: 800000 },
  { name: "Kamis", total: 3200000 },
  { name: "Jumat", total: 4500000 },
  { name: "Sabtu", total: 8900000 },
  { name: "Minggu", total: 10200000 },
];

const recentBookings = [
  { id: "INV001", user: "Budi Santoso", package: "Danau Toba 3H2M", status: "Lunas", date: "24 Mar 2026" },
  { id: "INV002", user: "Andi Wijaya", package: "Rental Hiace", status: "DP", date: "24 Mar 2026" },
  { id: "INV003", user: "Sari Indah", package: "Samosir Tour 2H1M", status: "Belum Bayar", date: "23 Mar 2026" },
  { id: "INV004", user: "Keluarga Rahman", package: "Danau Toba 4H3M", status: "Lunas", date: "22 Mar 2026" },
];

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-slate-300 transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-center p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-emerald-500" />
            Travel<span className="text-emerald-500">Admin</span>
          </h1>
        </div>
        
        <nav className="p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-white bg-emerald-600 rounded-lg shadow-emerald-600/20 shadow-lg">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Home className="w-5 h-5" />
            <span className="font-medium">Paket Wisata</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Car className="w-5 h-5" />
            <span className="font-medium">Armada Mobil</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <CreditCard className="w-5 h-5" />
            <span className="font-medium">Transaksi</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium">Pelanggan</span>
          </a>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Keluar</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between p-4 bg-white border-b lg:px-8">
          <button 
            className="p-2 text-slate-500 rounded-lg hover:bg-slate-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="ml-auto flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-emerald-500 flex items-center justify-center font-bold text-slate-600">
              AD
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-700">Administrator</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 overflow-auto p-4 lg:p-8"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Ringkasan Mode Tampilan</h2>
            <p className="text-slate-500 mt-1">Halaman admin ini berjalan (Mode UI Statis tanpa terhubung API backend).</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-500 font-medium">Total Pendapatan</h3>
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-800">Rp 30.9M</p>
              <p className="text-sm text-emerald-500 mt-2 font-medium">+12.5% dari bulan lalu</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-500 font-medium">Booking Baru</h3>
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-800">124</p>
              <p className="text-sm text-blue-500 mt-2 font-medium">+4 pemesanan hari ini</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-500 font-medium">Total Armada</h3>
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-800">18</p>
              <p className="text-sm text-amber-500 mt-2 font-medium">12 tersedia saat ini</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-500 font-medium">Pelanggan</h3>
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-800">892</p>
              <p className="text-sm text-purple-500 mt-2 font-medium">+18 pelanggan baru</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Area */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Grafik Pendapatan Mingguan</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} tickFormatter={(val) => `Rp ${val / 1000000}Jt`} />
                    <Tooltip 
                      formatter={(val: number) => `Rp ${val.toLocaleString('id-ID')}`}
                      contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    />
                    <Area type="monotone" dataKey="total" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Bookings List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Transaksi Terbaru</h3>
              <div className="space-y-6">
                {recentBookings.map((booking, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800">{booking.user}</p>
                      <p className="text-sm text-slate-500">{booking.package}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === "Lunas" ? "bg-emerald-100 text-emerald-800" :
                        booking.status === "DP" ? "bg-amber-100 text-amber-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {booking.status}
                      </span>
                      <p className="text-xs text-slate-400 mt-1">{booking.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2.5 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                Lihat Semua Transaksi
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
