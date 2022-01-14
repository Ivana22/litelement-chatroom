var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property, css } from "lit-element";
import "../tabs/tabs.js";
import "../users/users.js";
import { fetchData } from "../services.js";
let ChatRoom = class ChatRoom extends LitElement {
    static get styles() {
        return css ``;
    }
    connectedCallback() {
        super.connectedCallback();
        this.fetchData();
    }
    async fetchData() {
        await fetchData("http://localhost:3000/db", "GET")
            .then((data) => {
            this.data = data;
        })
            .catch((error) => {
            console.error("Error:", error);
        });
    }
    render() {
        return html `
      <chatroom-tabs
        .chatrooms=${this.data["chat-rooms"]}
        .users=${this.data.users}
      ></chatroom-tabs>
      <chatroom-users .users=${this.data.users}></chatroom-users>
    `;
    }
};
__decorate([
    property({ type: Object, reflect: true })
], ChatRoom.prototype, "data", void 0);
ChatRoom = __decorate([
    customElement("chat-room")
], ChatRoom);
export { ChatRoom };
