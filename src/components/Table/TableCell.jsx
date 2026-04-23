import { STATUS_COLORS, PRIORITY_COLORS } from './constants';

function Badge({ bg, text, label }) {
  return (
    <span style={{ background: bg, color: text, padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap' }}>
      {label}
    </span>
  );
}

function ProgressBar({ value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#e5e7eb', overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', borderRadius: 3, background: value >= 80 ? '#22c55e' : value >= 40 ? '#3b82f6' : '#f59e0b' }} />
      </div>
      <span style={{ fontSize: 11, color: '#6b7280', minWidth: 28 }}>{value}%</span>
    </div>
  );
}

function Tags({ tags }) {
  return (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      {tags.map(tag => (
        <span key={tag} style={{ background: '#f1f5f9', color: '#475569', fontSize: 11, padding: '1px 6px', borderRadius: 10, border: '1px solid #e2e8f0' }}>
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function TableCell({ colId, value }) {
  if (colId === 'status') {
    const c = STATUS_COLORS[value] ?? { bg: '#f3f4f6', text: '#374151' };
    return <Badge bg={c.bg} text={c.text} label={value} />;
  }
  if (colId === 'priority') {
    const c = PRIORITY_COLORS[value] ?? { bg: '#f3f4f6', text: '#374151' };
    return <Badge bg={c.bg} text={c.text} label={value} />;
  }
  if (colId === 'progress') return <ProgressBar value={value} />;
  if (colId === 'tags') return <Tags tags={value} />;
  if (colId === 'dueDate') return <span style={{ fontSize: 13, color: '#374151' }}>{value}</span>;
  return <span style={{ fontSize: 13, color: '#374151' }}>{value}</span>;
}
