import { Card, CardContent, Typography, Box, Chip, Checkbox, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Ad } from '../../types/ad';
import { useSelectionStore } from '../../store/selectionStore';

interface AdCardProps {
  ad: Ad;
}

const AdCard = ({ ad }: AdCardProps) => {
  const { selectedIds, toggleId } = useSelectionStore();

  const statusColor: Record<Ad['status'], 'warning' | 'success' | 'error' | 'info'> = {
    pending: 'warning',
    approved: 'success',
    rejected: 'error',
    draft: 'info'
  };

  const statusLabel: Record<Ad['status'], string> = {
    pending: 'На модерации',
    approved: 'Одобрено',
    rejected: 'Отклонено',
    draft: 'Черновик'
  };

  return (
    <Card
      sx={{
        mb: 2,
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 1
      }}
    >
      <Checkbox
        checked={selectedIds.has(ad.id)}
        onChange={() => toggleId(ad.id)}
        inputProps={{ 'aria-label': `Select ad ${ad.id}` }}
        sx={{ alignSelf: { xs: 'flex-start', sm: 'center' }, ml: 1 }}
      />
      <CardMedia
        component="img"
        image={ad.images?.[0] ?? 'https://via.placeholder.com/120'}
        alt={ad.title}
        sx={{
          width: { xs: '100%', sm: 160 },
          height: { xs: 160, sm: 120 },
          objectFit: 'cover',
          borderRadius: 1
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" component={Link} to={`/item/${ad.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
            {ad.title}
          </Typography>
          <Chip label={statusLabel[ad.status]} color={statusColor[ad.status]} />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {ad.price.toLocaleString('ru-RU')} ₽ · {ad.category}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(ad.createdAt).toLocaleString('ru-RU')}
        </Typography>
        {ad.priority === 'urgent' && (
          <Chip label="Срочно" color="error" size="small" sx={{ ml: 1, mt: 1 }} />
        )}
      </CardContent>
    </Card>
  );
};

export default AdCard;
