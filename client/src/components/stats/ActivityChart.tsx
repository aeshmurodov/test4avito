import { type StatsPeriod, useDailyActivity } from '../../api/stats';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography, CircularProgress, Alert } from '@mui/material';

interface ActivityChartProps {
  period: StatsPeriod;
}

const ActivityChart = ({ period }: ActivityChartProps) => {
  const { data: activity, isLoading, isError } = useDailyActivity(period);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Не удалось загрузить активность.</Alert>;

  return (
    <Paper sx={{ p: 2, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        Активность модерации
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={activity ?? []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="approved" stackId="a" fill="#4caf50" name="Одобрено" />
          <Bar dataKey="rejected" stackId="a" fill="#f44336" name="Отклонено" />
          <Bar dataKey="requestChanges" stackId="a" fill="#ff9800" name="Доработка" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default ActivityChart;
