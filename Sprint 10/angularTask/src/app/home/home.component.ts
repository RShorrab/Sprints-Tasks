import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  clicked:boolean = false
  sayHello()
  {
    this.clicked = !this.clicked
  }
}
