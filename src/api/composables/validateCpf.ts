const calculateCheckDigit = (digits: string[]) => {
  const multpliers = [10, 9, 8, 7, 6, 5, 4, 3, 2];

  const sum = digits.reduce((total, num, index) => {
    return total + +num * multpliers[index];
  }, 0);

  const rest = sum % 11;
  return rest === 1 || rest === 0 ? 0 : 11 - rest;
};

const validateCpf = (cpf: string) => {
  const splitedCPF = cpf.split("");
  const tenthDigit = calculateCheckDigit(splitedCPF.slice(0, 9));

  if (tenthDigit !== +splitedCPF[9]) {
    throw {
      code: 400,
      message: "Este CPF é inválido.",
    };
  }

  const eleventhDigit = calculateCheckDigit(splitedCPF.slice(1, 10));

  if (eleventhDigit !== +splitedCPF[10]) {
    throw {
      code: 400,
      message: "Este CPF é inválido.",
    };
  }
};

export { validateCpf };
