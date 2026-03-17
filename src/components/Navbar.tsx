import { Link, useLocation } from "wouter";
import { ShoppingCart, User, Pizza as PizzaIcon, Menu as MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "./ui/badge";
import CartDrawer from "./CartDrawer";
import { useState } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const { itemCount } = useCart();
  const { user } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-primary">
            <PizzaIcon className="h-8 w-8" />
            <span className="hidden sm:inline">Slice Heaven</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/menu" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/menu' ? 'text-primary' : 'text-muted-foreground'}`}>
              Menu
            </Link>
            <Link href="/#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              About
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                {itemCount}
              </Badge>
            )}
          </Button>

          {user ? (
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/auth">
              <Button variant="premium" size="sm">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </nav>
  );
}
