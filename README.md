# Periodic Table

Angular demo with Angular Material

## Overview

This project is an Angular-based application that displays a table of chemical elements from the periodic table. The application includes functionality for:

- Viewing a list of elements with their atomic number, name, atomic weight, and symbol.
- Simulating data fetching during application startup.
- Editing any field within a table record via a popup modal with inputs.
- Updating the table row upon confirmation of edits without mutating the data.

The application is built using Angular 18.2.2 and leverages Angular Material components to create a responsive, user-friendly UI.

## Requirements

- **Angular 18.2.2**
- **Angular Material** (https://material.angular.io/)

## Initial Data

The application starts with the following predefined dataset:

```typescript
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
```

## Project Setup

### Prerequisites

Ensure that you have Node.js and Angular CLI installed on your system.

1. Install Node.js: https://nodejs.org/
2. Install Angular CLI:

   ```bash
   npm install -g @angular/cli
   ```

3. Clone the repository.

   ```bash
   git clone https://github.com/Azalurg/Periodic-Table-Angular-Demo.git
   ```

4. Navigate to the project directory:

   ```bash
   cd Periodic-Table-Angular-Demo/
   ```

5. Install dependencies:

   ```bash
   npm install
   ```

6. Serve the application:

   ```bash
   ng serve
   ```

   The application will be available at `http://localhost:4200/`.
