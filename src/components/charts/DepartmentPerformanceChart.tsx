"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { DepartmentPerformance } from '@/lib/types';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

interface DepartmentPerformanceChartProps {
  data: DepartmentPerformance[];
}

const chartConfig = {
  averageRating: {
    label: "Avg. Rating",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function DepartmentPerformanceChart({ data }: DepartmentPerformanceChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>Average performance ratings by department.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">No performance data available.</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Performance</CardTitle>
        <CardDescription>Average performance ratings by department (Scale 1-5).</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}> {/* Adjusted left margin for YAxis labels */}
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="department" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                stroke="hsl(var(--border))"
                angle={-30}
                textAnchor="end"
                height={70} // Increased height for angled labels
                interval={0} // Show all labels
              />
              <YAxis 
                domain={[0, 5]} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                stroke="hsl(var(--border))"
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--accent))', opacity: 0.2 }}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="averageRating" name="Avg. Rating" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
