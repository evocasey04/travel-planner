"use client";

import { useState, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { TripForm, type TripDetails } from "@/components/trip-form";
import { ChatPanel } from "@/components/chat-panel";
import { Plane } from "lucide-react";

export default function Home() {
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    []
  );

  const { messages, sendMessage, status } = useChat({ transport });

  const isLoading = status === "streaming" || status === "submitted";

  const handleTripSubmit = (details: TripDetails) => {
    setTripDetails(details);
    sendMessage(
      {
        text: `I'm planning a trip to ${details.destination} from ${details.startDate} to ${details.endDate}. My budget is $${details.budgetMin} - $${details.budgetMax} for ${details.travelers} traveler(s). ${
          details.interests.length > 0
            ? `I'm interested in: ${details.interests.join(", ")}.`
            : ""
        } Can you help me find flights, hotels, and suggest some activities I might enjoy? Please include booking links.`,
      },
      { body: { tripDetails: details } }
    );
  };

  const handleChatSubmit = (text: string) => {
    if (!text.trim()) return;
    sendMessage({ text });
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-blue-950/20">
      <header className="border-b border-border/50 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
            <Plane className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Travel Planner</h1>
            <p className="text-xs text-muted-foreground">
              AI-powered trip planning with real booking links
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 gap-6 p-6">
        <aside className="w-[420px] shrink-0">
          <TripForm onSubmit={handleTripSubmit} isLoading={isLoading} />
        </aside>
        <section className="flex flex-1 flex-col">
          <ChatPanel
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleChatSubmit}
          />
        </section>
      </main>
    </div>
  );
}
