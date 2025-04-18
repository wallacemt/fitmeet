export type userData = {
  name?: string;
  email?: string;
  cpf?: string;
  password?: string;
};

export type CreateUserInput = {
  name: string;
  email: string;
  cpf: string;
  password: string;
};


export type updateData = {
  name?: string;
  email?: string;
  password?: string;
}