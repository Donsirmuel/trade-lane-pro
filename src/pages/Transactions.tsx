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

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [assetFilter, setAssetFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock data
  const transactions = [
    { id: "TX001", date: "2024-01-14 16:45", asset: "BTC", amount: "0.3", value: "$14,100", status: "Completed", type: "Buy" },
    { id: "TX002", date: "2024-01-14 15:30", asset: "ETH", amount: "1.5", value: "$3,900", status: "Uncompleted", type: "Sell" },
    { id: "TX003", date: "2024-01-14 14:20", asset: "USDT", amount: "5,000", value: "$5,000", status: "Completed", type: "Buy" },
    { id: "TX004", date: "2024-01-14 13:15", asset: "BTC", amount: "0.8", value: "$37,600", status: "Declined", type: "Sell" },
    { id: "TX005", date: "2024-01-14 12:00", asset: "ETH", amount: "2.2", value: "$5,720", status: "Uncompleted", type: "Buy" },
    { id: "TX006", date: "2024-01-14 11:30", asset: "BTC", amount: "1.0", value: "$47,000", status: "Completed", type: "Buy" },
    { id: "TX007", date: "2024-01-14 10:45", asset: "USDT", amount: "8,500", value: "$8,500", status: "Completed", type: "Sell" },
    { id: "TX008", date: "2024-01-14 09:30", asset: "ETH", amount: "0.9", value: "$2,340", status: "Uncompleted", type: "Buy" },
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-crypto-green/20 text-crypto-green";
      case "Uncompleted": return "bg-warning/20 text-warning";
      case "Declined": return "bg-destructive/20 text-destructive";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "Buy" ? "bg-crypto-blue/20 text-crypto-blue" : "bg-crypto-red/20 text-crypto-red";
  };

  const getAssetColor = (asset: string) => {
    switch (asset) {
      case "BTC": return "bg-crypto-gold/20 text-crypto-gold";
      case "ETH": return "bg-crypto-blue/20 text-crypto-blue";
      case "USDT": return "bg-crypto-green/20 text-crypto-green";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.asset.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAsset = assetFilter === "all" || transaction.asset === assetFilter;
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    
    return matchesSearch && matchesAsset && matchesStatus && matchesType;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setAssetFilter("all");
    setStatusFilter("all");
    setTypeFilter("all");
  };

  return (
    <Layout title="Transactions">
      <div className="space-y-6">
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-crypto-green">
                  {transactions.filter(t => t.status === "Completed").length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">
                  {transactions.filter(t => t.status === "Uncompleted").length}
                </div>
                <div className="text-sm text-muted-foreground">Uncompleted</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">
                  {transactions.filter(t => t.status === "Declined").length}
                </div>
                <div className="text-sm text-muted-foreground">Declined</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {transactions.length}
                </div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search transactions..."
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

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Uncompleted">Uncompleted</SelectItem>
                  <SelectItem value="Declined">Declined</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Buy">Buy</SelectItem>
                  <SelectItem value="Sell">Sell</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters} className="border-border">
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle>All Transactions ({filteredTransactions.length})</CardTitle>
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
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="border-border hover:bg-secondary/50">
                      <TableCell>
                        <Link 
                          to={`/transactions/${transaction.id}`}
                          className="text-primary hover:text-primary/80 font-medium"
                        >
                          {transaction.id}
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                      <TableCell>
                        <Badge className={getAssetColor(transaction.asset)}>
                          {transaction.asset}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{transaction.amount}</TableCell>
                      <TableCell className="font-semibold">{transaction.value}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(transaction.type)}>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link to={`/transactions/${transaction.id}`}>
                          <Badge className={`${getStatusColor(transaction.status)} cursor-pointer hover:opacity-80`}>
                            {transaction.status}
                          </Badge>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredTransactions.length)} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
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

export default Transactions;