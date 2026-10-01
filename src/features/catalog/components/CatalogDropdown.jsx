import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function CatalogDropdown({ label, value, onChange, options, fontSize = 20 }) {
  const choices = options.map(option => typeof option === 'string' ? { value: option, label: option } : option);
  return (
    <Select
      variant="standard"
      displayEmpty
      value={value}
      onChange={event => onChange(event.target.value)}
      inputProps={{ 'aria-label': label }}
      renderValue={selected => choices.find(option => option.value === selected)?.label || label}
      sx={{
        width: '100%', minWidth: 100, height: 48, color: 'white', fontSize,
        '& .MuiSelect-select': { textAlign: 'center', fontStyle: 'italic', paddingLeft: '24px' },
        '&:before': { borderBottom: '1px solid white' },
        '&:hover:not(.Mui-disabled, .Mui-error):before': { borderBottom: '1px solid white' },
        '&:after': { borderBottom: '2px solid #D52B1E' },
        '& .MuiSelect-icon': { color: 'white' },
      }}
      MenuProps={{
        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
        PaperProps: { sx: {
          bgcolor: '#929090', color: 'white', borderTop: '2px solid #D52B1E',
          borderRadius: '0 0 4px 4px', maxHeight: 360,
          '& .MuiMenuItem-root': { minHeight: 45, px: 2.5, fontSize: 16, fontFamily: "'Roboto', sans-serif" },
          '& .MuiMenuItem-root.Mui-selected': { bgcolor: 'rgba(255,255,255,0.08)' },
          '& .MuiMenuItem-root:hover, & .MuiMenuItem-root.Mui-focusVisible': { bgcolor: 'rgba(255,255,255,0.14)' },
        } },
      }}
    >
      <MenuItem value="" sx={{ fontStyle: 'italic', color: '#c5c5c5' }}>{label}</MenuItem>
      {choices.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
    </Select>
  );
}

