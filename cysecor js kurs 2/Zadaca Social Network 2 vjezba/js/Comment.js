class Comment {
  post_id = "";
  user_id = "";
  content = "";
  likes = "";
  api_url = "https://62b7147b491a19c97aee4165.mockapi.io";

  create() {
    let session = new Session();
    session_id = session.getSession();

    let data = {
      post_id: this.post_id,
      user_id: session_id,
      content: this.content,
      likes: 0,
    };

    data = JSON.stringify(data);

    fetch(this.api_url + "/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Komentar kreiran");
      });
  }

  async get(post_id) {
    let api_url = this.api_url + "/comments";

    const response = await fetch(api_url);
    const data = await response.json();
    let post_comments = [];

    let i = 0;
    data.forEach((item) => {
      if (item.post_id === post_id) {
        post_comments[i] = item;
        i++;
      }
    });
    return post_comments;
  }

  like(comment_id, likes) {
    let data = {
      likes: likes,
    };

    data = JSON.stringify(data);

    fetch(this.api_url + "/comments/" + comment_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {});
  }
}
