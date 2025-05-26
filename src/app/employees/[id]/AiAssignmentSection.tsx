
"use client";

import { useState } from 'react';
import type { User } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2, Lightbulb, ListChecks } from 'lucide-react';
import { getAISuggestions } from './actions'; // Server Action
import type { SuggestProjectAssignmentsOutput } from '@/ai/flows/suggest-project-assignments';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface AiAssignmentSectionProps {
  employee: User;
}

export function AiAssignmentSection({ employee }: AiAssignmentSectionProps) {
  const [feedbackText, setFeedbackText] = useState(employee.feedback || '');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<SuggestProjectAssignmentsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!feedbackText.trim()) {
      toast({
        title: "Feedback Required",
        description: "Please provide employee feedback to get AI suggestions.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setError(null);
    setAiResult(null);
    try {
      const result = await getAISuggestions({
        employeeFeedback: feedbackText,
        employeeRole: employee.company.title,
      });
      setAiResult(result);
      toast({
        title: "AI Suggestions Generated",
        description: "Project assignments and skill summary are now available.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      toast({
        title: "Error Generating Suggestions",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Powered Project Assignment</CardTitle>
        <CardDescription>
          Analyze employee feedback to summarize key skills and suggest suitable project assignments.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="employeeFeedback">Employee Feedback</Label>
          <Textarea
            id="employeeFeedback"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Enter or paste employee feedback here..."
            rows={6}
            className="mt-1"
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Provide detailed feedback for best results. Role: {employee.company.title}.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Suggest Projects
            </>
          )}
        </Button>
      </CardFooter>

      {error && (
        <div className="p-6 pt-0">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {aiResult && (
        <div className="p-6 pt-0 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                Key Skill Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-line">{aiResult.skillSummary}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ListChecks className="w-5 h-5 mr-2 text-green-500" />
                Suggested Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              {aiResult.suggestedProjects.length > 0 ? (
                <ul className="space-y-2 list-disc list-inside">
                  {aiResult.suggestedProjects.map((project, index) => (
                    <li key={index} className="text-sm">{project}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No specific project suggestions generated based on the input.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  );
}
