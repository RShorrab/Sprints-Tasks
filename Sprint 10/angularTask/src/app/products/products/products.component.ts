import { Component} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products:any[] = [
    {id: 1, name: 'product 1', price: 1000, image: 'https://picsum.photos/id/237/400/200'},
    {id: 2, name: 'product 2', price: 4000, image: 'https://picsum.photos/id/24/400/200'},
    {id: 3, name: 'product 3', price: 3000, image: 'https://picsum.photos/id/26/400/200'},
    {id: 4, name: 'product 4', price: 4000, image: 'https://picsum.photos/id/39/400/200'},
    {id: 5, name: 'product 5', price: 5000, image: 'https://picsum.photos/id/49/400/200'},
    {id: 6, name: 'product 6', price: 6000, image: 'https://picsum.photos/id/48/400/200'},
  ];
  selectedProduct:number = 0;
}
