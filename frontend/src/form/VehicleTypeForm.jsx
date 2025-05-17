import { useState, useEffect } from 'react';
import { Button, Radio, RadioGroup, FormControlLabel, CircularProgress } from '@mui/material';
import { getVehicleTypes } from '../utils/axiosInstance';

const VehicleTypeForm = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await getVehicleTypes(formData.wheelCount);
        setTypes(response.data);
      } catch (error) {
        console.error('Error fetching vehicle types:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, [formData.wheelCount]);

  const handleChange = (e) => {
    updateFormData('vehicleTypeId', parseInt(e.target.value));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Type of Vehicle</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <RadioGroup value={formData.vehicleTypeId} onChange={handleChange}>
            {types.map((type) => (
              <FormControlLabel
                key={type.id}
                value={type.id}
                control={<Radio />}
                label={type.name}
              />
            ))}
          </RadioGroup>
          <div className="flex justify-between mt-4">
            <Button variant="outlined" onClick={prevStep}>Back</Button>
            <Button
              variant="contained"
              onClick={nextStep}
              disabled={formData.vehicleTypeId === null}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default VehicleTypeForm;