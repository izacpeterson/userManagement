async function fetchData(url, callback) {
  let rawData = await fetch(url);
  let jsonData = await rawData.json();
  callback(jsonData);
}

const User = {
  template: `
        <div class="flex flex-col  w-2/12 p-2"><h2 class="">Name: </h2><input type="text" v-model="name" class="border bg-gray-100"/></div>
        <div class="flex flex-col w-2/12 p-2"><h2 class="">Email: </h2><input type="text" v-model="email" class="border bg-gray-100"/></div>
        <div class="flex flex-col  w-2/12 p-2"><h2 class="">Age: </h2><input type="text" v-model="age" class="border bg-gray-100"/></div>
        <button class="p-2 m-2 text-white bg-blue-500" @click="submitData">Save</button>
        <button class="p-2 m-2 text-white bg-rose-500" @click="cancel">Cancel</button>
        `,
  data() {
    return {
      name: "",
      email: "",
      age: "",
      id: "",
    };
  },
  methods: {
    submitData() {
      console.log(this.name);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: this.name,
        email: this.email,
        age: this.age,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:3000/newUser", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      // document.location.href = "/";
    },
    cancel() {
      document.location.href = "/";
    },
  },
};

const App = Vue.createApp({
  components: {
    User,
  },
  template: `
  <header class="p-5 bg-gray-800 text-white"><h1 class="text-4xl">Izac User Management</h1></header>
  <main>
    <ul class="p-5">
        <User></User>
    </ul>
  </main>
  `,
});
App.mount("#app");
