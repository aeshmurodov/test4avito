import { Box, Typography, Card, CardContent, Avatar, Rating } from '@mui/material';
import type { Ad } from '../../types/ad';

interface SellerInfoProps {
  seller: Ad['seller'];
}

const SellerInfo = ({ seller }: SellerInfoProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Продавец
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar>{seller.name.charAt(0)}</Avatar>
          <Box>
            <Typography variant="body1">{seller.name}</Typography>
            <Rating value={Number(seller.rating)} precision={0.5} readOnly />
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Объявлений: {seller.totalAds}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          На сайте с: {new Date(seller.registeredAt).toLocaleDateString('ru-RU')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SellerInfo;
