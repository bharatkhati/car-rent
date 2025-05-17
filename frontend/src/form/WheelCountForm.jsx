import { Button, Radio, RadioGroup, FormControlLabel, Box } from '@mui/material';

const WheelCountForm = ({ formData, updateFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    updateFormData('wheelCount', parseInt(e.target.value));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Number of wheels</h2>
      <Box mb={2}>
        <RadioGroup value={formData.wheelCount} onChange={handleChange}>
          <FormControlLabel value={2} control={<Radio />} label="2 Wheels" />
          <FormControlLabel value={4} control={<Radio />} label="4 Wheels" />
        </RadioGroup>
      </Box>
      <div className="flex justify-between">
        <Button variant="outlined" onClick={prevStep}>Back</Button>
        <Button 
          variant="contained" 
          onClick={nextStep}
          disabled={formData.wheelCount === null}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default WheelCountForm;