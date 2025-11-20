import { useSelectionStore } from '../../store/selectionStore';
import { useBulkModerateAds } from '../../api/ads';
import type { AdStatus } from '../../types/ad';
import {
  Box,
  Typography,
  Button,
  Chip,
  Paper,
  Stack,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';

interface BulkActionsBarProps {
  ids: number[];
}

const BulkActionsBar = ({ ids }: BulkActionsBarProps) => {
  const { selectedIds, clearSelection, selectAll } = useSelectionStore();
  const bulkModerate = useBulkModerateAds();
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.down('sm')); // keep media query hook for responsive recalculation

  const handleModerate = (status: Exclude<AdStatus, 'pending'>) => {
    if (selectedIds.size === 0) return;
    const reason = status === 'rejected' ? 'Массовое отклонение модератором' : undefined;
    bulkModerate.mutate({ ids: Array.from(selectedIds), status, reason });
    clearSelection();
  };

  const allSelected = ids.length > 0 && ids.every((id) => selectedIds.has(id));

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1, sm: 1.5 },
        mb: 2,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ xs: 'flex-start', sm: 'center' }}>
        <Typography variant="body2">
          Выбрано: <Chip label={selectedIds.size} size="small" />
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant={allSelected ? 'outlined' : 'contained'}
            size="small"
            onClick={() => (allSelected ? clearSelection() : selectAll(ids))}
            disabled={ids.length === 0}
          >
            {allSelected ? 'Снять выделение' : 'Выбрать всё на странице'}
          </Button>
          <Button size="small" onClick={clearSelection}>Очистить выбор</Button>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Tooltip title="Одобрить выбранные">
          <Box>
            <IconButton
              color="success"
              onClick={() => handleModerate('approved')}
              sx={{ display: { xs: 'inline-flex', sm: 'none' }, border: '1px solid', borderColor: 'divider' }}
              disabled={selectedIds.size === 0}
            >
              <CheckCircleIcon />
            </IconButton>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircleIcon />}
              onClick={() => handleModerate('approved')}
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              disabled={selectedIds.size === 0}
            >
              Одобрить выбранные
            </Button>
          </Box>
        </Tooltip>

        <Tooltip title="Отклонить выбранные">
          <Box>
            <IconButton
              color="error"
              onClick={() => handleModerate('rejected')}
              sx={{ display: { xs: 'inline-flex', sm: 'none' }, border: '1px solid', borderColor: 'divider' }}
              disabled={selectedIds.size === 0}
            >
              <CancelIcon />
            </IconButton>
            <Button
              variant="contained"
              color="error"
              startIcon={<CancelIcon />}
              onClick={() => handleModerate('rejected')}
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              disabled={selectedIds.size === 0}
            >
              Отклонить выбранные
            </Button>
          </Box>
        </Tooltip>

        <Tooltip title="Сбросить выбор">
          <IconButton
            onClick={clearSelection}
            size="small"
            color="default"
            sx={{ border: '1px solid', borderColor: 'divider' }}
            disabled={selectedIds.size === 0}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
};

export default BulkActionsBar;
