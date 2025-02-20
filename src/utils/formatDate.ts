export const formatDate = (date: string | undefined) => {
    if (!date) return;
    const formattedDate = new Date(date)
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };

    return new Intl.DateTimeFormat("en-US", options).format(formattedDate); // "MMMM dd, yyyy"
};
