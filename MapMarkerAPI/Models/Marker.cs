using System.ComponentModel.DataAnnotations;

public class Marker
{
    [Key]  // Primary key
    public int Id { get; set; }

    public string Name { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }
}
