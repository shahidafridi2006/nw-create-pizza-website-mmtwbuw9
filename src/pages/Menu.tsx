import { useState } from "react";
import { usePizzas } from "@/hooks/usePizzas";
import PizzaCard from "@/components/PizzaCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = [
  { id: 'all', label: 'All Pizzas' },
  { id: 'classic', label: 'Classic' },
  { id: 'specialty', label: 'Specialty' },
  { id: 'veggie', label: 'Veggie' },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: pizzas, isLoading } = usePizzas(activeCategory);

  const filteredPizzas = pizzas?.filter(pizza => 
    pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pizza.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-12 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold">Our Menu</h1>
        <p className="text-muted-foreground">
          Explore our wide range of artisanal pizzas, from timeless classics to 
          bold specialty creations.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-2 md:flex w-full">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="px-8">
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search pizzas..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[400px] rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : filteredPizzas?.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">No pizzas found matching your criteria.</p>
          <Button variant="link" onClick={() => {setSearchQuery(''); setActiveCategory('all');}}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPizzas?.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>
      )}
    </div>
  );
}
