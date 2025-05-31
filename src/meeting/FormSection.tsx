import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import OptionsCheckbox from "./OptionsCheckbox";

interface Props {
  topic: string;
  setTopic: (value: string) => void;
  technical: boolean;
  setTechnical: (value: boolean) => void;
  challenging: boolean;
  setChallenging: (value: boolean) => void;
  detailed: boolean;
  setDetailed: (value: boolean) => void;
  budget: boolean;
  setBudget: (value: boolean) => void;
  friendly: boolean;
  setFriendly: (value: boolean) => void;
  formal: boolean;
  setFormal: (value: boolean) => void;
  loading: boolean;
  generateScript: (e: FormEvent) => void;
}

export default function FormSection({
  topic,
  setTopic,
  technical,
  setTechnical,
  challenging,
  setChallenging,
  detailed,
  setDetailed,
  budget,
  setBudget,
  friendly,
  setFriendly,
  formal,
  setFormal,
  loading,
  generateScript,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate New Script</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Enter a topic and the agent will create a meeting script where you
          play the developer and the AI plays the client.
        </p>

        <form onSubmit={generateScript} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic">Meeting Topic</Label>
            <Textarea
              id="topic"
              placeholder="e.g., E-commerce website development..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Additional Options</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <OptionsCheckbox
                id="technical"
                label="Technical Client"
                checked={technical}
                onCheckedChange={setTechnical}
              />
              <OptionsCheckbox
                id="challenging"
                label="Challenging Client"
                checked={challenging}
                onCheckedChange={setChallenging}
              />
              <OptionsCheckbox
                id="detailed"
                label="Detailed Responses"
                checked={detailed}
                onCheckedChange={setDetailed}
              />
              <OptionsCheckbox
                id="budget"
                label="Include Budget Talk"
                checked={budget}
                onCheckedChange={setBudget}
              />
              <OptionsCheckbox
                id="friendly"
                label="Friendly Client"
                checked={friendly}
                onCheckedChange={setFriendly}
              />
              <OptionsCheckbox
                id="formal"
                label="Formal Tone"
                checked={formal}
                onCheckedChange={setFormal}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2"
            disabled={loading}
          >
            <MessageSquare className="h-4 w-4" />
            {loading ? "Generating Script..." : "Generate Script"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
