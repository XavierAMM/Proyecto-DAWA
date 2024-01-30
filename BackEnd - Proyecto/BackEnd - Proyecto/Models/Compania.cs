using System;
using System.Collections.Generic;

namespace BackEnd___Proyecto.Models;

public partial class Compania
{
    public int CompaniaId { get; set; }

    public string? NombreCompania { get; set; }

    public string? Ruc { get; set; }

    public string? Descripcion { get; set; }

    public string? RazonSocial { get; set; }

    public string? DireccionMatriz { get; set; }

    public string? UrlImg { get; set; }

    public DateTime? FechaRegistro { get; set; }

    public int? EstadoId { get; set; }

    public virtual Estado? Estado { get; set; }
}
