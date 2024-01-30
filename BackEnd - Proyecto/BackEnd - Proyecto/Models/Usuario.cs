using System;
using System.Collections.Generic;

namespace BackEnd___Proyecto.Models;

public partial class Usuario
{
    public int UsuarioId { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public int? Maxintentos { get; set; }

    public int? IntentosFallidos { get; set; }

    public int? EstadoId { get; set; }

    public int? RolId { get; set; }

    public virtual Estado? Estado { get; set; }

    public virtual ICollection<Item> Items { get; set; } = new List<Item>();

    public virtual ICollection<Orden> Ordens { get; set; } = new List<Orden>();

    public virtual Rol? Rol { get; set; }
}
