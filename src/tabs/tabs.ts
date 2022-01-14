import { LitElement, html, customElement, property, css } from "lit-element";
import "../comments/comments.js";
import { Chatroom, Comment, User } from "../types.js";
import { fetchData } from "../services.js";

@customElement("chatroom-tabs")
export class Tabs extends LitElement {
  static styles = css`
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

  @property({ type: Array }) chatrooms: Chatroom[] = [];
  @property({ type: Array }) comments: Comment[] = [];
  @property({ type: Array }) users: User[] = [];

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

  selectTab(id: string, url: string) {
    for (let chatroom of this.chatrooms) {
      if (chatroom.id === id) {
        chatroom.selected = true;
      } else {
        chatroom.selected = false;
      }
    }
    this.fetchData(url);
    this.requestUpdate();
  }

  chatroomTemplate(id: string, title: string, url: string, selected: boolean) {
    return html`<div class="chatroom-tab">
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
    return html`
      ${this.chatrooms.map((chatroom, i) =>
        this.chatroomTemplate(
          chatroom.id,
          "Chatroom " + (i + 1),
          chatroom.comments_url,
          chatroom.selected || false
        )
      )}
    `;
  }
}
