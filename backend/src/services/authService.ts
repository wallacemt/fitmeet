import { userRepository } from "../repository/userRepository";
import { userData } from "../types/userData";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET!;

export const authService = {
  register: async (user: userData) => {
    const { name, email, cpf, password } = user;

    if (!name || !email || !cpf || !password) {
      throw { error: "Todos os campos são obrigatórios.", status: 400 };
    }

    const existingUser = await userRepository.findByEmailOrCpf(email, cpf);
    if (existingUser) {
      throw { error: "O e-mail ou CPF informado já pertence a outro usuário.", status: 409 };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return userRepository.createUser({ name, email, cpf, password: hashedPassword });
  },

  login: async ({ email, password }: userData) => {
    const user = await userRepository.findByEmailWithAchievements(email!);

    if (!user) {
      throw { error: "Usuário não encontrado.", status: 404 };
    }

    const isPasswordValid = await bcrypt.compare(password!, user.password);

    if (!isPasswordValid) {
      throw { error: "Senha incorreta.", status: 401 };
    }

    if (user.deletedAt) {
      throw { error: "Esta conta foi desativada e não pode ser utilizada.", status: 403 };
    }
    
    const token = jwt.sign({ id: user.id }, jwtSecret as string, {
      expiresIn: "1d",
    });
    return {
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      xp: user.xp,
      level: user.level,
      achievements: user.achievements.map(a => ({
        name: a.achievement.name,
        criterion: a.achievement.criterion
      })),
    };
  },
};
