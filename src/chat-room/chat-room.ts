import { LitElement, html, customElement, property, css } from "lit-element";
import "../tabs/tabs.js";
import "../users/users.js";
import { db } from "../types.js";
import { fetchData } from "../services.js";

@customElement("chat-room")
export class ChatRoom extends LitElement {
  static get styles() {
    return css``;
  }

  @property({ type: Object, reflect: true }) data: db;

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
    return html`
      <chatroom-tabs
        .chatrooms=${this.data["chat-rooms"]}
        .users=${this.data.users}
      ></chatroom-tabs>
      <chatroom-users .users=${this.data.users}></chatroom-users>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-room": ChatRoom;
  }
}
