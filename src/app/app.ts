import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us.component';
import { SizeChartComponent } from './size-chart.component';
import { PolicyModalComponent } from './policy-modal.component';

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
  isWishlisted?: boolean;
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
  imports: [CommonModule, FormsModule, RouterModule, AboutUsComponent, SizeChartComponent, PolicyModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit, OnDestroy {
  boutiqueName = 'இளங்காரிகை';
  whatsappNumber = '919876543210';
  newsletterEmail = '';

  viewMode: 'home' | 'about' = 'home';
  activePolicy: 'faq' | 'privacy' | 'refund' | 'shipping' | null = null;
  isMobileMenuOpen = false;

  selectedCategory = 'All';
  searchQuery = '';

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
  selectedColor = '';

  cartItems: CartItem[] = [];
  wishlistItems: Product[] = [];

  products: Product[] = [
    {
      id: 1,
      title: 'Avaasa Everyday Elegance Kurti',
      brand: 'Avaasa',
      price: 320,
      originalPrice: 499,
      category: 'Avaasa',
      fabric: 'Soft Cotton',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      colors: ['Olive Green', 'Mustard', 'Maroon'],
      image: '/Images/Avaasakurthi.jpeg',
      gallery: ['/Images/Avaasakurthi.jpeg', '/Images/Avaasakurthi2.jpeg', '/Images/image9.jpeg']
    },
    {
      id: 2,
      title: 'Avaasa Purple Print Kurti',
      brand: 'Avaasa',
      price: 320,
      originalPrice: 499,
      category: 'Avaasa',
      fabric: 'Soft Cotton',
      sizes: ['M', 'L', 'XL', '2XL'],
      colors: ['Deep Plum', 'Purple'],
      image: '/Images/Avaasakurthi2.jpeg',
      gallery: ['/Images/Avaasakurthi2.jpeg', '/Images/image3.jpeg']
    },
    {
      id: 3,
      title: 'Enva Casual Comfort Kurti',
      brand: 'Enva',
      price: 350,
      originalPrice: 599,
      category: 'Enva',
      fabric: 'Liva Fluid Fabric',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Purple', 'Navy Blue'],
      image: '/Images/image3.jpeg',
      gallery: ['/Images/image3.jpeg', '/Images/image.jpeg']
    },
    {
      id: 4,
      title: 'Festive Vertican Grace Kurti',
      brand: 'Twill Blue',
      price: 399,
      originalPrice: 699,
      category: 'Festive',
      fabric: 'Premium Quality',
      sizes: ['M', 'L', 'XL', '2XL'],
      colors: ['Peacock Blue', 'Royal Blue'],
      image: '/Images/image4.jpeg',
      gallery: ['/Images/image4.jpeg', '/Images/image7.jpeg']
    },
    {
      id: 5,
      title: 'Festive Silk Green Kurti',
      brand: 'Twill Blue',
      price: 399,
      originalPrice: 699,
      category: 'Festive',
      fabric: 'Silk Weave',
      sizes: ['M', 'L', 'XL', '2XL'],
      colors: ['Festive Green'],
      image: '/Images/image5.jpeg',
      gallery: ['/Images/image5.jpeg', '/Images/image8.jpeg']
    },
    {
      id: 6,
      title: 'Festive Red Gold Print Kurti',
      brand: 'Twill Blue',
      price: 449,
      originalPrice: 799,
      category: 'Festive',
      fabric: 'Silk Blend',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      colors: ['Royal Red', 'Gold'],
      image: '/Images/image8.jpeg',
      gallery: ['/Images/image8.jpeg', '/Images/image5.jpeg']
    }
  ];

  ngOnInit() {}
  ngOnDestroy() {}

  subscribeNewsletter() {
    if (!this.newsletterEmail.trim()) {
      alert('Please enter your email address!');
      return;
    }
    alert('Thank you for subscribing to இளங்காரிகை updates!');
    this.newsletterEmail = '';
  }

  filteredProducts() {
    return this.products.filter(p => {
      const matchesCategory = this.selectedCategory === 'All' || p.category === this.selectedCategory;
      const matchesSearch = p.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            p.brand.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  setCategory(category: string) {
    this.selectedCategory = category;
    this.viewMode = 'home';
    this.isMobileMenuOpen = false;
  }

  toggleWishlist(product: Product, event?: Event) {
    if (event) event.stopPropagation();
    product.isWishlisted = !product.isWishlisted;
    if (product.isWishlisted) {
      if (!this.wishlistItems.some(item => item.id === product.id)) {
        this.wishlistItems.push(product);
      }
    } else {
      this.wishlistItems = this.wishlistItems.filter(item => item.id !== product.id);
    }
  }

  moveToCartFromWishlist(product: Product) {
    this.toggleWishlist(product);
    this.openProductModal(product);
    this.isWishlistOpen = false;
  }

  openProductModal(product: Product) {
    if (!product) return;
    this.selectedProduct = product;
    this.activeImage = product.image;
    this.selectedSize = '';
    this.selectedColor = product.colors && product.colors.length > 0 ? product.colors[0] : '';
    this.isProductModalOpen = true;
  }

  closeProductModal() {
    this.isProductModalOpen = false;
  }

  addToCartFromModal() {
    if (!this.selectedProduct) return;

    if (!this.selectedSize) {
      alert('Please select a size before adding to cart!');
      return;
    }

    const existingItem = this.cartItems.find(
      item => item.product.id === this.selectedProduct?.id && 
              item.size === this.selectedSize && 
              item.color === this.selectedColor
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        product: this.selectedProduct,
        size: this.selectedSize,
        color: this.selectedColor,
        quantity: 1
      });
    }

    this.closeProductModal();
    this.isCartOpen = true;
  }

  getCartTotal() {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getCartCount() {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  getWishlistCount() {
    return this.wishlistItems.length;
  }

  updateQuantity(item: CartItem, change: number) {
    item.quantity += change;
    if (item.quantity <= 0) {
      this.cartItems = this.cartItems.filter(i => i !== item);
    }
  }

  sendWhatsAppOrder() {
    if (this.cartItems.length === 0) return;

    if (!this.customerName.trim() || !this.customerPhone.trim() || !this.customerAddress.trim()) {
      alert('Please fill in your Name, Phone Number, and Delivery Address before placing order!');
      return;
    }

    let message = `*NEW ORDER - ${this.boutiqueName.toUpperCase()}*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `• *Name:* ${this.customerName.trim()}\n`;
    message += `• *Phone:* ${this.customerPhone.trim()}\n`;
    message += `• *Address:* ${this.customerAddress.trim()}\n\n`;

    message += `🛍️ *Order Items:*\n`;
    this.cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.product.title}*\n`;
      message += `   Size: ${item.size} | Color: ${item.color}\n`;
      message += `   Qty: ${item.quantity} x ₹${item.product.price} = ₹${item.product.price * item.quantity}\n\n`;
    });

    message += `💰 *Total Amount:* ₹${this.getCartTotal()}\n`;
    message += `🚚 *Shipping:* FREE SHIPPING`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`, '_blank');
  }
}
