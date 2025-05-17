import { useState, useEffect } from 'react';
import { 
  Button,
  Box,
  Typography,
  FormControl,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { checkVehicleAvailability } from '../utils/axiosInstance';
import { format, addDays, isBefore, isAfter, differenceInDays } from 'date-fns';

const DateRangeForm = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [startDate, setStartDate] = useState(formData.startDate);
  const [endDate, setEndDate] = useState(formData.endDate);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [available, setAvailable] = useState(false);

  // Check availability whenever dates change
  useEffect(() => {
    const checkAvailability = async () => {
      if (startDate && endDate && formData.vehicleId) {
        setLoading(true);
        setError(null);
        
        try {
          const response = await checkVehicleAvailability(
            formData.vehicleId,
            format(startDate, 'yyyy-MM-dd'),
            format(endDate, 'yyyy-MM-dd')
          );
          setAvailable(response.data.available);
          if (!response.data.available) {
            setError('Vehicle not available for selected dates');
          }
        } catch (err) {
          console.error('Availability check failed:', err);
          setError('Failed to check availability. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    checkAvailability();
  }, [startDate, endDate, formData.vehicleId]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // Reset end date if it's before new start date
    if (endDate && isBefore(endDate, date)) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSubmit = () => {
    updateFormData('startDate', startDate);
    updateFormData('endDate', endDate);
    nextStep();
  };

  const minEndDate = startDate ? addDays(startDate, 1) : null;
  const maxDays = 30; // Maximum rental period
  const maxEndDate = startDate ? addDays(startDate, maxDays) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Select Rental Dates
        </Typography>

        <FormControl fullWidth margin="normal">
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            minDate={new Date()}
            disablePast
            slotProps={{
              textField: {
                helperText: 'Select pickup date'
              }
            }}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            minDate={minEndDate}
            maxDate={maxEndDate}
            disabled={!startDate}
            slotProps={{
              textField: {
                helperText: endDate && startDate ? 
                  `${differenceInDays(endDate, startDate)} days selected` : 
                  'Select return date'
              }
            }}
          />
        </FormControl>

        {loading && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress size={24} />
          </Box>
        )}

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        {available && (
          <Typography color="success.main" variant="body2" sx={{ mt: 1 }}>
            Vehicle available for selected dates
          </Typography>
        )}

        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button 
            variant="outlined" 
            onClick={prevStep}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!startDate || !endDate || !available || loading}
            color="primary"
          >
            Next
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangeForm;