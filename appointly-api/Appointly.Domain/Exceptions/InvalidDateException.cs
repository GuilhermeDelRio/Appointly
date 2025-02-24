namespace Appointly.Domain.Exceptions;

public class InvalidDateException : Exception
{
    public InvalidDateException(string message) 
        : base(message) { }

    public InvalidDateException(string message, Exception innerException) 
        : base(message, innerException) { }
}