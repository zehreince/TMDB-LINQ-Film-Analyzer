using Microsoft.AspNetCore.Mvc;
using TMDB.Business.Services;

namespace TMDB.API.Controllers;

// Bu sınıfın bir API Controller olduğunu ve adresinin "api/movies" olacağını belirtiyoruz
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
    public async Task<IActionResult> GetPopularMovies()
    {
        var movies = await _movieService.GetPopularMoviesAsync();
        
        return Ok(movies);
    }
}