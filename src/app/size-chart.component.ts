import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-size-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="size-chart-box">
      <!-- TAB SWITCHER HEADER -->
      <div class="tab-header">
        <button [class.active]="activeTab === 'guide'" (click)="activeTab = 'guide'">Size Guide</button>
        <button [class.active]="activeTab === 'measure'" (click)="activeTab = 'measure'">How To Measure</button>
      </div>

      <!-- TAB 1: SIZE GUIDE TABLE -->
      <div *ngIf="activeTab === 'guide'" class="tab-content">
        <table class="size-table">
          <thead>
            <tr>
              <th>SIZE</th>
              <th>BUST (INCHES)</th>
              <th>WAIST (INCHES)</th>
              <th>HIP (INCHES)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>S</td><td>36</td><td>30</td><td>38</td></tr>
            <tr><td>M</td><td>38</td><td>32</td><td>40</td></tr>
            <tr><td>L</td><td>40</td><td>34</td><td>42</td></tr>
            <tr><td>XL</td><td>42</td><td>36</td><td>44</td></tr>
            <tr><td>2XL</td><td>44</td><td>38</td><td>46</td></tr>
            <tr><td>3XL</td><td>46</td><td>40</td><td>48</td></tr>
          </tbody>
        </table>
      </div>

      <!-- TAB 2: HOW TO MEASURE GUIDE -->
      <div *ngIf="activeTab === 'measure'" class="tab-content measure-grid">
        <div class="measure-info">
          <ul>
            <li>
              <strong>BUST :</strong>
              <p>Measure under your arms, around the fullest part of your chest.</p>
            </li>
            <li>
              <strong>WAIST :</strong>
              <p>Measure around your natural waistline, keeping the tape a bit loose.</p>
            </li>
            <li>
              <strong>HIPS :</strong>
              <p>Measure around the fullest part of your body at the top of your leg.</p>
            </li>
          </ul>
        </div>
        <div class="measure-diagram">
          <svg viewBox="0 0 200 300" class="kurti-svg">
            <path d="M70,40 L130,40 L150,70 L140,110 L130,95 L135,260 L65,260 L70,95 L60,110 L50,70 Z" fill="none" stroke="#d4af37" stroke-width="2"/>
            <path d="M85,40 C85,60 115,60 115,40" fill="none" stroke="#d4af37" stroke-width="2"/>
            <line x1="68" y1="95" x2="132" y2="95" stroke="#25D366" stroke-dasharray="3,3" stroke-width="2"/>
            <text x="100" y="90" fill="#aaa" font-size="10" text-anchor="middle">BUST</text>
            <line x1="70" y1="140" x2="130" y2="140" stroke="#25D366" stroke-dasharray="3,3" stroke-width="2"/>
            <text x="100" y="135" fill="#aaa" font-size="10" text-anchor="middle">WAIST</text>
            <line x1="67" y1="195" x2="133" y2="195" stroke="#25D366" stroke-dasharray="3,3" stroke-width="2"/>
            <text x="100" y="190" fill="#aaa" font-size="10" text-anchor="middle">HIP</text>
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .size-chart-box {
      background: #141414;
      border: 1px solid #333;
      border-radius: 10px;
      padding: 20px;
      color: #fff;
    }
    .tab-header {
      display: flex;
      justify-content: center;
      gap: 30px;
      border-bottom: 1px solid #333;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .tab-header button {
      background: none;
      border: none;
      color: #aaa;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      padding-bottom: 6px;
      position: relative;
    }
    .tab-header button.active {
      color: #d4af37;
      border-bottom: 2px solid #d4af37;
    }
    .size-table {
      width: 100%;
      border-collapse: collapse;
      text-align: center;
    }
    .size-table th, .size-table td {
      border: 1px solid #2a2a2a;
      padding: 10px 14px;
      font-size: 13px;
    }
    .size-table th {
      background: #1e1e1e;
      color: #d4af37;
      letter-spacing: 1px;
    }
    .measure-grid {
      display: grid;
      grid-template-columns: 1fr 140px;
      gap: 20px;
      align-items: center;
    }
    .measure-info ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .measure-info li {
      margin-bottom: 14px;
    }
    .measure-info strong {
      color: #d4af37;
      font-size: 13px;
      display: block;
      margin-bottom: 2px;
    }
    .measure-info p {
      color: #bbb;
      font-size: 12px;
      margin: 0;
    }
    .kurti-svg {
      width: 100%;
      height: auto;
      background: #000;
      border-radius: 8px;
      padding: 10px;
      border: 1px solid #222;
    }
  `]
})
export class SizeChartComponent {
  activeTab: 'guide' | 'measure' = 'guide';
}