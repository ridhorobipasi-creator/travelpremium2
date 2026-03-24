interface Props {
  title: string;
  subtitle: string;
  image: string;
  height?: string;
}

export const HeroPageSection = ({ title, subtitle, image, height = "50vh" }: Props) => {
  return (
    <section 
      className="relative flex items-center justify-center text-center overflow-hidden" 
      style={{ minHeight: height }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      
      <div className="relative z-10 px-6 max-w-4xl animate-in fade-in zoom-in duration-700">
        <p className="text-[11px] font-bold tracking-[0.6em] text-emerald-400 uppercase mb-4">Wonderfull Toba</p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter uppercase leading-none mb-6">
          {title}
        </h1>
        <p className="text-lg text-white/70 font-medium max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
};
