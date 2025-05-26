"use client"

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { DepartmentBookmarkSummary } from '@/lib/types';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

interface BookmarkTrendsChartProps {
  data: DepartmentBookmarkSummary[];
}

const COLORS = [
  'hsl(var(--chart-1))', 
  'hsl(var(--chart-2))', 
  'hsl(var(--chart-3))', 
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(var(--secondary))',
];

const chartConfig = {
  bookmarkCount: {
    label: "Bookmarks",
  },
  // Additional keys for departments can be added if needed for more specific tooltip styling
  // For now, this basic config is to satisfy ChartContainer
} satisfies ChartConfig;

export function BookmarkTrendsChart({ data }: BookmarkTrendsChartProps) {
   if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bookmark Trends</CardTitle>
          <CardDescription>Number of bookmarked employees by department.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">No bookmark data available.</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookmark Trends</CardTitle>
        <CardDescription>Number of bookmarked employees by department.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="bookmarkCount"
                nameKey="department"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, department }) => {
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                  return (
                    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltipContent indicator="dot" nameKey="department" />} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
