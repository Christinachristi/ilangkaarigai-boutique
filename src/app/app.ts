import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, setDoc, getDoc, query, where } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from './firebase';

interface SizeStock {
  size: string;
  inStock: boolean;
}

interface Product {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  category: string;
  fabric: string;
  sizeStocks: SizeStock[];
  image: string;
  inStock: boolean;
  createdAt?: any;
}

interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  boutiqueName = 'இளங்காரிகை';
  whatsappNumber = '919876543210';
  newsletterEmail = '';

  viewMode: 'home' | 'about' | 'admin' = 'about';
  activePolicy: 'faq' | 'privacy' | 'refund' | 'shipping' | null = null;
  isMobileMenuOpen = false;

  selectedCategory = 'All';
  searchQuery = '';

  isLoggedIn = false;
  isAdmin = false;
  authView: 'login' | 'register' | 'forgot' = 'login';
  
  authEmail = '';
  authPassword = '';
  authConfirmPassword = '';
  authName = '';
  authPhone = '';
  currentUserName = '';

  forgotEmail = '';
  forgotVerifiedUser: any = null;
  newPasswordInput = '';
  confirmNewPasswordInput = '';

  showLoginPassword = false;
  showRegisterPassword = false;
  showConfirmPassword = false;

  customPopup: { show: boolean; title: string; message: string; type: 'alert' | 'success' } = {
    show: false, title: '', message: '', type: 'alert'
  };

  popupMessage: string | null = null;

  customerName = '';
  customerPhone = '';
  customerAddress = '';

  isProfileOpen = false;
  isSearchOpen = false;
  isWishlistOpen = false;
  isCartOpen = false;
  isProductModalOpen = false;
  isSizeChartOpen = false;

  selectedProduct: Product | null = null;
  activeImage = '';
  selectedSize = '';
  selectedColor = 'Default';

  cartItems: CartItem[] = [];
  wishlistItems: Product[] = [];

  newTitle = '';
  newBrand = '';
  newPrice = 320;
  newCategory = 'Festive';
  newFabric = 'Soft Cotton';
  newImage = '/Images/Avaasakurthi.jpeg';
  
  availableSizesList = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', 'Free Size'];
  newSizeStocks: { [key: string]: boolean } = {
    'XS': true, 'S': true, 'M': true, 'L': true, 'XL': true, '2XL': true, '3XL': true, '4XL': true, 'Free Size': true
  };

  products: Product[] = [];

  constructor(private ngZone: NgZone) {}

  async ngOnInit() {
    await this.loadProductsFromDatabase();
    
    auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        this.isLoggedIn = true;
        this.isAdmin = (user.email === 'admin@gmail.com' || user.email === 'christiraj2003@gmail.com');
        try {
          const snap = await getDoc(doc(db, 'users', user.uid));
          if (snap.exists() && snap.data()['name']) {
            this.currentUserName = snap.data()['name'];
          } else {
            this.currentUserName = user.email ? user.email.split('@')[0] : 'User';
          }
        } catch (e) {
          this.currentUserName = user.email ? user.email.split('@')[0] : 'User';
        }
      }
    });
  }

  showThemedAlert(title: string, msg: string) {
    this.ngZone.run(() => {
      this.customPopup = { show: true, title, message: msg, type: 'alert' };
    });
  }

  closeCustomPopup() {
    this.customPopup.show = false;
  }

  showTimedPopup(msg: string, durationMs: number = 3000) {
    this.ngZone.run(() => {
      this.popupMessage = msg;
    });
    setTimeout(() => { 
      this.ngZone.run(() => {
        this.popupMessage = null; 
      });
    }, durationMs);
  }

  async loadProductsFromDatabase() {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const dbProducts: Product[] = [];
      querySnapshot.forEach((docSnap: any) => {
        const data = docSnap.data();
        let formattedSizeStocks: SizeStock[] = data['sizeStocks'] || [
          { size: 'S', inStock: true }, { size: 'M', inStock: true }, { size: 'L', inStock: true }, { size: 'XL', inStock: true }, { size: '2XL', inStock: true }
        ];

        dbProducts.push({
          id: docSnap.id,
          title: data['title'] || '',
          brand: data['brand'] || 'Avaasa',
          price: Number(data['price']) || 0,
          originalPrice: Number(data['originalPrice']) || Number(data['price']) + 150,
          category: data['category'] || 'All',
          fabric: data['fabric'] || 'Soft Cotton',
          sizeStocks: formattedSizeStocks,
          image: data['image'] || '/Images/Avaasakurthi.jpeg',
          inStock: data['inStock'] ?? true,
          createdAt: data['createdAt'] || 0
        });
      });

      dbProducts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      this.products = dbProducts;
    } catch (error: any) {
      console.error('Error loading products:', error);
    }
  }

  onImageFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newImage = e.target.result;
        this.showTimedPopup('🖼️ Image loaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  }

  async loginUser() {
    if (!this.authEmail || !this.authPassword) {
      this.showThemedAlert('Notice', '⚠️ Please enter Email and Password!');
      return;
    }

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', this.authEmail.trim().toLowerCase()));
      const querySnap = await getDocs(q);

      if (querySnap.empty && this.authEmail.trim() !== 'admin@gmail.com' && this.authEmail.trim() !== 'christiraj2003@gmail.com') {
        this.showThemedAlert('User Not Found', '❌ User ID not found! Redirecting to registration page.');
        this.ngZone.run(() => { this.authView = 'register'; });
        return;
      }

      await signInWithEmailAndPassword(auth, this.authEmail.trim(), this.authPassword);
      
      this.ngZone.run(() => {
        this.isLoggedIn = true;
        this.isProfileOpen = false;
      });

      let name = 'User';
      if (!querySnap.empty) {
        name = querySnap.docs[0].data()['name'];
      } else {
        name = this.authEmail.split('@')[0];
      }
      this.currentUserName = name;

      if (this.authEmail.trim() === 'admin@gmail.com' || this.authEmail.trim() === 'christiraj2003@gmail.com') {
        this.isAdmin = true;
        this.showTimedPopup('👑 Welcome admin', 10000);
        setTimeout(() => { 
          this.ngZone.run(() => {
            this.viewMode = 'admin'; 
          });
        }, 10000);
      } else {
        this.isAdmin = false;
        this.showTimedPopup(`✨ Welcome User! Hi (${name}) Welcome to இளங்காரிகை`, 10000);
        setTimeout(() => {
          this.ngZone.run(() => {
            this.viewMode = 'home';
            this.selectedCategory = 'Festive';
          });
        }, 10000);
      }
    } catch (error: any) {
      this.showThemedAlert('Login Failed', error.message);
    }
  }

  async registerUser() {
    if (!this.authName || !this.authPhone || !this.authEmail || !this.authPassword || !this.authConfirmPassword) {
      this.showThemedAlert('Notice', '⚠️ Please fill in all fields!');
      return;
    }
    if (this.authPassword !== this.authConfirmPassword) {
      this.showThemedAlert('Notice', '⚠️ Passwords do not match!');
      return;
    }

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', this.authEmail.trim().toLowerCase()));
      const querySnap = await getDocs(q);

      if (!querySnap.empty) {
        this.showThemedAlert('Email Exists', '⚠️ Already this email id exist! Please log in or use another email.');
        return;
      }

      const cred = await createUserWithEmailAndPassword(auth, this.authEmail.trim(), this.authPassword);
      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        name: this.authName.trim(),
        phone: this.authPhone.trim(),
        email: this.authEmail.trim().toLowerCase(),
        createdAt: new Date().toISOString()
      });

      await signOut(auth);
      this.showThemedAlert('Success', '✅ Successfully log in completed! Account created successfully.');
      this.ngZone.run(() => {
        this.authView = 'login';
        this.authPassword = '';
        this.authConfirmPassword = '';
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.showThemedAlert('Email Exists', '⚠️ Already this email id exist!');
      } else {
        this.showThemedAlert('Registration Failed', error.message);
      }
    }
  }

  async verifyForgotEmail() {
    if (!this.forgotEmail || !this.forgotEmail.trim()) {
      this.showThemedAlert('Notice', '⚠️ Please enter your Email ID!');
      return;
    }
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', this.forgotEmail.trim().toLowerCase()));
      const querySnap = await getDocs(q);

      if (querySnap.empty) {
        this.showThemedAlert('Not Found', '❌ User ID not found in database!');
        return;
      }
      this.forgotVerifiedUser = { id: querySnap.docs[0].id, ...querySnap.docs[0].data() };
      this.showThemedAlert('Verified', `Hi ${this.forgotVerifiedUser.name}! Email verified. Please enter your new password below.`);
    } catch (err: any) {
      this.showThemedAlert('Error', err.message);
    }
  }

  async saveNewPassword() {
    if (!this.newPasswordInput || !this.confirmNewPasswordInput) {
      this.showThemedAlert('Notice', '⚠️ Please fill in new password fields!');
      return;
    }
    if (this.newPasswordInput !== this.confirmNewPasswordInput) {
      this.showThemedAlert('Notice', '⚠️ Passwords do not match!');
      return;
    }
    this.showThemedAlert('Success', '🔒 Password changed successfully! Please log in with your new password.');
    this.ngZone.run(() => {
      this.authView = 'login';
      this.forgotEmail = '';
      this.forgotVerifiedUser = null;
      this.newPasswordInput = '';
      this.confirmNewPasswordInput = '';
    });
  }

  async logoutUser() {
    try {
      await signOut(auth);
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.currentUserName = '';
      this.viewMode = 'about';
      this.showTimedPopup('🔒 Logged out successfully.');
      setTimeout(() => window.location.reload(), 1500);
    } catch (error: any) {
      console.error(error);
    }
  }

  async addProduct() {
    if (!this.newTitle.trim() || !this.newBrand.trim() || !this.newCategory.trim()) {
      alert('Please fill in Title, Brand, and Category!');
      return;
    }
    try {
      const sizeStocks: SizeStock[] = this.availableSizesList.map(s => ({ size: s, inStock: this.newSizeStocks[s] }));
      const hasAnyStock = sizeStocks.some(s => s.inStock);

      await addDoc(collection(db, 'products'), {
        title: this.newTitle.trim(),
        brand: this.newBrand.trim(),
        category: this.newCategory.trim(),
        price: Number(this.newPrice),
        originalPrice: Number(this.newPrice) + 150,
        fabric: this.newFabric.trim(),
        image: this.newImage.trim(),
        sizeStocks,
        inStock: hasAnyStock,
        createdAt: Date.now()
      });

      this.showTimedPopup('📦 New Kurti Published as New Arrival!');
      this.newTitle = '';
      await this.loadProductsFromDatabase();
    } catch (error: any) {
      alert('Error adding product: ' + error.message);
    }
  }

  async toggleSizeStock(product: Product, sizeObj: SizeStock) {
    try {
      sizeObj.inStock = !sizeObj.inStock;
      product.inStock = product.sizeStocks.some(s => s.inStock);
      await updateDoc(doc(db, 'products', product.id), {
        sizeStocks: product.sizeStocks,
        inStock: product.inStock
      });
      this.showTimedPopup('🔄 Size stock updated!');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }

  async deleteProduct(id: string) {
    try {
      await deleteDoc(doc(db, 'products', id));
      this.products = this.products.filter(p => p.id !== id);
      this.showTimedPopup('🗑️ Product deleted!');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }

  filteredProducts() {
    return this.products.filter(p => {
      if (this.selectedCategory === 'New Arrivals') {
        return true;
      }
      const matchCat = this.selectedCategory === 'All' || p.category.toLowerCase() === this.selectedCategory.toLowerCase();
      const matchSearch = !this.searchQuery || p.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
    this.viewMode = 'home';
  }

  toggleWishlist(product: Product, event?: Event) {
    if (event) event.stopPropagation();
    const idx = this.wishlistItems.findIndex(item => item.id === product.id);
    if (idx > -1) {
      this.wishlistItems.splice(idx, 1);
    } else {
      this.wishlistItems.push(product);
    }
  }

  isWishlisted(product: Product) {
    return this.wishlistItems.some(item => item.id === product.id);
  }

  openProductModal(product: Product) {
    this.selectedProduct = product;
    this.activeImage = product.image;
    this.selectedSize = '';
    this.isProductModalOpen = true;
  }

  addToCartFromModal() {
    if (this.isAdmin) {
      alert('Admin account cannot add items to cart or place orders.');
      return;
    }
    if (!this.selectedProduct) return;
    if (!this.selectedProduct.inStock) {
      alert('Sorry, this product is Out of Stock!');
      return;
    }
    if (!this.selectedSize) {
      alert('Please select a size!');
      return;
    }
    const existing = this.cartItems.find(i => i.product.id === this.selectedProduct?.id && i.size === this.selectedSize);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({
        product: this.selectedProduct,
        size: this.selectedSize,
        color: this.selectedColor,
        quantity: 1
      });
    }
    this.isProductModalOpen = false;
    this.isCartOpen = true;
  }

  getCartCount() {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  getWishlistCount() {
    return this.wishlistItems.length;
  }

  getCartTotal() {
    return this.cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }

  updateQuantity(item: CartItem, change: number) {
    item.quantity += change;
    if (item.quantity <= 0) {
      this.cartItems = this.cartItems.filter(i => i !== item);
    }
  }

  subscribeNewsletter() {
    if (!this.newsletterEmail.trim()) {
      alert('Please enter your email address!');
      return;
    }
    this.showTimedPopup('💌 Thank you for subscribing to இளங்காரிகை!');
    this.newsletterEmail = '';
  }

  sendWhatsAppOrder() {
    if (this.isAdmin) return;
    if (!this.customerName.trim() || !this.customerPhone.trim() || !this.customerAddress.trim()) {
      alert('Please fill in Name, Phone, and Address!');
      return;
    }
    let msg = `*NEW ORDER - ${this.boutiqueName.toUpperCase()}*\n\n`;
    msg += `Name: ${this.customerName}\nPhone: ${this.customerPhone}\nAddress: ${this.customerAddress}\n\nItems:\n`;
    this.cartItems.forEach((item, i) => {
      msg += `${i+1}. ${item.product.title} (Size: ${item.size}) - Qty: ${item.quantity} - ₹${item.product.price * item.quantity}\n`;
    });
    msg += `\nTotal: ₹${this.getCartTotal()}`;
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  }
}
