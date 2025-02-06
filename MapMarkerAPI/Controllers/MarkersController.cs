using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/markers")]
[ApiController]
public class MarkersController : ControllerBase
{
    private readonly AppDbContext _context;

    public MarkersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Marker>>> GetMarkers()
    {
        return _context.Markers.ToList();
    }

    [HttpPost]
    public async Task<ActionResult<Marker>> AddMarker(Marker marker)
    {
        _context.Markers.Add(marker);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetMarkers), new { id = marker.Id }, marker);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMarker(int id)
    {
        var marker = await _context.Markers.FindAsync(id);
        if (marker == null) return NotFound();

        _context.Markers.Remove(marker);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
