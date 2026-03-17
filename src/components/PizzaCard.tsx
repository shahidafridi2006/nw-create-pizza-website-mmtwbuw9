import { Pizza } from "@/types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, Info } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface PizzaCardProps {
  pizza: Pizza;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-elegant border-none bg-card/50">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={pizza.image_url}
          alt={pizza.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-md">
            {pizza.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{pizza.name}</h3>
          <span className="font-bold text-primary">{formatPrice(pizza.price)}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
          {pizza.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          className="flex-1" 
          variant="premium"
          onClick={() => addToCart(pizza)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
