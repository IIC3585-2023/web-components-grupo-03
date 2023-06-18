const template = document.createElement('template');

template.innerHTML = `
<style>
  ul {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    list-style-position: inside;
    list-style-type: none;
  }
  li {
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
  }
  li:hover {
    background-color: rgb(249 250 251);
  }
</style>
<ul>
  <li></li>
  <slot></slot>
</ul>
`;

class TreeItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.liElement = this._shadowRoot.querySelector("li");

    const slot = this._shadowRoot.querySelector("slot");
    slot.addEventListener("slotchange", this.handleSlotChange.bind(this));
    
    this.addEventListener("click", this.toggleVisibility.bind(this));
  }

  handleSlotChange(event) {
    const slot = event.target;
    const assignedNodes = slot.assignedNodes();

    if (assignedNodes.length > 0 && this.liElement.innerHTML === '') {
      this.liElement.innerHTML = assignedNodes[0]?.textContent?.trim();
      assignedNodes[0].textContent = '';
    }
  }

  toggleVisibility(event) {
    event.stopPropagation(); // Detener la propagación del evento de clic

    const childItems = this.querySelectorAll("tree-item");
    childItems.forEach((item) => {
      // Verificar si el elemento secundario es un descendiente directo del elemento actual
      if (item.parentNode === this) {
        // Utilizar jQuery para aplicar toggle solo a los elementos secundarios directos
        $(item).toggle();
      }
    });
  }
}

customElements.define('tree-item', TreeItem);