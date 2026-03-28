using Microsoft.AspNetCore.Mvc;
using TMDB.Business.Services;

namespace TMDB.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly MovieService _movieService;

    public MoviesController(MovieService movieService)
    {
        _movieService = movieService;
    }

    [HttpGet("popular")]
    public async Task<IActionResult> GetPopularMovies([FromQuery] int page = 1)
    {
        var movies = await _movieService.GetPopularMoviesAsync(page);
        return Ok(movies);
    }

    [HttpGet("now-playing")]
    public async Task<IActionResult> GetNowPlayingMovies()
    {
        var movies = await _movieService.GetNowPlayingMoviesAsync();
        return Ok(movies);
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchMovies([FromQuery] string query, [FromQuery] int page = 1)
    {
        var movies = await _movieService.SearchMoviesAsync(query, page);
        return Ok(movies);
    }
}