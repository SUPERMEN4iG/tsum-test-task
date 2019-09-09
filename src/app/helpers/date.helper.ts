export function getAgeFromDate(date: string | number | Date) {
    const birth = new Date(date);
    const now = new Date();
    const beforeBirth = (
        (() => {
            birth.setDate(now.getDate());
            birth.setMonth(now.getMonth());
            return birth.getTime();
        })() < birth.getTime()) ? 0 : 1;
    return now.getFullYear() - birth.getFullYear() - beforeBirth;
}
