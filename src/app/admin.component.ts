import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  category: string;
  fabric: string;
  sizes: string[];
  colors: string[];
  image: string;
  gallery: string[];
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- LOGIN SCREEN -->
    <div *ngIf="!isLoggedIn" style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #0c0c0c; color: #fff; font-family: sans-serif;">
      <div style="background: #141414; padding: 35px; border-radius: 12px; border: 2px solid #d4af37; width: 320px; text-align: center;">
        <h2 style="color: #d4af37; margin-bottom: 20px;">🔒 Boutique Admin</h2>
        <input type="email" [(ngModel)]="email" placeholder="Admin Email" style="width: 100%; padding: 10px; margin-bottom: 12px; background: #000; border: 1px solid #333; color: #fff; border-radius: 6px; box-sizing: border-box;">
        <input type="password" [(ngModel)]="password" placeholder="Password" style="width: 100%; padding: 10px; margin-bottom: 20px; background: #000; border: 1px solid #333; color: #fff; border-radius: 6px; box-sizing: border-box;">
        <button (click)="login()" style="width: 100%; background: linear-gradient(90deg, #ffd700, #d4af37); color: #000; padding: 12px; font-weight: bold; border: none; border-radius: 6px; cursor: pointer;">LOGIN</button>
      </div>
    </div>

    <!-- DASHBOARD SCREEN -->
    <div *ngIf="isLoggedIn" style="padding: 25px; background: #0c0c0c; min-height: 100vh; color: #fff; font-family: sans-serif;">
      
      <!-- HEADER -->
      <header style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #d4af37; padding-bottom: 15px; margin-bottom: 25px;">
        <h2 style="color: #d4af37; margin: 0;">✨ இளங்காரிகை - Boutique Admin Panel</h2>
        <button (click)="logout()" style="background: #800020; color: #fff; padding: 8px 16px; border: 1px solid #d4af37; border-radius: 6px; cursor: pointer; font-weight: bold;">Logout</button>
      </header>

      <div style="display: grid; grid-template-columns: 320px 1fr; gap: 25px;">
        
        <!-- FORM PANEL -->
        <div style="background: #141414; border: 1px solid #2a2a2a; padding: 20px; border-radius: 10px; height: fit-content;">
          <h3 style="color: #d4af37; margin-top: 0;">{{ editingProduct ? 'Edit Price & Details' : 'Add New Dress' }}</h3>

          <label style="font-size: 11px; color: #aaa;">DRESS TITLE</label>
          <input type="text" [(ngModel)]="productForm.title" style="width: 100%; padding: 8px; margin: 4px 0 12px 0; background: #000; border: 1px solid #333; color: #fff; border-radius: 4px; box-sizing: border-box;">

          <label style="font-size: 11px; color: #aaa;">BRAND</label>
          <input type="text" [(ngModel)]="productForm.brand" style="width: 100%; padding: 8px; margin: 4px 0 12px 0; background: #000; border: 1px solid #333; color: #fff; border-radius: 4px; box-sizing: border-box;">

          <div style="display: flex; gap: 10px;">
            <div style="flex: 1;">
              <label style="font-size: 11px; color: #aaa;">PRICE (₹)</label>
              <input type="number" [(ngModel)]="productForm.price" style="width: 100%; padding: 8px; margin: 4px 0 12px 0; background: #000; border: 1px solid #333; color: #fff; border-radius: 4px; box-sizing: border-box;">
            </div>
            <div style="flex: 1;">
              <label style="font-size: 11px; color: #aaa;">ORIGINAL PRICE</label>
              <input type="number" [(ngModel)]="productForm.originalPrice" style="width: 100%; padding: 8px; margin: 4px 0 12px 0; background: #000; border: 1px solid #333; color: #fff; border-radius: 4px; box-sizing: border-box;">
            </div>
          </div>

          <label style="font-size: 11px; color: #aaa;">CATEGORY</label>
          <select [(ngModel)]="productForm.category" style="width: 100%; padding: 8px; margin: 4px 0 12px 0; background: #000; border: 1px solid #333; color: #fff; border-radius: 4px; box-sizing: border-box;">
            <option value="Avaasa">Avaasa</option>
            <option value="Enva">Enva</option>
            <option value="Festive">Festive Silk</option>
          </select>

          <label style="font-size: 11px; color: #aaa;">IMAGE PATH</label>
          <input type="text" [(ngModel)]="productForm.image" placeholder="/Images/image.jpeg" style="width: 100%; padding: 8px; margin: 4px 0 16px 0; background: #000; border: 1px solid #333; color: #fff; border-radius: 4px; box-sizing: border-box;">

          <button (click)="saveProduct()" style="width: 100%; background: #25D366; color: #fff; padding: 12px; font-weight: bold; border: none; border-radius: 6px; cursor: pointer;">
            {{ editingProduct ? 'UPDATE DRESS' : 'SAVE NEW DRESS' }}
          </button>
          <button *ngIf="editingProduct" (click)="resetForm()" style="width: 100%; background: #333; color: #fff; padding: 8px; margin-top: 8px; border: none; border-radius: 6px; cursor: pointer;">Cancel</button>
        </div>

        <!-- DRESSES LIST TABLE -->
        <div style="background: #141414; border: 1px solid #2a2a2a; padding: 20px; border-radius: 10px;">
          <h3 style="color: #d4af37; margin-top: 0;">Stock Management</h3>
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="border-bottom: 1px solid #333; color: #d4af37; font-size: 12px;">
                <th style="padding: 10px;">IMAGE</th>
                <th style="padding: 10px;">TITLE</th>
                <th style="padding: 10px;">PRICE</th>
                <th style="padding: 10px;">CATEGORY</th>
                <th style="padding: 10px;">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of adminProducts" style="border-bottom: 1px solid #222; font-size: 13px;">
                <td style="padding: 10px;"><img [src]="p.image" style="width: 40px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
                <td style="padding: 10px;">{{ p.title }}</td>
                <td style="padding: 10px;"><strong style="color: #d4af37;">₹{{ p.price }}</strong> <del style="color: #666; font-size: 11px;">₹{{ p.originalPrice }}</del></td>
                <td style="padding: 10px;">{{ p.category }}</td>
                <td style="padding: 10px;">
                  <button (click)="editProduct(p)" style="background: #d4af37; color: #000; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; margin-right: 6px;">Edit Price</button>
                  <button (click)="deleteProduct(p.id)" style="background: #ff4d4d; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  `
})
export class AdminComponent {
  isLoggedIn = false;
  email = '';
  password = '';
  editingProduct: Product | null = null;

