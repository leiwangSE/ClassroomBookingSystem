public class Booking
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ClassroomId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Purpose { get; set; }
    public BookingStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // Navigation properties
    public User User { get; set; }
    public Classroom Classroom { get; set; }
}

public enum BookingStatus
{
    Active = 1,
    Cancelled = 2,
    Completed = 3
}
