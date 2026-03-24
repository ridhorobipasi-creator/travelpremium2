import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function Admin() {
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
    window.location.href = `${backendUrl.replace(/\/api\/?$/, '').replace(/\/$/, '')}/admin`;
  }, []);

  const adminUrl = (import.meta.env.VITE_BACKEND_URL || "http://localhost:8000").replace(/\/api\/?$/, '').replace(/\/$/, '') + "/admin";

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-slate-50 text-slate-800">
      <Loader2 className="w-10 h-10 animate-spin text-emerald-500 mb-6" />
      <div className="text-center px-6">
        <h2 className="text-3xl font-extrabold mb-3 tracking-tight text-[#064E3B]">Mengalihkan ke Admin Panel...</h2>
        <p className="text-slate-500 text-lg mb-6">Membuka Dashboard Laravel Filament.</p>
        
        <p className="text-sm text-slate-400">
          Jika tidak teralihkan dalam 3 detik, silakan klik{" "}
          <a href={adminUrl} className="text-emerald-600 font-bold hover:underline">
            tautan ini
          </a>.
        </p>
      </div>
    </div>
  );
}
