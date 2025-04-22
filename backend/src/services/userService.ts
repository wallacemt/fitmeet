import { unlockAchiviment } from "../repository/achivimentsRepository";
import { activityTypesRepository } from "../repository/activityTypesRepository";
import { preferenceRepository } from "../repository/preferenceRepository";
import { userRepository } from "../repository/userRepository";
import { updateData } from "../types/userData";
import { uploadImage } from "./s3Service";
import bcrypt from "bcryptjs";

export const userService = {
  findAuthUser: async (id: string) => {
    const user = await userRepository.findById(id);

    if (!user) {
      throw { error: "Usuário não encontrado.", status: 404 };
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      avatar: user.avatar,
      xp: user.xp,
      level: user.level,
      achievements: user.achievements.map((a: any) => ({
        name: a.achievement.name,
        criterion: a.achievement.criterion,
      })),
      deletedAt: user.deletedAt,
    };
  },
  updateAvatar: async (id: string, file: Express.Multer.File) => {
    console.log(file);

    if(file === undefined) {
      throw {error: "Imagem não encontrada.", status: 404}
    }
    const user = await userRepository.findById(id);

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      throw { error: "A imagem deve ser um arquivo PNG ou JPG.", status: 400 };
    }
    const avatar = await uploadImage(file);
    await userRepository.updateAvatar(id, avatar);

    if (user?.avatar === `${`${process.env.S3_ENDPOINT}/${process.env.BUCKET_NAME}/user.jpg`}`) {
      await unlockAchiviment(id, "Alterou Foto de Perfil");
    }
    return avatar;
  },

  updateUserInfo: async (id: string, data: updateData) => {
    const emailInUse = await userRepository.findByEmail(data.email!);
    if (emailInUse && emailInUse.id !== id) {
      throw { error: "O e-mail informado ja pertence a outro usuário.", status: 409 };
    }
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }
    const updatedUser = await userRepository.updateUserInfo(id, data);
    return updatedUser;
  },

  desactivateUser: async (id: string) => {
    const updatedUser = await userRepository.desactivateUser(id);
    return updatedUser;
  },

  getUserPreferences: async (userId: string) => {
    const userPreference = await preferenceRepository.getUserPreferences(userId);
    return userPreference.map((preference: any) => ({
      typeId: preference.typeId,
      typeName: preference.type.name,
      typeDescription: preference.type.description,
    }));
  },

  defineUserPreferences: async (userId: string, typeIds: string[]) => {
    if (typeIds.length === 0) {
      throw { error: "Deve ser enviado pelo menos um ID de preferência.", status: 400 };
    }

    const validTypeIds = await activityTypesRepository.findOnes(typeIds);
    const invalidIds = typeIds.filter((id) => !validTypeIds.map((type: any) => type.id).includes(id));
    if (invalidIds.length > 0) {
      throw { error: `Um ou mais Ids informados são inválidos.`, status: 400 };
    }
    return preferenceRepository.defineUserPreferences(userId, typeIds);
  },
};
