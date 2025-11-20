import { useSearchParams } from 'react-router-dom';
import { useAdsList } from '../../api/ads';
import { Box, Typography, CircularProgress, Alert, Fade, LinearProgress } from '@mui/material';
import FiltersBar from './FiltersBar';
import Pagination from './Pagination';
import AdCard from './AdCard';
import BulkActionsBar from './BulkActionsBar';
import { useRef } from 'react';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

const AdsListPage = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError, error, isFetching } = useAdsList(searchParams);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcuts({
    focusSearch: () => {
      searchInputRef.current?.focus();
    },
  });

  if (isError && !data)
    return (
      <Alert severity="error">
        Не удалось загрузить объявления: {error.message}
      </Alert>
    );

  const { ads, pagination } = data || { ads: [], pagination: undefined };
  const totalCount = pagination?.totalItems ?? ads.length;
  const pageSize = pagination?.itemsPerPage ?? 10;

  const isInitialLoading = isLoading && !data;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Список объявлений
      </Typography>

      <FiltersBar ref={searchInputRef} />
      
      {(isLoading || isFetching) && <LinearProgress sx={{ mb: 2 }} />}

      <BulkActionsBar ids={ads?.map((ad) => ad.id) ?? []} />

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Всего: {totalCount} объявлений • по {pageSize} на странице
      </Typography>

      <Box sx={{ mt: 2, opacity: (isLoading || isFetching) ? 0.5 : 1, transition: 'opacity 0.2s' }}>
        {isInitialLoading ? (
           // Only show big spinner on very first load
           <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
             <CircularProgress />
           </Box>
        ) : ads?.length > 0 ? (
          ads.map((ad) => (
            <Fade in appear timeout={400} key={ad.id}>
              <Box>
                <AdCard ad={ad} />
              </Box>
            </Fade>
          ))
        ) : (
          <Typography sx={{ mt: 2 }}>Объявления не найдены.</Typography>
        )}
      </Box>

      <Pagination totalCount={totalCount} pageSize={pageSize} />
    </Box>
  );
};

export default AdsListPage;
