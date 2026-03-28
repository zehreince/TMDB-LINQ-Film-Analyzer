namespace TMDB.Business.DTOs;

public class MovieDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Director { get; set; }
    public int ReleaseYear { get; set; }
    public double ImdbRating { get; set; }
    public string Genre { get; set; }

    public string? PosterUrl { get; set; }
}