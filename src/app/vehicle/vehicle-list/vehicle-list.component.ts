import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[] = [];
  counterVehicles: { [key: string]: number } = {};

  constructor( private vehicleService: VehicleService) { }

  updateTotals() {
    this.counterVehicles = this.vehicles.reduce((acc, vehicle) => {
      acc[vehicle.marca] = (acc[vehicle.marca] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    console.log(this.counterVehicles);
  }

  getVehicles(): void {
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
      this.updateTotals()
    });
  }

  getBrands(): string[] {
    return Object.keys(this.counterVehicles);
  }
  
  ngOnInit() {
    this.getVehicles();
  }
}
