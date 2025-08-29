export const emailVerify = (email: string) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email);
};

export const passwordVerify = (password: string) => {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return passwordRegex.test(password);
};

export const passwordVerifyMessages = (password: string): string => {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const errors = [];
  if (password.length < 8) {
    errors.push('Senha deve ter pelo menos 8 caracteres');
  }
  if (!passwordRegex.test(password)) {
    if (!/[A-Z]/.test(password)) {
      errors.push('Senha deve ter um caractere maiúsculo');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Senha deve ter um caractere minúsculo');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Senha deve ter um número');
    }
    if (!/[#?!@$%^&*-]/.test(password)) {
      errors.push('Senha deve ter um caractere especial');
    }
  }
  return errors.join(', ');
};

export const nomeVerify = (name: string) => {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name);
}
export const cpfVerify = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;

  return true;
};

export const cpfVerifyMessage = (cpf: string) => {
  cpfVerify(cpf);
  if (!cpfVerify(cpf)) {
    return 'CPF inválido!';
  }
  return 'Este CPF é válido.';
}

