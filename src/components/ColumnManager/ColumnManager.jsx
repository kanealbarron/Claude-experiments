import { useState } from 'react';
import styles from './ColumnManager.module.css';

export default function ColumnManager({ columns, onToggle, onClose }) {
  const [search, setSearch] = useState('');

  const filtered = columns.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>Customise fields</span>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>
        <input
          className={styles.search}
          placeholder="Find a field..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoFocus
        />
        <div className={styles.list}>
          {filtered.map(col => (
            <label key={col.id} className={styles.row}>
              <input
                type="checkbox"
                checked={col.visible}
                onChange={() => onToggle(col.id)}
                className={styles.checkbox}
              />
              <span className={styles.icon}>{typeIcon(col.type)}</span>
              <span className={styles.label}>{col.label}</span>
            </label>
          ))}
        </div>
        <div className={styles.footer}>
          <button className={styles.footerBtn} onClick={() => columns.forEach(c => !c.visible && onToggle(c.id))}>
            Show all
          </button>
          <button className={styles.footerBtn} onClick={() => columns.forEach(c => c.visible && onToggle(c.id))}>
            Hide all
          </button>
        </div>
      </div>
    </div>
  );
}

function typeIcon(type) {
  const map = { text: 'Aa', select: '▾', number: '#', date: '📅', tags: '⊞' };
  return map[type] ?? '·';
}