  productForm: Product = {
    id: 0,
    title: '',
    brand: '',
    price: 0,
    originalPrice: 0,
    category: 'Avaasa',
    fabric: 'Soft Cotton',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Standard'],
    image: '',
    gallery: []
  };

  adminProducts: Product[] = [
    { id: 1, title: 'Avaasa Everyday Elegance Kurti', brand: 'Avaasa', price: 320, originalPrice: 499, category: 'Avaasa', fabric: 'Soft Cotton', sizes: ['S', 'M', 'L'], colors: ['Maroon'], image: '/Images/Avaasakurthi.jpeg', gallery: [] },
    { id: 2, title: 'Avaasa Purple Print Kurti', brand: 'Avaasa', price: 320, originalPrice: 499, category: 'Avaasa', fabric: 'Soft Cotton', sizes: ['M', 'L'], colors: ['Purple'], image: '/Images/Avaasakurthi2.jpeg', gallery: [] }
  ];

  login() {
    if (this.email === 'admin@ilangkaarigai.com' && this.password === 'admin123') {
      this.isLoggedIn = true;
    } else {
      alert('Invalid Email or Password!');
    }
  }

  logout() {
    this.isLoggedIn = false;
  }

  saveProduct() {
    if (!this.productForm.title || !this.productForm.price) {
      alert('Please fill in Title and Price!');
      return;
    }

    if (this.editingProduct) {
      Object.assign(this.editingProduct, this.productForm);
      alert('Price & Product updated successfully!');
    } else {
      this.productForm.id = Date.now();
      this.productForm.gallery = [this.productForm.image];
      this.adminProducts.push({ ...this.productForm });
      alert('New dress added to inventory!');
    }
    this.resetForm();
  }

  editProduct(p: Product) {
    this.editingProduct = p;
    this.productForm = { ...p };
  }

  deleteProduct(id: number) {
    if (confirm('Delete this dress from stock?')) {
      this.adminProducts = this.adminProducts.filter(p => p.id !== id);
    }
  }

  resetForm() {
    this.editingProduct = null;
    this.productForm = { id: 0, title: '', brand: '', price: 0, originalPrice: 0, category: 'Avaasa', fabric: 'Soft Cotton', sizes: ['S', 'M', 'L'], colors: ['Standard'], image: '', gallery: [] };
  }
}