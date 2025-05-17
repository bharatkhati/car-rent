import { useState, useEffect } from 'react';
import { 
  Button, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  CircularProgress,
  Box
} from '@mui/material';
import { getVehicles } from '../utils/axiosInstance';

const VehicleModelForm = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Only fetch if we have a vehicleTypeId
        if (formData.vehicleTypeId) {
          const response = await getVehicles(formData.vehicleTypeId);
          setVehicles(response.data);
        }
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError('Failed to load vehicle models. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [formData.vehicleTypeId]);

  const handleChange = (e) => {
    updateFormData('vehicleId', parseInt(e.target.value));
  };

  const handleNext = () => {
    // Reset date range if changing vehicle
    updateFormData('startDate', null);
    updateFormData('endDate', null);
    nextStep();
  };

  return (
    <Box sx={{ p: 3 }}>
      <h2 className="text-xl font-semibold mb-4">Select Vehicle Model</h2>
      
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : vehicles.length === 0 ? (
        <div className="text-gray-500 mb-4">No vehicles available for this type</div>
      ) : (
        <>
          <RadioGroup 
            value={formData.vehicleId || ''} 
            onChange={handleChange}
          >
            {vehicles.map((vehicle) => (
              <FormControlLabel
                key={vehicle.id}
                value={vehicle.id}
                control={<Radio />}
                label={`${vehicle.model} (ID: ${vehicle.id})`}
                className="mb-2"
              />
            ))}
          </RadioGroup>

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
              onClick={handleNext}
              disabled={!formData.vehicleId}
              color="primary"
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default VehicleModelForm;