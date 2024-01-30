using System;
using System.Collections.Generic;

namespace BackEnd___Proyecto.Models;

public partial class Item
{
    public int ItemId { get; set; }

    public int? Cantidad { get; set; }

    public DateTime? FechaRegistro { get; set; }

    public int? UsuarioId { get; set; }

    public int? ProductoId { get; set; }

    public int? OrdenId { get; set; }

    public int? EstadoId { get; set; }

    public virtual Estado? Estado { get; set; }

    public virtual Orden? Orden { get; set; }

    public virtual Producto? Producto { get; set; }

    public virtual Usuario? Usuario { get; set; }
}
