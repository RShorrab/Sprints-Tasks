import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {

  @Input() productsList:any[] = []
  @Output() productID:EventEmitter<number> = new EventEmitter<number>();

  setSelectedProduct(id:number)
  {
    this.productID.emit(id);
  }
}
