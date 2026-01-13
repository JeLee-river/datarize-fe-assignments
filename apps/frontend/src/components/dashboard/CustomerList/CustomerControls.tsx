import { ChangeEvent, KeyboardEvent } from 'react';
import styles from './CustomerControls.module.css';

export type SortOption = 'default' | 'asc' | 'desc';

interface CustomerControlsProps {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onSearchKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  sortOption: SortOption;
  onSortChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const CustomerControls = ({
  searchInput,
  onSearchInputChange,
  onSearchKeyDown,
  sortOption,
  onSortChange,
}: CustomerControlsProps) => {
  return (
    <div className={styles.controls}>
      <div className={styles.searchBar}>
        <span className={styles.searchIcon} aria-hidden="true">
          <img src="/search.svg" alt="" className={styles.searchIconImage} />
        </span>
        <input
          type="text"
          placeholder="고객 이름 검색..."
          className={styles.searchInput}
          value={searchInput}
          onChange={(event) => onSearchInputChange(event.target.value)}
          onKeyDown={onSearchKeyDown}
        />
      </div>
      <label className={styles.sortFilter}>
        <select className={styles.sortSelect} value={sortOption} onChange={onSortChange}>
          <option value="default">기본 (ID 오름차순)</option>
          <option value="asc">구매 금액 낮은순</option>
          <option value="desc">구매 금액 높은순</option>
        </select>
      </label>
    </div>
  );
};

export default CustomerControls;
