'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Box, Button, TextInput } from '@tbergq/components';
import type { GetJournalEntriesForGraph } from '@/services/exercises/exercise-service';

type Props = {
  initialData: GetJournalEntriesForGraph;
  exerciseId: string;
  onDateFilterChange: (startDate: string, endDate: string) => void;
};

type GraphDataPoint = {
  date: string;
  weight: number;
  originalDate: Date;
  reps: string;
};

export default function ExerciseGraph({ initialData, exerciseId, onDateFilterChange }: Props) {
  const [startDate, setStartDate] = useState(() => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return sixMonthsAgo.toISOString().split('T')[0];
  });

  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const [errors, setErrors] = useState<string[]>([]);

  // Process journal entries into graph data using useMemo to prevent infinite re-renders
  const { graphData, processedErrors } = useMemo(() => {
    const validEntries: GraphDataPoint[] = [];
    const newErrors: string[] = [];

    initialData.journalEntries.forEach((entry, index) => {
      const weightNum = parseFloat(entry.weight);

      if (isNaN(weightNum)) {
        newErrors.push(`Entry ${index + 1}: Weight "${entry.weight}" is not a valid number`);
        return;
      }

      validEntries.push({
        date: new Date(entry.workout.date).toLocaleDateString(),
        weight: weightNum,
        originalDate: new Date(entry.workout.date),
        reps: entry.reps,
      });
    });

    // Sort by date to ensure proper line chart ordering
    const sortedEntries = validEntries.sort(
      (a, b) => a.originalDate.getTime() - b.originalDate.getTime(),
    );

    return {
      graphData: sortedEntries,
      processedErrors: newErrors,
    };
  }, [initialData.journalEntries]);

  // Update errors state when processed errors change
  useEffect(() => {
    setErrors(processedErrors);
  }, [processedErrors]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDateFilterChange(startDate, endDate);
  };

  const formatTooltip = (value: unknown, name: string): [string, string] => {
    if (name === 'weight') {
      return [`${value} lbs`, 'Weight'];
    }
    return [String(value), name];
  };

  const formatLabel = (label: string) => {
    return `Date: ${label}`;
  };

  if (!initialData.exercise) {
    return (
      <Box>
        <p>Exercise not found or you don&apos;t have access to it.</p>
      </Box>
    );
  }

  return (
    <Box display="flex" direction="column" gap={4}>
      <Box>
        <h1>{initialData.exercise.name} - Progress Graph</h1>
      </Box>

      {/* Date Filter Form */}
      <Box>
        <form onSubmit={handleFilterSubmit}>
          <Box display="flex" gap={3} alignItems="end">
            <TextInput
              label="Start Date"
              name="startDate"
              type="date"
              value={startDate}
              onChange={e => setStartDate((e.target as HTMLInputElement).value)}
            />
            <TextInput
              label="End Date"
              name="endDate"
              type="date"
              value={endDate}
              onChange={e => setEndDate((e.target as HTMLInputElement).value)}
            />
            <Button type="submit">Update Graph</Button>
          </Box>
        </form>
      </Box>

      {/* Error Messages */}
      {errors.length > 0 && (
        <Box>
          <h3 style={{ color: 'var(--color-danger)' }}>Data Validation Errors:</h3>
          <ul style={{ color: 'var(--color-danger)' }}>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
          <p>These entries have been excluded from the graph.</p>
        </Box>
      )}

      {/* Graph */}
      {graphData.length > 0 ? (
        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={formatTooltip}
                labelFormatter={formatLabel}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius)',
                }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <Box>
          <p>No valid data points found for the selected date range.</p>
          {initialData.journalEntries.length > 0 && (
            <p>
              All journal entries have invalid weight values that cannot be converted to numbers.
            </p>
          )}
        </Box>
      )}

      {/* Data Summary */}
      <Box>
        <h3>Data Summary</h3>
        <p>Total entries found: {initialData.journalEntries.length}</p>
        <p>Valid entries for graph: {graphData.length}</p>
        <p>Invalid entries: {errors.length}</p>
      </Box>
    </Box>
  );
}
