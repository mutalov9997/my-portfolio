/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  Database, 
  Terminal, 
  MessageSquare, 
  Github, 
  Linkedin, 
  Mail, 
  ChevronDown,
  Cpu,
  Server,
  Code2,
  ExternalLink,
  Languages,
  Video
} from "lucide-react";

type Language = "en" | "uz" | "ru";

const translations = {
  en: {
    nav: { about: "About", skills: "Skills", projects: "Projects", contact: "Contact" },
    hero: {
      badge: "Systems Engineer & Bot Developer",
      title: "Mutalov",
      subtitle: "MuhammadAyyub",
      desc: "Building robust server-side architectures, high-performance databases, and intelligent Telegram ecosystems.",
      projectsBtn: "View Projects",
      cvBtn: "Download CV"
    },
    about: {
      title: "About Me",
      p1: "I am a passionate Backend Developer with a deep focus on building scalable systems and automated solutions. My journey began with a curiosity for how the 'invisible' parts of the web work.",
      p2: "Today, I specialize in Node.js, Python, and Go, crafting efficient APIs and complex Telegram bots that handle thousands of requests per second. I believe in clean code, robust database design, and the power of automation.",
      p3: "When I'm not coding, you can find me exploring the latest in distributed systems or optimizing database queries for fun."
    },
    skills: {
      title: "Technical Arsenal",
      subtitle: "The tools and technologies I use to bring ideas to life.",
      backend: "Backend Development",
      telegram: "Telegram Ecosystem",
      infra: "Database & Infrastructure"
    },
    projects: {
      title: "Featured Projects",
      subtitle: "A selection of my recent work in backend engineering and automation.",
      archive: "View Archive",
      tabrik: {
        title: "Tabrik Bot",
        desc: "A specialized Telegram bot for automated greetings and congratulations, built with Python for high reliability."
      },
      videoAudio: {
        title: "Video to Audio Bot",
        desc: "An efficient media processing bot that extracts high-quality audio from video files using Python and FFmpeg."
      }
    },
    contact: {
      title: "Get In Touch",
      desc: "I'm currently open to new opportunities and interesting projects. Whether you have a question or just want to say hi, my inbox is always open!",
      btn: "Say Hello"
    },
    footer: "Built with React & Tailwind. Designed for performance & scalability."
  },
  uz: {
    nav: { about: "Men haqimda", skills: "Ko'nikmalar", projects: "Loyihalar", contact: "Aloqa" },
    hero: {
      badge: "Tizim muhandisi va Bot dasturchisi",
      title: "Mutalov",
      subtitle: "MuhammadAyyub",
      desc: "Mustahkam server arxitekturalari, yuqori unumdorlikka ega ma'lumotlar bazalari va aqlli Telegram ekotizimlarini qurish.",
      projectsBtn: "Loyihalarni ko'rish",
      cvBtn: "CV yuklab olish"
    },
    about: {
      title: "Men haqimda",
      p1: "Men masshtablanuvchi tizimlar va avtomatlashtirilgan yechimlarni yaratishga e'tibor qaratgan ishtiyoqli Backend dasturchiman. Mening sayohatim internetning 'ko'rinmas' qismlari qanday ishlashiga bo'lgan qiziqishdan boshlangan.",
      p2: "Bugungi kunda men Node.js, Python va Go bo'yicha ixtisoslashganman, soniyasiga minglab so'rovlarni bajaradigan samarali API va murakkab Telegram botlarini yarataman. Men toza kod, mustahkam ma'lumotlar bazasi dizayni va avtomatlashtirish kuchiga ishonaman.",
      p3: "Kod yozmayotgan vaqtimda meni taqsimlangan tizimlardagi so'nggi yangiliklarni o'rganayotgan yoki ma'lumotlar bazasi so'rovlarini optimallashtirayotgan holda topishingiz mumkin."
    },
    skills: {
      title: "Texnik Arsenal",
      subtitle: "G'oyalarni hayotga tatbiq etish uchun foydalanadigan vositalarim va texnologiyalarim.",
      backend: "Backend Dasturlash",
      telegram: "Telegram Ekotizimi",
      infra: "Ma'lumotlar Bazasi va Infratuzilma"
    },
    projects: {
      title: "Tanlangan Loyihalar",
      subtitle: "Backend muhandisligi va avtomatlashtirish sohasidagi so'nggi ishlarim.",
      archive: "Arxivni ko'rish",
      tabrik: {
        title: "Tabrik Bot",
        desc: "Yuqori ishonchlilik uchun Python-da qurilgan, avtomatlashtirilgan tabriklar va qutlovlar uchun maxsus Telegram bot."
      },
      videoAudio: {
        title: "Video to Audio Bot",
        desc: "Python va FFmpeg yordamida video fayllardan yuqori sifatli audioni ajratib oluvchi samarali media ishlov berish boti."
      }
    },
    contact: {
      title: "Bog'lanish",
      desc: "Men hozirda yangi imkoniyatlar va qiziqarli loyihalar uchun ochiqman. Savolingiz bo'lsa yoki shunchaki salom bermoqchi bo'lsangiz, mening xabarlar qutim doim ochiq!",
      btn: "Salom yo'llash"
    },
    footer: "React va Tailwind bilan qurilgan. Unumdorlik va masshtablilik uchun mo'ljallangan."
  },
  ru: {
    nav: { about: "Обо мне", skills: "Навыки", projects: "Проекты", contact: "Контакт" },
    hero: {
      badge: "Системный инженер и Разработчик ботов",
      title: "Муталов",
      subtitle: "МухаммадАйюб",
      desc: "Создание надежных серверных архитектур, высокопроизводительных баз данных и интеллектуальных экосистем Telegram.",
      projectsBtn: "Посмотреть проекты",
      cvBtn: "Скачать CV"
    },
    about: {
      title: "Обо мне",
      p1: "Я увлеченный Backend-разработчик, специализирующийся на создании масштабируемых систем и автоматизированных решений. Мой путь начался с любопытства к тому, как работают 'невидимые' части интернета.",
      p2: "Сегодня я специализируюсь на Node.js, Python и Go, создавая эффективные API и сложные Telegram-боты, обрабатывающие тысячи запросов в секунду. Я верю в чистый код, надежный дизайн баз данных и силу автоматизации.",
      p3: "Когда я не программирую, вы можете найти меня за изучением последних новинок в распределенных системах или оптимизацией запросов к базам данных."
    },
    skills: {
      title: "Технический Арсенал",
      subtitle: "Инструменты и технологии, которые я использую для воплощения идей в жизнь.",
      backend: "Backend Разработка",
      telegram: "Экосистема Telegram",
      infra: "Базы Данных и Инфраструктура"
    },
    projects: {
      title: "Избранные Проекты",
      subtitle: "Подборка моих последних работ в области backend-инженерии и автоматизации.",
      archive: "Посмотреть архив",
      tabrik: {
        title: "Tabrik Bot",
        desc: "Специализированный Telegram-бот для автоматических поздравлений, созданный на Python для высокой надежности."
      },
      videoAudio: {
        title: "Video to Audio Bot",
        desc: "Эффективный бот для обработки медиа, который извлекает высококачественный звук из видеофайлов с помощью Python и FFmpeg."
      }
    },
    contact: {
      title: "Связаться со мной",
      desc: "В настоящее время я открыт для новых возможностей и интересных проектов. Если у вас есть вопрос или вы просто хотите поздороваться, мой почтовый ящик всегда открыт!",
      btn: "Сказать привет"
    },
    footer: "Создано с помощью React и Tailwind. Разработано для производительности и масштабируемости."
  }
};

