const template = document.createElement('template');

template.innerHTML = `
<style>
  ul {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    list-style-position: inside;
    list-style-type: none;
    width: width: 100%;
    padding-inline-start: 30px;
  }
  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
  }
  li:hover {
    background-color: rgb(243 244 246);
  }
  p {
    margin: 0;
  }
  .icon {
    width: 1rem;
    height: 1rem;
  }
  .clickable {
    cursor: pointer;
  }
</style>
<ul>
  <li></li>
  <slot></slot>
</ul>
`;
const chevronRightIcon = '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>';
const chevronDownIcon = '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg>';

class TreeItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.ulElement = this._shadowRoot.querySelector("ul");
    this.liElement = this._shadowRoot.querySelector("li");
    this.handleClickEvent = new CustomEvent(
      "click-child", 
      {
        bubbles: true,
        cancelable: false,
      },
    );

    const slot = this._shadowRoot.querySelector("slot");
    slot.addEventListener("slotchange", this.handleSlotChange.bind(this));
    
    this.addEventListener("click", this.toggleVisibility.bind(this));
  }

  handleSlotChange(event) {
    const slot = event.target;
    const assignedNodes = slot.assignedNodes();

    if (assignedNodes.length > 0) {
      const icon = this.liElement.querySelector('span');

      if (this.liElement.innerHTML === '') this.setText(assignedNodes[0]?.textContent?.trim(), assignedNodes);
      if (assignedNodes.length > 1 && !icon) this.addIcon();
    }

    if ($(this).parent().is("body")) {
      const all = this.querySelectorAll("tree-item");
      $(all).css("display", "none");
    }
  }

  setText(text, assignedNodes) {
    this.liElement.innerHTML = `<p>${text}</p>`;
    assignedNodes[0].textContent = '';
  }

  addIcon() {
    const icon = document.createElement('span');
    const text = this.liElement.querySelector('p');
    icon.classList.add('icon');
    icon.innerHTML = chevronRightIcon;
    this.liElement.insertBefore(icon, text);
    this.liElement.classList.add('clickable');
  }

  toggleVisibility(event) {
    event.stopPropagation(); // Detener la propagación del evento de clic

    const childItems = this.querySelectorAll("tree-item");
    childItems.forEach((item) => {
      // Verificar si el elemento secundario es un descendiente directo del elemento actual
      if (item.parentNode === this) {
        // Utilizar jQuery para aplicar toggle solo a los elementos secundarios directos
        $(item).toggle();
        const icon = this.liElement.querySelector('span');
        icon.innerHTML = ($(item).css('display') === 'none') ? chevronRightIcon : chevronDownIcon;
      }
    });

    // Disparar evento sólo si el elemento tiene span
    if (this._shadowRoot.querySelector('slot').assignedNodes()?.length === 1) {
      this.dispatchEvent(this.handleClickEvent);
    }
  }
}

customElements.define('tree-item', TreeItem);