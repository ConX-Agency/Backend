export class EnumProvider {
    public static toEnum<T>(enumObj: any, value: string): T[keyof T] | undefined {
        return (Object.values(enumObj) as string[]).includes(value) ? (value as T[keyof T]) : undefined;
    }
}