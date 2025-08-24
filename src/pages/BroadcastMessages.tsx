import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, MessageSquare, Calendar, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BroadcastMessages = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Mock broadcast history
  const broadcastHistory = [
    {
      id: 1,
      message: "Currently experiencing high transaction volumes. Please allow extra time for processing. We appreciate your patience.",
      date: "2024-01-15 09:30:00",
      status: "Sent"
    },
    {
      id: 2,
      message: "System maintenance scheduled for tonight 2:00 AM - 4:00 AM. All transactions will be processed after maintenance.",
      date: "2024-01-14 18:45:15",
      status: "Sent"
    },
    {
      id: 3,
      message: "New payment method added: Zenith Bank. You can now receive payments through our Zenith account.",
      date: "2024-01-13 14:20:30",
      status: "Sent"
    }
  ];

  const handleSendBroadcast = async () => {
    if (!message.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message to broadcast.",
        className: "bg-warning text-warning-foreground"
      });
      return;
    }

    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setMessage("");
      toast({
        title: "Broadcast Sent",
        description: "Your message has been sent to all customers successfully.",
        className: "bg-success text-success-foreground"
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link to="/settings">
            <Button variant="outline" size="sm" className="border-border">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Settings
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Broadcast Messages</h1>
            <p className="text-muted-foreground">Send messages to all your customers</p>
          </div>
        </div>

        {/* Send Broadcast */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Send className="h-5 w-5" />
              <span>Send Broadcast Message</span>
            </CardTitle>
            <CardDescription>
              Send a message to all your customers. This will be visible to them when they interact with your services.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Type your broadcast message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="bg-background border-border resize-none"
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {message.length}/500 characters
              </p>
              <Button 
                onClick={handleSendBroadcast}
                disabled={isSending || !message.trim()}
                className="bg-gradient-primary hover:opacity-90"
              >
                <Send className="h-4 w-4 mr-2" />
                {isSending ? "Sending..." : "Send Broadcast"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Broadcast History */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Broadcast History</span>
            </CardTitle>
            <CardDescription>
              View your previously sent broadcast messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            {broadcastHistory.length > 0 ? (
              <div className="space-y-4">
                {broadcastHistory.map((broadcast) => (
                  <div key={broadcast.id} className="border border-border rounded-lg p-4 bg-secondary/20">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{broadcast.date}</span>
                      </div>
                      <Badge className="bg-success/20 text-success">
                        {broadcast.status}
                      </Badge>
                    </div>
                    <p className="text-sm mb-3">{broadcast.message}</p>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                ))}
                
                {/* Pagination would go here for real implementation */}
                <div className="flex justify-center pt-4">
                  <Button variant="outline" size="sm" className="border-border">
                    Load More Messages
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No broadcast messages sent yet</p>
                <p className="text-sm">Send your first broadcast message above</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BroadcastMessages;