import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Checkout from "@/pages/Checkout";
import { CartProvider } from "@/hooks/useCart";
import { AuthProvider } from "@/hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Navbar />
          <main className="flex-grow">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/menu" component={Menu} />
              <Route path="/auth" component={Auth} />
              <Route path="/profile" component={Profile} />
              <Route path="/checkout" component={Checkout} />
              <Route>404 Page Not Found</Route>
            </Switch>
          </main>
          <Footer />
          <Toaster />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
