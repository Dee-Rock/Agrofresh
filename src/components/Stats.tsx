
import { TrendingUp, Users, Leaf, Clock } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      number: "1,700+",
      label: "Active Users",
      description: "Farmers and vendors using the platform",
      color: "text-primary"
    },
    {
      icon: Leaf,
      number: "50+",
      label: "Crop Varieties",
      description: "Different types of fresh produce available",
      color: "text-accent"
    },
    {
      icon: TrendingUp,
      number: "₵2.5M+",
      label: "Sales Volume",
      description: "Total transactions processed monthly",
      color: "text-secondary"
    },
    {
      icon: Clock,
      number: "24hrs",
      label: "Average Delivery",
      description: "From farm to vendor in record time",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
                {stat.number}
              </div>
              <div className="text-lg font-semibold mb-1 text-foreground">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
