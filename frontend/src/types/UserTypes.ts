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



