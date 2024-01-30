export interface Producto{
    productoId?: number,
    nombreProducto: string,
    descripcion: string,
    stock: number,
    urlImg: string,
    precioHora: number,
    precioAntes: number,
    marcaProductoId: number,
    categoriaProductoId: number,
    estadoId: number,
}