export function mapEnumValue<T extends Record<string, string>>(
  enumType: T,
  input: string | null
): T[keyof T] | undefined {
  if (!input) return undefined;

  if (Object.values(enumType).includes(input as T[keyof T])) {
    return input as T[keyof T];
  }

  if (input in enumType) {
    return enumType[input as keyof T];
  }

  return undefined;
}
