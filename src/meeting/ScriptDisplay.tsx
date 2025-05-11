import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface Props {
  script: string;
}

export default function ScriptDisplay({ script }: Props) {
  return (
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
            <h3 className="text-lg font-medium mb-2">No Script Generated Yet</h3>
            <p className="text-muted-foreground">
              Enter a topic on the left and click "Generate Script" to create a meeting conversation between you and a client.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
