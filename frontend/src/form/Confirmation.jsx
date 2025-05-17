import { useState } from 'react';
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { createBooking } from '../utils/axiosInstance';
import { format } from 'date-fns';

const Confirmation = ({ formData, prevStep }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const bookingData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        vehicleId: formData.vehicleId,
        startDate: format(formData.startDate, 'yyyy-MM-dd'),
        endDate: format(formData.endDate, 'yyyy-MM-dd')
      };

      await createBooking(bookingData);
      setSuccess(true);
    } catch (err) {
      console.error('Booking failed:', err);
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const rentalDays = formData.endDate && formData.startDate 
    ? Math.round(differenceInDays(formData.endDate, formData.startDate))
    : 0;

  if (success) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Booking Confirmed!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Thank you, {formData.firstName}. Your vehicle rental has been confirmed.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => window.location.reload()}
        >
          Make Another Booking
        </Button>
      </Paper>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Confirm Your Booking
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <List>
          <ListItem>
            <ListItemText 
              primary="Name" 
              secondary={`${formData.firstName} ${formData.lastName}`} 
            />
          </ListItem>
          <Divider component="li" />
          
          <ListItem>
            <ListItemText 
              primary="Vehicle Type" 
              secondary={formData.vehicleType?.name || 'N/A'} 
            />
          </ListItem>
          <Divider component="li" />
          
          <ListItem>
            <ListItemText 
              primary="Vehicle Model" 
              secondary={formData.vehicle?.model || 'N/A'} 
            />
          </ListItem>
          <Divider component="li" />
          
          <ListItem>
            <ListItemText 
              primary="Rental Period" 
              secondary={`${format(formData.startDate, 'PP')} to ${format(formData.endDate, 'PP')} (${rentalDays} days)`} 
            />
          </ListItem>
        </List>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={prevStep}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Confirm Booking'}
        </Button>
      </Box>
    </Box>
  );
};

export default Confirmation;