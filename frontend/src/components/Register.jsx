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

  const fieldGroups = [
    [
      { name: 'username', label: 'Username', type: 'text', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true }
    ],
    [
      { name: 'first_name', label: 'First Name', type: 'text', required: true },
      { name: 'middle_name', label: 'Middle Name', type: 'text' },
      { name: 'last_name', label: 'Last Name', type: 'text', required: true },
      { name: 'age', label: 'Age', type: 'number' },
      { name: 'job_occupation', label: 'Job Occupation', type: 'text' }
    ],
    [
      { name: 'street_address', label: 'Street Address', type: 'text', required: true },
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'state', label: 'State', type: 'text', required: true },
      { name: 'zip_code', label: 'Zip Code', type: 'text', required: true }
    ],
    [
      { name: 'date_of_occurrence', label: 'Date of Occurrence', type: 'date', required: true },
      { name: 'insurance_provider', label: 'Insurance Provider', type: 'text' }
    ]
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < fieldGroups.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100" style={{ backgroundColor: '#D8F3FF' }}>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {fieldGroups[step].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required={field.required || false}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <div>{step > 0 && (
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                onClick={prevStep}
              >
                Back
              </button>
            )}</div>
            <div>
              {step < fieldGroups.length - 1 ? (
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
