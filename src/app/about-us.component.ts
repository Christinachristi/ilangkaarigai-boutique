import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- HERO BANNER WITH SLIDESHOW BACKGROUND -->
    <section class="about-hero">
      <div class="hero-slideshow"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <p class="hero-subtitle">Simple. Elegant. Truly You.</p>
        <h1 class="hero-title">ABOUT ILANGKAARIGAI</h1>
        <p class="hero-tagline">Celebrating Grace, Craftsmanship, and Timeless Indian Elegance</p>
      </div>
    </section>

    <!-- MAIN ABOUT US CONTENT -->
    <main class="about-container">

      <!-- ROW 1: OUR STORY -->
      <div class="about-row">
        <div class="about-image-col">
          <img src="/Images/Avaasakurthi.jpeg" alt="Ilangkaarigai Story">
        </div>
        <div class="about-text-col">
          <h2 class="section-gold-title">Our Story</h2>
          <p class="about-paragraph">
            <strong>இளங்காரிகை (Ilangkaarigai)</strong> is more than just a clothing label—it is a tribute to the strength, beauty, and individuality of every woman. Rooted in traditional Indian craftsmanship and blended with contemporary elegance, we curate ethnic wear that speaks to the modern woman.
          </p>
          <p class="about-paragraph">
            Our name, <em>Ilangkaarigai</em>, embodies youthfulness, poise, and natural charm. Whether it’s everyday comfort kurtis or celebratory festive wear, each piece in our collection is crafted to make you feel effortless, dignified, and distinctly yourself.
          </p>
        </div>
      </div>

      <!-- ROW 2: OUR CRAFT & VISION -->
      <div class="about-row reverse">
        <div class="about-image-col">
          <img src="/Images/image8.jpeg" alt="Ilangkaarigai Heritage & Craft">
        </div>
        <div class="about-text-col">
          <h2 class="section-gold-title">Craftsmanship & Vision</h2>
          <p class="about-paragraph">
            At Ilangkaarigai, we believe true beauty is defined by authenticity and self-expression. We closely work with skilled artisans, handpicking premium breathable cottons, fluid Liva fabrics, and rich festive silk weaves.
          </p>
          
          <div class="highlight-quote">
            "Every weave tells a story of heritage, every color celebrates femininity, and every design is tailored for your comfort."
          </div>

          <p class="about-paragraph">
            Our vision is simple: to offer high-quality, heritage-inspired ethnic wear at accessible price points without ever compromising on quality, fit, or aesthetics.
          </p>
        </div>
      </div>

    </main>

    <!-- FEATURES / PROMISE SECTION -->
    <section class="features-section">
      <div class="features-grid">
        
        <div class="feature-card">
          <span class="feature-icon">✨</span>
          <h3 class="feature-title">Premium Quality</h3>
          <p class="feature-desc">Handpicked breathable cottons, Liva fabrics, and rich festive silk weaves made for all-day comfort.</p>
        </div>

        <div class="feature-card">
          <span class="feature-icon">🚚</span>
          <h3 class="feature-title">Free Shipping Across India</h3>
          <p class="feature-desc">Delivering your favorite ethnic outfits right to your doorstep with zero additional shipping charges.</p>
        </div>

        <div class="feature-card">
          <span class="feature-icon">💬</span>
          <h3 class="feature-title">Personalized Support</h3>
          <p class="feature-desc">Instant WhatsApp assistance for sizing guidance, custom color options, and quick order tracking.</p>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .about-hero {
      position: relative;
      height: 350px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      border-bottom: 2px solid #d4af37;
      overflow: hidden;
    }
    .hero-slideshow {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background-size: cover;
      background-position: center;
      animation: slideAnimation 12s infinite ease-in-out;
      z-index: 1;
    }
    @keyframes slideAnimation {
      0%, 25% { background-image: url('/Images/image8.jpeg'); }
      30%, 55% { background-image: url('/Images/image5.jpeg'); }
      60%, 85% { background-image: url('/Images/image4.jpeg'); }
      90%, 100% { background-image: url('/Images/Avaasakurthi2.jpeg'); }
    }
    .hero-overlay {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.75);
      z-index: 2;
    }
    .hero-content {
      position: relative;
      z-index: 3;
      padding: 0 20px;
      max-width: 800px;
    }
    .hero-subtitle {
      letter-spacing: 4px;
      color: #d4af37;
      text-transform: uppercase;
      font-size: 13px;
      margin-bottom: 8px;
    }
    .hero-title {
      font-size: 40px;
      font-weight: 500;
      color: #ffffff;
      letter-spacing: 2px;
      margin-bottom: 12px;
      font-family: 'Playfair Display', serif;
    }
    .hero-tagline {
      color: #dddddd;
      font-size: 15px;
      font-weight: 300;
    }
    .about-container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 60px 20px;
    }
    .about-row {
      display: flex;
      align-items: center;
      gap: 50px;
      margin-bottom: 70px;
      flex-wrap: wrap;
    }
    .about-row.reverse {
      flex-direction: row-reverse;
    }
    .about-image-col {
      flex: 1;
      min-width: 300px;
    }
    .about-image-col img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 12px;
      border: 1px solid #d4af37;
      box-shadow: 0 10px 30px rgba(212, 175, 55, 0.15);
    }
    .about-text-col {
      flex: 1;
      min-width: 300px;
    }
    .section-gold-title {
      color: #d4af37;
      font-size: 24px;
      font-family: 'Playfair Display', serif;
      margin-bottom: 15px;
      display: inline-block;
      border-bottom: 1px solid #d4af37;
      padding-bottom: 5px;
    }
    .about-paragraph {
      color: #cccccc;
      font-size: 15px;
      line-height: 1.8;
      margin-bottom: 18px;
      text-align: justify;
    }
    .highlight-quote {
      background: #141414;
      border-left: 3px solid #d4af37;
      padding: 20px;
      border-radius: 0 8px 8px 0;
      margin: 25px 0;
      font-style: italic;
      color: #e5e5e5;
    }
    .features-section {
      background: #121212;
      border-top: 1px solid #222;
      border-bottom: 1px solid #222;
      padding: 50px 20px;
    }
    .features-grid {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
    }
    .feature-card {
      background: #1a1a1a;
      border: 1px solid #2a2a2a;
      padding: 30px 20px;
      border-radius: 10px;
      text-align: center;
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    .feature-card:hover {
      transform: translateY(-5px);
      border-color: #d4af37;
    }
    .feature-icon {
      font-size: 36px;
      margin-bottom: 15px;
      display: block;
    }
    .feature-title {
      color: #d4af37;
      font-size: 18px;
      margin-bottom: 10px;
      font-weight: 600;
    }
    .feature-desc {
      color: #aaa;
      font-size: 13px;
    }
  `]
})
export class AboutUsComponent {}