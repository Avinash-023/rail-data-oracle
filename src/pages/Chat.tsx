import { ChatInterface } from "@/components/Chat/ChatInterface";

export default function Chat() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
        <p className="text-muted-foreground mt-1">
          Ask questions about your documents and get intelligent insights powered by LLaMA2
        </p>
      </div>

      {/* Chat Interface */}
      <ChatInterface />
    </div>
  );
}