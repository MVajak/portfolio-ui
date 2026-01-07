export function getTypeColor(type: string): string {
  switch (type) {
    case 'professional':
      return 'bg-accent-indigo';
    case 'leadership':
      return 'bg-accent-emerald';
    case 'entrepreneurship':
      return 'bg-accent-amber';
    default:
      return 'bg-accent-gray';
  }
}

export function getTypeLabel(type: string): string {
  switch (type) {
    case 'professional':
      return 'Professional';
    case 'leadership':
      return 'Leadership';
    case 'entrepreneurship':
      return 'Entrepreneurship';
    default:
      return 'Other';
  }
}
