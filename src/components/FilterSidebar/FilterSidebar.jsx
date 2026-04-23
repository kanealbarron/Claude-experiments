import { useState } from 'react';
import styles from './FilterSidebar.module.css';
import { STATUS_OPTIONS, PRIORITY_OPTIONS, CATEGORY_OPTIONS } from '../../data/sampleData';

const FILTER_DEFS = [
  {
    id: 'status',
    label: 'Status',
    type: 'multiselect',
    options: STATUS_OPTIONS,
  },
  {
    id: 'priority',
    label: 'Priority',
    type: 'multiselect',
    options: PRIORITY_OPTIONS,
  },
  {
    id: 'assignee',
    label: 'Assignee',
    type: 'text',
  },
  {
    id: 'progress',
    label: 'Progress',
    type: 'range',
    min: 0,
    max: 100,
  },
  {
    id: 'dueDate',
    label: 'Due Date',
    type: 'daterange',
  },
  {
    id: 'category',
    label: 'Category',
    type: 'multiselect',
    options: CATEGORY_OPTIONS,
  },
  {
    id: 'tags',
    label: 'Tags',
    type: 'text',
  },
];

export default function FilterSidebar({ filters, onChange, onReset }) {
  const [collapsed, setCollapsed] = useState({});

  function toggle(id) {
    setCollapsed(p => ({ ...p, [id]: !p[id] }));
  }

  const activeCount = Object.values(filters).filter(v => {
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'object' && v !== null) return v.min !== undefined || v.max !== undefined || v.from || v.to;
    return v !== '';
  }).length;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <span className={styles.sidebarTitle}>Filters</span>
        {activeCount > 0 && (
          <span className={styles.badge}>{activeCount}</span>
        )}
        {activeCount > 0 && (
          <button className={styles.resetBtn} onClick={onReset}>Clear all</button>
        )}
      </div>

      {FILTER_DEFS.map(def => (
        <FilterSection
          key={def.id}
          def={def}
          value={filters[def.id]}
          onChange={val => onChange(def.id, val)}
          collapsed={!!collapsed[def.id]}
          onToggle={() => toggle(def.id)}
        />
      ))}
    </aside>
  );
}

function FilterSection({ def, value, onChange, collapsed, onToggle }) {
  const hasValue = Array.isArray(value)
    ? value.length > 0
    : typeof value === 'object' && value !== null
    ? Object.values(value).some(Boolean)
    : !!value;

  return (
    <div className={styles.section}>
      <button className={styles.sectionHeader} onClick={onToggle}>
        <span className={styles.sectionLabel}>
          {def.label}
          {hasValue && <span className={styles.dot} />}
        </span>
        <span className={`${styles.chevron} ${collapsed ? styles.chevronCollapsed : ''}`}>›</span>
      </button>

      {!collapsed && (
        <div className={styles.sectionBody}>
          {def.type === 'multiselect' && (
            <MultiSelect options={def.options} value={value ?? []} onChange={onChange} />
          )}
          {def.type === 'text' && (
            <input
              className={styles.textInput}
              placeholder={`Search ${def.label.toLowerCase()}…`}
              value={value ?? ''}
              onChange={e => onChange(e.target.value)}
            />
          )}
          {def.type === 'range' && (
            <RangeFilter min={def.min} max={def.max} value={value ?? {}} onChange={onChange} />
          )}
          {def.type === 'daterange' && (
            <DateRangeFilter value={value ?? {}} onChange={onChange} />
          )}
        </div>
      )}
    </div>
  );
}

function MultiSelect({ options, value, onChange }) {
  function toggle(opt) {
    onChange(
      value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt]
    );
  }
  return (
    <div className={styles.optionList}>
      {options.map(opt => (
        <label key={opt} className={styles.optionRow}>
          <input
            type="checkbox"
            checked={value.includes(opt)}
            onChange={() => toggle(opt)}
            className={styles.checkbox}
          />
          <span className={styles.optionLabel}>{opt}</span>
        </label>
      ))}
    </div>
  );
}

function RangeFilter({ min, max, value, onChange }) {
  const lo = value.min ?? min;
  const hi = value.max ?? max;
  return (
    <div className={styles.rangeWrap}>
      <div className={styles.rangeRow}>
        <label className={styles.rangeLabel}>Min</label>
        <input
          type="number"
          min={min}
          max={max}
          value={lo}
          onChange={e => onChange({ ...value, min: Number(e.target.value) })}
          className={styles.numInput}
        />
      </div>
      <div className={styles.rangeRow}>
        <label className={styles.rangeLabel}>Max</label>
        <input
          type="number"
          min={min}
          max={max}
          value={hi}
          onChange={e => onChange({ ...value, max: Number(e.target.value) })}
          className={styles.numInput}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={lo}
        onChange={e => onChange({ ...value, min: Number(e.target.value) })}
        className={styles.slider}
      />
    </div>
  );
}

function DateRangeFilter({ value, onChange }) {
  return (
    <div className={styles.dateWrap}>
      <label className={styles.rangeLabel}>From</label>
      <input
        type="date"
        value={value.from ?? ''}
        onChange={e => onChange({ ...value, from: e.target.value })}
        className={styles.dateInput}
      />
      <label className={styles.rangeLabel}>To</label>
      <input
        type="date"
        value={value.to ?? ''}
        onChange={e => onChange({ ...value, to: e.target.value })}
        className={styles.dateInput}
      />
    </div>
  );
}
