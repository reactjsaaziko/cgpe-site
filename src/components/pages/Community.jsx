import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, BookOpen, Award, Heart, Sun, Flower2, Brain, Music, Waves, HandHeart, Utensils, Shield, Trophy, FileText, Umbrella, Building } from 'lucide-react';
import CGPEHeader from '../headers/CGPEHeader';
import CGPEFooter from '../Footer';

/* ===== Shared Animation Helpers ===== */
const ease = [0.25, 0.1, 0.25, 1];
const sectionVariants = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease },
};
const staggerChildren = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease },
};
const staggerDelay = (index) => ({
  ...staggerChildren,
  transition: { ...staggerChildren.transition, delay: index * 0.08 },
});

/* ===== Decorative Components ===== */
const FloatingParticles = ({ count = 6 }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full animate-float-particle-c"
        style={{
          backgroundColor: 'rgba(184, 116, 51, 0.2)',
          width: `${4 + Math.random() * 8}px`,
          height: `${4 + Math.random() * 8}px`,
          left: `${10 + Math.random() * 80}%`,
          top: `${10 + Math.random() * 80}%`,
          animationDelay: `${i * 1.3}s`,
          animationDuration: `${6 + Math.random() * 4}s`,
        }}
      />
    ))}
  </div>
);

const MandalaSVG = ({ className = "", size = 300 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={`animate-spin-slow-c ${className}`} style={{ opacity: 0.06 }}>
    {[0, 30, 60, 90, 120, 150].map((angle) => (
      <g key={angle} transform={`rotate(${angle} 100 100)`}>
        <ellipse cx="100" cy="40" rx="18" ry="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <ellipse cx="100" cy="30" rx="8" ry="20" fill="none" stroke="currentColor" strokeWidth="0.3" />
      </g>
    ))}
    <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.4" />
    <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.3" />
    <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.2" />
  </svg>
);

const DiyaIcon = ({ className = "", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3c0 0-1.5 2-1.5 3.5S11 9 12 9s1.5-1 1.5-2.5S12 3 12 3z" fill="currentColor" opacity="0.6" />
    <path d="M12 9v2" stroke="currentColor" strokeWidth="1" />
    <ellipse cx="12" cy="14" rx="6" ry="3" fill="currentColor" opacity="0.2" />
    <path d="M6 14c0 2 2.7 4 6 4s6-2 6-4" stroke="currentColor" strokeWidth="1" fill="none" />
    <path d="M6 14h12" stroke="currentColor" strokeWidth="1" />
    <path d="M8 18l-1 3h10l-1-3" stroke="currentColor" strokeWidth="0.8" fill="currentColor" opacity="0.1" />
  </svg>
);

const OmSymbol = ({ className = "", style = {} }) => (
  <span className={`font-devanagari select-none ${className}`} style={{ color: 'rgba(184, 116, 51, 0.15)', ...style }}>ॐ</span>
);

const GangaDivider = ({ className = "" }) => (
  <div className={`w-full max-w-lg mx-auto my-16 ${className}`}>
    <svg viewBox="0 0 400 30" className="w-full" style={{ opacity: 0.3 }}>
      <path d="M0 15 Q25 5, 50 15 Q75 25, 100 15 Q125 5, 150 15 Q175 25, 200 15 Q225 5, 250 15 Q275 25, 300 15 Q325 5, 350 15 Q375 25, 400 15" fill="none" stroke="#B87433" strokeWidth="1.5" />
      <path d="M0 20 Q25 10, 50 20 Q75 30, 100 20 Q125 10, 150 20 Q175 30, 200 20 Q225 10, 250 20 Q275 30, 300 20 Q325 10, 350 20 Q375 30, 400 20" fill="none" stroke="#B87433" strokeWidth="0.8" />
    </svg>
  </div>
);

const SanskritShloka = ({ text, translation, className = "" }) => (
  <div className={`text-center ${className}`}>
    <p className="font-devanagari text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(184, 116, 51, 0.7)' }}>{text}</p>
    {translation && <p className="text-muted-spiritual text-xs mt-2 italic">{translation}</p>}
  </div>
);

const LotusIcon = ({ className = "", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 21c-1.5-2-3-5-3-8 0-2 1-4 3-5 2 1 3 3 3 5 0 3-1.5 6-3 8z" fill="currentColor" opacity="0.3" />
    <path d="M12 21c-3-1.5-6-4.5-6-9 0-3 2-5.5 6-7 4 1.5 6 4 6 7 0 4.5-3 7.5-6 9z" fill="none" stroke="currentColor" strokeWidth="1" />
    <path d="M6 12c-2-.5-4-2-4.5-5 2 .5 4 2.5 4.5 5z" fill="currentColor" opacity="0.2" />
    <path d="M18 12c2-.5 4-2 4.5-5-2 .5-4 2.5-4.5 5z" fill="currentColor" opacity="0.2" />
  </svg>
);

const SectionLabel = ({ children }) => (
  <span className="text-eyebrow-spiritual block mb-3">{children}</span>
);

const SectionHeading = ({ children, className = "" }) => (
  <h2 className={`text-section-h2 header-glow-spiritual ${className}`}>{children}</h2>
);

const CornerFlourish = ({ position = "top-left", className = "" }) => {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 rotate-90",
    "bottom-left": "bottom-0 left-0 -rotate-90",
    "bottom-right": "bottom-0 right-0 rotate-180"
  };
  return (
    <div className={`absolute ${positionClasses[position]} pointer-events-none ${className}`}>
      <svg width="120" height="120" viewBox="0 0 120 120" style={{ color: 'rgba(184, 116, 51, 0.08)' }}>
        <path d="M0 0 Q30 0, 40 10 Q50 20, 60 20 Q70 20, 80 10 Q90 0, 120 0" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M0 0 Q0 30, 10 40 Q20 50, 20 60 Q20 70, 10 80 Q0 90, 0 120" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.3" />
        <circle cx="40" cy="40" r="2" fill="currentColor" opacity="0.2" />
      </svg>
    </div>
  );
};

const PeacockFeatherIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ color: 'rgba(184, 116, 51, 0.1)' }}>
    <path d="M12 22 L12 8" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="12" cy="6" rx="6" ry="8" fill="currentColor" opacity="0.15" />
    <ellipse cx="12" cy="6" rx="4" ry="6" fill="none" stroke="currentColor" strokeWidth="0.8" />
    <ellipse cx="12" cy="6" rx="2" ry="3" fill="currentColor" opacity="0.3" />
    <circle cx="12" cy="6" r="1" fill="currentColor" />
  </svg>
);

const ConchIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ color: 'rgba(184, 116, 51, 0.1)' }}>
    <path d="M8 12c0-3 2-6 4-6s4 3 4 6c0 2-1 4-2 5l-2 3-2-3c-1-1-2-3-2-5z" fill="currentColor" opacity="0.2" />
    <path d="M8 12c0-3 2-6 4-6s4 3 4 6c0 2-1 4-2 5l-2 3-2-3c-1-1-2-3-2-5z" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

/* ===== HERO SECTION ===== */
const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
    <div className="absolute inset-0">
      <div className="absolute inset-0 opacity-50">
        <iframe
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src="https://www.youtube.com/embed/_Sj-tf26TcY?start=216&autoplay=1&mute=1&controls=0&loop=1&playlist=_Sj-tf26TcY&playsinline=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&vq=hd1080"
          title="Community Sacred Background Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="eager"
          style={{ border: 0, pointerEvents: 'none' }}
        />
      </div>
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(20,12,8,0.65)' }} />
    </div>
    <FloatingParticles count={10} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <motion.span
        className="font-devanagari select-none"
        style={{ fontSize: '400px', color: 'rgb(184, 116, 51)' }}
        animate={{ opacity: [0.25, 0.50, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >ॐ</motion.span>
    </div>
    <div className="absolute top-20 left-10 pointer-events-none hidden lg:block"><PeacockFeatherIcon size={60} /></div>
    <div className="absolute top-20 right-10 pointer-events-none hidden lg:block"><ConchIcon size={50} /></div>
    <div className="absolute -top-20 -right-20 pointer-events-none" style={{ color: '#B87433' }}><MandalaSVG size={500} /></div>
    <div className="relative z-10 w-full h-full flex flex-col justify-between py-8 md:py-10">
      <div className="container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="mb-6">
          <p className="font-devanagari text-white text-xl md:text-2xl font-bold">ॐ नमो भगवते वासुदेवाय</p>
          <p className="text-white text-xs tracking-wider mt-1 italic font-bold">Om Namo Bhagavate Vasudevaya</p>
        </motion.div>
        <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="font-accent-spiritual block" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B87433', lineHeight: 1.5 }}>
          <DiyaIcon className="inline-block mr-2 -mt-1" size={18} />
          CGPE Presents · Shreemad Bhagavat Saptah
          <DiyaIcon className="inline-block ml-2 -mt-1" size={18} />
        </motion.span>
      </div>
      <div className="container mx-auto px-6 text-center max-w-5xl">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-hero-h1 mb-6" style={{ color: '#F7F0E8', textShadow: '0 2px 18px rgba(0,0,0,0.25)' }}>
          Beyond Financial Security.<br />A Journey to Inner Peace.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }} className="text-hero-support mx-auto mb-4" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.2)' }}>
          CGPE has always been there for your family's financial future. Now, join us in Rishikesh for a beautiful spiritual week filled with peace, joy, and positive energy for your whole family.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 1, delay: 0.9 }} className="font-gujarati text-body-small mb-6" style={{ color: '#B87433', opacity: 0.7 }}>
          શ્રીમદ્ ભાગવત સપ્તાહ · ઋષિકેશ · પવિત્ર ગંગા તટ
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.4 }} className="flex items-center justify-center gap-3">
          <OmSymbol className="text-3xl" style={{ color: '#B87433', opacity: 0.2, filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.1))' }} />
          <span className="font-accent-spiritual" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B87433', lineHeight: 1.5 }}>10 Days · 1 Sacred River · Your Entire Family Cared For</span>
          <OmSymbol className="text-3xl" style={{ color: '#B87433', opacity: 0.2, filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.1))' }} />
        </motion.div>
      </div>
    </div>
  </section>
);

