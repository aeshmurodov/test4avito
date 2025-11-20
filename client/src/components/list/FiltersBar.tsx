import { useSearchParams } from 'react-router-dom';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl, OutlinedInput, Chip, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { AdStatus } from '../../types/ad';
import { type ChangeEvent, forwardRef, useEffect, useState } from 'react';

// ... (Keep statuses, categories, sortOptions constants as they are) ...
const statuses: { value: AdStatus; label: string }[] = [
  { value: 'pending', label: 'На модерации' },
  { value: 'approved', label: 'Одобрено' },
  { value: 'rejected', label: 'Отклонено' },
  { value: 'draft', label: 'Черновик' },
];
const categories = ['Электроника', 'Недвижимость', 'Транспорт', 'Работа', 'Услуги', 'Животные', 'Мода', 'Детское'];
const sortOptions = [
  { value: 'createdAt:desc', label: 'Дата создания (новые)' },
  { value: 'createdAt:asc', label: 'Дата создания (старые)' },
  { value: 'price:asc', label: 'Цена (возрастание)' },
  { value: 'price:desc', label: 'Цена (убывание)' },
  { value: 'priority:desc', label: 'Приоритет (сначала срочные)' },
  { value: 'priority:asc', label: 'Приоритет (обычные)' },
];

const FiltersBar = forwardRef<HTMLInputElement>((_, ref) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams((prev) => {
        const currentSearchParam = prev.get('search') || '';
        
        // Optimization: Only update URL if the value actually changed
        if (currentSearchParam !== localSearch) {
            if (localSearch) prev.set("search", localSearch);
            else prev.delete("search");
            // Reset page to 1 on search change
            prev.set('page', '1');
            return prev;
        }
        return prev;
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [localSearch, setSearchParams]);

  // ... (Keep handleStatusChange, handleCategoryChange as they are) ...
  const handleStatusChange = (event: SelectChangeEvent<string[]>) => {
    const { target: { value } } = event;
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('status');
    if (value.length) {
        (value as string[]).forEach((status: string) => newParams.append('status', status));
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const newParams = new URLSearchParams(searchParams);
    if (event.target.value) {
      newParams.set('categoryId', event.target.value);
    } else {
      newParams.delete('categoryId');
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const applySearch = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('search', value);
    } else {
      newParams.delete('search');
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(event.target.value);
  };

  const handleReset = () => {
    setLocalSearch(''); // Clear the input field state
    setSearchParams({}); // Clear URL params
  };

  const selectedStatuses = searchParams.getAll('status') || [];
  const statusLabelMap = Object.fromEntries(statuses.map((s) => [s.value, s.label]));
  const sortValue = `${searchParams.get('sortBy') ?? 'createdAt'}:${searchParams.get('sortOrder') ?? 'desc'}`;

  return (
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
        {/* ... Inputs ... */}
        <TextField
            label="Поиск по названию"
            variant="outlined"
            size="small"
            value={localSearch}
            onChange={handleSearchChange}
            inputRef={ref}
            onKeyDown={(e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                applySearch(localSearch);
            }
            }}
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <SearchIcon fontSize="small" />
                </InputAdornment>
            ),
            }}
            sx={{ minWidth: { xs: '100%', sm: 240 } }}
        />

        {/* ... Other components (Selects, Inputs) remain identical to your code ... */}
        <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
            <InputLabel>Статус</InputLabel>
            <Select
            multiple
            value={selectedStatuses}
            onChange={handleStatusChange}
            input={<OutlinedInput label="Статус" />}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                    <Chip key={value} label={statusLabelMap[value] ?? value} />
                ))}
                </Box>
            )}
            >
            {statuses.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                {status.label}
                </MenuItem>
            ))}
            </Select>
        </FormControl>

        {/* ... Keeping the rest of the components exactly as they were in your snippet ... */}
        
        <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
            <InputLabel>Категория</InputLabel>
            <Select
            value={searchParams.get('categoryId') || ''}
            onChange={handleCategoryChange}
            input={<OutlinedInput label="Категория" />}
            >
            <MenuItem value="">
                <em>Все</em>
            </MenuItem>
            {categories.map((category, index) => (
                <MenuItem key={category} value={index}>
                {category}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        <TextField
            label="Цена от"
            type="number"
            size="small"
            value={searchParams.get('minPrice') || ''}
            onChange={(event) => {
            const newParams = new URLSearchParams(searchParams);
            if (event.target.value) newParams.set('minPrice', event.target.value);
            else newParams.delete('minPrice');
            newParams.set('page', '1');
            setSearchParams(newParams);
            }}
            sx={{ width: 120 }}
        />
        <TextField
            label="Цена до"
            type="number"
            size="small"
            value={searchParams.get('maxPrice') || ''}
            onChange={(event) => {
            const newParams = new URLSearchParams(searchParams);
            if (event.target.value) newParams.set('maxPrice', event.target.value);
            else newParams.delete('maxPrice');
            newParams.set('page', '1');
            setSearchParams(newParams);
            }}
            sx={{ width: 120 }}
        />
        <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
            <InputLabel>Сортировка</InputLabel>
            <Select
            value={sortValue}
            input={<OutlinedInput label="Сортировка" />}
            onChange={(event: SelectChangeEvent<string>) => {
                const [sortBy, sortOrder] = event.target.value.split(':');
                const newParams = new URLSearchParams(searchParams);
                newParams.set('sortBy', sortBy);
                newParams.set('sortOrder', sortOrder);
                newParams.set('page', '1');
                setSearchParams(newParams);
            }}
            >
            {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </Select>
        </FormControl>

        <Button variant="contained" onClick={() => applySearch(localSearch)}>Искать</Button>
        <Button variant="outlined" onClick={handleReset}>Сбросить фильтры</Button>
    </Box>
  );
});

export default FiltersBar;