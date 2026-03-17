import { useOrders } from "@/hooks/useOrders";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { formatPrice } from "@/lib/utils";
import { Package, Clock, CheckCircle2, Truck, XCircle } from "lucide-react";

const statusIcons = {
  pending: <Clock className="h-4 w-4" />,
  preparing: <Package className="h-4 w-4" />,
  out_for_delivery: <Truck className="h-4 w-4" />,
  delivered: <CheckCircle2 className="h-4 w-4" />,
  cancelled: <XCircle className="h-4 w-4" />,
};

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  preparing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  out_for_delivery: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-500 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function OrderHistory() {
  const { data: orders, isLoading } = useOrders();

  if (isLoading) {
    return <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 w-full bg-muted animate-pulse rounded-lg" />
      ))}
    </div>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed">
        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No orders found yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden">
          <CardHeader className="bg-muted/30 flex flex-row items-center justify-between py-4">
            <div>
              <p className="text-xs text-muted-foreground">Order ID</p>
              <p className="text-sm font-mono">{order.id.slice(0, 8)}...</p>
            </div>
            <Badge className={statusColors[order.status]} variant="outline">
              <span className="flex items-center gap-1">
                {statusIcons[order.status]}
                {order.status.replace(/_/g, ' ')}
              </span>
            </Badge>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold bg-primary/10 text-primary px-2 py-1 rounded">
                      {item.quantity}x
                    </span>
                    <span className="text-sm font-medium">{item.pizza?.name || 'Pizza'}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatPrice(item.price_at_time * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="pt-4 border-t flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Total Amount</p>
                  <p className="text-lg font-bold text-primary">{formatPrice(order.total_amount)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