/* ===== PURPOSE SECTION ===== */
const PurposeSection = () => {
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div {...sectionVariants} className="text-center">
          <SectionLabel>Our Purpose</SectionLabel>
          <SectionHeading className="whitespace-nowrap">True Care Goes Beyond Money</SectionHeading>
        </motion.div>
        <div className="flex gap-10 items-center justify-items-center mt-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:flex w-[320px] h-[340px] p-4 items-start justify-center cursor-pointer" onMouseEnter={() => setIsLeftHovered(true)} onMouseLeave={() => setIsLeftHovered(false)}>
            <motion.img src="/assets/community/શ્રીમદ્ભા ભાગવત સપ્તાહ આમંત્રણ-CGPE.png" alt="Chhaganbhai Gordhanbhai Sheliya" className="w-full h-full object-contain" initial={{ clipPath: "inset(0 0 0 0)" }} animate={isLeftHovered ? { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0 0)"] } : { clipPath: "inset(0 0 0 0)" }} transition={{ duration: 1.2, ease: "easeInOut" }} />
          </motion.div>
          <motion.div {...staggerDelay(1)} className="space-y-6 text-left max-w-[700px] mx-auto">
            <p className="text-body-regular">At CGPE, we believe real protection is about more than just finances. Yes, we help keep your family safe and build a bright future for your children.</p>
            <p className="text-body-regular">But we also know that peace of mind, happiness, and spiritual wellness are just as important for a healthy life.</p>
            <p className="text-body-large mt-10">This Saptah is our way of spending quality time with families we care about, supporting your emotional wellness, and giving you a peaceful, uplifting experience in the sacred beauty of Rishikesh.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:flex w-[240px] h-[260px] items-start justify-center cursor-pointer" onMouseEnter={() => setIsRightHovered(true)} onMouseLeave={() => setIsRightHovered(false)}>
            <motion.img src="/assets/community/શ્રીમદ્ભા ભાગવત સપ્તાહ આમંત્રણ-CGPE (1).png" alt="Gordhanbhai Arjanbhai Sheliya" className="w-full h-full object-contain" initial={{ clipPath: "inset(0 0 0 0)" }} animate={isRightHovered ? { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0 0)"] } : { clipPath: "inset(0 0 0 0)" }} transition={{ duration: 1.2, ease: "easeInOut" }} />
          </motion.div>
        </div>
        <motion.div {...staggerDelay(2)} className="mt-12">
          <SanskritShloka text="सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः" translation="May all be happy, may all be free from illness" />
        </motion.div>
      </div>
    </section>
  );
};

/* ===== KATHA GAYAK SECTION ===== */
const KathaGayakSection = () => {
  const highlights = [
    { icon: BookOpen, label: "Kathas Delivered", value: "740+", description: "Shreemad Bhagavat Kathas completed" },
    { icon: Globe, label: "International Kathas", value: "130+", description: "Conducted on international soil" },
    { icon: Users, label: "Countries", value: "Oman, UK, USA", description: "Travels abroad 2 months yearly" },
    { icon: Award, label: "Experience", value: "25+ Years", description: "Of spiritual guidance" },
  ];
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, rgba(255,237,213,0.4), rgba(255,251,235,0.3), rgba(255,237,213,0.4))' }}>
      <div className="absolute inset-0 pointer-events-none">
        <MandalaSVG className="absolute top-10 left-10" size={400} style={{ color: '#B87433' }} />
        <MandalaSVG className="absolute bottom-10 right-10" size={350} style={{ color: '#B87433' }} />
        <FloatingParticles count={8} />
        <CornerFlourish position="top-left" className="opacity-40" />
        <CornerFlourish position="bottom-right" className="opacity-40" />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent, rgba(255,255,255,0.6))' }} />
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div {...sectionVariants} className="text-center mb-16">
          <SectionLabel>Katha Gayak · કથા ગાયક</SectionLabel>
          <SectionHeading>Your Spiritual Guide</SectionHeading>
          <p className="text-body-regular mt-4 max-w-2xl mx-auto">Experience the beautiful narration of Shreemad Bhagavat by an inspiring storyteller</p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="relative">
            <motion.div className="relative rounded-3xl overflow-hidden shadow-2xl gold-border-spiritual" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <motion.img src="/assets/community/Ved-Vyas-tirth.jpg" alt="Sharad (Dada) Vyas - Katha Gayak" className="w-full h-full aspect-[3/4] object-cover" initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }} />
            </motion.div>
          </motion.div>
          <motion.div {...sectionVariants} transition={{ ...sectionVariants.transition, delay: 0.4 }} className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif-spiritual text-card-h3 text-heading-color mb-2">Sharad (Dada) Vyas</h3>
                <p className="font-gujarati text-body-large text-accent-saffron mb-4">શરદ (દાદા) વ્યાસ</p>
                <p className="text-muted-spiritual text-body-small">Dharampur</p>
              </div>
              <p className="text-heading-color text-body-large">A beloved Katha Gayak known for his deep knowledge of Shreemad Bhagavat and his gift for making ancient wisdom feel relevant to modern life. Sharad Dada's storytelling is more than just words—it's a joyful, transformative experience.</p>
              <p className="text-body-regular text-muted-spiritual">With many years of experience and a warm understanding of Vedic teachings, Dada has touched countless hearts around the world, sharing the timeless wisdom of Lord Krishna with devotees everywhere.</p>
              <div className="grid grid-cols-2 gap-4 pt-6">
                {highlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 gold-border-spiritual hover:scale-[1.02] hover:bg-white/90 transition-all duration-300 shadow-sm hover:shadow-md">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(184, 116, 51, 0.1)' }}>
                        <Icon className="w-5 h-5" style={{ color: '#B87433' }} />
                      </div>
                      <div className="font-serif-spiritual text-card-h3 text-heading-color mb-1">{item.value}</div>
                      <div className="font-accent-spiritual text-eyebrow-spiritual text-accent-saffron mb-1">{item.label}</div>
                      <div className="text-body-small text-muted-spiritual">{item.description}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ===== MESSAGE SECTION ===== */
const MessageSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <section className="py-24 md:py-24 bg-cream-spiritual relative overflow-hidden">
      <FloatingParticles count={5} />
      <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
        <motion.div {...sectionVariants}>
          <DiyaIcon className="mx-auto mb-4" size={28} style={{ color: '#B87433' }} />
          <SectionLabel>From the Heart</SectionLabel>
          <SectionHeading className="text-2xl md:text-3xl whitespace-nowrap">A Personal Invitation from CGPE</SectionHeading>
          <p className="font-gujarati text-muted-spiritual text-body-small mt-3">CGPE તરફથી એક હૃદયપૂર્વક આમંત્રણ</p>
        </motion.div>
        <motion.div {...sectionVariants} transition={{ ...sectionVariants.transition, delay: 0.2 }} className="mt-8 bg-white rounded-3xl p-6 md:p-10 card-shadow-spiritual gold-border-spiritual ornate-corner-spiritual relative cursor-pointer overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-devanagari select-none pointer-events-none" style={{ fontSize: '120px', color: 'rgba(184, 116, 51, 0.04)' }}>ॐ</span>
          <motion.div initial={{ clipPath: "inset(0 0 0 0)" }} animate={isHovered ? { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0 0)"] } : { clipPath: "inset(0 0 0 0)" }} transition={{ duration: 1.5, ease: "easeInOut" }}>
            <p className="text-body-regular leading-relaxed mb-4 relative z-10">Dear families,</p>
            <p className="text-body-regular leading-relaxed mb-4 relative z-10">You've trusted us with your family's dreams — your children's education, your retirement, and your peace of mind. Your trust means the world to us.</p>
            <p className="text-body-regular leading-relaxed mb-4 relative z-10">Now, we want to give back in a special way. Join us in the beautiful, sacred land of Rishikesh where we'll take care of you with love and gratitude.</p>
            <div className="gold-divider-spiritual w-24 mx-auto my-6" />
            <p className="text-quote-spiritual relative z-10">"Let us nurture your inner peace, just like we nurture your future."</p>
            <p className="font-gujarati text-muted-spiritual text-body-small mt-3 relative z-10">"તમારી શાંતિની સેવા અમને કરવા દો, જેમ અમે તમારા ભવિષ્યની સેવા કરીએ છીએ."</p>
            <p className="font-accent-spiritual text-eyebrow-spiritual text-accent-saffron mt-6 relative z-10">— Team CGPE</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ===== ACHIEVEMENT SECTION ===== */
const AchievementSection = () => {
  const achievements = [
    { icon: Users, title: "18000+ સુરક્ષિત કુટુંબો", subtitle: "Protected Families" },
    { icon: Users, title: "523+ ટીમ મેમ્બર", subtitle: "Team Members" },
    { icon: Trophy, title: "300+ એવોર્ડ", subtitle: "Awards" },
    { icon: FileText, title: "150 cr+ ક્લેઈમ પાસ", subtitle: "Claims Passed" },
  ];
  const insurance = [
    { icon: Shield, title: "જીવન વીમો", subtitle: "Life Insurance" },
    { icon: FileText, title: "હેલ્થ વીમો", subtitle: "Health Insurance" },
    { icon: Umbrella, title: "બિઝનેસ વીમો", subtitle: "Business Insurance" },
  ];
  const investment = [{ icon: Building, title: "મ્યુચ્યુઅલ ફંડ", subtitle: "Mutual Fund" }];
  const cities = ["અમદાવાદ", "સુરત", "મુંબઈ"];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #fff, rgba(184,116,51,0.05), #fff)' }}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/75 z-10" />
        <iframe className="absolute opacity-60" style={{ pointerEvents: 'none', width: '100vw', height: '56.25vw', minHeight: '100%', minWidth: '177.77vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} src="https://www.youtube.com/embed/CT3anN_PTRg?autoplay=1&mute=1&loop=1&playlist=CT3anN_PTRg&controls=0&showinfo=0&rel=0&modestbranding=1" title="CGPE Award Video" allow="autoplay; encrypted-media" />
      </div>
      <div className="container mx-auto px-6 relative z-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="font-serif-spiritual text-3xl md:text-4xl text-white mb-4 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.5))' }}>ACHIEVEMENT</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mt-12">
            {achievements.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="flex flex-col items-center">
                <item.icon className="w-12 h-12 text-white mb-4" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))' }} />
                <p className="font-gujarati text-lg font-medium text-white mb-1 drop-shadow-md" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.4))' }}>{item.title}</p>
                <p className="text-xs text-white/80 uppercase tracking-wide drop-shadow-md" style={{ filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))' }}>{item.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <GangaDivider className="my-16" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="font-serif-spiritual text-3xl md:text-4xl text-white mb-12 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.5))' }}>INSURANCE</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {insurance.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="flex flex-col items-center">
                <item.icon className="w-12 h-12 text-white mb-4" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))' }} />
                <p className="font-gujarati text-lg font-medium text-white mb-1 drop-shadow-md">{item.title}</p>
                <p className="text-xs text-white/80 uppercase tracking-wide drop-shadow-md">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <GangaDivider className="my-16" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="font-serif-spiritual text-3xl md:text-4xl text-white mb-12 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.5))' }}>ULIP INVESTMENT</h2>
          <div className="flex justify-center">
            {investment.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col items-center">
                <item.icon className="w-12 h-12 text-white mb-4" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))' }} />
                <p className="font-gujarati text-lg font-medium text-white mb-1 drop-shadow-md">{item.title}</p>
                <p className="text-xs text-white/80 uppercase tracking-wide drop-shadow-md">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mt-20">
          <p className="text-white/80 text-sm mb-6 drop-shadow-md">We Offer Our Services Across 3 Major Cities</p>
          <div className="flex justify-center items-center gap-8 md:gap-16">
            {cities.map((city, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="relative">
                <div className="font-gujarati text-2xl md:text-3xl font-medium text-white drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.9))' }}>{city}</div>
                {index < cities.length - 1 && <div className="absolute -right-8 md:-right-12 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-white/60 drop-shadow-md" />}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ===== FAMILY SECTION ===== */
const experiences = [
  { icon: Users, title: "Family Bonding", guj: "કુટુંબ જોડાણ", description: "Enjoy quality time with your loved ones in a peaceful, beautiful setting away from daily distractions." },
  { icon: Brain, title: "Mental Wellness", guj: "માનસિક શાંતિ", description: "Take a refreshing break from stress — a full week to relax, recharge, and feel calm inside." },
  { icon: Sun, title: "Spiritual Joy", guj: "આધ્યાત્મિક દૃઢતા", description: "Experience uplifting katha, satsang, and the divine blessings of Maa Ganga." },
  { icon: Heart, title: "Emotional Happiness", guj: "ભાવનાત્મક સુખાકારી", description: "Feel truly cared for. This is about your happiness and heart, not just finances." },
  { icon: Flower2, title: "Blessings for Tomorrow", guj: "ભવિષ્ય માટે આશીર્વાદ", description: "Receive divine blessings for your children's bright future and your family's health and happiness." },
];

const FamilySection = () => (
  <section className="py-16 md:py-24 relative overflow-hidden">
    <FloatingParticles count={5} />
    <div className="container mx-auto px-6 max-w-5xl">
      <motion.div {...sectionVariants} className="text-center mb-16">
        <SectionLabel>For Your Family</SectionLabel>
        <SectionHeading>A Beautiful Experience for Your Whole Family</SectionHeading>
        <p className="mt-6 text-body-regular text-muted-spiritual max-w-2xl mx-auto">This is more than just an event. It's a special break from everyday life — a full week where your family can relax, reconnect, and grow together in joy.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((item, i) => (
          <motion.div key={item.title} {...staggerDelay(i)} className="group bg-white rounded-3xl p-8 card-shadow-spiritual gold-border-spiritual text-center hover:scale-[1.02] transition-transform duration-300">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:opacity-80 transition-colors" style={{ backgroundColor: 'rgba(184, 116, 51, 0.1)' }}>
              <item.icon className="w-6 h-6" style={{ color: '#B87433' }} />
            </div>
            <h3 className="font-serif-spiritual text-card-h3 text-heading-color mb-1">{item.title}</h3>
            <p className="font-gujarati text-accent-saffron text-body-small mb-3">{item.guj}</p>
            <p className="text-body-small text-muted-spiritual">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ===== WHY RISHIKESH SECTION ===== */
const WhyRishikeshSection = () => (
  <section className="py-16 md:py-24 bg-cream-spiritual relative overflow-hidden">
    <FloatingParticles count={4} />
    <div className="absolute top-12 left-8 pointer-events-none hidden lg:block" style={{ color: 'rgba(184, 116, 51, 0.12)' }}><LotusIcon size={40} /></div>
    <div className="absolute bottom-12 right-8 pointer-events-none hidden lg:block" style={{ color: 'rgba(184, 116, 51, 0.12)' }}><LotusIcon size={40} /></div>
    <CornerFlourish position="top-right" className="opacity-50" />
    <CornerFlourish position="bottom-left" className="opacity-50" />
    <div className="container mx-auto px-6 max-w-7xl relative z-10">
      <div className="grid lg:grid-cols-[0.8fr_1.6fr] gap-10 items-center">
        <motion.div {...sectionVariants}>
          <SectionLabel>The Sacred Land</SectionLabel>
          <SectionHeading>Why We Chose Rishikesh</SectionHeading>
          <p className="font-gujarati text-muted-spiritual text-body-small mt-2 mb-6">અમે ઋષિકેશ કેમ પસંદ કર્યું</p>
          <div className="space-y-5 text-body-regular text-muted-spiritual">
            <p>Rishikesh sits beautifully in the Himalayan foothills along the holy Ganga river. It's one of India's most peaceful and sacred places.</p>
            <p>The gentle sound of temple bells, flowing water, and the positive energy of this land make it perfect for our Shreemad Bhagavat Saptah.</p>
            <p>Here, surrounded by mountains and natural beauty, your family can feel a deep sense of peace and joy that's hard to find in everyday life.</p>
          </div>
          <div className="mt-8">
            <SanskritShloka text="गंगा गंगेति यो ब्रूयात् योजनानां शतैरपि" translation="One who chants the name of Ganga, even from hundreds of miles away, is purified" />
          </div>
        </motion.div>
        <motion.div {...sectionVariants} transition={{ ...sectionVariants.transition, delay: 0.2 }}>
          <div className="rounded-3xl overflow-hidden card-shadow-spiritual relative">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.youtube-nocookie.com/embed/A-Zcjg1_y5U?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=A-Zcjg1_y5U" title="Why We Chose Rishikesh" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen frameBorder="0" />
            </div>
          </div>
        </motion.div>
      </div>
      <GangaDivider />
    </div>
  </section>
);

/* ===== HIGHLIGHTS SECTION ===== */
const highlightsData = [
  { icon: BookOpen, title: "Shreemad Bhagavat Saptah", san: "श्रीमद् भागवत सप्ताह", desc: "Seven beautiful days of sacred stories and uplifting wisdom" },
  { icon: Music, title: "Bhajan & Devotional Joy", san: "भजन एवं भक्ति", desc: "Heartfelt bhajans and kirtan to lift your spirits all week" },
  { icon: Waves, title: "Ganga Darshan & Aarti", san: "गंगा दर्शन एवं आरती", desc: "Daily blessings at Maa Ganga and magical evening aarti" },
  { icon: HandHeart, title: "Loving Care & Service", san: "सेवा एवं आतिथ्य", desc: "Warm, caring service from the CGPE family" },
  { icon: Utensils, title: "Healthy Prasad", san: "सात्विक प्रसाद", desc: "Delicious, nourishing meals made with love" },
  { icon: Shield, title: "Complete Support", san: "पूर्ण देखभाल", desc: "Everything taken care of so you can relax and enjoy" },
];

const HighlightsSection = () => (
  <section className="py-16 md:py-24 relative overflow-hidden">
    <div className="absolute top-8 left-1/4 pointer-events-none hidden md:block" style={{ color: 'rgba(184, 116, 51, 0.1)' }}><LotusIcon size={32} /></div>
    <div className="absolute top-8 right-1/4 pointer-events-none hidden md:block" style={{ color: 'rgba(184, 116, 51, 0.1)' }}><LotusIcon size={32} /></div>
    <div className="container mx-auto px-6 max-w-5xl">
      <motion.div {...sectionVariants} className="text-center mb-16">
        <DiyaIcon className="mx-auto mb-4" size={28} style={{ color: '#B87433' }} />
        <SectionLabel>Offerings</SectionLabel>
        <SectionHeading>Experience the Sacred</SectionHeading>
        <p className="font-devanagari text-accent-saffron text-body-large mt-2">पवित्र अनुभव</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlightsData.map((item, i) => (
          <motion.div key={item.title} {...staggerDelay(i)} className="group bg-white rounded-3xl p-8 card-shadow-spiritual gold-border-spiritual hover:scale-[1.02] transition-all duration-300 relative overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
            <div className="relative z-10">
              <item.icon className="w-8 h-8 mb-4" style={{ color: '#B87433' }} />
              <h3 className="font-serif-spiritual text-card-h3 text-heading-color mb-1">{item.title}</h3>
              <p className="font-devanagari text-accent-saffron text-body-small mb-3">{item.san}</p>
              <p className="text-body-small text-muted-spiritual">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ===== GALLERY SECTION ===== */
const galleryImages = [
  { src: "/assets/community/aaa.jpg", alt: "Sunrise over temples in Rishikesh" },
  { src: "/assets/community/ganga-aarti.jpg", alt: "Ganga aarti with floating diyas" },
  { src: "/assets/community/satsang.jpg", alt: "Devotional satsang gathering" },
  { src: "/assets/community/bbb.jpg", alt: "Sacred Ganga banks with marigold flowers" },
];

const GallerySection = () => {
  const duplicatedImages = [...galleryImages, ...galleryImages, ...galleryImages];
  return (
    <section className="py-16 md:py-24 bg-cream-spiritual relative overflow-hidden">
      <CornerFlourish position="top-left" className="opacity-50" />
      <CornerFlourish position="bottom-right" className="opacity-50" />
      <div className="container mx-auto px-6 max-w-6xl mb-12">
        <motion.div {...sectionVariants} className="text-center">
          <SectionLabel>The Atmosphere</SectionLabel>
          <SectionHeading>A Glimpse of What Awaits</SectionHeading>
          <p className="font-devanagari text-accent-saffron text-body-large mt-2">दर्शन · वातावरण · भक्ति</p>
        </motion.div>
      </div>
      <div className="relative overflow-hidden w-full">
        <motion.div className="flex gap-6" animate={{ x: [0, -galleryImages.length * (320 + 24)] }} transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" } }}>
          {duplicatedImages.map((img, i) => (
            <div key={i} className="flex-shrink-0 w-80 rounded-3xl overflow-hidden card-shadow-spiritual group" style={{ aspectRatio: '4/3' }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="container mx-auto px-6 max-w-6xl mt-12">
        <GangaDivider />
      </div>
    </section>
  );
};

/* ===== FINAL CTA SECTION ===== */
const FinalCTASection = () => (
  <section className="py-16 md:py-24 relative overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[700px] h-[700px] rounded-full blur-[150px]" style={{ backgroundColor: 'rgba(184, 116, 51, 0.08)' }} />
    </div>
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none">
      <span className="font-devanagari select-none" style={{ fontSize: '250px', color: 'rgba(184, 116, 51, 0.04)' }}>ॐ</span>
    </div>
    <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
      <motion.div {...sectionVariants}>
        <DiyaIcon className="mx-auto mb-4" size={32} style={{ color: '#B87433' }} />
        <span className="text-eyebrow-spiritual block mb-8">A Sacred Invitation</span>
        <h2 className="font-serif-spiritual leading-[1.1] mb-4" style={{ fontSize: 'clamp(2.125rem, 5vw, 3rem)', color: '#2E1D14' }}>
          Come to Rishikesh.<br />Bring Your Family.<br /><span className="text-accent-saffron">Leave the Rest to Us.</span>
        </h2>
        <p className="font-gujarati text-sm mb-8 font-medium" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>ઋષિકેશ આવો. પરિવાર સાથે આવો. બાકી બધું અમારા પર છોડો.</p>
        <p className="text-body-regular max-w-xl mx-auto mb-8">A sacred week of peace, devotion, and heartfelt care awaits you. Let CGPE care for your peace, just as we care for your future.</p>
        <SanskritShloka text="॥ श्री कृष्णार्पणमस्तु ॥" translation="Dedicated to Lord Shri Krishna" className="mb-10" />
        <div className="mt-12 flex items-center justify-center gap-2">
          <OmSymbol className="text-4xl" />
        </div>
      </motion.div>
    </div>
  </section>
);

/* ===== COMMUNITY FOOTER SECTION ===== */
const CommunityFooterSection = () => (
  <footer className="bg-maroon-spiritual py-12 relative overflow-hidden">
    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-devanagari select-none pointer-events-none" style={{ fontSize: '200px', color: 'rgba(255,255,255,0.03)' }}>ॐ</span>
    <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
      <LotusIcon className="mx-auto mb-4" size={28} style={{ color: 'rgba(201, 201, 201, 0.4)' }} />
      <span className="font-accent-spiritual text-eyebrow-spiritual" style={{ color: 'rgba(255,255,255,0.8)' }}>CGPE · Protecting Families · Nurturing Peace</span>
      <p className="text-body-small mt-4 max-w-xl mx-auto" style={{ color: '#FFFFFF' }}>At CGPE, we protect your family financially — and now, through this sacred Saptah in Rishikesh, we wish to care for your peace of mind, emotional well-being, and spiritual strength too.</p>
      <p className="font-gujarati mt-3" style={{ color: '#FFFFFF', fontSize: '0.875rem' }}>CGPE · પરિવારોનું રક્ષણ · શાંતિનું પોષણ</p>
      <div className="gold-divider-spiritual max-w-[100px] mx-auto my-6 opacity-20" />
      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>© {new Date().getFullYear()} CGPE. All rights reserved.</p>
    </div>
  </footer>
);

/* ===== MAIN COMMUNITY PAGE ===== */
const Community = () => {
  return (
    <div className="community-page">
      <CGPEHeader />
      <main className="overflow-hidden">
        <HeroSection />
        <PurposeSection />
        <KathaGayakSection />
        <MessageSection />
        <AchievementSection />
        <FamilySection />
        <WhyRishikeshSection />
        <HighlightsSection />
        <GallerySection />
        <FinalCTASection />
        <CommunityFooterSection />
      </main>
      <CGPEFooter />
    </div>
  );
};

export default Community;
