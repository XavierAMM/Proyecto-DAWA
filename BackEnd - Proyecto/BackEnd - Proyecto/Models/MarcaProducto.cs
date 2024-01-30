using System;
using System.Collections.Generic;

namespace BackEnd___Proyecto.Models;

public partial class MarcaProducto
{
    public int MarcaProductoId { get; set; }

    public string? NombreMarca { get; set; }

    public DateTime? FechaRegistro { get; set; }

    public int? EstadoId { get; set; }

    public virtual Estado? Estado { get; set; }

    public virtual ICollection<Producto> Producto2s { get; set; } = new List<Producto>();
}
