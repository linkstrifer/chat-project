const $messages = $("ul");
const $form = $("form");

const API = "http://localhost:8000";

function getMessages() {
  fetch(`${API}/channel/general`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then(({ messages }) => {
      $messages.html("");

      messages.forEach(({ user, text }) => {
        const $element = $("<li></li>").text(`${user}: ${text}`);

        $messages.append($element);
      });
    })
    .catch((error) => console.error(error));
}

$form.on("submit", (event) => {
  event.preventDefault();
  const $input = $form.children("input");
  const value = $input.val();

  if (value !== "") {
    fetch(`${API}/channel/general`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: "Link",
        text: value,
      }),
    })
      .then(() => {
        getMessages();
        $input.val("");
      })
      .catch((error) => console.error(error));
  }
});

getMessages();
