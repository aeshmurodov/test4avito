import { type StatsPeriod, useCategoryStats } from '../../api/stats';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography, CircularProgress, Alert } from '@mui/material';

interface CategoryChartProps {
  period: StatsPeriod;
}

const CategoryChart = ({ period }: CategoryChartProps) => {
  const { data: categoryStats, isLoading, isError } = useCategoryStats(period);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Не удалось загрузить категории.</Alert>;

  const data =
    categoryStats
      ? Object.entries(categoryStats).map(([category, count]) => ({
          category,
          count
        }))
      : [];

  return (
    <Paper sx={{ p: 2, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        Категории объявлений
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" width={120} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" name="Количество" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CategoryChart;
