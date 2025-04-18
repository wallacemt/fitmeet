import { v4 as uuidv4 } from "uuid";

export const confirmationCode = (): string => {
  const id = uuidv4();
  return id.slice(0, 6).toUpperCase();
};

