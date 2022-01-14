export async function getData() {
    const data = await fetchData("http://localhost:3000/db", "GET")
        .then((data) => data)
        .catch((error) => {
        console.error("Error:", error);
    });
    return data;
}
// connectedCallback() {
//     super.connectedCallback();
//     this.db();
//   }
//   async db() {
//     const data = await getData();
//     this.data = data;
//   }
export async function createUser(user) {
    const data = await fetchData("http://localhost:3000/users", "POST", user)
        .then((data) => data)
        .catch((error) => {
        console.error("Error:", error);
    });
    return data;
}
// async handleCreateUserClick() {
//     const data = await createUser({ name: this.input.value });
//     this.users.push(data);
//     this.input.value = "";
//     this.requestUpdate();
//   }
export async function deleteUser(id) {
    await fetchData("http://localhost:3000/users/" + id, "DELETE", { id }).catch((error) => {
        console.error("Error:", error);
    });
}
// async handleDeleteUserClick(id: string) {
//     await deleteUser(id).then(() => {
//       this.users.splice(
//         this.users.findIndex((user) => user.id === id),
//         1
//       );
//       this.requestUpdate();
//     });
//   }
