import { Pizza as PizzaIcon, Instagram, Twitter, Facebook } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-primary">
            <PizzaIcon className="h-8 w-8" />
            <span>Slice Heaven</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Crafting the finest wood-fired pizzas with love and fresh ingredients since 2024.
          </p>
          <div className="flex gap-4">
            <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/menu" className="hover:text-primary">Our Menu</Link></li>
            <li><Link href="/#about" className="hover:text-primary">About Us</Link></li>
            <li><Link href="/profile" className="hover:text-primary">My Account</Link></li>
            <li><Link href="/checkout" className="hover:text-primary">Checkout</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Opening Hours</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Mon - Thu: 11:00 AM - 10:00 PM</li>
            <li>Fri - Sat: 11:00 AM - 11:00 PM</li>
            <li>Sunday: 12:00 PM - 9:00 PM</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>123 Pizza Lane, Dough City</li>
            <li>+1 (234) 567-890</li>
            <li>hello@sliceheaven.com</li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        © 2024 Slice Heaven. All rights reserved.
      </div>
    </footer>
  );
}
