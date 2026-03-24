import { useParams, Link, useNavigate } from "react-router-dom";
import { StandardLayout } from "@/layouts/StandardLayout";
import { BLOG_POSTS } from "@/constants/data";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Link2, ChevronRight, Tag
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { blogsApi } from "@/lib/api";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: apiPost, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogsApi.get(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <StandardLayout>
        <div className="h-screen w-full flex items-center justify-center bg-slate-50">
          <div className="w-96 h-2 animate-skeleton rounded-full" />
        </div>
      </StandardLayout>
    );
  }

  const post = apiPost || BLOG_POSTS.find((p) => p.id === id);

  if (!post) {
    return (
      <StandardLayout>
        <div className="min-h-screen flex items-center justify-center flex-col gap-6">
          <h1 className="text-4xl font-black text-[#064E3B]">Artikel Tidak Ditemukan</h1>
          <Link to="/blog">
            <Button className="bg-emerald-600 text-white rounded-full px-8">Kembali ke Blog</Button>
          </Link>
        </div>
      </StandardLayout>
    );
  }

  const relatedPosts = BLOG_POSTS.filter((p) => post.related?.includes(p.id) || p.label === post.label)
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  return (
    <StandardLayout>
      <div className="bg-[#064E3B] px-8 py-3 hidden md:block">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400/60">
          <Link to="/" className="hover:text-emerald-300">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-emerald-300">Blog</Link>
          <span>/</span>
          <span className="text-emerald-300">{post.title}</span>
        </div>
      </div>
      {/* ── META INFO AREA ── */}
      <section className="pt-32 pb-16 px-6 md:px-16 bg-[#f9faf8]">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-in slide-in-from-bottom-8 duration-700">
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600 hover:text-[#064E3B] transition-colors mb-4"
          >
            <ArrowLeft size={16} /> Kembali ke Artikel
          </button>
          
          <div className="flex justify-center mb-6">
            <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-sm">
              {post.label}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#064E3B] tracking-tighter uppercase leading-tight mb-8">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500">
            <span className="flex items-center gap-2 text-[#064E3B]"><Calendar size={14} className="text-emerald-500" /> {post.date}</span>
            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
            <span className="flex items-center gap-2"><User size={14} className="text-emerald-500" /> {post.author}</span>
            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
            <span className="flex items-center gap-2"><Clock size={14} className="text-emerald-500" /> {post.readTime} Baca</span>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      <section className="px-6 md:px-16 mb-20">
        <div className="max-w-[1440px] mx-auto relative group h-[400px] md:h-[600px]">
          <div 
            className="absolute inset-0 rounded-[40px] md:rounded-[60px] bg-cover bg-center shadow-2xl transition-transform duration-[3s] group-hover:scale-[1.02]"
            style={{ backgroundImage: `url(${post.img})` }}
          />
        </div>
      </section>

      {/* ── ARTICLE CONTENT ── */}
      <section className="px-6 md:px-16 pb-32">
        <div className="max-w-3xl mx-auto">
          
          {/* Main Content */}
          <article className="prose prose-lg prose-emerald max-w-none prose-headings:font-extrabold prose-headings:text-[#064E3B] prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-8 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:p-8 prose-blockquote:rounded-3xl prose-blockquote:font-bold prose-blockquote:text-[#064E3B] prose-blockquote:italic mb-16">
            {post.content?.map((block, i) => {
              if (block.type === 'paragraph') return <p key={i}>{block.text}</p>;
              if (block.type === 'heading') return <h2 key={i} className="text-3xl mt-12 mb-6">{block.text}</h2>;
              if (block.type === 'quote') return (
                <blockquote key={i} className="my-12">
                  <p className="text-2xl not-italic font-medium leading-relaxed">"{block.text}"</p>
                  {block.author && <footer className="text-sm uppercase tracking-widest text-emerald-600 mt-4 not-italic font-black">— {block.author}</footer>}
                </blockquote>
              );
              return null;
            })}
          </article>

          {/* Tags & Share */}
          <div className="border-t border-slate-200 pt-10 mt-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-wrap gap-3">
              <Tag size={16} className="text-emerald-500 shrink-0 mt-1" />
              {post.tags?.map((tag, i) => (
                <span key={i} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest hover:bg-emerald-100 hover:text-emerald-700 transition-colors cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bagikan</span>
              <div className="flex gap-2">
                {[Facebook, Twitter, Link2].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#064E3B] hover:text-white transition-all">
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ── RELATED POSTS ── */}
      {relatedPosts.length > 0 && (
        <section className="py-24 px-6 md:px-16 bg-[#f9faf8]">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <p className="text-[11px] font-bold tracking-[0.6em] text-emerald-600 uppercase mb-4">Lanjutkan Membaca</p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#064E3B] tracking-tighter uppercase">Artikel <span className="text-emerald-500">Terkait</span></h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rel, i) => (
                <Link to={`/blog/${rel.id}`} key={i} className="group cursor-pointer">
                  <div className="relative h-64 rounded-[32px] overflow-hidden mb-6 shadow-xl">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] group-hover:scale-110"
                      style={{ backgroundImage: `url(${rel.img})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-6 left-6 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                      {rel.label}
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Calendar size={12} className="text-emerald-500" /> {rel.date}
                    </p>
                    <h3 className="text-2xl font-black text-[#064E3B] tracking-tight mb-4 group-hover:text-emerald-500 transition-colors uppercase leading-tight">
                      {rel.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-6">{rel.desc}</p>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                      Baca Sekarang <ChevronRight size={14} />
                    </span>
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
