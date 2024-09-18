import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PeriodicTableComponent } from './periodic-table/periodic-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PeriodicTableComponent,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'periodic-tabele';
}
