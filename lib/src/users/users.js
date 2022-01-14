var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property, css, query, } from "lit-element";
import { fetchData } from "../services.js";
let Users = class Users extends LitElement {
    constructor() {
        super(...arguments);
        this.users = [];
    }
    userTemplate(id, name, className) {
        return html `<tr data-id=${id} class="chatroom-users__user ${className}">
      <td>${name}</td>
      <td>
        <button
          @click=${() => this.handleDeleteUserClick(id)}
          class="chatroom-users__user-delete"
        >
          Delete ✗
        </button>
      </td>
    </tr>`;
    }
    render() {
        return html `
      <div class="chatroom-users">
        <h1>Users</h1>
        <table>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
          ${this.users.map((user) => this.userTemplate(user.id, user.name))}
          <tr class="chatroom-users__user-create">
            <td>
              <input placeholder="New user name" type="text" id="newUser" />
            </td>
            <td>
              <button @click=${this.handleCreateUserClick}>Create ✓</button>
            </td>
          </tr>
        </table>
      </div>
    `;
    }
    async handleCreateUserClick() {
        await fetchData("http://localhost:3000/Users", "POST", {
            name: this.input.value,
        })
            .then((data) => {
            this.users.push(data);
            this.input.value = "";
            this.requestUpdate();
        })
            .catch((error) => {
            console.error("Error:", error);
        });
    }
    async handleDeleteUserClick(id) {
        await fetchData("http://localhost:3000/Users/" + id, "DELETE")
            .then(() => {
            this.users.splice(this.users.findIndex((user) => user.id === id), 1);
            this.requestUpdate();
        })
            .catch((error) => {
            console.error("Error:", error);
        });
    }
};
Users.styles = css `
    :host {
      --primary-color: #04aa6d;
      --text-color: #4d5464;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 16px;
      color: var(--text-color);
      min-width: 240px;
    }

    .chatroom-users table {
      border-collapse: collapse;
      width: 100%;
    }

    .chatroom-users td,
    .chatroom-users th {
      border: 1px solid #ddd;
      padding: 8px;
    }

    .chatroom-users tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    .chatroom-users tr:hover {
      background-color: #ddd;
    }

    .chatroom-users th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: var(--primary-color);
      color: white;
    }
    .chatroom-users button {
      padding: 8px;
      max-width: 100px;
      background-color: var(--primary-color);
      width: 100%;
      border: none;
      color: white;
      cursor: pointer;
    }

    .chatroom-users .chatroom-users__user-delete {
      background-color: var(--text-color);
    }

    .chatroom-users input {
      padding: 8px;
      width: 100%;
      max-width: 200px;
    }
  `;
__decorate([
    property({ type: Array })
], Users.prototype, "users", void 0);
__decorate([
    query("#newUser")
], Users.prototype, "input", void 0);
Users = __decorate([
    customElement("chatroom-users")
], Users);
export { Users };
