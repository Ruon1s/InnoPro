export interface SignUpValues {
    email: string;
    fullName: string;
    password: string;
    confirmPassword: string;
}

export interface SignInValues {
    email: string;
    password: string;
}

export interface MarkerValues {
    description: string;
}

export interface UpdateUserValues {
    email: string;
    fullName: string;
    avatarUrl?: string | undefined;
}

export interface GroupMessageValues {
    title: string;
    message: string;
}
