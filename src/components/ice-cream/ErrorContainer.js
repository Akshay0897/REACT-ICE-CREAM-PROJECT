import React from 'react';

export default function ErrorContainer({ children, errorText, hasSubmitted }) {
  return (
    <div className={errorText ? 'error' : ''}>
      {children}
      <div className="error-wrapper">
        {errorText && hasSubmitted && <span>{errorText}</span>}
      </div>
    </div>
  );
}
