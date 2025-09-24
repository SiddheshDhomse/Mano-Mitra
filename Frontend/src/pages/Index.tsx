import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Brain, Shield, BarChart3, Users, ArrowRight, PlayCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze speech patterns, cognitive responses, and behavioral markers for accurate screening."
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Your health data is protected with enterprise-grade security and privacy standards."
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor cognitive health trends over time with detailed reports and visualizations."
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Take Assessment",
      description: "Complete a series of cognitive tests designed by neurologists and AI experts.",
      icon: PlayCircle,
    },
    {
      number: "02", 
      title: "AI Analysis",
      description: "Our AI analyzes your responses, speech patterns, and cognitive performance.",
      icon: Brain,
    },
    {
      number: "03",
      title: "Get Results",
      description: "Receive detailed insights and recommendations for next steps.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-display font-bold text-foreground mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Early Dementia Screening Made Accessible
          </h1>
          <p className="text-body-large text-muted-foreground mb-8 leading-relaxed">
            Advanced AI-powered cognitive assessment tool designed for elderly users. 
            Get accurate, accessible screening with voice-guided instructions and comprehensive reporting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/test">
                Start Screening Test
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/dashboard">
                Clinician Dashboard
                <Users className="ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-heading font-bold text-foreground mb-4">
              Why Choose Mano Mitra?
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with accessibility-first design to provide 
              accurate dementia screening for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center shadow-card hover:shadow-elevated transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="bg-gradient-primary w-16 h-16 rounded-lg mx-auto flex items-center justify-center mb-4">
                      <feature.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-subheading">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-heading font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Simple three-step process designed with elderly users in mind. 
              Large buttons, clear instructions, and audio guidance throughout.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="shadow-card hover:shadow-elevated transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div className="bg-gradient-secondary w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4">
                      <step.icon className="h-10 w-10 text-secondary-foreground" />
                    </div>
                    <div className="text-4xl font-bold text-primary mb-2">{step.number}</div>
                    <CardTitle className="text-subheading">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-body text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>

                {/* Connector arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-heading font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-body-large text-muted-foreground mb-8">
              Take the first step towards proactive cognitive health monitoring. 
              Your assessment takes just 15-20 minutes.
            </p>
            <Button variant="default" size="xl" asChild>
              <Link to="/test">
                Begin Assessment Now
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 Mano Mitra. Designed for accessible healthcare technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
