import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useState } from 'react';

interface RejectDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  title?: string;
  submitLabel?: string;
  reasons?: string[];
}

const defaultReasons = [
  'Запрещённый товар',
  'Неверная категория',
  'Некорректное описание',
  'Проблемы с фото',
  'Подозрение на мошенничество',
  'Другое'
];

const RejectDialog = ({ open, onClose, onSubmit, title = 'Отклонить объявление', submitLabel = 'Отправить', reasons = defaultReasons }: RejectDialogProps) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState('');

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedReasons((prev) =>
      checked ? [...prev, name] : prev.filter((r) => r !== name)
    );
  };

  const handleSubmit = () => {
    const reasons = [...selectedReasons];
    if (otherReason) {
      reasons.push(otherReason);
    }
    if (reasons.length > 0) {
      onSubmit(reasons.join(', '));
    }
  };

  const handleClose = () => {
    setSelectedReasons([]);
    setOtherReason('');
    onClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormGroup>
          {reasons.map((reason) => (
            <FormControlLabel
              key={reason}
              control={
                <Checkbox
                  checked={selectedReasons.includes(reason)}
                  onChange={handleCheckboxChange}
                  name={reason}
                />
              }
              label={reason}
            />
          ))}
        </FormGroup>
        <TextField
          label="Другая причина"
          fullWidth
          multiline
          rows={3}
          value={otherReason}
          onChange={(e) => setOtherReason(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="error"
          disabled={selectedReasons.length === 0 && !otherReason}
        >
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RejectDialog;
