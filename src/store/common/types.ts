export interface AuthData {
    cdUsuario: number,
    nome: string,
    cdPerfil: number,
    token: string,
    tokenKeycloack: string|null
}

export interface AuthDataResponse {
    usuario: Omit<AuthData, 'token'>,
    token: string
}

export interface SnackbarMessage {
    show: boolean,
    message: string,
    type: string,
    timeout: number,
}

export interface ShowMessageMutation {
    message: string,
    timeout?: number,
    type?: 'default' | 'error' | 'info' | 'success' | '#015b41',
}