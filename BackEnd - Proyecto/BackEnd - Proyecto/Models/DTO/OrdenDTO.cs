namespace BackEnd___Proyecto.Models.DTO
{
    public class OrdenDTO
    {
        public int OrdenId { get; set; }

        public string? Nombre { get; set; }

        public string? Apellido { get; set; }

        public string? Email { get; set; }

        public decimal? CostoEnvio { get; set; }

        public decimal? Total { get; set; }

        public string? Direccion1 { get; set; }

        public string? Direccion2 { get; set; }

        public int? EstadoId { get; set; }

        public int? UsuarioId { get; set; }
        
    }
}
