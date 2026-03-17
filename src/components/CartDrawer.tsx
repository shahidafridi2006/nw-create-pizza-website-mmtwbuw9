import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "wouter";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, updateQuantity, removeFromCart, total, itemCount } = useCart();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] h-[100dvh] sm:h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart ({itemCount})
          </DialogTitle>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">Add some delicious pizzas to get started!</p>
              </div>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{item.name}</h4>
                      <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{formatPrice(item.price)} each</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t bg-muted/30 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-xl font-bold">{formatPrice(total)}</span>
            </div>
            <Link href="/checkout" onClick={() => onOpenChange(false)}>
              <Button className="w-full" size="lg" variant="premium">
                Checkout
              </Button>
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
