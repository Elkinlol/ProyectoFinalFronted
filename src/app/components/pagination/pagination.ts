import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  
  currentPage = input<number>(0);
  totalPages = input<number>(0);
  pageChange = output<number>();

  previousPage(): void {
    if (this.currentPage() > 0) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() + 1 < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }
}


