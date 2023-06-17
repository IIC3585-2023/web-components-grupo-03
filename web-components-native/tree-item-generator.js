import { data } from './data.js';

const printTree = ([k,v]) => {
  if (v !== null && typeof v === "object") {
    Object.entries(v).map((e) => printTree(e))
  }
}

// Object.entries(a).map((e) => printTree(e))

const treeTemplate = document.createElement('template');
treeTemplate.innerHTML = /*html*/ `
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
  <a class="btn btn-default dropdown-toggle">Probando 1er nivel</a>
  <ul class="dropdown-menu"></ul>
`;

class TreeItemGenerator extends HTMLElement {
  constructor() {
    super();
    // this.key = this.getAttribute('key') || '';
    // this.value = this.getAttribute('value') || '';
    data = Object.entries(data)
    this.key = data[0][0];
    this.value = data[0][1];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(treeTemplate.content.cloneNode(true));
    this.update();
  }

  update() {
    this.value = JSON.parse(this.value);
    this.value = Object.entries(this.value);
    this.value.map((e) => this.shadowRoot.querySelector('ul').appendChild(this.generateTreeItem(e)));
  }

  generateTreeItem([key, value]) {
    console.log(key, value);
    const treeItem = document.createElement('tree-item');
    treeItem.setAttribute('key', key);
    treeItem.setAttribute('value', value);
    return treeItem;
  }
}

window.customElements.define('tree-item-generator', TreeItemGenerator);