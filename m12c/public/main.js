const usersList = document.getElementById("users"); // listę userów
const userName = document.getElementById("msg_name"); // input
const board = document.getElementById("board");
const sendButton = document.getElementById("msg_button");
const userMessage = document.getElementById("msg_txt");

const socket = io.connect("", {
  query: `token=OUR_SECRET_TOKEN`,
});

userName.value = `User #${Math.floor(Math.random() * 1000)}`;

socket.emit("newUser", userName.value);

const render = (parent, elements) => {
  parent.innerHTML = "";

  const fragment = document.createDocumentFragment();

  elements.forEach((element) => {
    fragment.appendChild(element);
  });

  parent.appendChild(fragment);
};

const renderListOfUsers = (users) => {
  const userElement = Object.values(users).map((user) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = user.name;
    if (user.name === userName.value) {
      li.textContent += ` (me)`;
    }
    li.style.backgroundColor = user.color;
    return li;
  });
  render(usersList, userElement);
};

const messages = [];
const LIMIT_MESSAGES = 10;

const renderListOfMessages = ({ name, message, color }) => {
  const divName = document.createElement("div");
  divName.className = "alert alert-primary col-md-3";
  divName.textContent = name;
  divName.style.backgroundColor = color;

  const divMessage = document.createElement("div");
  divMessage.className = "alert alert-dark col-md-9";
  divMessage.textContent = message;

  const divWrapper = document.createElement("div");
  divWrapper.className = "row";

  if (name === userName.value) {
    divWrapper.appendChild(divMessage);
    divWrapper.appendChild(divName);
  } else {
    divWrapper.appendChild(divName);
    divWrapper.appendChild(divMessage);
  }

  if (messages.unshift(divWrapper) > LIMIT_MESSAGES) {
    messages.pop();
  }

  render(board, messages);
};

const sendUserMessage = () => {
  const name = userName.value;
  const message = userMessage.value;
  if (message === "" || name === "") {
    return;
  }

  socket.emit("message", {
    message,
    name,
  });

  userMessage.value = "";
  userMessage.focus();
};

const checkIfEnter = (e) => {
  if (e.keyCode === 13) {
    sendUserMessage();
  }
};

sendButton.addEventListener("click", sendUserMessage);
userMessage.addEventListener("keyup", checkIfEnter);

socket.on("user", renderListOfUsers);
socket.on("message", renderListOfMessages);
