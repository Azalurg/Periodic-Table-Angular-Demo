import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';

import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { getPeriodicTableData } from '../api/api';
import {
  EditElementComponent,
  PeriodicElementEdit,
} from '../edit-element/edit-element.component';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
  ],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss',
})
export class PeriodicTableComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<PeriodicElement>;
  isLoading = true;
  readonly dialog = inject(MatDialog);
  private filterSubject = new Subject<string>();

  constructor() {
    this.dataSource = new MatTableDataSource();
    this.filterSubject.pipe(debounceTime(2000)).subscribe((filterValue) => {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    });
  }

  ngOnInit(): void {
    getPeriodicTableData().then((data) => {
      this.dataSource.data = data;
      this.isLoading = false;
    });
  }

  openEditPopup(element: PeriodicElement) {
    const index = this.dataSource.data.findIndex(
      (e) => e.position === element.position
    );
    const dialogRef = this.dialog.open(EditElementComponent, {
      data: { ...element, index },
    });

    dialogRef.afterClosed().subscribe((result: PeriodicElementEdit) => {
      if (result) {
        const { index, ...updatedElement } = result;
        this.dataSource.data = [
          ...this.dataSource.data.slice(0, index),
          { ...updatedElement },
          ...this.dataSource.data.slice(index + 1),
        ];
      }
    });
  }

  onFilterInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value;
    this.filterSubject.next(filterValue);
  }
}
