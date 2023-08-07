export const handleAddressKeyDown = (e) => {
  const keyValue = e.key;
  const isRussianLetter = /^[А-ЯЁа-яё]$/.test(keyValue);
  const isDigit = /^\d$/.test(keyValue);
  const isBackspace = e.keyCode === 8;

  if (!isRussianLetter && !isDigit && !isBackspace) {
    e.preventDefault();
  }
};

export const handlePhoneKeyDown = (e) => {
  const keyCode = e.keyCode;
  const keyValue = String.fromCharCode(keyCode);
  const isDigit = /^\d$/.test(keyValue);
  const isBackspace = keyCode === 8;

  if (!isDigit && !isBackspace) {
    e.preventDefault();
  }
};

export const handleNameKeyDown = (e) => {
  const keyValue = e.key;
  const isRussianLetter = /^[А-ЯЁа-яё]$/.test(keyValue);
  const isBackspace = e.keyCode === 8;

  if (!isRussianLetter && !isBackspace) {
    e.preventDefault();
  }
};
