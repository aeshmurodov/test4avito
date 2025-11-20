import { useParams, useNavigate } from 'react-router-dom';
import { useAd, useModerateAd } from '../../api/ads';
import { useQueryClient } from '@tanstack/react-query';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { Box, Typography, CircularProgress, Alert, Button, Stack } from '@mui/material';
import Gallery from './Gallery';
import SellerInfo from './SellerInfo';
import ModerationHistory from './ModerationHistory';
import ModerationActions from './ModerationActions';
import type { Ad } from '../../types/ad';

const AdDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: ad, isLoading, isError, error } = useAd(Number(id));
  const moderate = useModerateAd(Number(id));

  const adListData = queryClient.getQueryCache().findAll({ queryKey: ['ads'] })[0]?.state
    ?.data as { ads: Ad[] } | undefined;
  const adIds = adListData?.ads.map((a) => a.id) ?? [];
  const currentIndex = ad && adIds.length ? adIds.indexOf(ad.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex !== -1 && currentIndex < adIds.length - 1;

  const handleNext = () => {
    if (hasNext && adIds.length) {
      navigate(`/item/${adIds[currentIndex + 1]}`);
    }
  };

  const handlePrev = () => {
    if (hasPrev && adIds.length) {
      navigate(`/item/${adIds[currentIndex - 1]}`);
    }
  };

  useKeyboardShortcuts({
    next: handleNext,
    prev: handlePrev,
    approve: () => moderate.mutate({ status: 'approved' }),
    reject: () => moderate.mutate({ status: 'rejected', reason: 'Отклонено горячей клавишей' }),
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Не удалось загрузить объявление: {error.message}</Alert>;
  }

  if (!ad) {
    return <Typography>Объявление не найдено.</Typography>;
  }

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={1.5}
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">{ad.title}</Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          width={{ xs: '100%', sm: 'auto' }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate('/list')}
            size="small"
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            К списку
          </Button>
          <Button
            variant="outlined"
            onClick={handlePrev}
            disabled={!hasPrev}
            size="small"
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            {'◄'}
          </Button>
          <Button
            variant="outlined"
            onClick={handleNext}
            disabled={!hasNext}
            size="small"
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            {'►'}
          </Button>
        </Stack>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 3
        }}
      >
        <Box>
          <Gallery images={ad.images} />
          <Typography variant="h6">Описание</Typography>
          <Typography paragraph>{ad.description}</Typography>
          <Typography variant="h6">Характеристики</Typography>
          {ad.characteristics && Object.entries(ad.characteristics).map(([key, value]) => (
            <Typography key={key}><b>{key}:</b> {value}</Typography>
          ))}
        </Box>
        <Box>
          <SellerInfo seller={ad.seller} />
          <ModerationActions moderate={moderate} />
          <ModerationHistory history={ad.moderationHistory ?? []} />
        </Box>
      </Box>
    </Box>
  );
};

export default AdDetailsPage;
