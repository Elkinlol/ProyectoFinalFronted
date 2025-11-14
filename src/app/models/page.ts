export interface Page<T> {
  content: T[];
  pageable?: any;
  last?: boolean;
  totalPages: number;
  totalElements?: number;
  size?: number;
  number: number; // número de página que viene del backend
  sort?: any;
  first?: boolean;
  numberOfElements?: number;
  empty?: boolean;
}
