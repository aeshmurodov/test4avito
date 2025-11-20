import { type StatsPeriod, useDecisionDistribution } from '../../api/stats';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography, CircularProgress, Alert } from '@mui/material';

interface DecisionsPieProps {
  period: StatsPeriod;
}

const COLORS: Record<string, string> = {
  approved: '#82ca9d',
  rejected: '#ff8042',
  requestChanges: '#ffc658'
};

const statusNames: Record<keyof typeof COLORS, string> = {
  approved: 'Одобрено',
  rejected: 'Отклонено',
  requestChanges: 'Доработка'
};

const DecisionsPie = ({ period }: DecisionsPieProps) => {
  const { data: distribution, isLoading, isError } = useDecisionDistribution(period);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Не удалось загрузить распределение решений.</Alert>;

  const data = distribution
    ? (Object.entries(distribution) as Array<[keyof typeof COLORS, number]>).map(([key, value]) => ({
        key,
        status: statusNames[key],
        value
      }))
    : [];

  return (
    <Paper sx={{ p: 2, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        Распределение решений
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map(({ key }) => (
              <Cell key={key} fill={COLORS[key]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default DecisionsPie;
