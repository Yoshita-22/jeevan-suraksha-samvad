import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Heart, 
  Menu, 
  X, 
  BookOpen, 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  Volume2,
  Brain,
  Users,
  Clock,
  Play,
  MapPin,
  ChevronRight
} from "lucide-react";
import heroImage from "@/assets/hero-asha-worker.jpg";
import problemImage from "@/assets/problem-manual.jpg";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Mic className="w-6 h-6 text-primary" />
                <Heart className="w-3 h-3 text-accent absolute -bottom-1 -right-1" />
              </div>
              <span className="text-xl font-bold font-heading text-foreground">
                Jeevan Suraksha
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="hero" size="lg" className="gap-2">
                <Mic className="w-4 h-4" />
                Try Demo
              </Button>
              <Button variant="outline" size="lg">
                📘 Learn More
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-3 animate-fade-in">
              <Button variant="hero" size="lg" className="gap-2 w-full">
                <Mic className="w-4 h-4" />
                Try Demo
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                📘 Learn More
              </Button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/90" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
              Empowering India's frontline health heroes with AI.
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              Jeevan Suraksha — An AI-powered voice assistant for ASHA workers.<br />
              Understands local languages. Works offline. Delivers trusted medical guidance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button variant="accent" size="xl" className="gap-2">
                <Mic className="w-5 h-5 animate-pulse-soft" />
                Try Demo
              </Button>
              <Button variant="outline" size="xl" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
                📘 Learn More
              </Button>
            </div>

            <p className="text-sm text-primary-foreground/80 flex items-center justify-center gap-2 pt-4">
              <Volume2 className="w-4 h-4" />
              Tap to speak — works even offline.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Text Content */}
            <div className="space-y-6 animate-slide-up">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                The information gap in rural healthcare.
              </h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Every day, <strong className="text-foreground">one million ASHA workers</strong> serve nearly <strong className="text-foreground">600 million people</strong> across rural India.<br />
                  But when emergencies strike, they often struggle to access reliable medical information quickly.
                </p>

                <div className="flex flex-col gap-3 py-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Limited literacy levels</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Language barriers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <WifiOff className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Poor internet connectivity</span>
                  </div>
                </div>

                <p>
                  They rely on printed manuals or memory, which can slow down or mislead healthcare delivery.
                </p>
              </div>

              <blockquote className="border-l-4 border-accent pl-6 py-2 italic text-lg font-quote text-muted-foreground">
                "A few seconds of confusion can mean a lifetime of loss for a patient."
              </blockquote>
            </div>

            {/* Image */}
            <div className="relative animate-fade-in">
              <div className="rounded-2xl overflow-hidden shadow-2xl hover-lift">
                <img 
                  src={problemImage} 
                  alt="ASHA worker flipping manual - indicating difficulty accessing info"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Introducing Jeevan Suraksha.
            </h2>
            <p className="text-xl text-muted-foreground">
              Your AI companion that listens, understands, and guides — even offline.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16">
            <Card className="hover-lift animate-slide-up border-2">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Understands Local Dialects</h3>
                <p className="text-muted-foreground">
                  Speak naturally — in Hindi, Tamil, Bengali, or your regional language.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-slide-up border-2" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Volume2 className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Trusted Voice Guidance</h3>
                <p className="text-muted-foreground">
                  Instant answers from verified WHO and Health Ministry data.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-slide-up border-2 sm:col-span-2 lg:col-span-1" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <WifiOff className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Works Offline</h3>
                <p className="text-muted-foreground">
                  Preloaded knowledge ensures support even in low connectivity zones.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Mini Demo */}
          <Card className="max-w-3xl mx-auto border-2 border-primary/20 shadow-xl animate-fade-in">
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
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              From Question to Care
            </h2>
            <p className="text-muted-foreground text-sm italic">
              Sample: "Bacche ko bukhar hai, kya karna chahiye?"
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="text-center space-y-4 animate-slide-up">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground mx-auto flex items-center justify-center text-2xl font-bold shadow-lg">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Ask</h3>
                  <p className="text-muted-foreground">Speak or type your question.</p>
                  <Mic className="w-8 h-8 text-primary mx-auto" />
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="hidden sm:flex items-center justify-center">
                <ChevronRight className="w-8 h-8 text-primary/40" />
              </div>

              {/* Step 2 */}
              <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="w-16 h-16 rounded-full bg-secondary text-secondary-foreground mx-auto flex items-center justify-center text-2xl font-bold shadow-lg">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Process</h3>
                  <p className="text-muted-foreground">AI interprets and searches verified medical databases.</p>
                  <Brain className="w-8 h-8 text-secondary mx-auto" />
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="hidden sm:flex items-center justify-center">
                <ChevronRight className="w-8 h-8 text-primary/40" />
              </div>

              {/* Step 3 */}
              <div className="text-center space-y-4 animate-slide-up sm:col-start-2" style={{ animationDelay: "0.4s" }}>
                <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground mx-auto flex items-center justify-center text-2xl font-bold shadow-lg">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Answer</h3>
                  <p className="text-muted-foreground">Delivers simple, accurate voice guidance.</p>
                  <Volume2 className="w-8 h-8 text-accent mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Making healthcare faster, smarter, and more human.
            </h2>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="text-center p-8 hover-lift border-2 animate-slide-up">
              <CardContent className="p-0 space-y-2">
                <Users className="w-12 h-12 text-primary mx-auto" />
                <p className="text-4xl sm:text-5xl font-bold text-primary">1M+</p>
                <p className="text-muted-foreground">ASHA workers supported</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover-lift border-2 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-0 space-y-2">
                <Heart className="w-12 h-12 text-secondary mx-auto" />
                <p className="text-4xl sm:text-5xl font-bold text-secondary">600M+</p>
                <p className="text-muted-foreground">Rural citizens reached</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover-lift border-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-0 space-y-2">
                <Clock className="w-12 h-12 text-accent mx-auto" />
                <p className="text-4xl sm:text-5xl font-bold text-accent">60%</p>
                <p className="text-muted-foreground">Faster information delivery</p>
              </CardContent>
            </Card>
          </div>

          {/* Testimonial */}
          <Card className="max-w-3xl mx-auto border-2 shadow-xl animate-fade-in bg-card">
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
      </section>

      {/* Technology Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Powered by trusted AI — built for real-world healthcare.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <Card className="p-6 hover-lift border-2 animate-slide-up">
              <CardContent className="p-0 space-y-3">
                <div className="flex items-center gap-3">
                  <Mic className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-foreground">Whisper</h3>
                </div>
                <p className="text-muted-foreground">Speech-to-text for Indian dialects</p>
              </CardContent>
            </Card>

            <Card className="p-6 hover-lift border-2 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-0 space-y-3">
                <div className="flex items-center gap-3">
                  <Brain className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-foreground">GPT</h3>
                </div>
                <p className="text-muted-foreground">Natural language understanding</p>
              </CardContent>
            </Card>

            <Card className="p-6 hover-lift border-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-0 space-y-3">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-foreground">Text-to-Speech</h3>
                </div>
                <p className="text-muted-foreground">Clear regional voice output</p>
              </CardContent>
            </Card>

            <Card className="p-6 hover-lift border-2 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <CardContent className="p-0 space-y-3">
                <div className="flex items-center gap-3">
                  <Wifi className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-foreground">React + Node</h3>
                </div>
                <p className="text-muted-foreground">Fast, lightweight web app</p>
              </CardContent>
            </Card>

            <Card className="p-6 hover-lift border-2 animate-slide-up sm:col-span-2" style={{ animationDelay: "0.4s" }}>
              <CardContent className="p-0 space-y-3">
                <div className="flex items-center gap-3">
                  <WifiOff className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-foreground">Offline DB (SQLite)</h3>
                </div>
                <p className="text-muted-foreground">Supports rural areas without connectivity</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-lg font-semibold text-muted-foreground animate-fade-in">
            Built for trust. Tested in the field. Scaled for India.
          </p>
        </div>
      </section>

      {/* Join the Movement - CTA */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground">
              Empowering every ASHA worker with the knowledge to save lives.
            </h2>
            
            <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Together, we're building a future where no question goes unanswered — even in the most remote corner of India.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button variant="accent" size="xl" className="gap-2 shadow-2xl">
                🚀 See Demo
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 gap-2"
              >
                <Play className="w-5 h-5" />
                Watch 30-sec Video
              </Button>
            </div>

            <p className="text-sm text-primary-foreground/80 pt-4">
              No sign-in required — try the demo.
            </p>
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
