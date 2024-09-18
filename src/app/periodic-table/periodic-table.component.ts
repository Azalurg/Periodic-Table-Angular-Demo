import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { getPeriodicTableData } from '../api/api';
import { CommonModule } from '@angular/common';
import {
  EditElementComponent,
  PeriodicElementEdit,
} from '../edit-element/edit-element.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatDialogModule],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss',
})
export class PeriodicTableComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = [];
  isLoading = true;
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    getPeriodicTableData().then((data) => {
      this.dataSource = data;
      this.isLoading = false;
    });
  }

  openEditPopup(element: PeriodicElement) {
    const index = this.dataSource.findIndex(
      (e) => e.position === element.position
    );
    const dialogRef = this.dialog.open(EditElementComponent, {
      data: { ...element, index },
    });

    dialogRef.afterClosed().subscribe((result: PeriodicElementEdit) => {
      if (result) {
        const { index, ...updatedElement } = result;
        this.dataSource = [
          ...this.dataSource.slice(0, index),
          { ...updatedElement },
          ...this.dataSource.slice(index + 1),
        ];
      }
    });
  }
}
