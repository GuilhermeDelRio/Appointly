namespace Appointly.Application.Dtos.PatientDTOs;

public class PageResponse<T>
{
    public List<T> Items { get; set; }
    public int TotalCount { get; set; }
}