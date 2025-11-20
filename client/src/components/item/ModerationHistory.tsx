import type { ModerationRecord } from '../../types/ad';
import { Typography, List, ListItem, ListItemText, Paper, Chip, Stack } from '@mui/material';

interface ModerationHistoryProps {
  history: ModerationRecord[];
}

const actionLabels: Record<ModerationRecord['action'], string> = {
  approved: 'Одобрено',
  rejected: 'Отклонено',
  requestChanges: 'Доработка'
};

const ModerationHistory = ({ history }: ModerationHistoryProps) => {
  if (!history || history.length === 0) {
    return (
      <Paper sx={{ mt: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          История модерации
        </Typography>
        <Typography variant="body2">История пуста.</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        История модерации
      </Typography>
      <List dense>
        {history.map((record) => (
          <ListItem key={record.id}>
            <ListItemText
              primary={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip size="small" label={actionLabels[record.action]} />
                  <Typography component="span">{record.moderatorName}</Typography>
                </Stack>
              }
              secondary={
                <>
                  {new Date(record.timestamp).toLocaleString('ru-RU')}
                  {record.reason ? ` — ${record.reason}` : ''}
                  {record.comment ? ` — ${record.comment}` : ''}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ModerationHistory;
