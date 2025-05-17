import { useState } from 'react';
import NameForm from "../form/NameForm"
import WheelCountForm from '../form/WheelCountForm';
import VehicleTypeForm from '../form/VehicleTypeForm';
import VehicleModelForm from '../form/VehicleModelForm';
import DateRangeForm from '../form/DateRangeForm';
import Confirmation from '../form/Confirmation';
import FormProgress from '../form/FormProgress';

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheelCount: null,
    vehicleTypeId: null,
    vehicleId: null,
    startDate: null,
    endDate: null
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const steps = [
    <NameForm 
      formData={formData} 
      updateFormData={updateFormData} 
      nextStep={nextStep}
    />,
    <WheelCountForm 
      formData={formData} 
      updateFormData={updateFormData} 
      nextStep={nextStep}
      prevStep={prevStep}
    />,
    <VehicleTypeForm 
      formData={formData} 
      updateFormData={updateFormData} 
      nextStep={nextStep}
      prevStep={prevStep}
    />,
    <VehicleModelForm 
      formData={formData} 
      updateFormData={updateFormData} 
      nextStep={nextStep}
      prevStep={prevStep}
    />,
    <DateRangeForm 
      formData={formData} 
      updateFormData={updateFormData} 
      nextStep={nextStep}
      prevStep={prevStep}
    />,
    <Confirmation 
      formData={formData} 
      prevStep={prevStep}
    />
  ];

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <FormProgress currentStep={step} />
      {steps[step]}
    </div>
  );
};

export default MultiStepForm;