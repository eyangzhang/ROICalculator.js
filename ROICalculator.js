// ROICalculator.js
import React, { useState, useEffect } from 'react';

const ROICalculator = () => {
  const [emailsPerDay, setEmailsPerDay] = useState(4.6);
  const [manualTimePerEmail, setManualTimePerEmail] = useState(7.5);
  const [automatedTimePerEmail, setAutomatedTimePerEmail] = useState(1.5);
  const [workdaysPerMonth, setWorkdaysPerMonth] = useState(20);
  const [savings, setSavings] = useState({ daily: 0, monthly: 0 });

  useEffect(() => {
    calculateSavings();
  }, [emailsPerDay, manualTimePerEmail, automatedTimePerEmail, workdaysPerMonth]);

  const calculateSavings = () => {
    const dailySavingsMinutes = emailsPerDay * (manualTimePerEmail - automatedTimePerEmail);
    const monthlySavingsHours = (dailySavingsMinutes * workdaysPerMonth) / 60;
    setSavings({
      daily: dailySavingsMinutes.toFixed(2),
      monthly: monthlySavingsHours.toFixed(2)
    });
  };

  const InputField = ({ label, value, setValue, min = 0, step = 0.1 }) => (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        min={min}
        step={step}
        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
      />
    </div>
  );

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>ROI Calculator: Email Automation</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <InputField label="Emails per day" value={emailsPerDay} setValue={setEmailsPerDay} min={0.1} />
        <InputField label="Manual time per email (minutes)" value={manualTimePerEmail} setValue={setManualTimePerEmail} />
        <InputField label="Automated time per email (minutes)" value={automatedTimePerEmail} setValue={setAutomatedTimePerEmail} />
        <InputField label="Workdays per month" value={workdaysPerMonth} setValue={setWorkdaysPerMonth} min={1} step={1} />
      </div>
      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Estimated Time Savings</h3>
        <p>Daily: {savings.daily} minutes</p>
        <p>Monthly: {savings.monthly} hours</p>
      </div>
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
        Adjust the values above to see how much time you could save with email automation.
      </p>
    </div>
  );
};

export default ROICalculator;
