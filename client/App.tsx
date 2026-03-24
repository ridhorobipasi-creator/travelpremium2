import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PaketWisata from "./pages/PaketWisata";
import PaketDetail from "./pages/PaketDetail";
import RentalMobil from "./pages/RentalMobil";
import RentalDetail from "./pages/RentalDetail";
import Galeri from "./pages/Galeri";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/paket-wisata" element={<PaketWisata />} />
          <Route path="/packages" element={<PaketWisata />} />
          <Route path="/paket-wisata/:id" element={<PaketDetail />} />
          <Route path="/packages/:id" element={<PaketDetail />} />

          <Route path="/rental-mobil" element={<RentalMobil />} />
          <Route path="/cars" element={<RentalMobil />} />
          <Route path="/rental-mobil/:id" element={<RentalDetail />} />
          <Route path="/cars/:id" element={<RentalDetail />} />

          <Route path="/galeri" element={<Galeri />} />
          <Route path="/gallery" element={<Galeri />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
