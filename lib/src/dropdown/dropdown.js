var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property, css } from "lit-element";
let Dropdown = class Dropdown extends LitElement {
    constructor() {
        super(...arguments);
        this.title = "Choose your language";
        this.selected = "";
        this.closed = false;
        this.options = [];
        this.value = "";
    }
    toggleMenu() {
        this.closed = !this.closed;
    }
    handleMenuOption(event, option) {
        this.value = option;
        const customEvent = new CustomEvent("selectionChanged", {
            detail: {
                option: this.value,
            },
        });
        this.dispatchEvent(customEvent);
        this.toggleMenu();
    }
    render() {
        return html `
      <div class="label">${this.title}</div>
      <div class="head" @click="${this.toggleMenu}">
        <div class="choice">${this.value}</div>
        <div class="toggle ${this.closed ? "closed" : "open"}"></div>
      </div>
      <div class="body ${this.closed ? "closed" : "open"}">
        ${this.options.map((option) => html `<div
              class="option"
              @click="${(e) => this.handleMenuOption(e, option.name)}"
            >
              ${option.name}
            </div>`)}
      </div>
    `;
    }
};
Dropdown.styles = css `
    :host {
      --primary-color: #ff584f;
      --text-color: #4d5464;
      font-family: "Poppins";
      font-size: 16px;
      color: var(--text-color);
      min-width: 240px;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      user-select: none;
    }

    .label {
      font-size: 12px;
      color: var(--primary-color);
    }

    .head {
      border-bottom: 1px solid var(--primary-color);
      display: flex;
      justify-content: space-between;
      min-height: 24px;
      padding: 8px;
    }

    .choice {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: var(--text-color);
      height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .toggle {
      width: 24px;
      height: 24px;
      background-color: var(--primary-color);
      -webkit-mask-image: url('data:image/svg+xml;utf8,<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>');
      -webkit-mask-repeat: no-repeat;
      transition: transform 0.3s linear;
    }
    .toggle.open {
      transform: rotate(180deg);
    }

    .body {
      max-height: 0;
      opacity: 0;
      overflow-y: scroll;
      overflow-x: hidden;
      box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.6);
      transition: max-height 0.3s linear, opacity 0.3s linear;
    }
    .body.open {
      max-height: 80px;
      opacity: 1;
    }
    .body.closed {
      max-height: 0;
      opacity: 0;
    }

    ::slotted(p) {
      margin: 0;
    }

    .option {
      color: var(--text-color);
      position: relative;
      padding-left: 8px;
      display: flex;
      align-items: center;
      transition: padding 0.5s linear, background-color 0.25s linear,
        color 0.25s linear;
      opacity: 1;
    }

    .option::after {
      content: "";
      width: 100%;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.15);
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .option:hover {
      background-color: var(--primary-color);
      color: #fff;
      padding-left: 16px;
    }
  `;
__decorate([
    property({ type: String })
], Dropdown.prototype, "title", void 0);
__decorate([
    property({ type: String })
], Dropdown.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], Dropdown.prototype, "closed", void 0);
__decorate([
    property({ type: Array })
], Dropdown.prototype, "options", void 0);
__decorate([
    property({ type: String })
], Dropdown.prototype, "value", void 0);
Dropdown = __decorate([
    customElement("chat-dropdown")
], Dropdown);
export { Dropdown };
