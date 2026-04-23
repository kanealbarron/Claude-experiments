import { useState, useMemo, useRef } from 'react';
import SortIcon from './SortIcon';
import TableCell from './TableCell';
import styles from './DataTable.module.css';

export default function DataTable({ columns, rows }) {
  const [sort, setSort] = useState({ col: null, dir: null });
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const dragItem = useRef(null);

  const visibleCols = columns.filter(c => c.visible);

  const sortedRows = useMemo(() => {
    if (!sort.col) return rows;
    return [...rows].sort((a, b) => {
      const av = a[sort.col];
      const bv = b[sort.col];
      if (av == null) return 1;
      if (bv == null) return -1;
      let cmp = av < bv ? -1 : av > bv ? 1 : 0;
      if (sort.col === 'dueDate') cmp = av.localeCompare(bv);
      return sort.dir === 'asc' ? cmp : -cmp;
    });
  }, [rows, sort]);

  function handleSort(colId) {
    setSort(prev => {
      if (prev.col !== colId) return { col: colId, dir: 'asc' };
      if (prev.dir === 'asc') return { col: colId, dir: 'desc' };
      return { col: null, dir: null };
    });
  }

  function onDragStart(e, idx) {
    dragItem.current = idx;
    setDragging(idx);
    e.dataTransfer.effectAllowed = 'move';
  }
  function onDragOver(e, idx) {
    e.preventDefault();
    setDragOver(idx);
  }
  function onDrop(e, targetIdx) {
    e.preventDefault();
    if (dragItem.current === null || dragItem.current === targetIdx) {
      setDragging(null); setDragOver(null); return;
    }
    columns.reorder(dragItem.current, targetIdx);
    setDragging(null); setDragOver(null);
    dragItem.current = null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.rowNumTh}>#</th>
              {visibleCols.map((col, idx) => (
                <th
                  key={col.id}
                  className={`${styles.th} ${dragging === idx ? styles.dragging : ''} ${dragOver === idx ? styles.dragOver : ''}`}
                  style={{ minWidth: col.width }}
                  draggable
                  onDragStart={e => onDragStart(e, idx)}
                  onDragOver={e => onDragOver(e, idx)}
                  onDrop={e => onDrop(e, idx)}
                  onDragEnd={() => { setDragging(null); setDragOver(null); }}
                >
                  <button className={styles.headerBtn} onClick={() => handleSort(col.id)}>
                    <span className={styles.dragHandle}>⠿</span>
                    <span>{col.label}</span>
                    <SortIcon direction={sort.col === col.id ? sort.dir : null} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.length === 0 ? (
              <tr>
                <td colSpan={visibleCols.length + 1} className={styles.emptyRow}>
                  No records match the current filters
                </td>
              </tr>
            ) : sortedRows.map((row, i) => (
              <tr key={row.id} className={styles.tr}>
                <td className={styles.rowNum}>{i + 1}</td>
                {visibleCols.map(col => (
                  <td key={col.id} className={styles.td}>
                    <TableCell colId={col.id} value={row[col.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
