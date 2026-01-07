type DateFormat = 'short' | 'monthYear';

/**
 * Formats a date string or Date object
 * @param date - ISO date string or Date object
 * @param format - 'short' (e.g., "1/7/2025") or 'monthYear' (e.g., "Jan 2025")
 * @returns Formatted date string, or empty string if date is invalid
 */
export function formatDate(
	date: string | Date | undefined | null,
	format: DateFormat = 'monthYear',
): string {
	if (!date) return '';

	const dateObj = typeof date === 'string' ? new Date(date) : date;

	if (format === 'monthYear') {
		return dateObj.toLocaleDateString('en-US', {
			month: 'short',
			year: 'numeric',
		});
	}

	return dateObj.toLocaleDateString();
}
