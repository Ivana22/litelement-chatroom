var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property, css } from "lit-element";
import "../comments/comments.js";
import { fetchData } from "../services.js";
let Tabs = class Tabs extends LitElement {
    constructor() {
        super(...arguments);
        this.chatrooms = [];
        this.comments = [];
        this.users = [];
    }
    connectedCallback() {
        super.connectedCallback();
    }
    async fetchData(url) {
        await fetchData(url + "&event=created", "GET")
            .then((data) => {
            this.comments = data;
        })
            .catch((error) => {
            console.error("Error:", error);
        });
    }
    selectTab(id, url) {
        for (let chatroom of this.chatrooms) {
            if (chatroom.id === id) {
                chatroom.selected = true;
            }
            else {
                chatroom.selected = false;
            }
        }
        this.fetchData(url);
        this.requestUpdate();
    }
    chatroomTemplate(id, title, url, selected) {
        return html `<div class="chatroom-tab">
      <div class="chatroom-tab__title" @click=${() => this.selectTab(id, url)}>
        <h1>${title}</h1>
      </div>
      <div
        class="chatroom-tab__content ${selected
            ? ""
            : "chatroom-tab__content-hidden"}"
      >
        <chatroom-comments
          .comments=${this.comments}
          .users=${this.users}
          chatroomId=${id}
        ></chatroom-comments>
      </div>
    </div>`;
    }
    render() {
        return html `
      ${this.chatrooms.map((chatroom, i) => this.chatroomTemplate(chatroom.id, "Chatroom " + (i + 1), chatroom.comments_url, chatroom.selected || false))}
    `;
    }
};
Tabs.styles = css `
    :host {
      --primary-color: #04aa6d;
      --text-color: #4d5464;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 16px;
      color: var(--text-color);
    }

    .chatroom-tab {
      padding: 5px 10px;
      background-color: rgb(247, 247, 247);
      max-width: 40%;
      display: inline-block;
      width: 100%;
      vertical-align: top;
    }
    .chatroom-tab:first-child {
      margin-right: 5%;
    }
    .chatroom-tab__content {
      max-height: 500px;
      overflow-x: auto;
      padding: 10px 0;
    }
    .chatroom-tab__content-hidden {
      display: none;
    }
    .chatroom-tab__title {
      border-bottom: 3px solid var(--primary-color);
    }
    .chatroom-tab__title:hover {
      cursor: pointer;
    }
    @media only screen and (max-width: 600px) {
      .chatroom-tab__wrapper {
        max-width: 95%;
      }
    }
  `;
__decorate([
    property({ type: Array })
], Tabs.prototype, "chatrooms", void 0);
__decorate([
    property({ type: Array })
], Tabs.prototype, "comments", void 0);
__decorate([
    property({ type: Array })
], Tabs.prototype, "users", void 0);
Tabs = __decorate([
    customElement("chatroom-tabs")
], Tabs);
export { Tabs };
