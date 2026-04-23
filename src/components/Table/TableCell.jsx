import { STATUS_COLORS, PRIORITY_COLORS } from './constants';

function Badge({ bg, text, label }) {
  return (
    <span style={{
      background: bg,
      color: text,
      padding: '2px 8px',
      borderRadius: 3,
      fontSize: 12,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      display: 'inline-block',
      letterSpacing: '0.01em',
    }}>
      {label}
    </span>
  );
}

function ProgressBar({ value }) {
  const color = value >= 80 ? '#068a6c' : value >= 40 ? '#2d7ff9' : '#f59e0b';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <div style={{ flex: 1, height: 5, borderRadius: 3, background: '#e8ecf2', overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', borderRadius: 3, background: color, transition: 'width 0.3s' }} />
      </div>
      <span style={{ fontSize: 11, color: '#8b8fa4', minWidth: 28, fontWeight: 500 }}>{value}%</span>
    </div>
  );
}

function Tags({ tags }) {
  return (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      {tags.map(tag => (
        <span key={tag} style={{
          background: '#f2f4f8',
          color: '#3d4153',
          fontSize: 11,
          fontWeight: 500,
          padding: '1px 7px',
          borderRadius: 10,
          border: '1px solid #dde1e6',
        }}>
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function TableCell({ colId, value }) {
  if (colId === 'status') {
    const c = STATUS_COLORS[value] ?? { bg: '#ebebeb', text: '#555555' };
    return <Badge bg={c.bg} text={c.text} label={value} />;
  }
  if (colId === 'priority') {
    const c = PRIORITY_COLORS[value] ?? { bg: '#ebebeb', text: '#555555' };
    return <Badge bg={c.bg} text={c.text} label={value} />;
  }
  if (colId === 'progress') return <ProgressBar value={value} />;
  if (colId === 'tags') return <Tags tags={value} />;
  if (colId === 'dueDate') return (
    <span style={{ fontSize: 13, color: '#3d4153', fontWeight: 400 }}>{value}</span>
  );
  return <span style={{ fontSize: 13, color: '#3d4153' }}>{value}</span>;
}
