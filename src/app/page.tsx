"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [technical, setTechnical] = useState(false);
  const [challenging, setChallenging] = useState(false);
  const [detailed, setDetailed] = useState(false);
  const [budget, setBudget] = useState(false);
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);

  const generateScript = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!topic.trim()) {
      toast.error("Please enter a meeting topic");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/generate-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          technical,
          challenging,
          detailed,
          budget,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate script");
      }

      const data = await response.json();
      setScript(data.script);
    } catch (error) {
      toast.error("Failed to generate script. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Meeting Script Agent</h1>
          <p className="text-muted-foreground">
            Generate realistic meeting scripts to practice your communication
            skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Script</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Enter a topic and the agent will create a meeting script where
                you play the developer and the AI plays the client.
              </p>

              <form onSubmit={generateScript} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">Meeting Topic</Label>
                  <Textarea
                    id="topic"
                    placeholder="e.g., E-commerce website development, Mobile app design consultation, Website redesign project..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Additional Options</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="technical"
                        checked={technical}
                        onCheckedChange={(checked) =>
                          setTechnical(checked === true)
                        }
                      />
                      <Label htmlFor="technical" className="cursor-pointer">
                        Technical Client
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="challenging"
                        checked={challenging}
                        onCheckedChange={(checked) =>
                          setChallenging(checked === true)
                        }
                      />
                      <Label htmlFor="challenging" className="cursor-pointer">
                        Challenging Client
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="detailed"
                        checked={detailed}
                        onCheckedChange={(checked) =>
                          setDetailed(checked === true)
                        }
                      />
                      <Label htmlFor="detailed" className="cursor-pointer">
                        Detailed Responses
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="budget"
                        checked={budget}
                        onCheckedChange={(checked) =>
                          setBudget(checked === true)
                        }
                      />
                      <Label htmlFor="budget" className="cursor-pointer">
                        Include Budget Talk
                      </Label>
                    </div>
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

          <Card>
            <CardHeader>
              <CardTitle>Meeting Script</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Practice your communication by role-playing as the developer
              </p>

              {script ? (
                <div className="bg-muted p-4 rounded-md overflow-y-auto max-h-[500px] whitespace-pre-wrap">
                  {script}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] bg-muted rounded-md p-6 text-center">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <MessageSquare className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No Script Generated Yet
                  </h3>
                  <p className="text-muted-foreground">
                    Enter a topic on the left and click "Generate Script" to
                    create a meeting conversation between you (as the developer)
                    and a client.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
