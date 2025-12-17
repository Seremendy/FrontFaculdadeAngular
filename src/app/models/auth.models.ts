export interface LoginRequest {
    login: string;
    senha: string;
}

export interface LoginResponse {
    token: string;
    // Removemos usuario e role pois o Backend NÃO devolve mais isso no corpo do login
}

export interface RegisterRequest {
    login: string;
    senha: string;
    role: string;
}