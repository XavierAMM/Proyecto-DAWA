using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BackEnd___Proyecto.Models;

public partial class ProyectoDWAContext : DbContext
{ 

    public ProyectoDWAContext(DbContextOptions<ProyectoDWAContext> options): base(options)
    {
    }

    public DbSet<CategoriaProducto> CategoriaProducto { get; set; }

    public DbSet<Compania> Compania { get; set; }

    public DbSet<Estado> Estado { get; set; }

    public DbSet<Item> Item { get; set; }

    public DbSet<MarcaProducto> MarcaProducto { get; set; }

    public DbSet<Orden> Orden { get; set; }

    public DbSet<Producto> Producto { get; set; }

    public DbSet<Rol> Rol { get; set; }

    public DbSet<Usuario> Usuario { get; set; }
}
