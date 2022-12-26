export const patternEmail =
  /^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/;

export const patternOnlyLetters = /^([A-Za-z]{3,}|[\s]{1}[A-Za-z]{1,})*$/;

export const patternURL =
  /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const matchCommaAndSpaces = /,\s*/;

export const patternDevJobsID = /^@(\w){3,20}$/;
