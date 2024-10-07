import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductDisplayComponent } from '../product-display/product-display.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [NgbCarouselModule, NavbarComponent, NgFor, CommonModule, RouterOutlet, ProductDisplayComponent],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 
}