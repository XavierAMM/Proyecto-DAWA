export interface Orden{
    ordenId?: number,
    nombre: string,
    apellido: string,
    email: string,
    costoEnvio: number,
    total: number,
    direccion1: string,
    direccion2?: string,
    estadoId?: number,
    usuarioId: number
}