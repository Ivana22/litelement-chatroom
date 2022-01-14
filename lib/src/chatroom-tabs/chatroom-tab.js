var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property, css } from "lit-element";
let Tabbs = class Tabbs extends LitElement {
    constructor() {
        super(...arguments);
        this.chatrooms = [];
        this.chatroom = {
            id: String,
            title: String,
            comments_url: String,
            selected: Boolean,
        };
    }
    selectTab(id) {
        console.log("ch", this.chatrooms);
        for (let chatroom of this.chatrooms) {
            if (chatroom.id === id) {
                chatroom.selected = true;
            }
            else {
                chatroom.selected = false;
            }
        }
        this.requestUpdate();
    }
    chatroomTemplate(id, title, url, selected) {
        return html `<div class="chatroom-tab__wrapper">
      <div class="chatroom-tab__title" @click=${() => this.selectTab(id)}>
        <h1>${title}</h1>
      </div>
      <div
        class="chatroom-tab__content ${selected
            ? ""
            : "chatroom-tab__content-hidden"}"
      >
        ${url}
      </div>
    </div>`;
    }
    render() {
        return html `
      ${console.log(this.chatrooms)}
      ${this.chatrooms.map((chatroom, i) => this.chatroomTemplate(chatroom.id, "Chatroom " + (i + 1), chatroom.comments_url, chatroom.selected || false))}
    `;
    }
};
Tabbs.styles = css `
    .chatroom-tab__content-hidden {
      display: none;
    }
  `;
__decorate([
    property({ type: Array })
], Tabbs.prototype, "chatrooms", void 0);
__decorate([
    property({ type: Object })
], Tabbs.prototype, "chatroom", void 0);
Tabbs = __decorate([
    customElement("chatroom-tabb")
], Tabbs);
export { Tabbs };
