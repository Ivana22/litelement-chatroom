var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property, css, query, } from "lit-element";
import { post, patch } from "../services.js";
export function subscribe(callback) {
    // Adds the WebSocket connection.
    // The server is also connected to this websocket so when a comment is posted,
    // every client that has this connection will receive a "message" event.
    // If you open two browsers to localhost:8000, you should be able to send messages between them.
    const ws = new WebSocket("ws://localhost:3030");
    // We listen to the "message" event, which will return a "data" property.
    // The "data" property is the stringified comment data.
    ws.addEventListener("message", (e) => {
        callback(JSON.parse(e.data));
    });
}
let Comments = class Comments extends LitElement {
    constructor() {
        super(...arguments);
        this.comments = [];
        this.users = [];
        this.selected = "";
        this.closed = true;
        this.options = [];
        this.chatroomId = "";
        this.user = { id: "", name: "" };
        this.subscribeCallback = (comment) => {
            this.comments.push(comment);
            this.comments = Array.from(new Set(this.comments.map((a) => a.id))).map((id) => {
                return this.comments.find((a) => a.id === id);
            });
            this.requestUpdate();
        };
    }
    firstUpdated() {
        // Connects to the WebSocket. When a comment gets posted to localhost:3000, this.subscribeCallback will fire.
        subscribe(this.subscribeCallback);
    }
    toggleMenu() {
        this.closed = !this.closed;
    }
    handleMenuOption(option) {
        this.user = option;
        const customEvent = new CustomEvent("selectionChanged", {
            detail: {
                option: this.user.name,
            },
        });
        this.dispatchEvent(customEvent);
        this.toggleMenu();
    }
    commentTemplate(comment) {
        return html `<div class="chatroom-comment">
      <span class="chatroom-comment__date">
        ${new Date(comment.created_at).toLocaleString()}
      </span>
      <p class="chatroom-comment__message">${comment.message}</p>
      <span class="chatroom-comment__sender">${comment.sender_name}</span>
      <span
        class="chatroom-comment__delete"
        @click=${() => this.handleDeleteCommentClick(comment.id)}
        >✗</span
      >
    </div>`;
    }
    render() {
        return html `
      ${this.comments.map((comment) => this.commentTemplate(comment))}
      <div class="chatroom-comment__new">
        <div class="chatroom-comment__new--dropdown">
          <div class="chatroom-comment__new--dropdown-label">
            Send message as:
          </div>
          <div
            class="chatroom-comment__new--dropdown-head"
            @click="${this.toggleMenu}"
          >
            <div class="chatroom-comment__new--dropdown-choice">
              ${this.user.name || "None"}
            </div>
            <div
              class="chatroom-comment__new--dropdown-toggle ${this.closed
            ? "closed"
            : "open"}"
            ></div>
          </div>
        </div>

        <div
          class="chatroom-comment__new--dropdown-body ${this.closed
            ? "chatroom-comment__new--dropdown-closed"
            : "chatroom-comment__new--dropdown-open"}"
        >
          ${this.users.map((user) => html `<div
                class="chatroom-comment__new--dropdown-option"
                @click="${() => this.handleMenuOption(user)}"
              >
                ${user.name}
              </div>`)}
        </div>
        <textarea
          placeholder="New comment"
          type="text"
          id="newComment"
        ></textarea
        ><button @click=${this.handleCreateCommentClick}>Send ✓</button>
      </div>
    `;
    }
    async handleCreateCommentClick() {
        await post("http://localhost:3000/Comments", {
            message: this.textarea.value,
            room_id: this.chatroomId,
            sender_name: this.user.name,
            sender_id: this.user.id,
        });
        this.textarea.value = "";
    }
    async handleDeleteCommentClick(id) {
        const data = await patch("http://localhost:3000/Comments/" + id, {
            id: id,
            event: "deleted",
        });
        this.comments.splice(this.comments.findIndex((comment) => comment.id === data.id), 1);
        this.requestUpdate();
    }
};
Comments.styles = css `
    :host {
      --primary-color: #04aa6d;
      --text-color: #4d5464;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 16px;
      color: var(--text-color);
      min-width: 240px;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      user-select: none;
      width: 98%;
    }

    .chatroom-comment {
      padding: 8px 20px;
      background-color: lavender;
      border-radius: 10px;
      margin: 10px 0;
      position: relative;
    }

    .chatroom-comment span {
      color: grey;
      font-size: 12px;
    }

    .chatroom-comment p {
      text-align: right;
      margin: 2px;
    }

    .chatroom-comment .chatroom-comment__delete {
      background-color: red;
      padding: 5px 9px;
      color: white;
      border-radius: 20px;
      font-size: 16px;
      position: absolute;
      top: -10px;
      right: -5px;
      cursor: pointer;
    }

    .chatroom-comment__new {
      margin: 10px 0;
    }

    .chatroom-comment__new button {
      float: right;
      background-color: var(--primary-color);
      border: none;
      color: white;
      padding: 10px;
      margin: 10px 0;
    }

    .chatroom-comment__new textarea {
      width: -webkit-fill-available;
      background-color: rgb(247, 247, 247);
      border: 1px solid grey;
      margin: 10px 0px;
      min-height: 24px;
      padding: 8px;
      font-family: Arial, Helvetica, sans-serif;
    }

    .chatroom-comment__new--dropdown-label {
      font-size: 12px;
      color: var(--primary-color);
    }

    .chatroom-comment__new--dropdown-head {
      border-bottom: 1px solid var(--primary-color);
      display: flex;
      justify-content: space-between;
      min-height: 24px;
      padding: 8px;
    }

    .chatroom-comment__new--dropdown-choice {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: var(--text-color);
      height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .chatroom-comment__new--dropdown-toggle {
      width: 24px;
      height: 24px;
      background-color: var(--primary-color);
      -webkit-mask-image: url('data:image/svg+xml;utf8,<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>');
      -webkit-mask-repeat: no-repeat;
      transition: transform 0.3s linear;
    }
    .chatroom-comment__new--dropdown-toggle.chatroom-comment__new--dropdown-open {
      transform: rotate(180deg);
    }

    .chatroom-comment__new--dropdown-body {
      max-height: 0;
      opacity: 0;
      overflow-y: scroll;
      overflow-x: hidden;
      box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.6);
      transition: max-height 0.3s linear, opacity 0.3s linear;
    }
    .chatroom-comment__new--dropdown-body.chatroom-comment__new--dropdown-open {
      max-height: 80px;
      opacity: 1;
    }
    .chatroom-comment__new--dropdown-body.chatroom-comment__new--dropdown-closed {
      max-height: 0;
      opacity: 0;
    }

    ::slotted(p) {
      margin: 0;
    }

    .chatroom-comment__new--dropdown-option {
      color: var(--text-color);
      position: relative;
      padding-left: 8px;
      display: flex;
      align-items: center;
      transition: padding 0.5s linear, background-color 0.25s linear,
        color 0.25s linear;
      opacity: 1;
    }

    .chatroom-comment__new--dropdown-option::after {
      content: "";
      width: 100%;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.15);
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .chatroom-comment__new--dropdown-option:hover {
      background-color: var(--primary-color);
      color: #fff;
      padding-left: 16px;
    }
  `;
__decorate([
    property({ type: Array })
], Comments.prototype, "comments", void 0);
__decorate([
    property({ type: Array })
], Comments.prototype, "users", void 0);
__decorate([
    property({ type: String })
], Comments.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], Comments.prototype, "closed", void 0);
__decorate([
    property({ type: Array })
], Comments.prototype, "options", void 0);
__decorate([
    property({ type: String })
], Comments.prototype, "chatroomId", void 0);
__decorate([
    property({ type: Object })
], Comments.prototype, "user", void 0);
__decorate([
    query("#newComment")
], Comments.prototype, "textarea", void 0);
Comments = __decorate([
    customElement("chatroom-comments")
], Comments);
export { Comments };
