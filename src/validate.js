export default function(values) {
    const errors = {};
    const requiredFields = [
      'userName',
      'department',
      'email',
      'notes',
      'prioirty',
      'issue',
      'ticketID'
      
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required';
      }
    });
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  }
  