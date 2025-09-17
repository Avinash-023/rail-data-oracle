import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, FileText, Zap, History, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  sources?: Array<{
    title: string;
    type: string;
    confidence: number;
  }>;
}

const suggestedQueries = [
  "Show me all safety reports from last month",
  "What are the pending invoice approvals?",
  "Find maintenance schedules for Blue Line",
  "Summary of HR policy updates",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateMockResponse(content),
        role: "assistant",
        timestamp: new Date(),
        sources: [
          { title: "Safety Report Q4 2024", type: "PDF", confidence: 0.95 },
          { title: "Maintenance Schedule", type: "Excel", confidence: 0.87 },
        ],
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateMockResponse = (query: string) => {
    if (query.toLowerCase().includes("safety")) {
      return "Based on the latest safety reports, I found 3 incidents reported in December 2024. The most critical was a minor electrical fault at Aluva station on Dec 15th, which was resolved within 2 hours. All incidents have been properly documented and corrective actions implemented.";
    }
    if (query.toLowerCase().includes("invoice")) {
      return "There are currently 7 pending invoice approvals totaling ₹2.4 crores. 4 invoices are from maintenance vendors, 2 from IT services, and 1 from security services. The oldest pending invoice is from Nov 28th.";
    }
    return "I've analyzed the relevant documents and found several key insights. The information has been extracted from our latest document processing pipeline using advanced AI models. Would you like me to provide more specific details on any particular aspect?";
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <Card className="flex-1 flex flex-col shadow-kmrl-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            KMRL AI Assistant
            <Badge variant="secondary" className="ml-2">
              <Zap className="w-3 h-3 mr-1" />
              LLaMA2 Powered
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Ask questions about documents, get summaries, and find information across your document repository.
          </p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-4 p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-md">
                  <Bot className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Welcome to KMRL AI Assistant</h3>
                  <p className="text-muted-foreground mb-6">
                    I can help you find information, summarize documents, and answer questions about your repository.
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium flex items-center gap-2 justify-center">
                      <Lightbulb className="w-4 h-4" />
                      Try asking:
                    </p>
                    {suggestedQueries.map((query, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSend(query)}
                        className="text-left justify-start w-full text-xs"
                      >
                        "{query}"
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    
                    {message.sources && (
                      <div className="mt-2 pt-2 border-t border-border/20">
                        <p className="text-xs opacity-80 mb-1">Sources:</p>
                        <div className="space-y-1">
                          {message.sources.map((source, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                              <FileText className="w-3 h-3" />
                              <span>{source.title}</span>
                              <Badge variant="outline" className="text-xs">
                                {Math.round(source.confidence * 100)}%
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-secondary-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="px-6 pb-6">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about documents, request summaries..."
                onKeyPress={(e) => e.key === "Enter" && handleSend(input)}
                className="flex-1"
              />
              <Button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isTyping}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}