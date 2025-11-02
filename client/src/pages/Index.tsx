import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Heart, 
  Menu, 
  X, 
  BookOpen, 
  WifiOff, 
  CheckCircle, 
  Volume2,
  Brain,
  Users,
  Clock,
  Play,
  MapPin,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import heroImage from "@/assets/hero-asha-worker.jpg";
import problemImage from "@/assets/problem-manual.jpg";

import { Link } from "react-router-dom";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [heroTextVisible, setHeroTextVisible] = useState(false);
  
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Check which sections are visible
      const newVisible = new Set<string>();
      Object.entries(sectionRefs.current).forEach(([key, ref]) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
          if (isVisible) {
            newVisible.add(key);
          }
        }
      });
      setVisibleSections(newVisible);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hero text cinematic reveal
  useEffect(() => {
    const timer = setTimeout(() => setHeroTextVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNextSection = () => {
    const problemSection = sectionRefs.current['problem'];
    if (problemSection) {
      problemSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header / Nav */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Mic className="w-6 h-6 text-primary" />
                <Heart className="w-3 h-3 text-accent absolute -bottom-1 -right-1" />
              </div>
              <span className="text-xl font-bold font-heading text-foreground">
                Jeevan Suraksha
              </span>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/chatbot">
                <Button variant="hero" size="lg" className="gap-2" >
                <Mic className="w-4 h-4" />
                Try Demo
              </Button>
              </Link>
              <Button variant="outline" size="lg">
                📘 Learn More
              </Button>
            </div>

            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-3 animate-fade-in">
              <Link to="/chatbot">
                <Button variant="hero" size="lg" className="gap-2 w-full">
                <Mic className="w-4 h-4" />
                Try Demo
              </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full">
                📘 Learn More
              </Button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section - Cinematic 8s intro */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image with overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="video-overlay absolute inset-0" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Line-by-line cinematic text reveal */}
            <div className="space-y-6">
              <p className={`text-2xl sm:text-3xl md:text-4xl text-primary-foreground font-light text-reveal ${heroTextVisible ? 'visible' : ''}`}>
                One million ASHA workers.
              </p>
              <p className={`text-2xl sm:text-3xl md:text-4xl text-primary-foreground font-light text-reveal ${heroTextVisible ? 'visible' : ''}`} style={{ animationDelay: '0.5s' }}>
                600 million lives touched.
              </p>
              <p className={`text-2xl sm:text-3xl md:text-4xl text-primary-foreground font-light text-reveal ${heroTextVisible ? 'visible' : ''}`} style={{ animationDelay: '1s' }}>
                But access to the right information is still a struggle…
              </p>
            </div>

            {/* CTA button fades in last */}
            <div className={`pt-8 text-reveal ${heroTextVisible ? 'visible' : ''}`} style={{ animationDelay: '1.5s' }}>
              <Button 
                variant="accent" 
                size="xl" 
                className="gap-2 shadow-2xl"
                onClick={scrollToNextSection}
              >
                See the Solution
                <ChevronDown className="w-5 h-5" />
              </Button>
            </div>

            {/* Optional India map connections hint */}
            <div className={`pt-16 text-reveal ${heroTextVisible ? 'visible' : ''}`} style={{ animationDelay: '2s' }}>
              <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-primary-foreground/30 to-transparent animate-glow-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Interactive split-screen scroll */}
      <section 
        ref={(el) => sectionRefs.current['problem'] = el}
        className="py-16 sm:py-20 lg:py-24 bg-background"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
            {/* Left - Sticky Image */}
            <div className="split-screen-left">
              <div className={`rounded-2xl overflow-hidden shadow-2xl hover-lift transition-all duration-700 ${visibleSections.has('problem') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <img 
                  src={problemImage} 
                  alt="ASHA worker in the field"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right - Scrolling content with icons */}
            <div className="space-y-8">
              <div className={`transition-all duration-700 delay-100 ${visibleSections.has('problem') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  The information gap in rural healthcare.
                </h2>
              </div>

              {/* Each scroll reveals a point */}
              <div className="space-y-8">
                <div className={`group p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 cursor-pointer ${visibleSections.has('problem') ? 'animate-float-up' : 'opacity-0'}`}>
                  <div className="flex items-start gap-4">
                    <BookOpen className="w-8 h-8 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Low literacy levels</h3>
                      <p className="text-muted-foreground">Many ASHA workers struggle with complex medical texts and documentation.</p>
                    </div>
                  </div>
                </div>

                <div className={`group p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 cursor-pointer ${visibleSections.has('problem') ? 'animate-float-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-start gap-4">
                    <Users className="w-8 h-8 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Language barriers</h3>
                      <p className="text-muted-foreground">Medical information is often not available in regional languages and dialects.</p>
                      {/* Hover effect: regional speech bubbles */}
                      <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Badge variant="secondary" className="text-xs">हिंदी</Badge>
                        <Badge variant="secondary" className="text-xs">தமிழ்</Badge>
                        <Badge variant="secondary" className="text-xs">বাংলা</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`group p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 cursor-pointer ${visibleSections.has('problem') ? 'animate-float-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                  <div className="flex items-start gap-4">
                    <WifiOff className="w-8 h-8 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Poor internet connectivity</h3>
                      <p className="text-muted-foreground">Rural areas often lack reliable internet access for quick information retrieval.</p>
                    </div>
                  </div>
                </div>

                <div className={`group p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 cursor-pointer ${visibleSections.has('problem') ? 'animate-float-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                  <div className="flex items-start gap-4">
                    <Clock className="w-8 h-8 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Slow & inaccurate responses</h3>
                      <p className="text-muted-foreground">Relying on printed manuals and memory leads to delays and potential errors.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`pt-6 transition-all duration-700 delay-500 ${visibleSections.has('problem') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-2xl font-bold text-foreground">
                  The backbone of rural healthcare deserves better tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Cinematic reveal */}
      <section 
        ref={(el) => sectionRefs.current['solution'] = el}
        className="relative py-16 sm:py-20 lg:py-24 bg-muted/30 overflow-hidden"
      >
        {/* Glowing pulse effect */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 ${visibleSections.has('solution') ? 'animate-glow-pulse' : 'opacity-0'}`} />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${visibleSections.has('solution') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Introducing Jeevan Suraksha.
            </h2>
            <p className="text-xl text-muted-foreground">
              Your AI companion that listens, understands, and guides — even offline.
            </p>
          </div>

          {/* 3 floating feature cards appear interactively */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16">
            <Card className={`border-2 hover-lift transition-all duration-700 ${visibleSections.has('solution') ? 'animate-float-up' : 'opacity-0'}`}>
              <CardContent className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-glow-pulse">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Understands local dialects</h3>
                <p className="text-muted-foreground">
                  Speak naturally in Hindi, Tamil, Bengali, or your regional language.
                </p>
              </CardContent>
            </Card>

            <Card className={`border-2 hover-lift transition-all duration-700 ${visibleSections.has('solution') ? 'animate-float-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Gives instant, verified answers</h3>
                <p className="text-muted-foreground">
                  Instant responses from verified WHO and Health Ministry data.
                </p>
              </CardContent>
            </Card>

            <Card className={`border-2 hover-lift transition-all duration-700 sm:col-span-2 lg:col-span-1 ${visibleSections.has('solution') ? 'animate-float-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                  <WifiOff className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Works even offline</h3>
                <p className="text-muted-foreground">
                  Preloaded knowledge ensures support even in low connectivity zones.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Phone mockup with AI waveform animation */}
          <div className={`max-w-3xl mx-auto transition-all duration-700 delay-300 ${visibleSections.has('solution') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="border-2 border-primary/20 shadow-xl bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground mb-1">ASHA:</p>
                    <p className="text-muted-foreground">"What are dengue symptoms?"</p>
                  </div>
                </div>

                {/* Subtle AI waveform background motion */}
                <div className="flex justify-center gap-1 py-2">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-1 bg-primary/30 rounded-full animate-map-glow"
                      style={{ 
                        height: `${Math.random() * 30 + 10}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-start gap-4 bg-primary/5 p-4 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground">AI:</p>
                      <Badge variant="secondary" className="text-xs gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      "Dengue often causes fever, pain behind eyes, and rash. Here's what to do next."
                    </p>
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Play className="w-3 h-3" />
                      Play Audio
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className={`text-center mt-12 transition-all duration-700 delay-500 ${visibleSections.has('solution') ? 'opacity-100' : 'opacity-0'}`}>
            <Button variant="hero" size="lg" className="gap-2">
              See How It Works
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works - Horizontal timeline step walkthrough */}
      <section 
        ref={(el) => sectionRefs.current['howitworks'] = el}
        className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary/5 to-transparent"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${visibleSections.has('howitworks') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground italic">
              "Bacche ko bukhar hai, kya karna chahiye?"
            </p>
          </div>

          {/* 3-step horizontal scroll animation */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection lines */}
              <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5">
                <div className={`h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-1000 ${visibleSections.has('howitworks') ? 'animate-line-grow' : 'w-0'}`} />
              </div>

              {/* Step 1: Ask */}
              <div className={`text-center space-y-4 transition-all duration-700 ${visibleSections.has('howitworks') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground mx-auto flex items-center justify-center text-3xl font-bold shadow-xl relative z-10">
                    1
                  </div>
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-primary/20 mx-auto animate-glow-pulse" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">Ask your question</h3>
                  <p className="text-muted-foreground">Speak or type your question by voice</p>
                  <Mic className="w-12 h-12 text-primary mx-auto animate-pulse-soft" />
                </div>
              </div>

              {/* Step 2: Process */}
              <div className={`text-center space-y-4 transition-all duration-700 delay-200 ${visibleSections.has('howitworks') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-secondary text-secondary-foreground mx-auto flex items-center justify-center text-3xl font-bold shadow-xl relative z-10">
                    2
                  </div>
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-secondary/20 mx-auto animate-glow-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">AI listens & responds</h3>
                  <p className="text-muted-foreground">AI interprets and searches verified databases instantly</p>
                  <Brain className="w-12 h-12 text-secondary mx-auto" />
                </div>
              </div>

              {/* Step 3: Answer */}
              <div className={`text-center space-y-4 transition-all duration-700 delay-400 ${visibleSections.has('howitworks') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-accent text-accent-foreground mx-auto flex items-center justify-center text-3xl font-bold shadow-xl relative z-10">
                    3
                  </div>
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-accent/20 mx-auto animate-glow-pulse" style={{ animationDelay: '1s' }} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">Works offline</h3>
                  <p className="text-muted-foreground">Delivers simple, accurate voice guidance with saved data</p>
                  <div className="flex justify-center items-center gap-2">
                    <Volume2 className="w-10 h-10 text-accent" />
                    <WifiOff className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section - Hopeful & Human with glowing India map */}
      <section 
        ref={(el) => sectionRefs.current['impact'] = el}
        className="relative py-16 sm:py-20 lg:py-24 bg-background overflow-hidden india-map-bg"
      >
        {/* Glowing India map dots connecting outward */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary animate-map-glow" />
          <div className="absolute top-1/3 left-1/2 w-2 h-2 rounded-full bg-secondary animate-map-glow" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/2 left-2/3 w-2 h-2 rounded-full bg-accent animate-map-glow" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-primary animate-map-glow" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${visibleSections.has('impact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Making healthcare faster, smarter, and more human.
            </h2>
          </div>

          {/* Animated counter stats */}
          <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <Card className={`text-center p-8 hover-lift border-2 transition-all duration-700 ${visibleSections.has('impact') ? 'animate-counter-up' : 'opacity-0'}`}>
              <CardContent className="p-0 space-y-3">
                <Users className="w-16 h-16 text-primary mx-auto" />
                <p className="text-5xl sm:text-6xl font-bold text-primary">1M+</p>
                <p className="text-lg text-muted-foreground font-semibold">ASHA workers empowered</p>
              </CardContent>
            </Card>

            <Card className={`text-center p-8 hover-lift border-2 transition-all duration-700 ${visibleSections.has('impact') ? 'animate-counter-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-0 space-y-3">
                <Heart className="w-16 h-16 text-secondary mx-auto" />
                <p className="text-5xl sm:text-6xl font-bold text-secondary">600M+</p>
                <p className="text-lg text-muted-foreground font-semibold">Rural citizens improved healthcare</p>
              </CardContent>
            </Card>

            <Card className={`text-center p-8 hover-lift border-2 transition-all duration-700 ${visibleSections.has('impact') ? 'animate-counter-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-0 space-y-3">
                <Clock className="w-16 h-16 text-accent mx-auto" />
                <p className="text-5xl sm:text-6xl font-bold text-accent">70%</p>
                <p className="text-lg text-muted-foreground font-semibold">Reduction in misinformation</p>
              </CardContent>
            </Card>
          </div>

          {/* Center fade-in quote */}
          <div className={`max-w-4xl mx-auto transition-all duration-700 delay-300 ${visibleSections.has('impact') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <Card className="border-2 shadow-2xl bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-10 sm:p-12 text-center space-y-6">
                <blockquote className="text-2xl sm:text-3xl font-quote italic text-foreground leading-relaxed">
                  "When knowledge reaches every village, every life is protected."
                </blockquote>
                <div className="pt-4">
                  <p className="text-lg font-semibold text-muted-foreground">
                    — The Promise of Jeevan Suraksha
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Testimonial */}
          <div className={`max-w-3xl mx-auto mt-12 transition-all duration-700 delay-500 ${visibleSections.has('impact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="border-2 shadow-xl">
              <CardContent className="p-8 sm:p-10">
                <div className="space-y-6">
                  <blockquote className="text-xl sm:text-2xl font-quote italic text-foreground leading-relaxed">
                    "With Jeevan Suraksha, I can help my community confidently — even without internet."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Anita</p>
                      <p className="text-sm text-muted-foreground">ASHA worker from Madhya Pradesh</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA - Emotive ending */}
      <section 
        ref={(el) => sectionRefs.current['cta'] = el}
        className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden"
      >
        {/* Clean background with subtle animation */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 animate-glow-pulse" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-4xl mx-auto text-center space-y-10 transition-all duration-700 ${visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Logo with gentle animation */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mic className="w-12 h-12 text-primary" />
                  <Heart className="w-6 h-6 text-accent absolute bottom-2 right-2" />
                </div>
                <div className="absolute inset-0 rounded-full bg-primary/5 animate-glow-pulse" />
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Join us in transforming rural healthcare.
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Together, we're building a future where no question goes unanswered — 
              even in the most remote corner of India.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/chatbot">
                <Button variant="hero" size="xl" className="gap-2 shadow-2xl">
                  <Mic className="w-5 h-5" />
                  Try Demo
                </Button>
              </Link>
              <Button variant="accent" size="xl" className="gap-2">
                Partner with Us
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="xl" className="gap-2">
                <Play className="w-5 h-5" />
                Watch Story
              </Button>
            </div>

            {/* Subtle exit animation: glowing lines forming India map fade to white */}
            <div className="pt-12">
              <div className="flex justify-center gap-2">
                <div className="h-1 w-16 bg-primary/30 rounded-full animate-glow-pulse" />
                <div className="h-1 w-24 bg-secondary/30 rounded-full animate-glow-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="h-1 w-16 bg-accent/30 rounded-full animate-glow-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-8 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Jeevan Suraksha © 2025 — Made with ❤️ for India's rural health warriors.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <span className="hidden sm:inline">•</span>
              <a href="#" className="hover:text-primary transition-colors">Technical Docs</a>
              <span className="hidden sm:inline">•</span>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
              <span className="hidden sm:inline">•</span>
              <a href="#" className="hover:text-primary transition-colors">GitHub</a>
              <span className="hidden sm:inline">•</span>
              <a href="#" className="hover:text-primary transition-colors">Press Kit</a>
            </div>
          </div>
        </div>
      </footer>
      

    </div>
  );
};

export default Index;
