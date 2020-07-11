const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(trimmedEmail => regex.test(trimmedEmail) === false);

  if (invalidEmails.length){
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};
