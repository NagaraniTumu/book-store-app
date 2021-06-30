export const REGEX = {
  Name: /^[a-zA-Z0-9 ]+( [a-zA-Z0-9 ]+)*$/,
  Phone: /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
};

export const FORM_VALIDATION_MSGS = {
  FullName: [
    { type: 'required', message: 'Fullname is required' },
    {
      type: 'minlength',
      message: 'Fullname must be at least 5 characters long',
    },
    {
      type: 'maxlength',
      message: 'Fullname cannot be more than 25 characters long',
    },
    {
      type: 'pattern',
      message: 'Your fullname must contain only numbers and letters',
    },
  ],
  Email: [
    { type: 'required', message: 'Email is required' },
    { type: 'pattern', message: 'Enter a valid email' },
  ],
  PhoneNumber: [
    { type: 'required', message: 'Phone number is required' },
    { type: 'pattern', message: 'Enter a valid phone number' },
  ],
  Address: { type: 'required', message: 'Address is required' },
};
