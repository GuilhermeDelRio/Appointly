namespace Appointly.Application.Dtos.Common;

public class PageResponse<T>
{
    public List<T> Items { get; set; }
    public int TotalCount { get; set; }
}