"use client";

import { useState } from "react";
import { toast } from "sonner";
import FormSection from "@/meeting/FormSection";
import ScriptDisplay from "@/meeting/ScriptDisplay";

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
        body: JSON.stringify({ topic, technical, challenging, detailed, budget }),
      });

      if (!response.ok) throw new Error("Failed to generate script");

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
            Generate realistic meeting scripts to practice your communication skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSection
            topic={topic}
            setTopic={setTopic}
            technical={technical}
            setTechnical={setTechnical}
            challenging={challenging}
            setChallenging={setChallenging}
            detailed={detailed}
            setDetailed={setDetailed}
            budget={budget}
            setBudget={setBudget}
            loading={loading}
            generateScript={generateScript}
          />
          <ScriptDisplay script={script} />
        </div>
      </div>
    </main>
  );
}
