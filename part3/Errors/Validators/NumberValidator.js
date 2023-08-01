export function validateNumber(num) {
  function validateMinLength(num) {
    return num.length >= 8;
  }

  function validateFormat(num) {
    const regex = new RegExp(/(?<![\d-])\d{2,3}-\d+(?![\d-])/);
    return regex.test(num);
  }

  const validators = [
    {
      validator: validateMinLength,
      message: "Number must be at least 8 characters.",
    },
    {
      validator: validateFormat,
      message: "Please follow the proper number format.",
    },
  ];

  return validators;
}

export function validateFormat(num) {
  const regex = new RegExp(/(?<![\d-])\d{2,3}-\d+(?![\d-])/);
  return regex.test(num);
}
