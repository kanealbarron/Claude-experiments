import { useState, useMemo } from 'react';
import DataTable from './components/Table/DataTable';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import ColumnManager from './components/ColumnManager/ColumnManager';
import { COLUMNS, ROWS } from './data/sampleData';
import styles from './App.module.css';

const EMPTY_FILTERS = {
  status: [],
  priority: [],
  assignee: '',
  progress: {},
  dueDate: {},
  category: [],
  tags: '',
};

export default function App() {
  const [columns, setColumns] = useState(COLUMNS);
  const [showColumnMgr, setShowColumnMgr] = useState(false);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [search, setSearch] = useState('');

  // Attach reorder as a method so DataTable can call columns.reorder(fromIdx, toIdx)
  const columnAPI = useMemo(() => {
    const arr = [...columns];
    arr.reorder = (fromIdx, toIdx) => {
      setColumns(prev => {
        const visible = prev.filter(c => c.visible);
        const moved = visible[fromIdx];
        const target = visible[toIdx];
        const next = [...prev];
        const fi = next.findIndex(c => c.id === moved.id);
        next.splice(fi, 1);
        const ti = next.findIndex(c => c.id === target.id);
        next.splice(ti >= 0 ? ti : fi, 0, moved);
        return next;
      });
    };
    return arr;
  }, [columns]);

  function toggleColumn(id) {
    setColumns(prev => prev.map(c => c.id === id ? { ...c, visible: !c.visible } : c));
  }

  function setFilter(id, val) {
    setFilters(prev => ({ ...prev, [id]: val }));
  }

  const filteredRows = useMemo(() => {
    return ROWS.filter(row => {
      if (search) {
        const q = search.toLowerCase();
        const hit = Object.values(row).some(v =>
          Array.isArray(v)
            ? v.some(t => t.toLowerCase().includes(q))
            : String(v).toLowerCase().includes(q)
        );
        if (!hit) return false;
      }
      if (filters.status.length && !filters.status.includes(row.status)) return false;
      if (filters.priority.length && !filters.priority.includes(row.priority)) return false;
      if (filters.category.length && !filters.category.includes(row.category)) return false;
      if (filters.assignee && !row.assignee.toLowerCase().includes(filters.assignee.toLowerCase())) return false;
      if (filters.tags && !row.tags.some(t => t.toLowerCase().includes(filters.tags.toLowerCase()))) return false;
      if (filters.progress.min !== undefined && row.progress < filters.progress.min) return false;
      if (filters.progress.max !== undefined && row.progress > filters.progress.max) return false;
      if (filters.dueDate.from && row.dueDate < filters.dueDate.from) return false;
      if (filters.dueDate.to && row.dueDate > filters.dueDate.to) return false;
      return true;
    });
  }, [filters, search]);

  const activeFilterCount = Object.values(filters).filter(v =>
    Array.isArray(v) ? v.length : typeof v === 'object' ? Object.values(v).some(Boolean) : !!v
  ).length;

  return (
    <div className={styles.app}>
      <header className={styles.topbar}>
        <div className={styles.topLeft}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⊞</span>
            <span className={styles.logoText}>BaseView</span>
          </div>
          <span className={styles.divider} />
          <span className={styles.tableName}>Project Tasks</span>
        </div>
        <div className={styles.topRight}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>⌕</span>
            <input
              className={styles.searchInput}
              placeholder="Search all fields…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className={styles.clearSearch} onClick={() => setSearch('')}>✕</button>
            )}
          </div>
          <button
            className={`${styles.toolbarBtn} ${showColumnMgr ? styles.toolbarBtnActive : ''}`}
            onClick={() => setShowColumnMgr(v => !v)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <rect x="9" y="1" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Fields
            <span className={styles.pillCount}>{columns.filter(c => c.visible).length}/{columns.length}</span>
          </button>
          {activeFilterCount > 0 && (
            <span className={styles.filterIndicator}>
              {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
            </span>
          )}
        </div>
      </header>

      {showColumnMgr && (
        <ColumnManager
          columns={columns}
          onToggle={toggleColumn}
          onClose={() => setShowColumnMgr(false)}
        />
      )}

      <div className={styles.content}>
        <FilterSidebar
          filters={filters}
          onChange={setFilter}
          onReset={() => setFilters(EMPTY_FILTERS)}
        />
        <div className={styles.tableArea}>
          <div className={styles.tableToolbar}>
            <span className={styles.rowCount}>
              {filteredRows.length} record{filteredRows.length !== 1 ? 's' : ''}
              {filteredRows.length !== ROWS.length && (
                <span className={styles.rowCountSub}> of {ROWS.length}</span>
              )}
            </span>
          </div>
          <DataTable columns={columnAPI} rows={filteredRows} />
        </div>
      </div>
    </div>
  );
}
