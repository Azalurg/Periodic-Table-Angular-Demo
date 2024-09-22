import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, startWith, Subject, map, endWith } from 'rxjs';

import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
  styleUrls: ['./periodic-table.component.scss'],
})
export class PeriodicTableComponent {
  private filterInputSubject = new Subject<string>();

  private state = rxState<{
    dataSource: PeriodicElement[];
    filteredData: PeriodicElement[];
    filterValue: string;
    isLoading: boolean;
  }>(({ set, connect }) => {
    set({ dataSource: [], filteredData: [], isLoading: true, filterValue: '' });

    connect(
      getPeriodicTableData().pipe(
        map((data) => ({
          dataSource: data,
          filteredData: data,
        })),
        startWith({ isLoading: true }),
        endWith({ isLoading: false })
      )
    );

    connect(
      'filteredData',
      this.filterInputSubject.pipe(
        debounceTime(2000),
        map((filterValue) => this.filterData(filterValue))
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

  onFilterInputChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterInputSubject.next(filterValue);
  }

  private filterData(filterValue: string): any[] {
    return this.state.get('dataSource').filter((element) => {
      return Object.values(element).some(
        (value) =>
          value !== null &&
          value !== undefined &&
          value.toString().toLowerCase().includes(filterValue)
      );
    });
  }
}
