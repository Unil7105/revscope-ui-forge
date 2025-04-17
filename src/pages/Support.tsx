
import React, { useState } from "react";
import { LifeBuoy, Search, Mail, Phone, MessageSquare, HelpCircle, ExternalLink, ThumbsUp, ThumbsDown } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

const Support: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("faq");
  
  // Sample FAQ data
  const faqItems: FaqItem[] = [
    {
      id: "faq-1",
      question: "How do I create a new sales pipeline?",
      answer: "To create a new sales pipeline, navigate to the Pipelines page and click the 'New Pipeline' button in the top right corner. Fill out the required information in the form and click 'Create Pipeline' to set up your new pipeline structure.",
      category: "Sales"
    },
    {
      id: "faq-2",
      question: "Can I customize my dashboard widgets?",
      answer: "Yes, you can customize your dashboard widgets. Click the 'Customize' button in the top right corner of your dashboard. From there, you can add, remove, and rearrange widgets according to your preferences. Click 'Save Layout' when you're finished to apply your changes.",
      category: "Dashboard"
    },
    {
      id: "faq-3",
      question: "How do I export my reports?",
      answer: "To export a report, navigate to the Reports page and open the report you want to export. Click the 'Export' button in the top right corner of the report view. Select your preferred format (PDF, CSV, Excel) and click 'Export' to download the file.",
      category: "Reports"
    },
    {
      id: "faq-4",
      question: "How can I invite team members to my account?",
      answer: "To invite team members, go to Settings > Team Members and click the 'Invite Team Member' button. Enter the email addresses of the people you want to invite, assign appropriate roles and permissions, then click 'Send Invitations'. They will receive an email with instructions to join your account.",
      category: "Account"
    },
    {
      id: "faq-5",
      question: "What's the difference between leads and opportunities?",
      answer: "Leads are potential customers who have shown interest but haven't been qualified yet. Opportunities (or deals) are qualified leads that have a higher probability of becoming customers. When a lead meets your qualification criteria, you can convert them to an opportunity and start tracking them through your sales pipeline.",
      category: "Sales"
    },
    {
      id: "faq-6",
      question: "How do I set up automated alerts?",
      answer: "To set up automated alerts, go to the Alerts page and click 'Create Alert'. Choose the type of alert (e.g., performance threshold, activity reminder), set your conditions, specify who should receive the alert, and set the delivery method (email, in-app, or both). Click 'Save Alert' to activate it.",
      category: "Alerts"
    },
    {
      id: "faq-7",
      question: "Can I change my subscription plan?",
      answer: "Yes, you can change your subscription plan at any time. Go to Settings > Billing and click 'Change Plan'. You'll see available options with their features and pricing. Select the plan that best fits your needs and follow the prompts to complete the change. Upgrades take effect immediately, while downgrades apply at the end of your current billing cycle.",
      category: "Billing"
    },
    {
      id: "faq-8",
      question: "How secure is my data?",
      answer: "We take data security very seriously. Your data is encrypted both in transit and at rest using industry-standard encryption protocols. We implement robust access controls, regular security audits, and compliance with major security frameworks. For more details, please refer to our Security page or contact our security team.",
      category: "Security"
    },
  ];

  // Filter FAQs based on search query
  const filteredFaqs = searchQuery.trim() === "" 
    ? faqItems 
    : faqItems.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support request submitted",
      description: "We'll get back to you within 24 hours.",
    });
  };

  // Handle FAQ feedback
  const handleFeedback = (helpful: boolean) => {
    toast({
      title: helpful ? "Thank you for your feedback!" : "We'll improve this answer",
      description: helpful 
        ? "We're glad this was helpful to you." 
        : "Thank you for helping us improve our support content.",
    });
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Support Center</h1>
          <p className="text-gray-600">Find answers and get help with RevScope</p>
        </div>
        <Button className="gap-1">
          <MessageSquare size={16} />
          Contact Support
        </Button>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input 
            placeholder="Search for help, articles, and FAQs..." 
            className="pl-10 h-12 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="faq" onValueChange={setActiveTab} value={activeTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
          <TabsTrigger value="resources">Knowledge Base</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about RevScope</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq) => (
                    <AccordionItem value={faq.id} key={faq.id}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          {faq.question}
                          <Badge variant="outline" className="ml-2 text-xs">
                            {faq.category}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pb-2">
                          {faq.answer}
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t mt-2">
                          <div className="text-sm text-gray-500">Was this helpful?</div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleFeedback(true)}
                            >
                              <ThumbsUp size={14} />
                              Yes
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleFeedback(false)}
                            >
                              <ThumbsDown size={14} />
                              No
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8">
                  <HelpCircle className="mx-auto mb-3 text-gray-400" size={48} />
                  <h3 className="text-lg font-medium mb-1">No results found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search or browse the categories below</p>
                  <Button>Contact Support</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Get help via email</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4 text-gray-600">Response time: Within 24 hours</p>
                <Button variant="outline" className="w-full">
                  support@revscope.com
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <Phone className="text-green-600" size={24} />
                </div>
                <CardTitle>Phone Support</CardTitle>
                <CardDescription>Talk to a representative</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4 text-gray-600">Available Mon-Fri, 9am-5pm ET</p>
                <Button variant="outline" className="w-full">
                  +1 (888) 555-1234
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <MessageSquare className="text-purple-600" size={24} />
                </div>
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>Chat with our support team</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4 text-gray-600">Available 24/7 for Premium users</p>
                <Button className="w-full">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
              <CardDescription>Send us a message and we'll get back to you</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Your email" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="How can we help you?" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea 
                    id="message"
                    rows={5}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Please describe your issue in detail..."
                    required
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="gap-1">
                    <Mail size={16} />
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LifeBuoy size={20} />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                      Introduction to RevScope
                      <ExternalLink size={14} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                      Setting Up Your Account
                      <ExternalLink size={14} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                      Dashboard Customization
                      <ExternalLink size={14} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                      User Permissions Guide
                      <ExternalLink size={14} />
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target size={20} />
                  Sales & Pipelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                      Creating Custom Pipelines
                      <ExternalLink size={14} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                      Managing Deals Effectively
                      <ExternalLink size={14} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                      Sales Analytics & Reporting
                      <ExternalLink size={14} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                      Pipeline Best Practices
                      <ExternalLink size={14} />
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={20} />
                  Reports & Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                      Creating Custom Reports
                      <ExternalLink size={14} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                      Data Visualization Guide
                      <ExternalLink size={14} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                      Scheduled Reports Setup
                      <ExternalLink size={14} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                      Advanced Analytics Features
                      <ExternalLink size={14} />
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>Learn visually with our step-by-step video guides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 aspect-video flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                        <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-indigo-600 ml-1"></div>
                      </div>
                    </div>
                    <img 
                      src="https://placehold.co/600x400/f3f4f6/a3a3a3?text=Dashboard+Tutorial" 
                      alt="Dashboard Tutorial" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Dashboard Overview</h3>
                    <p className="text-sm text-gray-500">Learn how to customize and use your dashboard efficiently</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span>6:45</span>
                      <span>•</span>
                      <span>264 views</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 aspect-video flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                        <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-indigo-600 ml-1"></div>
                      </div>
                    </div>
                    <img 
                      src="https://placehold.co/600x400/f3f4f6/a3a3a3?text=Pipeline+Tutorial" 
                      alt="Pipeline Tutorial" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Sales Pipeline Mastery</h3>
                    <p className="text-sm text-gray-500">Create and manage effective sales pipelines</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span>8:12</span>
                      <span>•</span>
                      <span>189 views</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="outline">View All Tutorials</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Support;
