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

  private async Task<List<MovieDto>> FetchAndMapMoviesAsync(string url)
    {
        try
        {
            var genreUrl = $"{_baseUrl}/genre/movie/list?api_key={_apiKey}&language=tr-TR";
            var genreResponse = await _httpClient.GetFromJsonAsync<TmdbGenreResponse>(genreUrl);
            var genreMap = genreResponse?.Genres?.ToDictionary(g => g.Id, g => g.Name) ?? new Dictionary<int, string>();

            var response = await _httpClient.GetFromJsonAsync<TmdbResponse>(url);

            if (response == null || response.Results == null) 
                return new List<MovieDto>();

            var movieTasks = response.Results.Select(async t => 
            {
                var directorName = await GetDirectorAsync(t.Id);
                var genreName = t.GenreIds != null && t.GenreIds.Any() && genreMap.ContainsKey(t.GenreIds.First()) 
                                ? genreMap[t.GenreIds.First()] : "Bilinmiyor";

                return new MovieDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    ReleaseYear = !string.IsNullOrEmpty(t.ReleaseDate) && t.ReleaseDate.Length >= 4 ? int.Parse(t.ReleaseDate.Substring(0, 4)) : 0,
                    ImdbRating = t.VoteAverage,
                    Director = directorName,
                    Genre = genreName,
                    PosterUrl = t.PosterPath
                };
            });

            var movies = new List<MovieDto>();
            foreach (var task in movieTasks)
            {
                movies.Add(await task);
            }

            return movies;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"\n--- TMDB BAĞLANTI HATASI --- \n{ex.Message}\n--------------------------\n");
            return new List<MovieDto>();
        }
    }

    public async Task<List<MovieDto>> GetPopularMoviesAsync(int page = 1)
    {
        var url = $"{_baseUrl}/movie/popular?api_key={_apiKey}&language=tr-TR&page={page}";
        return await FetchAndMapMoviesAsync(url);
    }

    public async Task<List<MovieDto>> GetNowPlayingMoviesAsync()
    {
        var url = $"{_baseUrl}/movie/now_playing?api_key={_apiKey}&language=tr-TR&page=1";
        return await FetchAndMapMoviesAsync(url);
    }

    private async Task<string> GetDirectorAsync(int movieId)
    {
        try 
        {
            var url = $"{_baseUrl}/movie/{movieId}/credits?api_key={_apiKey}";
            var response = await _httpClient.GetFromJsonAsync<TmdbCreditsResponse>(url);
            var director = response?.Crew?.FirstOrDefault(c => c.Job == "Director");
            return director?.Name ?? "Bilinmiyor";
        } 
        catch 
        {
            return "Bilinmiyor";
        }
    }

    public async Task<List<MovieDto>> SearchMoviesAsync(string query, int page = 1)
    {
        if (string.IsNullOrWhiteSpace(query)) 
            return new List<MovieDto>();

        var url = $"{_baseUrl}/search/movie?api_key={_apiKey}&language=tr-TR&query={Uri.EscapeDataString(query)}&page={page}";
        return await FetchAndMapMoviesAsync(url);
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

    [JsonPropertyName("genre_ids")]
    public List<int> GenreIds { get; set; }
}

public class TmdbCreditsResponse
{
    [JsonPropertyName("crew")]
    public List<TmdbCrew> Crew { get; set; }
}

public class TmdbCrew
{
    [JsonPropertyName("name")]
    public string Name { get; set; }
    
    [JsonPropertyName("job")]
    public string Job { get; set; }
}

public class TmdbGenreResponse
{
    [JsonPropertyName("genres")]
    public List<TmdbGenre> Genres { get; set; }
}

public class TmdbGenre
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }
}