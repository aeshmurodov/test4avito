import { Box, Button, Typography } from '@mui/material';
import RejectDialog from './RejectDialog';
import { useState } from 'react';
import type { useModerateAd } from '../../api/ads';

type ModerationMutation = ReturnType<typeof useModerateAd>;

interface ModerationActionsProps {
  moderate: ModerationMutation;
}

const ModerationActions = ({ moderate }: ModerationActionsProps) => {
  const [isRejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [isRequestDialogOpen, setRequestDialogOpen] = useState(false);

  const handleApprove = () => {
    moderate.mutate({ status: 'approved' });
  };

  const handleReject = (reason: string) => {
    moderate.mutate({ status: 'rejected', reason });
    setRejectDialogOpen(false);
  };

  const handleRequestChanges = (reason: string) => {
    moderate.mutate({ status: 'draft', reason });
    setRequestDialogOpen(false);
  };

  return (
    <Box sx={{ mt: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>Действия модератора</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleApprove}
          disabled={moderate.isPending}
        >
          Одобрить
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => setRejectDialogOpen(true)}
          disabled={moderate.isPending}
        >
          Отклонить
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => setRequestDialogOpen(true)}
          disabled={moderate.isPending}
        >
          Вернуть на доработку
        </Button>
      </Box>
      <RejectDialog
        open={isRejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        onSubmit={handleReject}
        title="Отклонение объявления"
        submitLabel="Отправить"
      />
      <RejectDialog
        open={isRequestDialogOpen}
        onClose={() => setRequestDialogOpen(false)}
        onSubmit={handleRequestChanges}
        title="Запросить доработку"
        submitLabel="Запросить"
      />
    </Box>
  );
};

export default ModerationActions;
