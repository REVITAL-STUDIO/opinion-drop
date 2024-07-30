export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

export function timeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);  
    const adjustedDate = new Date(date.getTime() - 4 * 60 * 60 * 1000); // 4 hours in milliseconds

    console.log("now date: ", now);
    console.log("comment date ", adjustedDate);
    const seconds = Math.floor((now.getTime() - adjustedDate.getTime()) / 1000);  // Time difference in seconds

    // Log values for debugging
    console.log("Current date (ms):", now.getTime());
    console.log("Comment date (ms):", adjustedDate.getTime());
    console.log("Time difference in seconds:", seconds);

    if (seconds < 0) {
        return 'Just now'; // Handle future dates if necessary
    }

    const intervalYears = Math.floor(seconds / 31536000); // 1 year = 31536000 seconds
    if (intervalYears >= 1) return `${intervalYears} year${intervalYears != 1 ? 's' : ''} ago`;

    const intervalMonths = Math.floor(seconds / 2592000); // 1 month = 2592000 seconds
    if (intervalMonths >= 1) return `${intervalMonths} month${intervalMonths != 1 ? 's' : ''} ago`;

    const intervalWeeks = Math.floor(seconds / 604800); // 1 week = 604800 seconds
    if (intervalWeeks >= 1) return `${intervalWeeks} week${intervalWeeks != 1 ? 's' : ''} ago`;

    const intervalDays = Math.floor(seconds / 86400); // 1 day = 86400 seconds
    if (intervalDays >= 1) return `${intervalDays} day${intervalDays != 1 ? 's' : ''} ago`;

    const intervalHours = Math.floor(seconds / 3600); // 1 hour = 3600 seconds
    if (intervalHours >= 1) return `${intervalHours} hour${intervalHours != 1 ? 's' : ''} ago`;

    const intervalMinutes = Math.floor(seconds / 60); // 1 minute = 60 seconds
    if (intervalMinutes >= 1) return `${intervalMinutes} minute${intervalMinutes != 1 ? 's' : ''} ago`;

    return `${Math.floor(seconds)} second${seconds != 1 ? 's' : ''} ago`;
}