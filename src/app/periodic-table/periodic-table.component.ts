import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { getPeriodicTableData } from '../api/api';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss'
})
export class PeriodicTableComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = [];
  isLoading = true;

  ngOnInit(): void {
    getPeriodicTableData().then(data => {
      this.dataSource = data;
      this.isLoading = false;
    });
  }
}
