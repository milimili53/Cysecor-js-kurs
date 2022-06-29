class User {
  user_id = "";
  username = "";
  email = "";
  password = "";
  api_url = "https://62b7147b491a19c97aee4165.mockapi.io";

  create() {
    let data = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    data = JSON.stringify(data);

    fetch(this.api_url + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        let session = new Session();
        session.user_id = data.id;
        session.startSession();

        window.location.href = "hexa.html";
      });
  }

  async get(user_id) {
    let response = await fetch(this.api_url + "/users/" + user_id);
    let data = response.json();

    return data;
  }

  login() {
    fetch(this.api_url + "/users")
      .then((response) => response.json())
      .then((data) => {
        let login_sucessful = 0;
        data.forEach((user) => {
          if (user.email === this.email && user.password === this.password) {
            let session = new Session();
            session.user_id = user.id;
            session.startSession();
            login_sucessful = 1;
            window.location.href = "hexa.html";
          }
        });

        if (login_sucessful === 0) {
          alert("Pogresna email adresa ili lozinka");
        }
      });
  }

  edit() {
    let data = {
      username: this.username,
      email: this.email,
    };

    data = JSON.stringify(data);

    let session = new Session();
    session_id = session.getSession();

    fetch(this.api_url + "/users/" + session_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = "hexa.html";
      });
  }

  delete() {
    let session = new Session();
    session_id = session.getSession();

    fetch(this.api_url + "/users/" + session_id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        let session = new Session();
        session.destroySession();
        window.location.href = "/";
      });
  }

  async getUsers() {
    let response = await fetch(this.api_url + "/users");
    let data = response.json();

    return data;
  }
}
