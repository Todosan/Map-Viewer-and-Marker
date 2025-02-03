using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

[ApiController]
[Route("api/markers")]
public class MarkersController : ControllerBase
{
    private readonly AppDbContext _context;

    public MarkersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetMarkers()
    {
        return Ok(_context.Markers.ToList());
    }

    [HttpPost]
    public IActionResult AddMarker([FromBody] Marker marker)
    {
        _context.Markers.Add(marker);
        _context.SaveChanges();
        return Ok(marker);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteMarker(int id)
    {
        var marker = _context.Markers.Find(id);
        if (marker == null) return NotFound();
        _context.Markers.Remove(marker);
        _context.SaveChanges();
        return Ok();
    }
}
