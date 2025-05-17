import { Stepper, Step, StepLabel } from '@mui/material';

const steps = ['Name', 'Wheels', 'Vehicle Type', 'Model', 'Dates', 'Confirm'];

const FormProgress = ({ currentStep }) => {
  return (
    <Stepper activeStep={currentStep} alternativeLabel className="mb-8">
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default FormProgress;