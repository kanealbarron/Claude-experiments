export default function SortIcon({ direction }) {
  if (!direction) return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.3 }}>
      <path d="M6 2L9 5H3L6 2Z" fill="currentColor" />
      <path d="M6 10L3 7H9L6 10Z" fill="currentColor" />
    </svg>
  );
  if (direction === 'asc') return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 2L9 6H3L6 2Z" fill="currentColor" />
      <path d="M6 10L3 7H9L6 10Z" fill="currentColor" opacity="0.3" />
    </svg>
  );
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 2L9 6H3L6 2Z" fill="currentColor" opacity="0.3" />
      <path d="M6 10L3 7H9L6 10Z" fill="currentColor" />
    </svg>
  );
}
