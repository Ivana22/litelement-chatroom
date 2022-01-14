import {
  LitElement,
  html,
  customElement,
  property,
  css,
  query,
} from "lit-element";
import { User } from "../types.js";
import { fetchData } from "../services.js";

@customElement("chatroom-users")
export class Users extends LitElement {
  static styles = css`
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

  @property({ type: Array }) users: User[] = [];

  userTemplate(id: string, name: string, className?: string) {
    return html`<tr data-id=${id} class="chatroom-users__user ${className}">
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
    return html`
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

  @query("#newUser")
  input!: HTMLInputElement;

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

  async handleDeleteUserClick(id: string) {
    await fetchData("http://localhost:3000/Users/" + id, "DELETE")
      .then(() => {
        this.users.splice(
          this.users.findIndex((user) => user.id === id),
          1
        );
        this.requestUpdate();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
