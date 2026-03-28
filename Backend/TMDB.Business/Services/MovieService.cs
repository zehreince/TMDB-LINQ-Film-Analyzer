using System.Net.Http.Json;
using System.Text.Json.Serialization;
using TMDB.Business.DTOs;

namespace TMDB.Business.Services;

public class MovieService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey = "5bf3cf2e2bb6e19328a87f023098ac95"; 
    private readonly string _baseUrl = "https://api.themoviedb.org/3";

    public MovieService()
    {
        _httpClient = new HttpClient();
    }

    // TMDB'den Popüler Filmleri Çeken Asenkron Metot
    public async Task<List<MovieDto>> GetPopularMoviesAsync()
    {
        var url = $"{_baseUrl}/movie/popular?api_key={_apiKey}&language=tr-TR";
        var response = await _httpClient.GetFromJsonAsync<TmdbResponse>(url);

        if (response == null || response.Results == null) 
            return new List<MovieDto>();

        return response.Results.Select(t => new MovieDto
        {
            Id = t.Id,
            Title = t.Title,
            ReleaseYear = !string.IsNullOrEmpty(t.ReleaseDate) && t.ReleaseDate.Length >= 4 ? int.Parse(t.ReleaseDate.Substring(0, 4)) : 0,
            ImdbRating = t.VoteAverage,
            Director = "Bilinmiyor", 
            Genre = "Bilinmiyor", 
            PosterUrl = t.PosterPath 
        }).ToList();
    }
}

public class TmdbResponse
{
    [JsonPropertyName("results")]
    public List<TmdbMovie> Results { get; set; }
}

public class TmdbMovie
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    
    [JsonPropertyName("title")]
    public string Title { get; set; }
    
    [JsonPropertyName("vote_average")]
    public double VoteAverage { get; set; }
    
    [JsonPropertyName("release_date")]
    public string ReleaseDate { get; set; }

    [JsonPropertyName("poster_path")]
    public string PosterPath { get; set; }
}