/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DebugElement } from '@angular/core';
import { VehicleListComponent } from './vehicle-list.component';
import { VehicleService } from '../vehicle.service';
import { HttpClientModule } from '@angular/common/http';
import { Vehicle } from '../vehicle';


describe('VehicleListComponent', () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ VehicleListComponent ],
      providers: [ VehicleService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleListComponent);
    component = fixture.componentInstance;

    const newVehicles = [
      { id: 1, marca: 'Toyota', linea: 'Camry', modelo: 2020, referencia: '', kilometraje: 0, color: '', imagen: '' },
      { id: 2, marca: 'Honda', linea: 'Accord', modelo: 2019, referencia: '', kilometraje: 0, color: '', imagen: '' },
      { id: 3, marca: 'Ford', linea: 'Mustang', modelo: 2021, referencia: '', kilometraje: 0, color: '', imagen: '' }
    ]

    for (const vehicleData of newVehicles) {
      const vehicle = new Vehicle(
        vehicleData.id,
        vehicleData.marca,
        vehicleData.linea,
        vehicleData.referencia,
        vehicleData.modelo,
        vehicleData.kilometraje,
        vehicleData.color,
        vehicleData.imagen
      );
      component.vehicles.push(vehicle);
    }

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create a table with 3 vehicle rows plus the header', () => {
    const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    const headerRow = fixture.debugElement.queryAll(By.css('thead tr'));

    expect(headerRow.length).toBe(1);
    expect(tableRows.length).toBe(3);

    const headerCells = headerRow[0].queryAll(By.css('th'));
    expect(headerCells[0].nativeElement.textContent).toContain('#');
    expect(headerCells[1].nativeElement.textContent).toContain('Marca');
    expect(headerCells[2].nativeElement.textContent).toContain('Línea');
    expect(headerCells[3].nativeElement.textContent).toContain('Modelo');

    const firstRowCells = tableRows[0].queryAll(By.css('td'));
    expect(firstRowCells[1].nativeElement.textContent).toContain('Toyota');
    expect(firstRowCells[2].nativeElement.textContent).toContain('Camry');
    expect(firstRowCells[3].nativeElement.textContent).toContain('2020');

    const secondRowCells = tableRows[1].queryAll(By.css('td'));
    expect(secondRowCells[1].nativeElement.textContent).toContain('Honda');
    expect(secondRowCells[2].nativeElement.textContent).toContain('Accord');
    expect(secondRowCells[3].nativeElement.textContent).toContain('2019');

    const thirdRowCells = tableRows[2].queryAll(By.css('td'));
    expect(thirdRowCells[1].nativeElement.textContent).toContain('Ford');
    expect(thirdRowCells[2].nativeElement.textContent).toContain('Mustang');
    expect(thirdRowCells[3].nativeElement.textContent).toContain('2021');
  });
});
