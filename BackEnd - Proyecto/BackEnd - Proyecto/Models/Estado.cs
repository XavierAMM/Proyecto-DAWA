using System;
using System.Collections.Generic;

namespace BackEnd___Proyecto.Models;

public partial class Estado
{
    public int EstadoId { get; set; }

    public string? Descripcion { get; set; }

    public DateTime? FechaRegistro { get; set; }

    public virtual ICollection<CategoriaProducto> CategoriaProductos { get; set; } = new List<CategoriaProducto>();

    public virtual ICollection<Compania> Compania { get; set; } = new List<Compania>();

    public virtual ICollection<Item> Items { get; set; } = new List<Item>();

    public virtual ICollection<MarcaProducto> MarcaProductos { get; set; } = new List<MarcaProducto>();

    public virtual ICollection<Orden> Ordens { get; set; } = new List<Orden>();

    public virtual ICollection<Producto> Producto2s { get; set; } = new List<Producto>();

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
