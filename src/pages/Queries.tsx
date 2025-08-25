import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MessageCircle, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const Queries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Mock queries data
  const mockQueries = [
    {
      id: "Q001",
      customerName: "John Doe",
      email: "john.doe@email.com",
      subject: "Payment not received",
      message: "I made the payment 2 hours ago but my order is still showing as pending. Please check and confirm.",
      status: "Open",
      priority: "High",
      createdAt: "2024-01-14 16:30:00",
      orderRef: "TX001"
    },
    {
      id: "Q002", 
      customerName: "Jane Smith",
      email: "jane.smith@email.com",
      subject: "Wrong contract address",
      message: "I think I sent the cryptocurrency to the wrong address. Can you please help me verify?",
      status: "Resolved",
      priority: "Medium",
      createdAt: "2024-01-14 14:15:00",
      orderRef: "TX002"
    },
    {
      id: "Q003",
      customerName: "Mike Johnson", 
      email: "mike.j@email.com",
      subject: "Order cancellation request",
      message: "I need to cancel my order due to urgent circumstances. Please advise on the process.",
      status: "In Progress",
      priority: "Medium",
      createdAt: "2024-01-14 12:45:00",
      orderRef: "TX003"
    },
    {
      id: "Q004",
      customerName: "Sarah Wilson",
      email: "sarah.w@email.com", 
      subject: "Rate inquiry",
      message: "What are your current rates for ETH? The website is showing different rates.",
      status: "Open",
      priority: "Low",
      createdAt: "2024-01-14 11:20:00",
      orderRef: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-warning/20 text-warning";
      case "In Progress": return "bg-primary/20 text-primary";
      case "Resolved": return "bg-crypto-green/20 text-crypto-green";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open": return <AlertCircle className="h-4 w-4" />;
      case "In Progress": return <Clock className="h-4 w-4" />;
      case "Resolved": return <CheckCircle2 className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-destructive/20 text-destructive";
      case "Medium": return "bg-warning/20 text-warning";
      case "Low": return "bg-secondary text-secondary-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const filteredQueries = mockQueries.filter(query => {
    const matchesSearch = query.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || query.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority = priorityFilter === "all" || query.priority.toLowerCase() === priorityFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Customer Queries</h1>
          <p className="text-muted-foreground">Manage and respond to customer inquiries</p>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter queries by search term, status, and priority</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search queries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Queries List */}
        <div className="space-y-4">
          {filteredQueries.map((query) => (
            <Card key={query.id} className="bg-gradient-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{query.subject}</h3>
                      <Badge className={getPriorityColor(query.priority)} variant="secondary">
                        {query.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Query ID: {query.id}</span>
                      <span>From: {query.customerName}</span>
                      <span>{query.email}</span>
                      {query.orderRef && <span>Order: {query.orderRef}</span>}
                    </div>
                  </div>
                  <Badge className={getStatusColor(query.status)}>
                    {getStatusIcon(query.status)}
                    <span className="ml-1">{query.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">{query.message}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Created: {query.createdAt}
                    </span>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" className="border-border">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                      {query.status !== "Resolved" && (
                        <Button variant="default" size="sm">
                          Mark Resolved
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredQueries.length === 0 && (
          <Card className="bg-gradient-card border-border">
            <CardContent className="text-center py-12">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No queries found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" || priorityFilter !== "all" 
                  ? "Try adjusting your filters to see more results."
                  : "No customer queries available at the moment."
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Queries;