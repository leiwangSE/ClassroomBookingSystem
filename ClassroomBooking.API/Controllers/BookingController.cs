using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;


[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BookingController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BookingController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("availability/{classroomId}")]
    public async Task<IActionResult> CheckAvailability(int classroomId, [FromQuery] DateTime date)
    {
        var bookings = await _context.Bookings
            .Where(b => b.ClassroomId == classroomId && 
                       b.StartTime.Date == date.Date && 
                       b.Status == BookingStatus.Active)
            .Select(b => new { b.StartTime, b.EndTime })
            .ToListAsync();

        return Ok(bookings);
    }

    [HttpGet("my-bookings")]
    public async Task<IActionResult> GetMyBookings()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        
        var bookings = await _context.Bookings
            .Include(b => b.Classroom)
            .Where(b => b.UserId == userId && b.Status == BookingStatus.Active)
            .Select(b => new BookingResponseDto
            {
                Id = b.Id,
                ClassroomId = b.ClassroomId,
                ClassroomName = b.Classroom.Name,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                Purpose = b.Purpose,
                Status = b.Status
            })
            .ToListAsync();

        return Ok(bookings);
    }

    [HttpPost]
    public async Task<IActionResult> CreateBooking([FromBody] BookingCreateDto bookingDto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

        // Check if classroom exists and is active
        var classroom = await _context.Classrooms
            .FirstOrDefaultAsync(c => c.Id == bookingDto.ClassroomId && c.IsActive);
        
        if (classroom == null)
        {
            return BadRequest("Classroom not found or inactive");
        }

        // Check for conflicts
        var hasConflict = await _context.Bookings
            .AnyAsync(b => b.ClassroomId == bookingDto.ClassroomId &&
                          b.Status == BookingStatus.Active &&
                          ((bookingDto.StartTime >= b.StartTime && bookingDto.StartTime < b.EndTime) ||
                           (bookingDto.EndTime > b.StartTime && bookingDto.EndTime <= b.EndTime) ||
                           (bookingDto.StartTime <= b.StartTime && bookingDto.EndTime >= b.EndTime)));

        if (hasConflict)
        {
            return BadRequest("Time slot is already booked");
        }

        var booking = new Booking
        {
            UserId = userId,
            ClassroomId = bookingDto.ClassroomId,
            StartTime = bookingDto.StartTime,
            EndTime = bookingDto.EndTime,
            Purpose = bookingDto.Purpose,
            Status = BookingStatus.Active,
            CreatedAt = DateTime.UtcNow
        };

        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        return Ok("Booking created successfully");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBooking(int id, [FromBody] BookingUpdateDto updateDto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        
        var booking = await _context.Bookings
            .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId && b.Status == BookingStatus.Active);

        if (booking == null)
        {
            return NotFound("Booking not found");
        }

        if (updateDto.StartTime.HasValue) booking.StartTime = updateDto.StartTime.Value;
        if (updateDto.EndTime.HasValue) booking.EndTime = updateDto.EndTime.Value;
        if (!string.IsNullOrEmpty(updateDto.Purpose)) booking.Purpose = updateDto.Purpose;
        
        booking.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok("Booking updated successfully");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> CancelBooking(int id)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        
        var booking = await _context.Bookings
            .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId && b.Status == BookingStatus.Active);

        if (booking == null)
        {
            return NotFound("Booking not found");
        }

        booking.Status = BookingStatus.Cancelled;
        booking.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok("Booking cancelled successfully");
    }

    [HttpGet("classrooms")]
    public async Task<IActionResult> GetClassrooms()
    {
        var classrooms = await _context.Classrooms
            .Where(c => c.IsActive)
            .ToListAsync();

        return Ok(classrooms);
    }
}