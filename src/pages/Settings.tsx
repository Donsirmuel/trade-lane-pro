import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User, DollarSign, Building2, Coins, Moon, Sun, Edit, Plus, Trash2, ArrowRight, Settings as SettingsIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState("");
  const [userName, setUserName] = useState("Alex Thompson");
  const [currency, setCurrency] = useState("naira");
  const [theme, setTheme] = useState("dark");

  // Mock bank accounts
  const [bankAccounts, setBankAccounts] = useState([
    { id: 1, accountNumber: "0123456789", bankName: "GTBank", accountName: "Vendora Trading Ltd", instructions: "Send payment with reference number" },
    { id: 2, accountNumber: "9876543210", bankName: "Access Bank", accountName: "Alex Thompson", instructions: "Personal account for small transactions" }
  ]);

  // Mock cryptocurrencies
  const [cryptocurrencies, setCryptocurrencies] = useState([
    { id: 1, name: "Bitcoin", symbol: "BTC", buyingRate: "47,500", sellingRate: "47,000", contractAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
    { id: 2, name: "Ethereum", symbol: "ETH", buyingRate: "2,600", sellingRate: "2,580", contractAddress: "0x742d35Cc6e5f3e1234567890abcdef1234567890" },
    { id: 3, name: "Tether", symbol: "USDT", buyingRate: "1.00", sellingRate: "0.99", contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7" }
  ]);

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
      className: "bg-success text-success-foreground"
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate image upload
      setProfileImage(URL.createObjectURL(file));
      toast({
        title: "Image Uploaded",
        description: "Profile image updated successfully.",
        className: "bg-success text-success-foreground"
      });
    }
  };

  const getCurrencySymbol = (curr: string) => {
    return "₦";
  };

  return (
    <Layout title="Settings">
      <div className="space-y-8">
        
        {/* Profile Settings */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Settings</span>
            </CardTitle>
            <CardDescription>Manage your personal information and profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="profile-image">Profile Image / Logo</Label>
                  <div className="flex items-center space-x-4">
                    {profileImage && (
                      <img src={profileImage} alt="Profile" className="w-16 h-16 rounded-lg object-cover" />
                    )}
                    <Input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="bg-background border-border"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Currency Settings */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Currency Settings</span>
            </CardTitle>
            <CardDescription>Set your preferred display currency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-xs">
              <Label htmlFor="currency">Display Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="naira">Nigerian Naira (₦)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bank Account Details */}
        <Card className="bg-gradient-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Bank Account Details</span>
              </CardTitle>
              <CardDescription>Configure your bank accounts for receiving payments</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-border">
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bankAccounts.map((account) => (
                <div key={account.id} className="p-4 border border-border rounded-lg bg-secondary/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Account Number</p>
                      <p className="font-medium">{account.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bank Name</p>
                      <p className="font-medium">{account.bankName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Account Name</p>
                      <p className="font-medium">{account.accountName}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="border-border">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="border-border text-destructive hover:text-destructive">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground">Instructions</p>
                    <p className="text-sm">{account.instructions}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cryptocurrency Settings */}
        <Card className="bg-gradient-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Coins className="h-5 w-5" />
                <span>Supported Cryptocurrencies</span>
              </CardTitle>
              <CardDescription>Manage your supported cryptocurrencies and rates</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-border">
              <Plus className="h-4 w-4 mr-2" />
              Add Crypto
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Cryptocurrency</TableHead>
                    <TableHead>Buying Rate</TableHead>
                    <TableHead>Selling Rate</TableHead>
                    <TableHead>Contract Address</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cryptocurrencies.map((crypto) => (
                    <TableRow key={crypto.id} className="border-border">
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-primary/20 text-primary">{crypto.symbol}</Badge>
                          <span className="font-medium">{crypto.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-crypto-green">
                        {getCurrencySymbol(currency)}{crypto.buyingRate}
                      </TableCell>
                      <TableCell className="font-medium text-crypto-red">
                        {getCurrencySymbol(currency)}{crypto.sellingRate}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {crypto.contractAddress.substring(0, 20)}...
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="border-border">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-border text-destructive hover:text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <span>Theme Settings</span>
            </CardTitle>
            <CardDescription>Choose your preferred application theme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="flex items-center space-x-2"
                >
                  <Moon className="h-4 w-4" />
                  <span>Dark Mode</span>
                </Button>
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className="flex items-center space-x-2 border-border"
                >
                  <Sun className="h-4 w-4" />
                  <span>Light Mode</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Availability & Broadcast Messages */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SettingsIcon className="h-5 w-5" />
              <span>Vendor Management</span>
            </CardTitle>
            <CardDescription>Manage your availability and customer communications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button asChild variant="ghost" className="justify-start h-auto p-4 mb-2">
                <Link to="/availability">
                  <div>
                    <p className="font-medium">Set Availability</p>
                    <p className="text-sm text-muted-foreground">Manage when you're available for orders</p>
                  </div>
                </Link>
              </Button>
              
              <Button asChild variant="ghost" className="justify-start h-auto p-4">
                <Link to="/broadcast-messages">
                  <div>
                    <p className="font-medium">Broadcast Messages</p>
                    <p className="text-sm text-muted-foreground">Send messages to all your customers</p>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-gradient-primary hover:opacity-90">
            Save All Settings
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;