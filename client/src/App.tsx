import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Mail, ShoppingCart, ChevronDown, ExternalLink, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  // Smooth scroll for anchor links
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-main overflow-x-hidden selection:bg-primary selection:text-background">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.03),transparent_70%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-display font-bold tracking-widest text-primary glitch-text" data-text="JAMES A. ARKIN">
            JAMES A. ARKIN
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 font-body text-sm tracking-wider">
            {['BOOK', 'AUTHOR', 'CONTACT'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="hover:text-primary transition-colors duration-300 relative group"
              >
                <span className="text-primary/50 mr-1">&lt;</span>
                {item}
                <span className="text-primary/50 ml-1">/&gt;</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-surface border-b border-primary/20 p-6 flex flex-col space-y-4">
            {['BOOK', 'AUTHOR', 'CONTACT'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left font-body text-lg hover:text-primary"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-6 z-10"
          >
            <div className="inline-block px-3 py-1 border border-primary/30 rounded-full text-xs font-body text-primary tracking-widest bg-primary/5">
              AVAILABLE NOW
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">THIRTEEN</span>
              <span className="block text-primary glitch-text" data-text="MARKS">MARKS</span>
            </h1>
            <p className="text-lg md:text-xl text-text-muted max-w-lg font-body leading-relaxed border-l-2 border-primary/30 pl-4">
              "The world calls him a monster. He calls himself a ghost."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="https://www.amazon.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-background font-bold font-display tracking-wider hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 clip-path-slant"
              >
                <ShoppingCart size={18} />
                BUY ON AMAZON
              </a>
              <button 
                onClick={() => scrollToSection('book')}
                className="px-8 py-4 border border-primary/30 text-primary font-bold font-display tracking-wider hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <BookOpen size={18} />
                READ SYNOPSIS
              </button>
            </div>
          </motion.div>

          <motion.div 
            style={{ opacity, scale }}
            className="relative z-10 flex justify-center"
          >
            <div className="relative w-64 md:w-80 aspect-[2/3] group">
              <div className="absolute inset-0 bg-primary blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-b from-primary/50 to-transparent opacity-50 blur-sm"></div>
              <img 
                src="/images/cover.jpg" 
                alt="Thirteen Marks Book Cover" 
                className="relative w-full h-full object-cover shadow-2xl shadow-black border border-white/10 grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
              />
              {/* Decorative tech lines */}
              <div className="absolute -top-10 -right-10 w-20 h-20 border-t border-r border-primary/30"></div>
              <div className="absolute -bottom-10 -left-10 w-20 h-20 border-b border-l border-primary/30"></div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/50 cursor-pointer"
          onClick={() => scrollToSection('book')}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Book Section */}
      <section id="book" className="py-24 bg-surface relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] bg-primary/50 flex-grow"></div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center leading-tight">THE WORLD CALLS HIM A MONSTER.<br/><span className="text-primary">HE CALLS HIMSELF A GHOST.</span></h2>
              <div className="h-[1px] bg-primary/50 flex-grow"></div>
            </div>

            <div className="grid md:grid-cols-[1fr_2fr] gap-12">
              <div className="space-y-6 text-sm font-body text-primary/80 border border-primary/20 p-6 bg-background/50 backdrop-blur-sm h-fit">
                <div className="flex justify-between border-b border-primary/10 pb-2">
                  <span>GENRE:</span>
                  <span className="text-white">Psychological Thriller</span>
                </div>
                <div className="flex justify-between border-b border-primary/10 pb-2">
                  <span>PAGES:</span>
                  <span className="text-white">342</span>
                </div>
                <div className="flex justify-between border-b border-primary/10 pb-2">
                  <span>FORMAT:</span>
                  <span className="text-white">Kindle, Paperback</span>
                </div>
                <div className="flex justify-between border-b border-primary/10 pb-2">
                  <span>RELEASE:</span>
                  <span className="text-white">Dec 30, 2025</span>
                </div>
                <div className="pt-4">
                  <p className="text-xs text-text-muted mb-2">AVAILABLE ON:</p>
                  <div className="flex gap-2">
                    <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded transition-colors"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="h-4 invert opacity-70" alt="Amazon" /></a>
                    <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded transition-colors"><BookOpen size={16} /></a>
                  </div>
                </div>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-gray-300 font-body">
                <p>
                  
                 For twenty-eight years, Horace Vance was the face of evil. Convicted for a series of brutal crimes that shocked the nation, he spent decades in isolation, known simply as "The Monster." But Horace remembers nothing. Not the crimes, not the trial, not the man he used to be. His past is a blank void – a ‘White Veil’ that nothing can break through.
                </p>
                <p>
                  The impossible happens. On his deathbed, a renowned scientist confesses to the murders. The verdict is overturned. Horace is exonerated.
                </p>
                <p>
                  Thrust back into a world that still hates him, Horace tries to rebuild a life with the daughter he left behind. But freedom feels like another kind of prison. As he digs into the mystery of his own past to understand who he really was, inconsistencies begin to surface. Clues that don't fit the narrative of an innocent victim. A strange, intricate tattoo on his arm that he doesn't remember getting.
                </p>
                <blockquote className="border-l-4 border-primary pl-6 italic text-xl text-white my-8 py-2 bg-gradient-to-r from-primary/10 to-transparent">
                  "Driven by a desperate need for the truth, Horace follows a trail of secrets that everyone – from his lawyer to the police – seems determined to keep buried. Is Horace a man wronged by the system? Or is his lack of memory the only thing keeping a true nightmare asleep?"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section id="author" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              <span className="text-primary">WHO IS</span> JAMES A. ARKIN?
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
            
            <p className="text-xl text-gray-300 leading-relaxed font-body">
              JAMES A. ARKIN is an author fascinated by the fragility of memory and the scars we carry. In Thirteen Marks, he explores the terrifying line between redemption and the monsters that live inside us. When he isn't writing, he is researching the darkest corners of criminal psychology.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { title: "OBSERVER", desc: "Watching the world from the edges." },
                { title: "ARCHITECT", desc: "Building mazes for the mind." },
                { title: "STORYTELLER", desc: "Revealing the truths we hide." }
              ].map((item, i) => (
                <div key={i} className="p-6 border border-white/10 bg-surface/50 hover:border-primary/50 transition-colors duration-300 group">
                  <h3 className="text-primary font-display text-xl mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-surface relative">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold">INITIATE CONTACT</h2>
            <p className="text-gray-400 font-body">
              Have a theory about the ending? Found a hidden message? Or just want to connect?
              <br />The channel is open.
            </p>

            <div className="p-8 border border-primary/20 bg-background/50 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:h-full transition-all duration-500 h-0"></div>
              
              <div className="flex flex-col items-center gap-4">
                <Mail size={48} className="text-primary mb-4" />
                <a 
                  href="mailto:jamesaarkin@gmail.com" 
                  className="text-2xl md:text-3xl font-display font-bold hover:text-primary transition-colors duration-300 break-all"
                >
                  jamesaarkin@gmail.com
                </a>
                <p className="text-sm text-gray-500 mt-4">
                  Encrypted transmission...
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-6 mt-12">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                <ExternalLink size={16} /> Goodreads
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                <ExternalLink size={16} /> Amazon Author Page
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-background text-center">
        <div className="container mx-auto px-6">
          <p className="text-gray-600 font-body text-sm">
            &copy; {new Date().getFullYear()} James A. Arkin. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs mt-2">
            System Status: ONLINE // Version 1.0.0
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
