import { t, useLanguage } from '../../../shared/i18n/language.js';
import { formatCalendarDate } from "../../../shared/utils/formatCalendarDate.js";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Popper,
  Paper,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { az, enUS, ru } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { setDateFilter } from "../state/catalogFiltersSlice.js";



const ScreeningDatePicker = () => {
  const language = useLanguage();
  const dispatch = useDispatch();
  const { selectedDate } = useSelector((store) => store.catalogFilters);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(
    selectedDate ? new Date(selectedDate) : new Date()
  );
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setSelectedCalendarDate(selectedDate ? new Date(selectedDate) : new Date());
  }, [selectedDate]);
  
  
  const handleIconClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const today = formatCalendarDate(new Date());
  const label = selectedDate && selectedDate !== today
    ? selectedDate.split("-").reverse().join(".")
    : "Bugün";

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={{ AZE: az, EN: enUS, RU: ru }[language]}>
      <Box
        sx={{
          color: "white",
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid white',
          textAlign: "center",
          position: "relative",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "normal" , fontSize:'16px' , fontStyle : 'italic' }}>
          {t(label)}
        </Typography>
        <IconButton
          aria-label={t("Tarix seç")}
          onClick={handleIconClick}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
          }}
        >
          <CalendarTodayIcon />
        </IconButton>

        <Popper open={open} anchorEl={anchorEl} placement="bottom-end">
          <Paper sx={{ mt: 1, p: 1 }}>
            <DatePicker
              value={selectedCalendarDate}
              onChange={(newValue) => {
                setSelectedCalendarDate(newValue);
                dispatch(setDateFilter(formatCalendarDate(newValue)));
                setAnchorEl(null);
              }}
            />
          </Paper>
        </Popper>
      </Box>
    </LocalizationProvider>
  );
};

export default ScreeningDatePicker;
