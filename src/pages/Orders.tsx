import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [assetFilter, setAssetFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock data
  const orders = [
    { id: "ORD001", date: "2024-01-15 14:30", asset: "BTC", amount: "0.5", value: "$23,500", type: "Buy", elapsed: "5 minutes ago" },
    { id: "ORD002", date: "2024-01-15 14:25", asset: "ETH", amount: "2.0", value: "$5,200", type: "Sell", elapsed: "10 minutes ago" },
    { id: "ORD003", date: "2024-01-15 14:20", asset: "BTC", amount: "1.2", value: "$56,400", type: "Buy", elapsed: "15 minutes ago" },
    { id: "ORD004", date: "2024-01-15 14:15", asset: "USDT", amount: "10,000", value: "$10,000", type: "Sell", elapsed: "20 minutes ago" },
    { id: "ORD005", date: "2024-01-15 14:10", asset: "ETH", amount: "5.0", value: "$13,000", type: "Buy", elapsed: "25 minutes ago" },
    { id: "ORD006", date: "2024-01-15 14:05", asset: "BTC", amount: "0.8", value: "$37,600", type: "Sell", elapsed: "30 minutes ago" },
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const getTypeColor = (type: string) => {
    return type === "Buy" ? "bg-crypto-green/20 text-crypto-green" : "bg-crypto-red/20 text-crypto-red";
  };

  const getAssetColor = (asset: string) => {
    switch (asset) {
      case "BTC": return "bg-crypto-gold/20 text-crypto-gold";
      case "ETH": return "bg-crypto-blue/20 text-crypto-blue";
      case "USDT": return "bg-crypto-green/20 text-crypto-green";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Layout title="Incoming Orders">
      <div className="space-y-6">
        
        {/* Filters */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              
              <Select value={assetFilter} onValueChange={setAssetFilter}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assets</SelectItem>
                  <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                  <SelectItem value="USDT">Tether (USDT)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Buy">Buy Orders</SelectItem>
                  <SelectItem value="Sell">Sell Orders</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="border-border">
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle>Pending Orders ({orders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Time Elapsed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="border-border hover:bg-secondary/50">
                      <TableCell>
                        <Link 
                          to={`/orders/${order.id}`}
                          className="text-primary hover:text-primary/80 font-medium"
                        >
                          {order.id}
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{order.date}</TableCell>
                      <TableCell>
                        <Badge className={getAssetColor(order.asset)}>
                          {order.asset}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{order.amount}</TableCell>
                      <TableCell className="font-semibold">{order.value}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(order.type)}>
                          {order.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{order.elapsed}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, orders.length)} to{" "}
                {Math.min(currentPage * itemsPerPage, orders.length)} of {orders.length} orders
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="border-border"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-primary" : "border-border"}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="border-border"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Orders;