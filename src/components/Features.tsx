
import { Clock, Shield, Smartphone, TrendingUp, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Clock,
      title: "Time-Sensitive Listings",
      description: "7-day automatic expiration ensures only the freshest produce is available",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description: "Custom dashboards for farmers, vendors, and admins with relevant features",
      color: "text-accent"
    },
    {
      icon: Smartphone,
      title: "Mobile Money Integration",
      description: "Seamless payments with MTN MoMo and secure escrow system",
      color: "text-secondary"
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Rating system and verified profiles build community trust",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Track sales, monitor trends, and optimize your agricultural business",
      color: "text-accent"
    },
    {
      icon: Zap,
      title: "Real-Time Notifications",
      description: "Instant updates on orders, payments, and delivery status",
      color: "text-secondary"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed specifically for Ghana's agricultural marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 animate-fade-in border-border/50 hover:border-primary/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
