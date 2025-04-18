import { userService } from "../../services/userService"; // Caminho do seu serviço
import { userRepository } from "../../repository/userRepository";

import { activityTypesRepository } from "../../repository/activityTypesRepository";
import { preferenceRepository } from "../../repository/preferenceRepository";

jest.mock("../../repository/userRepository");
jest.mock("../../services/s3Service");
jest.mock("../../repository/achivimentsRepository");
jest.mock("../../repository/activityTypesRepository");
jest.mock("../../repository/preferenceRepository");

describe("userService", () => {
  beforeEach(() => {
    // Limpando todos os mocks antes de cada teste, para garantir que não há dados antigos.
    jest.clearAllMocks();
  });
  describe("findAuthUser", () => {
    it("should return user data when user is found", async () => {
      const mockUser = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        cpf: "12345678901",
        avatar: "avatar.jpg",
        xp: 100,
        level: 1,
        achievements: [{ achievement: { name: "Test Achievement", criterion: "Test Criterion" } }],
        deletedAt: null,
      };

      (userRepository.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.findAuthUser("1");
      expect(result).toEqual({
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        cpf: "12345678901",
        avatar: "avatar.jpg",
        xp: 100,
        level: 1,
        achievements: [{ name: "Test Achievement", criterion: "Test Criterion" }],
        deletedAt: null,
      });
    });

    it("should throw an error if user is not found", async () => {
      (userRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(userService.findAuthUser("1")).rejects.toEqual({ error: "Usuário não encontrado.", status: 404 });
    });
  });

  describe("updateUserInfo", () => {
    it("should update user info if email is available", async () => {
      const mockUserData = { name: "John Doe", email: "john@example.com" };
      const mockUpdatedUser = { ...mockUserData, id: "1" };

      (userRepository.findByEmail as jest.Mock).mockResolvedValue(null); // Nenhum usuário com o e-mail
      (userRepository.updateUserInfo as jest.Mock).mockResolvedValue(mockUpdatedUser);

      const result = await userService.updateUserInfo("1", mockUserData);
      expect(result).toEqual(mockUpdatedUser);
    });

    it("should throw error if email is already in use by another user", async () => {
      const mockUserData = { name: "John Doe", email: "john@example.com" };
      const existingUser = { id: "2", email: "john@example.com" };

      (userRepository.findByEmail as jest.Mock).mockResolvedValue(existingUser); // Usuário com o e-mail já existe

      await expect(userService.updateUserInfo("1", mockUserData)).rejects.toEqual({
        error: "O e-mail informado ja pertence a outro usuário.",
        status: 409,
      });
    });
  });

  it("should throw error if no preference ID is provided", async () => {
    await expect(userService.defineUserPreferences("1", [])).rejects.toEqual({
      error: "Deve ser enviado pelo menos um ID de preferência.",
      status: 400,
    });
  });

  it("should throw error if one or more preference IDs are invalid", async () => {
    const typeIds = ["1", "3"];
    const validPreferences = [{ id: "1", name: "Preference 1", description: "Description 1" }];
    (activityTypesRepository.findOnes as jest.Mock).mockResolvedValue(validPreferences);

    await expect(userService.defineUserPreferences("1", typeIds)).rejects.toEqual({
      error: "Um ou mais Ids informados são inválidos.",
      status: 400,
    });
  });
});

describe("getUserPreferences", () => {
  it("should return user preferences", async () => {
    const mockPreferences = [
      { typeId: "1", type: { name: "Preference 1", description: "Description 1" } },
      { typeId: "2", type: { name: "Preference 2", description: "Description 2" } },
    ];

    (preferenceRepository.getUserPreferences as jest.Mock).mockResolvedValue(mockPreferences);

    const result = await userService.getUserPreferences("1");
    expect(result).toEqual([
      { typeId: "1", typeName: "Preference 1", typeDescription: "Description 1" },
      { typeId: "2", typeName: "Preference 2", typeDescription: "Description 2" },
    ]);
  });
});

describe("desactivateUser", () => {
  it("should deactivate the user", async () => {
    const mockUser = { id: "1", name: "John Doe", email: "john@example.com" };

    (userRepository.desactivateUser as jest.Mock).mockResolvedValue(mockUser);

    const result = await userService.desactivateUser("1");
    expect(result).toEqual(mockUser);
  });
});
