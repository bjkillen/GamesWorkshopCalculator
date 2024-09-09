class StringExtension {
    public static toFixedWithoutZeros(num: number, precision: number) {
        return (+num).toFixed(precision).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1');
    }
}

export default StringExtension;