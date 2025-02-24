namespace Appointly.Domain.Exceptions;

public class OutOfRageException : Exception
{
    public OutOfRageException(string message) 
        : base(message) { }

    public OutOfRageException(string message, Exception innerException) 
        : base(message, innerException) { }
}