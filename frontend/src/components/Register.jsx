import React, { useState } from 'react';

const RegistrationForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    insurance_provider: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    age: '',
    date_of_occurrence: '',
    job_occupation: ''
  });

  const fields = [
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'first_name', label: 'First Name', type: 'text', required: true },
    { name: 'middle_name', label: 'Middle Name', type: 'text' },
    { name: 'last_name', label: 'Last Name', type: 'text', required: true },
    { name: 'insurance_provider', label: 'Insurance Provider', type: 'text' },
    { name: 'street_address', label: 'Street Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'text', required: true },
    { name: 'zip_code', label: 'Zip Code', type: 'text', required: true },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'date_of_occurrence', label: 'Date of Occurrence', type: 'date', required: true },
    { name: 'job_occupation', label: 'Job Occupation', type: 'text' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < fields.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {fields[step].label}
            </label>
            <input
              type={fields[step].type}
              name={fields[step].name}
              value={formData[fields[step].name]}
              onChange={handleChange}
              required={fields[step].required || false}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-between">
            {step > 0 && (
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                onClick={prevStep}
              >
                Back
              </button>
            )}

            {step < fields.length - 1 ? (
              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={nextStep}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
