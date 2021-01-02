import React from 'react';

export default function useValidations(
  value,
  validatorFn,
  compareValue = null
) {
  const [error, seterror] = React.useState('');

  React.useEffect(() => {
    seterror(validatorFn(value, compareValue));
  }, [value, validatorFn, compareValue]);

  return error;
}
