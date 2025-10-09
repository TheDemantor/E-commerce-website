import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
  { label: 'Sign In', path: '/login' },
  { label: 'Shipping', path: '/shipping' },
  { label: 'Payment', path: '/payment' },
  { label: 'Place Order', path: '/placeorder' },
];

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const activeSteps = [step1, step2, step3, step4];
  return (
    <nav className="flex justify-center mb-8 space-x-4">
      {steps.map((step, idx) => (
        activeSteps[idx] ? (
          <Link
            key={step.label}
            to={step.path}
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            {step.label}
          </Link>
        ) : (
          <span
            key={step.label}
            className="px-4 py-2 rounded bg-gray-300 text-gray-500 font-semibold cursor-not-allowed"
          >
            {step.label}
          </span>
        )
      ))}
    </nav>
  );
};

export default CheckoutSteps;
