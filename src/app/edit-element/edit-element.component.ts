import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { PeriodicElement } from '../periodic-table/periodic-table.component';
import { FormsModule } from '@angular/forms';

export interface PeriodicElementEdit extends PeriodicElement {
  index: number;
}

@Component({
  selector: 'app-edit-element',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule],
  templateUrl: './edit-element.component.html',
  styleUrl: './edit-element.component.scss'
})
export class EditElementComponent {
  constructor(
    public dialogRef: MatDialogRef<EditElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElementEdit
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}