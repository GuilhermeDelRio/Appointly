namespace Appointly.Domain.Exceptions;

public class OutOfRangeException : Exception
{
    public OutOfRangeException(string message) 
        : base(message) { }

    public OutOfRangeException(string message, Exception innerException) 
        : base(message, innerException) { }
}