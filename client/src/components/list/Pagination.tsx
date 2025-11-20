import { useSearchParams } from 'react-router-dom';
import { Pagination as MuiPagination } from '@mui/material';
import type { ChangeEvent } from 'react';

interface PaginationProps {
  totalCount: number;
  pageSize?: number;
}

const Pagination = ({ totalCount, pageSize = 10 }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const pageCount = Math.ceil(totalCount / pageSize);

  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', value.toString());
    setSearchParams(newParams);
  };

  if (pageCount <= 1) {
    return null;
  }

  return (
    <MuiPagination
      count={pageCount}
      page={page}
      onChange={handleChange}
      sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
    />
  );
};

export default Pagination;
