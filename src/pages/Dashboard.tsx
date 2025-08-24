import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowRight, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  DollarSign, 
  Activity,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data
  const pendingOrders = 12;
  const uncompletedTransactions = 5;
  const userName = "Alex Thompson";

  const latestActivity = [
    {
      id: 1,
      type: "order",
      message: "New buy order for 0.5 BTC received",
      time: "2 minutes ago",
      link: "/orders"
    },
    {
      id: 2,
      type: "transaction",
      message: "ETH transaction #TX001 awaiting completion",
      time: "15 minutes ago",
      link: "/transactions/TX001"
    },
    {
      id: 3,
      type: "broadcast",
      message: "Broadcast message sent to all customers",
      time: "1 hour ago",
      link: "#"
    }
  ];

  return (
    <Layout title={`Welcome, ${userName}`}>
      <div className="space-y-8">
        
        {/* At a Glance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/orders">
            <Card className="bg-gradient-card border-border hover:shadow-glow transition-all cursor-pointer group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-warning">{pendingOrders}</div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Orders awaiting your response
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/transactions">
            <Card className="bg-gradient-card border-border hover:shadow-glow transition-all cursor-pointer group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uncompleted Transactions</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-destructive">{uncompletedTransactions}</div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Transactions needing completion
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Latest Activity */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle>Latest Activity</CardTitle>
            <CardDescription>Recent broadcast messages and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Mock broadcast messages - in real app this would come from API */}
            {[
              {
                id: 1,
                message: "Currently experiencing high transaction volumes. Please allow extra time for processing. We appreciate your patience.",
                shortMessage: "Currently experiencing high transaction volumes. Please allow extra time for processing...",
                date: "2024-01-15 09:30:00"
              },
              {
                id: 2,
                message: "System maintenance scheduled for tonight 2:00 AM - 4:00 AM. All transactions will be processed after maintenance.",
                shortMessage: "System maintenance scheduled for tonight 2:00 AM - 4:00 AM. All transactions will be processed...",
                date: "2024-01-14 18:45:15"
              }
            ].length > 0 ? (
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    message: "Currently experiencing high transaction volumes. Please allow extra time for processing. We appreciate your patience.",
                    shortMessage: "Currently experiencing high transaction volumes. Please allow extra time for processing...",
                    date: "2024-01-15 09:30:00"
                  },
                  {
                    id: 2,
                    message: "System maintenance scheduled for tonight 2:00 AM - 4:00 AM. All transactions will be processed after maintenance.",
                    shortMessage: "System maintenance scheduled for tonight 2:00 AM - 4:00 AM. All transactions will be processed...",
                    date: "2024-01-14 18:45:15"
                  }
                ].map((broadcast) => (
                  <div key={broadcast.id} className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">{broadcast.shortMessage}</p>
                      <p className="text-xs text-muted-foreground">{broadcast.date}</p>
                    </div>
                    <Link to="/broadcast-messages">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        Read More
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No recent broadcast messages</p>
                <Link to="/broadcast-messages">
                  <Button variant="outline" size="sm" className="mt-2 border-border">
                    Send Broadcast Message
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card className="bg-gradient-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>Your trading analytics and insights</CardDescription>
            </div>
            <Select defaultValue="1-week">
              <SelectTrigger className="w-32 bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-hour">1 Hour</SelectItem>
                <SelectItem value="1-day">1 Day</SelectItem>
                <SelectItem value="1-week">1 Week</SelectItem>
                <SelectItem value="1-month">1 Month</SelectItem>
                <SelectItem value="1-year">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Assets Traded */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-crypto-blue" />
                  <h4 className="text-sm font-medium">Unique Assets Traded</h4>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-xs text-muted-foreground">+1 from last week</div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-crypto-blue h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>

              {/* Value Traded */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-crypto-green" />
                  <h4 className="text-sm font-medium">Value Traded</h4>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">₦847M</div>
                  <div className="text-xs text-muted-foreground">+8% from last week</div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-crypto-green h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>

              {/* Total Transactions */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-crypto-gold" />
                  <h4 className="text-sm font-medium">Total Transactions</h4>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">187</div>
                  <div className="text-xs text-muted-foreground">+15% from last week</div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-crypto-gold h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;