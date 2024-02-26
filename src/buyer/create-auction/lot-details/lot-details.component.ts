import { Component } from '@angular/core';
import { Item } from 'src/shared/models/Lot';

@Component({
  selector: 'app-lot-details',
  templateUrl: './lot-details.component.html',
  styleUrls: ['./lot-details.component.scss']
})
export class LotDetailsComponent {
  public isNewLot: boolean = true;
  public LotItems: Item[] = [
    {
      name: "Lot1",
      basePrice: 100,
      qunatity: 100
    },
    {
      name: "Lot1",
      basePrice: 100,
      qunatity: 100
    },
    {
      name: "Lot1",
      basePrice: 100,
      qunatity: 100
    },
    {
      name: "Lot1",
      basePrice: 100,
      qunatity: 100
    },
    {
      name: "Lot1",
      basePrice: 100,
      qunatity: 100
    },
    {
      name: "Lot1",
      basePrice: 100,
      qunatity: 100
    },
    {
      name: "Lot1",
      basePrice: 100,
      qunatity: 100
    },
    {
      name: "Lot1",
      basePrice: 100,
      qunatity: 100
    },
    {
      name: "Lot1",
      basePrice: 100,
      qunatity: 100
    },
    {
      name: "Lot1",
      basePrice: 100,
      qunatity: 100
    },
    {
      name: "Lot1",
      basePrice: 100,
      qunatity: 100
    },
    {
      name: "Lot1",
      basePrice: 100,
      qunatity: 100
    },
    {
      name: "Lot1",
      basePrice: 100,
      qunatity: 100
    },
    {
      name: "Lot1",
      basePrice: 100,
      qunatity: 100
    },
    {
      name: "Lot1",
      basePrice: 100,
      qunatity: 100
    }
  ]
  constructor() {
    
  }
}
