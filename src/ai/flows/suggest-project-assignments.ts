
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProjectAssignmentsInputSchema = z.object({
  employeeFeedback: z
    .string()
    .describe('The feedback given to the employee.'),
  employeeRole: z.string().describe('The current role of the employee.'),
});
export type SuggestProjectAssignmentsInput = z.infer<typeof SuggestProjectAssignmentsInputSchema>;

const SuggestProjectAssignmentsOutputSchema = z.object({
  skillSummary: z
    .string()
    .describe('A summary of the key skills shown in the employee feedback, ranked in order of importance.'),
  suggestedProjects: z
    .array(z.string())
    .describe('A list of suggested project assignments based on the employee skills and role.'),
});
export type SuggestProjectAssignmentsOutput = z.infer<typeof SuggestProjectAssignmentsOutputSchema>;

export async function suggestProjectAssignments(
  input: SuggestProjectAssignmentsInput
): Promise<SuggestProjectAssignmentsOutput> {
  return suggestProjectAssignmentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectAssignmentsPrompt',
  input: {schema: SuggestProjectAssignmentsInputSchema},
  output: {schema: SuggestProjectAssignmentsOutputSchema},
  prompt: `You are an AI assistant helping managers suggest project assignments for their team members.

  Analyze the employee feedback provided and summarize the key skills demonstrated by the employee. Rank these skills in order of relevance and importance based on how often they are mentioned or implied.

  Based on the skill summary and the employee's current role, suggest a list of project assignments that would be a good fit for the employee.

  Employee Role: {{{employeeRole}}}
  Employee Feedback: {{{employeeFeedback}}}

  Output the skill summary and suggested project assignments in the following JSON format:
  {{$instructions}}`,
});

const suggestProjectAssignmentsFlow = ai.defineFlow(
  {
    name: 'suggestProjectAssignmentsFlow',
    inputSchema: SuggestProjectAssignmentsInputSchema,
    outputSchema: SuggestProjectAssignmentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
