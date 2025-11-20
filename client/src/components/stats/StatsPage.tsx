import { useState } from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import SummaryCards from './SummaryCards';
import ActivityChart from './ActivityChart';
import DecisionsPie from './DecisionsPie';
import CategoryChart from './CategoryChart';
import type { StatsPeriod } from '../../api/stats';

const StatsPage = () => {
  const [period, setPeriod] = useState<StatsPeriod>('week');

  const handlePeriodChange = (
    _event: React.MouseEvent<HTMLElement>,
    newPeriod: StatsPeriod | null
  ) => {
    if (newPeriod !== null) {
      setPeriod(newPeriod);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Статистика</Typography>
        <ToggleButtonGroup
          value={period}
          exclusive
          onChange={handlePeriodChange}
          aria-label="Период статистики"
        >
          <ToggleButton value="today" aria-label="today">
            Сегодня
          </ToggleButton>
          <ToggleButton value="week" aria-label="last 7 days">
            7 дней
          </ToggleButton>
          <ToggleButton value="month" aria-label="last 30 days">
            30 дней
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <SummaryCards period={period} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 3,
          mt: 2
        }}
      >
        <ActivityChart period={period} />
        <DecisionsPie period={period} />
      </Box>
      <Box sx={{ mt: 3 }}>
        <CategoryChart period={period} />
      </Box>
    </Box>
  );
};

export default StatsPage;
