"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  Download,
  Calendar,
  CheckCircle,
  Settings,
  User,
  TrendingUp,
  Zap,
  Clock,
  FileText,
  AlertCircle,
  Smartphone,
} from "lucide-react";

const BillingPage = ({
  user = {
    name: "John Doe",
    email: "john@company.com",
    customerId: "cus_razorpay_12345",
  },
  currentPlan = {
    name: "Pro",
    price: 499,
    currency: "₹",
    interval: "month",
    features: ["5,000 forms/month", "Priority support", "Advanced analytics"],
    status: "active",
  },
  usage = {
    current: 2847,
    limit: 5000,
    percentage: 57,
  },
  paymentMethod = {
    type: "card",
    last4: "4242",
    brand: "visa",
    expiryMonth: 12,
    expiryYear: 2028,
  },
  billingInfo = {
    nextBillingDate: "2024-08-24",
    status: "active",
    autoRenewal: true,
  },
  invoices = [
    {
      id: "inv_razorpay_001",
      razorpayInvoiceId: "inv_MfQOzgeK8E9XYz",
      date: "2024-07-01",
      amount: 499,
      currency: "₹",
      status: "paid",
      period: "July 2024",
      downloadUrl: "/api/invoices/download/inv_001",
    },
    {
      id: "inv_razorpay_002",
      razorpayInvoiceId: "inv_MfQOzgeK8E9XYa",
      date: "2024-06-01",
      amount: 499,
      currency: "₹",
      status: "paid",
      period: "June 2024",
      downloadUrl: "/api/invoices/download/inv_002",
    },
    {
      id: "inv_razorpay_003",
      razorpayInvoiceId: "inv_MfQOzgeK8E9XYb",
      date: "2024-05-01",
      amount: 499,
      currency: "₹",
      status: "paid",
      period: "May 2024",
      downloadUrl: "/api/invoices/download/inv_003",
    },
  ],
}) => {
  const [activeTab, setActiveTab] = useState("payment");

  // Razorpay checkout handler
  const handleCheckout = async () => {
    console.log("Initiating Razorpay checkout for plan:", currentPlan.name);
    // Integration point for Razorpay
    // const options = {
    //   key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    //   amount: currentPlan.price * 100, // amount in paise
    //   currency: 'INR',
    //   name: 'AutoForm Filler AI',
    //   description: `${currentPlan.name} Plan Subscription`,
    //   handler: function(response) {
    //     // Handle successful payment
    //   },
    //   prefill: {
    //     name: user.name,
    //     email: user.email
    //   }
    // };
    // const rzp = new window.Razorpay(options);
    // rzp.open();
  };

  const handleDownloadInvoice = async (invoice: any) => {
    console.log("Downloading invoice:", invoice.id);
    // Integration point for invoice download
    // window.open(invoice.downloadUrl, '_blank');
  };

  const handleUpdatePaymentMethod = () => {
    console.log("Opening payment method update modal");
    // Integration point for updating payment method via Razorpay
  };

  const getStatusBadge = (status: any) => {
    const statusConfig = {
      active: {
        variant: "default",
        className: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
      },
      paid: {
        variant: "default",
        className: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
      },
      pending: {
        variant: "default",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
      },
      failed: {
        variant: "destructive",
        className: "bg-red-100 text-red-800 border-red-200",
        icon: AlertCircle,
      },
    };

    const config = statusConfig[status] || statusConfig.active;
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-zinc-900">
            Billing & Subscription
          </h1>
          <p className="text-zinc-600">
            Manage your AutoForm Filler AI subscription and billing information
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Plan Card */}
            <Card className="border-zinc-200 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-zinc-900 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-zinc-700" />
                      Current Plan
                    </CardTitle>
                    <CardDescription className="text-zinc-600">
                      Your active subscription details
                    </CardDescription>
                  </div>
                  {getStatusBadge(currentPlan.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Plan Details */}
                <div className="flex items-center justify-between p-6 bg-zinc-100 rounded-2xl">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-zinc-900">
                      {currentPlan.name} Plan
                    </h3>
                    <p className="text-lg font-semibold text-zinc-700">
                      {currentPlan.currency}
                      {currentPlan.price}/{currentPlan.interval}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {currentPlan.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-zinc-200 text-zinc-700"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="bg-zinc-900 hover:bg-zinc-800 text-white"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Subscription
                  </Button>
                </div>

                {/* Usage Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-zinc-700 font-medium">
                      Monthly Usage
                    </Label>
                    <span className="text-sm font-semibold text-zinc-900">
                      {usage.current.toLocaleString()} /{" "}
                      {usage.limit.toLocaleString()} forms
                    </span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-3">
                    <div
                      className="bg-zinc-900 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${usage.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-zinc-500">
                    {usage.percentage}% of monthly limit used • Resets on{" "}
                    {formatDate(billingInfo.nextBillingDate)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method & Billing History Tabs */}
            <Card className="border-zinc-200 shadow-sm rounded-2xl">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <CardHeader className="pb-2">
                  <TabsList className="grid w-full grid-cols-2 bg-zinc-100 rounded-xl">
                    <TabsTrigger
                      value="payment"
                      className="data-[state=active]:bg-white rounded-lg"
                    >
                      Payment Method
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="data-[state=active]:bg-white rounded-lg"
                    >
                      Billing History
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent className="pt-4">
                  {/* Payment Method Tab */}
                  <TabsContent value="payment" className="space-y-4 mt-0">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 border border-zinc-200 rounded-2xl bg-white hover:bg-zinc-50 transition-colors">
                        <div className="p-3 bg-zinc-100 rounded-xl">
                          {paymentMethod.type === "card" ? (
                            <CreditCard className="h-5 w-5 text-zinc-700" />
                          ) : (
                            <Smartphone className="h-5 w-5 text-zinc-700" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-zinc-900">
                            {paymentMethod.type === "card"
                              ? `•••• •••• •••• ${paymentMethod.last4}`
                              : "UPI Payment"}
                          </p>
                          <p className="text-sm text-zinc-600">
                            {paymentMethod.type === "card"
                              ? `${paymentMethod.brand.toUpperCase()} • Expires ${
                                  paymentMethod.expiryMonth
                                }/${paymentMethod.expiryYear}`
                              : "Connected via Razorpay"}
                          </p>
                        </div>
                        {getStatusBadge("active")}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-zinc-300 hover:bg-zinc-50 rounded-xl"
                        onClick={handleUpdatePaymentMethod}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Update Payment Method
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Billing History Tab */}
                  <TabsContent value="history" className="space-y-4 mt-0">
                    <div className="rounded-2xl border border-zinc-200 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-zinc-50">
                            <TableHead className="font-semibold text-zinc-700">
                              Invoice
                            </TableHead>
                            <TableHead className="font-semibold text-zinc-700">
                              Period
                            </TableHead>
                            <TableHead className="font-semibold text-zinc-700">
                              Amount
                            </TableHead>
                            <TableHead className="font-semibold text-zinc-700">
                              Status
                            </TableHead>
                            <TableHead className="font-semibold text-zinc-700">
                              Action
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invoices.map((invoice) => (
                            <TableRow
                              key={invoice.id}
                              className="hover:bg-zinc-50"
                            >
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-zinc-500" />
                                  <span className="font-mono text-sm">
                                    {invoice.id}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium text-zinc-900">
                                    {invoice.period}
                                  </p>
                                  <p className="text-sm text-zinc-500">
                                    {formatDate(invoice.date)}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell className="font-semibold">
                                {invoice.currency}
                                {invoice.amount}
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(invoice.status)}
                              </TableCell>
                              <TableCell>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="hover:bg-zinc-100 rounded-lg"
                                  onClick={() => handleDownloadInvoice(invoice)}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Column - Billing Summary */}
          <div className="space-y-6">
            {/* Billing Summary Card */}
            <Card className="border-zinc-200 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-zinc-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-zinc-700" />
                  Billing Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600">Current Plan</span>
                    <Badge
                      variant="secondary"
                      className="bg-zinc-900 text-white"
                    >
                      {currentPlan.name}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600">Monthly Cost</span>
                    <span className="font-bold text-zinc-900">
                      {currentPlan.currency}
                      {currentPlan.price}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600">Next Billing</span>
                    <span className="font-semibold text-zinc-900">
                      {formatDate(billingInfo.nextBillingDate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600">Auto-Renewal</span>
                    {getStatusBadge(
                      billingInfo.autoRenewal ? "active" : "pending"
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-200 bg-zinc-50 -mx-6 px-6 py-4 rounded-b-2xl">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-zinc-900">
                      Next Payment
                    </span>
                    <span className="text-2xl font-bold text-zinc-900">
                      {currentPlan.currency}
                      {currentPlan.price}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">
                    Auto-charged on {formatDate(billingInfo.nextBillingDate)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Account Information Card */}
            <Card className="border-zinc-200 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-zinc-900 flex items-center gap-2">
                  <User className="h-5 w-5 text-zinc-700" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-zinc-700 font-medium">
                      Account Holder
                    </Label>
                    <p className="text-sm font-semibold text-zinc-900 mt-1">
                      {user.name}
                    </p>
                  </div>

                  <div>
                    <Label className="text-zinc-700 font-medium">Email</Label>
                    <p className="text-sm text-zinc-900 mt-1">{user.email}</p>
                  </div>

                  <div>
                    <Label className="text-zinc-700 font-medium">
                      Customer ID
                    </Label>
                    <p className="text-sm text-zinc-600 font-mono mt-1">
                      {user.customerId}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
