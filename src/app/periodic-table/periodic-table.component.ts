import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, Observable, of, Subscription } from 'rxjs';
import { map, catchError, startWith, endWith } from 'rxjs';

import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { rxState, RxState } from '@rx-angular/state';
import { RxLet } from '@rx-angular/template/let';

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
    MatCardModule,
    RxLet,
  ],
  providers: [RxState],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss',
})
export class PeriodicTableComponent {
  private state = rxState<{
    dataSource: PeriodicElement[];
    filteredData: PeriodicElement[];
    filterValue: string;
    isLoading: boolean;
  }>(({ set, connect }) => {
    set({ dataSource: [], filteredData: [], isLoading: true});
    connect(
      getPeriodicTableData().pipe(
        map((data) => ({
          dataSource: data,
          filteredData: data,
        })),
        endWith({ isLoading: false })
      )
    );
  });

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  isLoading$ = this.state.select('isLoading');
  dataSource$ = this.state.select('filteredData');

  constructor(private dialog: MatDialog) {}

  openEditPopup(element: PeriodicElement) {
    const index = this.state
      .get('dataSource')
      .findIndex((e) => e.position === element.position);
    const dialogRef = this.dialog.open(EditElementComponent, {
      data: { ...element, index },
    });

    dialogRef.afterClosed().subscribe((result: PeriodicElementEdit) => {
      if (result) {
        const { index, ...updatedElement } = result;
        const updatedData = [
          ...this.state.get('dataSource').slice(0, index),
          { ...updatedElement },
          ...this.state.get('dataSource').slice(index + 1),
        ];

        this.state.set({ dataSource: updatedData, filteredData: updatedData });
      }
    });
  }

  onFilterInputChange(filterValue: string): void {
    // this.state.set({ filter: filterValue });
  }
}
