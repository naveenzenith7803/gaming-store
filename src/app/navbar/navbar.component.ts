import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router, RouterLink } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/productService/product-service.service';
import { CartService } from '../services/cartService/cart-service.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [NgFor, NgClass, CommonModule, NgIf,LoginComponent, RouterLink,
    FormsModule,MatAutocompleteModule,MatInputModule],
})
export class NavbarComponent {
  categories = [
    { name: 'Consoles', subcategories: ['PlayStation', 'Xbox', 'Nintendo'] },
    { name: 'Games', subcategories:[] },
    { name: 'Accessories', subcategories: ['Controllers', 'Headphones', 'Monitors'] },
    { name: 'Others', subcategories: ['Desk Decor', 'Controller Caps', 'Headphone Stands', 'Console Stands'] }
  ];




  constructor(private route: Router, private http: HttpClient, private productService: ProductService, private cartService: CartService){}
  

  searchInput: string = '';
  filteredOptions: string[] = [];
  cartItemCount: number = 0;

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0); // Calculate total item count
    });
  }

  


  filterOptions() {
    if (this.searchInput.length < 1) {
      this.filteredOptions = []; // Reset if the input is too short
      return;
    }

    this.productService.getProductNames(this.searchInput).subscribe(
      (options) => {
        this.filteredOptions = options;
        console.log(options);
      },
      (error) => {
        console.error('Error fetching product names', error);
      }
    );
  }

  onSearch(query: string) {
    console.log('Search query:', query);
  }
}
