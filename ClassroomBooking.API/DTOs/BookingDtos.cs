public class BookingCreateDto
{
    public int ClassroomId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Purpose { get; set; }
}

public class BookingUpdateDto
{
    public DateTime? StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    public string Purpose { get; set; }
}

public class BookingResponseDto
{
    public int Id { get; set; }
    public int ClassroomId { get; set; }
    public string ClassroomName { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Purpose { get; set; }
    public BookingStatus Status { get; set; }
}
