let session = new Session();
session_id = session.getSession();

if (session_id !== "") {
  async function populateUserData() {
    let user = new User();
    user = await user.get(session_id);
    document.querySelector("#username").innerText = user["username"];
    document.querySelector("#email").innerText = user["email"];

    document.querySelector("#korisnicko_ime").value = user["username"];
    document.querySelector("#edit_email").value = user["email"];
  }

  populateUserData();
} else {
  window.location.href = "/";
}

document.querySelector("#logout").addEventListener("click", (e) => {
  e.preventDefault();

  session.destroySession();
  window.location.href = "/";
});

document.querySelector("#editAccount").addEventListener("click", () => {
  document.querySelector(".custom-modal").style.display = "block";
});

document.querySelector("#closeModal").addEventListener("click", () => {
  document.querySelector(".custom-modal").style.display = "none";
});

document.querySelector("#editForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let user = new User();
  user.username = document.querySelector("#korisnicko_ime").value;
  user.email = document.querySelector("#edit_email").value;
  user.edit();
});

document.querySelector("#deleteProfile").addEventListener("click", (e) => {
  e.preventDefault();

  async function getGet() {
    let user = new User();
    user = await user.get(session_id);

    let passwordCheck = document.querySelector("#obrisipass").value;

    let text = "Da li ste sigurni da zelite da obrisete profil";

    console.log(user.password);

    if (passwordCheck === user.password) {
      if (confirm(text) === true) {
        let user = new User(session_id);
        user.delete();
      }
    } else {
      alert("Pogresna lozinka");
    }
  }
  getGet();
});

document.querySelector("#postForm").addEventListener("submit", (e) => {
  e.preventDefault();

  async function createPost() {
    let content = document.querySelector("#postContent").value;

    let post = new Post();
    post.post_content = content;
    post = await post.create();

    let comments = new Comment();
    comments = await comments.get(post.id);

    let delete_post_html = "";

    let current_user = new User();
    current_user = await current_user.get(session_id);

    if (session_id === post.user_id) {
      delete_post_html = `<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>`;
    }

    let html = document.querySelector("#allPostsWrapper").innerHTML;

    document.querySelector("#allPostsWrapper").innerHTML =
      ` <div class="single-post" data-post_id="${post.id}">
    <div class="post-content">${post.content}</div>

    <div class="post-actions">
    <p><b>Autor:</b> ${current_user.username}</p>
    <div>
    <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span> Likes </button>
    <button onclick="commentPost(this)" class="comment-btn">Comments </button>
    ${delete_post_html}
    </div>
    </div>
   
    <div class="post-comments">
    <form>
    <input placeholder="Napisi komentar..." type="text">
    <button onclick="commentPostSubmit(event)">Comment</button>
    </form>
    </div>
    </div>
    
   ` + html;
  }
  createPost();

  document.querySelector("#postContent").value = "";
});

async function getAllPosts() {
  let all_posts = new Post();
  all_posts = await all_posts.getAllPosts();

  all_posts.forEach((post) => {
    async function getPostUser() {
      let user = new User();
      user = await user.get(post.user_id);

      let comments = new Comment();
      let id = comments.user_id;
      comments = await comments.get(post.id);
      console.log(comments);

      let comments_html = "";

      /* async function populateUser(com) {
        let user = new User();
        user = await user.get(com.user_id);

        comments_html += `<div>${user.username}</div>`;
      }
*/
      if (comments.length > 0) {
        comments.forEach((comment) => {
          if (comment !== "") {
            comments_html += `<div class="single-comment" data-post_id="${comment.id}"> ${comment.content} <br> <button onclick="likeComment(this)" class="like-comment" >Like comment <span> ${comment.likes}</span></button></div>`;
          }
        });
      }

      let delete_post_html = "";

      if (session_id === post.user_id) {
        delete_post_html = `<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>`;
      }

      let html = document.querySelector("#allPostsWrapper").innerHTML;

      document.querySelector("#allPostsWrapper").innerHTML =
        `      <div class="single-post" data-post_id="${post.id}">
      <div class="post-content">${post.content}</div>

      <div class="post-actions">
      <p><b>Autor:</b> ${user.username}</p>
      <div>
      <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span> Likes </button>
      <button onclick="commentPost(this)" class="comment-btn">Comments </button>
      ${delete_post_html}
      </div>
      </div>
     
      <div class="post-comments">
      <form>
      <input placeholder="Napisi komentar..." type="text">
      <button onclick="commentPostSubmit(event)">Comment</button>
      </form>
      ${comments_html}

      </div>
      </div>` + html;
    }
    getPostUser();
  });
}

getAllPosts();

async function commentPostSubmit(e) {
  e.preventDefault();

  let btn = e.target;

  let user = new User();

  let main_post_el = btn.closest(".single-post");
  let post_id = main_post_el.getAttribute("data-post_id");

  let html = document.querySelector(".post-comments").innerHTML;

  let comment_value = main_post_el.querySelector("input").value;

  main_post_el.querySelector("input").value = "";

  let comment = new Comment();
  comment.content = comment_value;
  comment.user_id = session_id;
  comment.post_id = post_id;
  if (comment.content !== "") {
    comment.create();
    btn.setAttribute("disabled", "true");
  } else {
    alert("Morate napisati nesto u komentar");
    btn.removeAttribute("disabled");
    return;
  }

  let current_user = new User();
  current_user = await current_user.get(comment.user_id);

  main_post_el.querySelector(
    ".post-comments"
  ).innerHTML += `<div class="single-comment"  data-post_id="${comment.id}"> ${comment.content} <br><button onclick="likeComment()" class="like-comment">Like comment<span> ${comment.likes}</span></button></div>`;
}
const removeMyPost = (btn) => {
  let post_id = btn.closest(".single-post").getAttribute("data-post_id");

  btn.closest(".single-post").remove();

  let post = new Post();
  post.delete(post_id);
};

const likePost = (btn) => {
  let main_post_el = btn.closest(".single-post");
  let post_id = main_post_el.getAttribute("data-post_id");
  let number_of_likes = parseInt(btn.querySelector("span").innerText);

  btn.querySelector("span").innerText = number_of_likes + 1;
  btn.setAttribute("disabled", "true");

  let post = new Post();
  post.like(post_id, number_of_likes + 1);
};

const commentPost = (btn) => {
  let main_post_el = btn.closest(".single-post");
  let post_id = btn.getAttribute("data-post_id");

  main_post_el.querySelector(".post-comments").style.display = "block";
};

async function users() {
  let users = new User();
  users = await users.getUsers();
  console.log(users);

  let acUsers = document.querySelector("#users");
  let html = "";
  users.forEach((user) => {
    html = `<div data-user_id="${user.id}" class="single-user"> ${user.username} </div>`;
    acUsers.innerHTML += html;
  });
}

users();

async function activeUser() {
  let user = new User();
  user = await user.get(session_id);

  let users = document.querySelectorAll(".single-user");

  users.forEach((user) => {
    let id = user.getAttribute("data-user_id");
    if (session_id === id) {
      user.innerHTML += `<span> active<span>`;
      user.classList.add("active");
    }
  });
}
activeUser();

const likeComment = (btn) => {
  let main_post_el = btn.closest(".single-comment");
  let comment_id = main_post_el.getAttribute("data-post_id");
  let number_of_likes = parseInt(btn.querySelector("span").innerText);

  btn.querySelector("span").innerText = number_of_likes + 1;
  btn.setAttribute("disabled", "true");

  let comment = new Comment();
  comment.like(comment_id, number_of_likes + 1);
};
