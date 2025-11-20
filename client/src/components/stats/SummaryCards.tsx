import { type StatsPeriod, useStatsSummary } from '../../api/stats';
import { Box, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

interface SummaryCardsProps {
  period: StatsPeriod;
}

const SummaryCards = ({ period }: SummaryCardsProps) => {
  const { data: summary, isLoading, isError } = useStatsSummary(period);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Не удалось загрузить сводку.</Alert>;

  const periodLabel: Record<StatsPeriod, string> = {
    today: 'Сегодня',
    week: 'Последние 7 дней',
    month: 'Последние 30 дней'
  };

  const periodTotal =
    period === 'today'
      ? summary?.totalReviewedToday
      : period === 'week'
      ? summary?.totalReviewedThisWeek
      : summary?.totalReviewedThisMonth;

  const stats = [
    { title: `Проверено (${periodLabel[period]})`, value: periodTotal ?? '-' },
    { title: 'Одобрено', value: summary ? `${summary.approvedPercentage.toFixed(1)}%` : '-' },
    { title: 'Отклонено', value: summary ? `${summary.rejectedPercentage.toFixed(1)}%` : '-' },
    { title: 'Доработка', value: summary ? `${summary.requestChangesPercentage.toFixed(1)}%` : '-' },
    { title: 'Среднее время проверки', value: summary ? `${Math.round(summary.averageReviewTime / 60)} мин` : '-' },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)'
        }
      }}
    >
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              {stat.title}
            </Typography>
            <Typography variant="h5" component="div">
              {stat.value ?? '-'}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default SummaryCards;
