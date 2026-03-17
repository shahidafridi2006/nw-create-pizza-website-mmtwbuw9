import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight, Star, Clock, ShieldCheck, Pizza as PizzaIcon } from "lucide-react";
import PizzaCard from "@/components/PizzaCard";
import { usePizzas } from "@/hooks/usePizzas";

export default function Home() {
  const { data: pizzas, isLoading } = usePizzas();
  const featuredPizzas = pizzas?.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden hero-gradient">
        <div className="container relative z-10">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <Star className="h-4 w-4 fill-primary" />
              <span>Voted #1 Pizza in Dough City</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              Heavenly Slices <br />
              <span className="text-primary">Delivered Fast.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              Experience the authentic taste of wood-fired pizza made with 
              premium ingredients and delivered fresh to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/menu">
                <Button size="lg" className="h-14 px-8 text-lg" variant="premium">
                  Order Now <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/#about">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Hero Image Decoration */}
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 hidden lg:block opacity-20">
          <PizzaIcon className="w-[600px] h-[600px] text-primary rotate-12" />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <PizzaIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Fresh Ingredients</h3>
            <p className="text-muted-foreground">We use only the finest, locally sourced organic ingredients for every pizza.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Fast Delivery</h3>
            <p className="text-muted-foreground">Our lightning-fast delivery ensures your pizza arrives piping hot in 30 mins.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Quality Assured</h3>
            <p className="text-muted-foreground">Every slice is checked for perfection before it leaves our wood-fired oven.</p>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-20">
        <div className="container space-y-12">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Featured Pizzas</h2>
              <p className="text-muted-foreground">Our most popular choices this week.</p>
            </div>
            <Link href="/menu">
              <Button variant="link" className="text-primary">View Full Menu <ChevronRight className="ml-1 h-4 w-4" /></Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] rounded-xl bg-muted animate-pulse" />
              ))
            ) : (
              featuredPizzas?.map((pizza) => (
                <PizzaCard key={pizza.id} pizza={pizza} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to taste heaven?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of happy customers and order your first Slice Heaven pizza today.
          </p>
          <Link href="/menu">
            <Button size="lg" variant="secondary" className="h-14 px-12 text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
