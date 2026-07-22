"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, Users, Sparkles } from "lucide-react";

export interface TripDetails {
  destination: string;
  startDate: string;
  endDate: string;
  budgetMin: number;
  budgetMax: number;
  travelers: number;
  interests: string[];
}

const INTEREST_OPTIONS = [
  "Beach & Relaxation",
  "Adventure & Outdoors",
  "Food & Dining",
  "History & Culture",
  "Nightlife",
  "Shopping",
  "Nature & Wildlife",
  "Art & Museums",
  "Sports",
  "Photography",
];

interface TripFormProps {
  onSubmit: (details: TripDetails) => void;
  isLoading: boolean;
}

export function TripForm({ onSubmit, isLoading }: TripFormProps) {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState([500, 3000]);
  const [travelers, setTravelers] = useState(1);
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      destination,
      startDate,
      endDate,
      budgetMin: budget[0],
      budgetMax: budget[1],
      travelers,
      interests,
    });
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="h-5 w-5 text-blue-400" />
          Plan Your Trip
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="destination" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Where to?
            </Label>
            <Input
              id="destination"
              placeholder="Paris, Tokyo, New York..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Start Date
              </Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                End Date
              </Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              Budget Range: ${budget[0].toLocaleString()} - ${budget[1].toLocaleString()}
            </Label>
            <Slider
              value={budget}
              onValueChange={(value) => setBudget(value as number[])}
              min={100}
              max={10000}
              step={100}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$100</span>
              <span>$10,000+</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelers" className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              Travelers
            </Label>
            <Input
              id="travelers"
              type="number"
              min={1}
              max={20}
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
            />
          </div>

          <div className="space-y-3">
            <Label>What are you into?</Label>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((interest) => (
                <Badge
                  key={interest}
                  variant={interests.includes(interest) ? "default" : "outline"}
                  className="cursor-pointer transition-colors hover:bg-primary/80"
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading || !destination || !startDate || !endDate}
          >
            {isLoading ? "Planning..." : "Plan My Trip"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
