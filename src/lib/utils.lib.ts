export function filterNullableProperties(obj: Record<string, unknown>): Record<string, unknown> {
    return Object.entries(obj)
        .reduce((filtered: Record<string, unknown>, [ key, value ]) => {
            if (value !== undefined && value !== null) {
                filtered[key] = value;
            }
            return filtered;
        }, {});
}
