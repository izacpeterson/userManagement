async function fetchData(url, callback) {
  let rawData = await fetch(url);
  let jsonData = await rawData.json();
  callback(jsonData);
}
fetchData("/getAllUsers", (data) => {
  console.log(data);
});
const User = {
  template: `
      <li class="flex">
        <h2 class="w-1/6 text-xl underline">ID</h2>
        <h2 class="w-1/6 text-xl underline">First Name</h2>
        <h2 class="w-1/6 text-xl underline">Last Name</h2>
        <h2 class="w-1/6 text-xl underline">Email</h2>
        <h2 class="w-1/12 text-xl underline">Age</h2>
    </li>
    <li v-for="user in users" class="flex items-center">
        <h2 class="w-1/6">{{user._id}}</h2>
        <h2 class="w-1/6">{{user.first}}</h2>
        <h2 class="w-1/6">{{user.last}}</h2>
        <h2 class="w-1/6">{{user.email}}</h2>
        <h2 class="w-1/12">{{user.age}}</h2>
        <a :href="'/editUser?id=' + user._id"><button class="p-2 m-2 text-white bg-blue-500">Edit User</button></a>
        <a :href="'/deleteUser?id=' + user._id"><button class="p-2 m-2 text-white bg-rose-500">Delete User</button></a>
    </li>`,
  data() {
    return {
      users: [],
    };
  },
  created() {
    fetchData("/getAllUsers", (data) => {
      this.users = data;
    });
  },
};

const App = Vue.createApp({
  components: {
    User,
  },
  template: `
  <header class="p-5 bg-gray-800 text-white"><h1 class="text-4xl">Izac User Management</h1></header>
  <main>
  <a href="/newUser"><button class="p-2 m-2 text-white bg-blue-500">New User</button></a>
    <ul class="p-5">
        <User></User>
    </ul>
  </main>
  `,
});
App.mount("#app");
