namespace Appointly.Domain.Exceptions;

public class NotFilledFieldsException : Exception
{
    public NotFilledFieldsException(string message) 
        : base(message) { }

    public NotFilledFieldsException(string message, Exception innerException) 
        : base(message, innerException) { }
}
