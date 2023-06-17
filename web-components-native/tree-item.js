const treeItemTemplate = document.createElement('template');
treeItemTemplate.innerHTML = /*html*/ `
  <style>
  .dropdown-submenu {
    position: relative;
  }

  .dropdown-submenu .dropdown-menu {
    top: 0;
    left: 100%;
    margin-top: -1px;
  }
  </style>
  <li><a href="#"></a></li>
`;


class TreeItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(treeItemTemplate.content.cloneNode(true));
    this.update();
  }

  update() {
    this.getAttribute('key') ? this.shadowRoot.querySelector('a').innerHTML = this.getAttribute('key') : '';
    // this.getAttribute('value') ? this.shadowRoot.querySelector('a').setAttribute('href', this.getAttribute('value')) : '';
  }
}

window.customElements.define('tree-item', TreeItem);