const Section = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={`py-32 px-6 md:px-12 max-w-7xl mx-auto ${className}`}
  >
    {children}
  </motion.section>
);

const RevealText = ({ children, className = "", delay = 0, stagger = 0.02 }: { children: React.ReactNode; className?: string; delay?: number; stagger?: number }) => {
  if (typeof children !== "string") {
    return (
      <div className={`relative overflow-hidden flex justify-center ${className}`}>
        <motion.div
          initial={{ y: "100%", rotate: 5 }}
          whileInView={{ y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  const words = children.split(" ");
  
  return (
    <div className={`flex flex-wrap justify-center text-center ${className}`}>
      {words.map((word, i) => (
        <div key={i} className={`relative overflow-hidden py-[0.1em] ${i !== words.length - 1 ? "mr-[0.25em]" : ""}`}>
          <motion.div
            initial={{ y: "100%", rotate: 10 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8, 
              delay: delay + (i * stagger), 
              ease: [0.21, 0.47, 0.32, 0.98] 
            }}
          >
            {word}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

const AnimatedHeading = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.h2>
);

const LiveWallpaper = React.memo(() => {
  const { scrollY } = useScroll();
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[-2] overflow-hidden bg-[#000816]">
      {/* Ultra Deep Space Base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15)_0%,transparent_100%)]" />
      
      {/* Dynamic Cyber Grid */}
      <div className="absolute inset-0 opacity-[0.3] [perspective:1000px]">
        <motion.div 
          style={{ 
            y: useTransform(scrollY, [0, 5000], [0, -400]),
            backgroundImage: `linear-gradient(to right, rgba(16,185,129,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.4) 1px, transparent 1px)`,
            backgroundSize: "120px 120px",
            maskImage: "radial-gradient(circle at 50% 50%, black, transparent 90%)"
          }}
          className="w-full h-[200%] origin-top rotate-X-[35deg]"
        />
      </div>

      {/* Moving Neon Nebulas - Simplified */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-40%] left-[-30%] w-[150%] h-[150%] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.3)_0%,transparent_70%)] blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-40%] right-[-30%] w-[160%] h-[160%] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.2)_0%,transparent_70%)] blur-[120px]"
      />

      {/* Neon Data Streams - Optimized */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          initial={{ x: (i * 12 + 5) + "%", y: "-100%", opacity: 0 }}
          animate={{
            y: ["0%", "1500%"],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
          className="absolute w-[1.5px] h-[500px] bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent"
        />
      ))}

      {/* Neon Data Particles - Optimized */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0
          }}
          animate={{
            y: ["-5%", "105%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute w-[2px] h-[2px] bg-emerald-400/40 rounded-full"
        />
      ))}

      {/* Shooting Stars */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          initial={{ x: "-10%", y: Math.random() * 100 + "%", opacity: 0, scale: 0 }}
          animate={{
            x: ["0%", "120%"],
            y: [null, (Math.random() * 100 + 20) + "%"],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 15,
            ease: "easeOut"
          }}
          className="absolute w-[150px] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent rotate-[-35deg] blur-[1px]"
        />
      ))}

      {/* Floating Particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 + 0.1,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: ["-5%", "105%"],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
        />
      ))}

    </div>
  );
});

const ProjectCard = ({ title, description, tags, icon: Icon }: { title: string; description: string; tags: string[]; icon: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ 
      y: -15, 
      scale: 1.03,
      rotateZ: 0.5,
      transition: { duration: 0.4, ease: "easeOut" }
    }}
    className="group p-10 rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl hover:border-emerald-500/50 transition-all duration-700 relative overflow-hidden shadow-2xl shadow-black/50 hover:shadow-emerald-500/10"
  >
    <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] group-hover:bg-emerald-500/20 transition-all duration-700" />
    <div className="relative z-10">
      <div className="flex items-center gap-6 mb-10">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/30 to-teal-500/20 text-emerald-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
          <Icon size={36} />
        </div>
        <h3 className="text-3xl md:text-4xl font-bold group-hover:text-emerald-400 transition-colors tracking-tighter leading-none text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{title}</h3>
      </div>
      <p className="text-slate-400 mb-12 leading-relaxed line-clamp-3 text-lg md:text-xl font-light group-hover:text-slate-200 transition-colors duration-500">
        {description}
      </p>
      <div className="flex flex-wrap gap-3">
        {tags.map(tag => (
          <span key={tag} className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 text-[12px] md:text-[14px] font-mono text-slate-400 uppercase tracking-[0.2em] group-hover:border-emerald-500/40 group-hover:text-emerald-300 transition-all duration-300 shadow-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const spotlightRef = useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(16,185,129,0.06), transparent 80%)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-slate-50 selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Background Elements */}
      <LiveWallpaper />
      
      {/* Mouse Spotlight - High Performance (Direct DOM) */}
      <div
        ref={spotlightRef}
        className="fixed inset-0 z-[-1] pointer-events-none opacity-40 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at 0px 0px, rgba(16,185,129,0), transparent 80%)`,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] border-b border-emerald-500/20 bg-[#00020a]/80 backdrop-blur-2xl shadow-[0_0_30px_rgba(16,185,129,0.1)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.a 
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <div 
                className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 opacity-40 blur-lg transition-transform duration-700 group-hover:rotate-180 rounded-full"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 transition-transform duration-700 group-hover:rotate-180 shadow-[0_0_35px_rgba(16,185,129,0.7)] rounded-full border-2 border-emerald-400/60"
              />
              <Terminal size={20} className="relative z-10 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-xl tracking-tighter text-white group-hover:text-emerald-400 transition-colors uppercase">MUTALOV<span className="text-emerald-500">.DEV</span></span>
              <span className="text-[9px] font-mono text-emerald-500/50 tracking-[0.4em] uppercase mt-1">Systems Engineer</span>
            </div>
          </motion.a>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-10 text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400">
            {["about", "skills", "projects", "contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative hover:text-emerald-400 transition-colors group py-2"
              >
                {t.nav[item as keyof typeof t.nav]}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500 transition-all duration-500 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 md:gap-8"
          >
            {/* Language Selector */}
            <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
              {(['en', 'uz', 'ru'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                    lang === l 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Socials */}
            <div className="hidden md:flex gap-5">
              <a href="https://github.com" target="_blank" className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl bg-white/5 border border-white/10 text-emerald-400"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span 
                  animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current rounded-full origin-left transition-all"
                />
                <motion.span 
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-current rounded-full transition-all"
                />
                <motion.span 
                  animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current rounded-full origin-left transition-all"
                />
              </div>
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu Overlay */}
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="lg:hidden overflow-hidden bg-[#050505]/95 backdrop-blur-2xl border-b border-white/5"
        >
          <div className="px-6 py-10 flex flex-col gap-8">
            {["about", "skills", "projects", "contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold tracking-tighter hover:text-emerald-400 transition-colors"
              >
                {t.nav[item as keyof typeof t.nav]}
              </a>
            ))}
            <div className="h-px bg-white/5 my-4" />
            <div className="flex items-center justify-between">
              <div className="flex gap-6">
                <a href="#" className="text-slate-400 hover:text-emerald-400"><Github size={24} /></a>
                <a href="#" className="text-slate-400 hover:text-emerald-400"><Linkedin size={24} /></a>
                <a href="#" className="text-slate-400 hover:text-emerald-400"><Mail size={24} /></a>
              </div>
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm font-mono outline-none text-emerald-400"
              >
                <option value="en">ENGLISH</option>
                <option value="uz">O'ZBEKCHA</option>
                <option value="ru">РУССКИЙ</option>
              </select>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: y1, opacity, scale }} className="text-center z-10 px-6">
          <RevealText delay={0.2}>
            <div className="inline-block mb-6 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-[0.2em] uppercase">
              {t.hero.badge}
            </div>
          </RevealText>
          
          <div className="mb-10 relative flex flex-col gap-2">
            <div className="absolute inset-0 bg-emerald-500/10 blur-[120px] rounded-full opacity-30" />
            <RevealText delay={0.4} className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-tighter leading-none text-white relative z-10 drop-shadow-[0_0_60px_rgba(16,185,129,1)]">
              {t.hero.title}
            </RevealText>
            <RevealText delay={0.6} className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 relative z-10 drop-shadow-[0_0_80px_rgba(16,185,129,0.9)]">
              {t.hero.subtitle}
            </RevealText>
          </div>

          <RevealText delay={0.8} className="max-w-3xl mx-auto text-slate-400 text-xl md:text-3xl leading-relaxed mb-16 font-light tracking-wide">
            {t.hero.desc}
          </RevealText>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-col md:flex-row gap-6 justify-center"
          >
            <a href="#projects" className="group relative px-10 py-5 bg-emerald-500 text-slate-950 font-bold rounded-2xl transition-all overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">{t.hero.projectsBtn}</span>
            </a>
            <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 font-bold rounded-2xl transition-all backdrop-blur-md text-white">
              {t.hero.cvBtn}
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* About Section */}
      <Section id="about" className="relative">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div>
            <AnimatedHeading className="text-4xl font-bold mb-10 flex items-center gap-6 drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <span className="text-emerald-500 font-mono text-2xl shadow-[0_0_10px_rgba(16,185,129,0.5)]">01.</span>
              {t.about.title}
            </AnimatedHeading>
            <div className="space-y-8 text-slate-400 text-xl leading-relaxed font-light">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-8 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-[3rem] opacity-20 blur-[60px] group-hover:opacity-40 transition-opacity duration-700" />
            <div className="relative aspect-[4/5] rounded-[3rem] bg-slate-900 border border-white/10 overflow-hidden shadow-2xl shadow-black">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
              <div className="absolute top-8 left-8 z-20 font-mono text-[10px] text-emerald-500/50 space-y-1">
                <p>01001101 01010101 01010100 01000001</p>
                <p>01001100 01001111 01010110</p>
              </div>
              <img 
                src="https://picsum.photos/seed/tech-abstract/1200/1500" 
                alt="Profile" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-10 left-10 z-20">
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-slate-300">Available for projects</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" className="relative py-40">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-widest uppercase"
          >
            Capabilities
          </motion.div>
          <AnimatedHeading className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">{t.skills.title}</AnimatedHeading>
          <p className="text-slate-400 text-xl font-light max-w-2xl mx-auto">{t.skills.subtitle}</p>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: Server, title: t.skills.backend, color: "from-emerald-500/20 to-emerald-500/5", accent: "bg-emerald-500", items: ["Node.js / Express / NestJS", "Python / Django / FastAPI", "Go (Golang)", "Microservices Architecture", "RESTful & GraphQL APIs"] },
            { icon: MessageSquare, title: t.skills.telegram, color: "from-teal-500/20 to-teal-500/5", accent: "bg-teal-500", items: ["Telegraf / GramJS", "Aiogram (Python)", "Webhook Integration", "Payment Gateways", "User Session Management"] },
            { icon: Database, title: t.skills.infra, color: "from-cyan-500/20 to-cyan-500/5", accent: "bg-cyan-500", items: ["PostgreSQL / MySQL", "MongoDB / Redis", "Docker & Kubernetes", "CI/CD Pipelines", "AWS / DigitalOcean"] }
          ].map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              whileHover={{ y: -15 }}
              className={`p-10 rounded-[3rem] border border-white/5 bg-gradient-to-br ${skill.color} backdrop-blur-3xl hover:border-white/10 transition-all duration-500 group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
              <div className={`w-16 h-16 rounded-2xl ${skill.accent}/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <skill.icon className={skill.accent.replace('bg-', 'text-')} size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-6 tracking-tight">{skill.title}</h3>
              <ul className="space-y-4">
                {skill.items.map(item => (
                  <li key={item} className="flex items-center gap-3 text-slate-400 font-light text-base">
                    <div className={`w-1.5 h-1.5 rounded-full ${skill.accent} opacity-40`} /> 
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <AnimatedHeading className="text-3xl font-bold mb-4 flex items-center gap-4">
              <span className="text-emerald-500 font-mono text-xl">02.</span>
              {t.projects.title}
            </AnimatedHeading>
            <p className="text-slate-400 max-w-lg">{t.projects.subtitle}</p>
          </div>
          <a href="#" className="text-emerald-400 font-mono text-sm flex items-center gap-2 hover:underline">
            {t.projects.archive} <ExternalLink size={14} />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard 
            title={t.projects.tabrik.title}
            description={t.projects.tabrik.desc}
            tags={["Python", "Aiogram", "PostgreSQL", "Automation"]}
            icon={MessageSquare}
          />
          <ProjectCard 
            title={t.projects.videoAudio.title}
            description={t.projects.videoAudio.desc}
            tags={["Python", "FFmpeg", "Telegram API", "Media"]}
            icon={Video}
          />
          <ProjectCard 
            title="E-Commerce API Engine"
            description="A high-performance RESTful API built with NestJS and PostgreSQL, featuring real-time inventory tracking and Stripe integration."
            tags={["NestJS", "PostgreSQL", "Redis", "Stripe"]}
            icon={Server}
          />
          <ProjectCard 
            title="Distributed Log System"
            description="A scalable logging infrastructure built with Go and Kafka to handle millions of logs across multiple microservices."
            tags={["Go", "Kafka", "Elasticsearch", "Docker"]}
            icon={Cpu}
          />
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="relative py-60">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-4xl mx-auto relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
          <div className="relative p-16 md:p-24 rounded-[3rem] bg-slate-900/40 backdrop-blur-3xl border border-white/10 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"
            />

            <AnimatedHeading className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter text-white">{t.contact.title}</AnimatedHeading>
            <p className="text-slate-400 text-lg md:text-2xl mb-16 leading-relaxed font-light max-w-2xl mx-auto">
              {t.contact.desc}
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <motion.a 
                href="mailto:mutalovmuhammadayyub98@gmail.com" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-white text-slate-950 font-bold rounded-2xl transition-all overflow-hidden shadow-2xl shadow-emerald-500/10 w-full md:w-auto"
              >
                <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors">
                  <Mail size={24} /> {t.contact.btn}
                </div>
              </motion.a>
              <div className="flex gap-6">
                {[
                  { icon: Github, href: "https://github.com" },
                  { icon: Linkedin, href: "https://linkedin.com" }
                ].map((social, i) => (
                  <motion.a 
                    key={i}
                    href={social.href}
                    whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.1)" }}
                    className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 transition-all text-white"
                  >
                    <social.icon size={28} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-top border-white/5 text-center text-slate-500 text-sm font-mono">
        <p>© 2026 Mutalov MuhammadAyyub. {t.footer}</p>
      </footer>
    </div>
  );
}

