import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

const currencyFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
}).format;

// This card-box component will be used in a retail page
export default class CardBox extends LitElement {
  static properties = {
    title: {},
    image: {},
    price: {},
    discountPercentage: {},
    rate: {},
    address: {},
    category: {},
    experience: {},
  };

  constructor() {
    super();
    this.version = 'STARTING';
  }

  showRatingStars() {
    let counterStars = 0;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (counterStars < this.rate) {
        stars.push(html`
          <span class="fa fa-star checked"></span>
        `);
      }
      else {
        stars.push(html`
          <span class="fa fa-star"></span>
        `);
      }

      counterStars += 1;
    }
    return stars;
  }

  render() {
    return html`
    <div class="card">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <div class="discount-tag"> ${Math.round(this.discountPercentage * 100)}% </div>
      <div class="card-img">
        <img class= "card-img" src="${this.image}" alt="${this.title}">
      </div>
      <div class="card-info">
        <p class="text-title">${this.title}</p>
        <span class="text-title">${currencyFormatter(this.price - this.price * this.discountPercentage)}</span>
        <span class="old-price">${currencyFormatter(this.price)}</span>
      </div>
      <slot></slot>
      <div class="card-footer">
        <div class="rating">
          ${this.showRatingStars()}
        </div>
      </div>
    </div>
    `;
  }

  static get styles() {
    return css`
    .card {
      width: 190px;
      margin: 0;
      height: fit-content;
      padding: 1.5rem 2.5rem;
      background: #f5f5f5;
      position: relative;
      overflow: visible;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      border-radius: 1rem;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }
     
    .card-img {
      background-color: #ffcaa6;
      height: 200px;
      width: 100%;
      border-radius: .5rem;
      transition: .3s ease;
    }
     
    .card-info {
      padding-bottom: 5%;
    }
     
    svg {
      width: 20px;
      height: 20px;
    }
     
    .card-footer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      margin-top: 15px;
      border-top: 1px solid #ddd;
    }
     
    /*Text*/
    .text-title {
      font-weight: 800;
      font-size: 1.25rem;
      line-height: 1.75rem;
    }

    .old-price {
      text-decoration: line-through;
      color: #999;
      font-size: .9em;
      padding-left: 5px;
    }
     
    .text-body {
      font-size: .9em;
      padding-bottom: 10px;
    }
     
     /*Button*/
    .card-button {
      border: 1px solid #252525;
      display: flex;
      padding: .3em;
      cursor: pointer;
      border-radius: 50px;
      transition: .3s ease-in-out;
    }
     
    .card-button:hover {
      border: 1px solid #ffcaa6;
      background-color: #ffcaa6;
    }
     
    .checked {
      color: orange;
    }

    .discount-tag {
      position: absolute;
      top: 0;
      right: 0;
      background-color: #4FC0EC;
      padding: 5px 10px;
      margin: 13px;
      border-radius: 1rem;
      font-size: 1em;
      font-weight: 800;
      color: #fff;
    }
    `;
  }
}
customElements.define('card-box', CardBox);
