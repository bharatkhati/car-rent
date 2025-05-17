import { TextField, Button, Box } from '@mui/material';

const NameForm = ({ formData, updateFormData, nextStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">What is your name?</h2>
      <Box mb={2}>
        <TextField
          fullWidth
          label="First Name"
          value={formData.firstName}
          onChange={(e) => updateFormData('firstName', e.target.value)}
          required
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => updateFormData('lastName', e.target.value)}
          required
        />
      </Box>
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        disabled={!formData.firstName || !formData.lastName}
      >
        Next
      </Button>
    </form>
  );
};

export default NameForm;