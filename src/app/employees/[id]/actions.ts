
'use server';

import { suggestProjectAssignments } from '@/ai/flows/suggest-project-assignments';
import type { SuggestProjectAssignmentsInput, SuggestProjectAssignmentsOutput } from '@/ai/flows/suggest-project-assignments';
import { ZodError } from 'zod';

// Helper to create a more user-friendly error message from ZodError
function formatZodError(error: ZodError): string {
  return error.errors.map(err => `${err.path.join('.')} - ${err.message}`).join('; ');
}

export async function getAISuggestions(input: SuggestProjectAssignmentsInput): Promise<SuggestProjectAssignmentsOutput> {
  try {
    // Optional: Add validation here if needed, though the flow should handle its own input schema
    // const validatedInput = SuggestProjectAssignmentsInputSchema.parse(input); // Example Zod validation
    const result = await suggestProjectAssignments(input);
    return result;
  } catch (error) {
    console.error("AI suggestion error:", error);
    if (error instanceof ZodError) {
      throw new Error(`Invalid input for AI suggestions: ${formatZodError(error)}`);
    }
    if (error instanceof Error) {
       throw new Error(error.message || "Failed to get AI suggestions due to an unexpected error.");
    }
    throw new Error("Failed to get AI suggestions due to an unknown error.");
  }
}
