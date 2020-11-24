import { useState } from "react";

import { API } from "./constants";

function Compose() {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

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
              setValue("");
            })
            .catch((error) => console.error(error));
        }
      }}
    >
      <input value={value} onChange={(event) => setValue(event.target.value)} />
    </form>
  );
}

export default Compose;
