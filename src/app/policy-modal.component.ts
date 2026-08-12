import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policy-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="policy-overlay" (click)="close()">
      <div class="policy-container" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="close()">✕</button>

        <!-- 1. FAQS VIEW -->
        <div *ngIf="policyType === 'faq'">
          <h1 class="policy-title">FAQS</h1>
          <div class="policy-content">
            <h3 class="gold-heading">1. What Is இளங்காரிகைகி?</h3>
            <p>இளங்காரிகை is an exclusive online boutique dedicated to providing authentic, handpicked Chudidhars and Kurtis with a seamless shopping experience.</p>

            <h3 class="gold-heading">2. How Can I Place An Order?</h3>
            <p>Explore our Kurtis collection, select your preferred size & color, click 'ADD TO CART', fill your delivery details, and complete the order via WhatsApp.</p>

            <h3 class="gold-heading">3. What Payment Methods Do You Accept?</h3>
            <p>We accept safe and convenient payment methods including UPI, Google Pay, PhonePe, Paytm, Bank Transfers, and Cash on Delivery (COD).</p>

            <h3 class="gold-heading">4. How Long Does Delivery Take?</h3>
            <p>Orders are dispatched within 24 working hours. Delivery typically takes 2-3 working days across India.</p>

            <h3 class="gold-heading">5. How Can I Track My Order?</h3>
            <p>Once your order is shipped, tracking details and direct WhatsApp updates will be provided to your mobile number.</p>
          </div>
        </div>

        <!-- 2. PRIVACY POLICY VIEW -->
        <div *ngIf="policyType === 'privacy'">
          <h1 class="policy-title">PRIVACY POLICY</h1>
          <div class="policy-content">
            <p>At இளங்காரிகை, we respect your privacy and are committed to keeping your personal information safe and secure while you shop on our website.</p>
            
            <h3 class="gold-heading">What information do we collect?</h3>
            <p>We collect personal details necessary to fulfill your orders, such as your Name, Mobile Number, Email Address, and Shipping Address.</p>

            <h3 class="gold-heading">How do we use your data?</h3>
            <p>Your data is strictly used to process, ship, and deliver your orders, send status updates, and provide personalized customer support.</p>

            <h3 class="gold-heading">Is my information protected?</h3>
            <p>Yes, all customer data and transaction communications are secured through encrypted protocols to prevent unauthorized access.</p>
          </div>
        </div>

        <!-- 3. RETURN & REFUND POLICY VIEW -->
        <div *ngIf="policyType === 'refund'">
          <h1 class="policy-title">RETURN & REFUND POLICY</h1>
          <div class="policy-content">
            <p>At இளங்காரிகை, customer satisfaction is paramount. Please read our policy below before requesting returns or exchanges.</p>

            <h3 class="gold-heading">Eligible Returns</h3>
            <p>We accept returns or exchanges only in the following cases:</p>
            <ul>
              <li>The product received is damaged during transit.</li>
              <li>An incorrect product or size was delivered.</li>
            </ul>

            <h3 class="gold-heading">Mandatory Unboxing Video Proof</h3>
            <p>To claim a return or refund, customers must provide a continuous, unedited 360-degree unboxing video recorded from opening the sealed package until the product is fully visible.</p>
          </div>
        </div>

        <!-- 4. SHIPPING & DELIVERY POLICY VIEW -->
        <div *ngIf="policyType === 'shipping'">
          <h1 class="policy-title">SHIPPING & DELIVERY POLICY</h1>
          <div class="policy-content">
            <h3 class="gold-heading">Free Shipping</h3>
            <p>We offer FREE SHIPPING across all states in India on every order!</p>

            <h3 class="gold-heading">Delivery Turnaround Time</h3>
            <p>Orders are processed within 24 working hours. Standard delivery timeline is 2 to 3 working days depending on your location.</p>

            <h3 class="gold-heading">Order Tracking</h3>
            <p>Real-time delivery status and tracking IDs are sent directly to your registered mobile number via WhatsApp as soon as the dispatch is completed.</p>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .policy-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.85);
      z-index: 3000;
      display: flex; justify-content: center; align-items: center;
      padding: 15px;
    }
    .policy-container {
      width: 100%; max-width: 650px;
      max-height: 85vh;
      background: #141414;
      border: 2px solid #d4af37;
      border-radius: 12px;
      padding: 30px;
      color: #fff;
      overflow-y: auto;
      position: relative;
    }
    .close-btn {
      position: absolute; top: 15px; right: 15px;
      background: #222; border: 1px solid #444;
      color: #fff; border-radius: 50%; width: 32px; height: 32px;
      cursor: pointer;
    }
    .policy-title {
      font-family: 'Mukta Malar', serif;
      color: #d4af37;
      text-align: center;
      margin-bottom: 25px;
      font-size: 26px;
      letter-spacing: 1px;
    }
    .policy-content p {
      color: #ccc; font-size: 14px; line-height: 1.8; margin-bottom: 15px;
    }
    .gold-heading {
      color: #d4af37; font-size: 16px; margin: 18px 0 6px 0;
    }
    ul { color: #ccc; font-size: 14px; padding-left: 20px; line-height: 1.8; }
  `]
})
export class PolicyModalComponent {
  @Input() policyType: 'faq' | 'privacy' | 'refund' | 'shipping' | null = null;
  @Output() closeEvent = new EventEmitter<void>();

  close() {
    this.closeEvent.emit();
  }
}