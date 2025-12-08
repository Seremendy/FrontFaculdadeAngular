export interface LoginRequest {
    login: string;
    senha: string;
}

export interface LoginResponse {
    token: string;
    // Se sua API retornar mais coisas (ex: nome, role), adicione aqui
    usuario?: string;
    role?: string;
}