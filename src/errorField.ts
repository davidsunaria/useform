export const customMessage = (type: string, payload: any) => {
  let ErrorMessage = "";
  if (payload.required) {
    ErrorMessage = `${type} is required`;
  } else if (payload.max) {
    ErrorMessage = `maximum characters should be ${payload.max}`;
  }
  else if (payload.min) {
    ErrorMessage = `minmum characters should be ${payload.min}`;
  }

  else if (payload.number) {
    ErrorMessage = `${type} should be number`;;
  }
  return ErrorMessage;
};
