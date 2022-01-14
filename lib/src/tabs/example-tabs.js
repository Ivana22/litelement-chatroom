var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, customElement, property } from "lit-element";
function partMap(parts) {
    return Object.entries(parts)
        .filter(([key, value]) => value)
        .map(([key, value]) => key)
        .join(" ");
}
let Tabs = class Tabs extends LitElement {
    constructor() {
        super(...arguments);
        this.selected = false;
    }
    get tabs() {
        const slot = this.shadowRoot.querySelector("slot");
        return slot ? slot.assignedElements() : [];
    }
    selectTab(selected) {
        for (let tab of this.tabs)
            tab.selected = tab == selected;
        this.requestUpdate();
    }
    firstUpdated() {
        this.tabs.find((tab) => tab.selected) || this.selectTab(this.tabs[0]);
    }
    render() {
        return html `
      ${console.log("vv", this.title)}
      <nav part="tab-bar">
        ${this.tabs.map((tab) => html `
            <span
              part=${partMap({ tab: true, "tab-selected": tab.selected })}
              @click=${(ev) => this.selectTab(tab)}
            >
              ${tab.title}
            </span>
          `)}
      </nav>

      <slot part="content" @slotchange=${(ev) => this.requestUpdate()}></slot>
    `;
    }
};
Tabs.styles = css `
    :host,
    slot {
      display: block;
    }

    span {
      display: inline-block;
    }
  `;
__decorate([
    property({ type: Boolean, reflect: true })
], Tabs.prototype, "selected", void 0);
Tabs = __decorate([
    customElement("example-tabs")
], Tabs);
export { Tabs };
let Tab = class Tab extends LitElement {
    constructor() {
        super(...arguments);
        this.selected = false;
        this.title = "";
    }
    render() {
        return html ` <slot></slot> `;
    }
};
Tab.styles = css `
    :host(:not([selected])) {
      display: none;
    }
  `;
__decorate([
    property({ type: Boolean, reflect: true })
], Tab.prototype, "selected", void 0);
__decorate([
    property({ type: String, reflect: true })
], Tab.prototype, "title", void 0);
Tab = __decorate([
    customElement("example-tab")
], Tab);
export { Tab };
