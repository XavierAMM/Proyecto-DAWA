using System;
using System.Collections.Generic;

namespace BackEnd___Proyecto.Models;

public partial class Orden
{
    public int OrdenId { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Email { get; set; }

    public decimal? CostoEnvio { get; set; }

    public decimal? Total { get; set; }

    public string? TokenOrden { get; set; }

    public string? Direccion1 { get; set; }

    public string? Direccion2 { get; set; }

    public DateTime? Fecha { get; set; }

    public int? EstadoId { get; set; }

    public int? UsuarioId { get; set; }

    public virtual Estado? Estado { get; set; }

    public virtual ICollection<Item> Items { get; set; } = new List<Item>();

    public virtual Usuario? Usuario { get; set; }
}
