package appointly.com.appointly_api.utils;

import appointly.com.appointly_api.exceptions.InvalidEnumValueException;

public final class EnumUtils {
    public static <E extends Enum<E>> void validateIfEnumExists(Class<E> enumClass, String value) {
        try {
            Enum.valueOf(enumClass, value);
        } catch (IllegalArgumentException e) {
            throw new InvalidEnumValueException("Invalid value: " + value + " for enum: " + enumClass.getSimpleName(), e);
        }
    }
}
