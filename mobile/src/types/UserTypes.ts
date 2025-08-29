import { IntersectThree } from "phosphor-react-native";

export interface UserResponse {
    token: string;
    id: string;
    name: string;
    cpf: string;
    email: string;
    avatar: string;
    xp: number;
    level: number;
    achievements: Achievement[];
}

export interface Achievement {
    name: string;
    criterion: string;
}

export interface UserType {
    id: string;
    name: string;
    email: string;
    cpf: string;
    avatar: string;
    xp: number;
    level: number;
    achievements: Achievement[];
}



export interface UserEditData {
    name: string;
    email: string;
    cpf: string;
}