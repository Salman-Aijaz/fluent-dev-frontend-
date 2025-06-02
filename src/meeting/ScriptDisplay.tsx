"use client";
import ScriptSkeleton from "@/Component/ScriptSkeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import jsPDF from "jspdf";
import { MessageSquare, Download, Play, Square } from "lucide-react";
import { useRef, useState } from "react";
import { generateMeetingScriptPDF } from "@/utils/pdfUtils";
import { speakScript, stopSpeaking } from "@/utils/voiceUtils";

interface Props {
  script: string;
  loading: boolean;
}

export default function ScriptDisplay({ script, loading }: Props) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const scriptRef = useRef<HTMLDivElement>(null);

const downloadPDF = async () => {
  if (!script) return;
  setIsGeneratingPDF(true);
  try {
    await generateMeetingScriptPDF(script);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  } finally {
    setIsGeneratingPDF(false);
  }
};

const handleSpeak = () => {
  speakScript(script, 
    () => setIsSpeaking(true), 
    () => setIsSpeaking(false), 
    () => setIsSpeaking(false)
  );
};

const handleStop = () => {
  stopSpeaking();
  setIsSpeaking(false);
};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meeting Script</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Practice your communication by role-playing as the developer
        </p>

        {loading ? (
          <ScriptSkeleton />
        ) : script ? (
          <>
            <div 
              ref={scriptRef}
              className="bg-gray-50 border border-gray-200 p-4 rounded-md overflow-y-auto max-h-[500px] whitespace-pre-wrap text-sm leading-relaxed"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                backgroundColor: '#f9fafb',
                color: '#374151'
              }}
            >
              {script}
            </div>
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={isSpeaking ? handleStop : handleSpeak}
                disabled={!script}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
              >
                {isSpeaking ? (
                  <>
                    <Square className="h-4 w-4" />
                    Stop Voice
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Play Voice
                  </>
                )}
              </button>
              
              <button 
                onClick={downloadPDF} 
                disabled={!script || isGeneratingPDF}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
              >
                <Download className="h-4 w-4" />
                {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] bg-gray-50 rounded-md p-6 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <MessageSquare className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              No Script Generated Yet
            </h3>
            <p className="text-gray-500">
              Enter a topic on the left and click "Generate Script" to create a
              meeting conversation between you and a client.
            </p>
          </div>
          
        )}
      </CardContent>
    </Card>
  );
}