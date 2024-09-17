function sortByName(a: string | undefined, b: string | undefined): number {
    if (a != null && b != null) {
        return a.localeCompare(b, undefined, { sensitivity: 'base' });
    }

    if (a == null) {
        return -1;
    }

    if (b == null) {
        return 1;
    }

    return 0;
}

export default sortByName;