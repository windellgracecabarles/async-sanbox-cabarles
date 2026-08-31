// Task 1
const wait = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

document.getElementById("btn-delay").addEventListener("click", async () => {
    const out = document.getElementById("out-delay");

    out.textContent = "Waiting 2 seconds...";

    await wait(2000);

    out.textContent = "Done!";
});


// Task 2
const fakeApi = (label, ms) => wait(ms).then(() => `[${label}]`);

document.getElementById("btn-chain").addEventListener("click", () => {
    const out = document.getElementById("out-chain");

    out.textContent = "Starting chain...\n";

    fakeApi("Login", 500)
        .then((r) => {
            out.textContent += r + "\n";
            return fakeApi("Fetch Profile", 700);
        })
        .then((r) => {
            out.textContent += r + "\n";
            return fakeApi("Fetch Posts", 500);
        })
        .then((r) => {
            out.textContent += r + "\n";
            out.textContent += "All done!";
        })
        .catch((err) => {
            out.textContent += "Error: " + err.message;
        });
});
// Task 3
document.getElementById("btn-async").addEventListener("click", async () => {
    const out = document.getElementById("out-async");

    out.textContent = "Starting async...\n";

    try {
        out.textContent += (await fakeApi("Login", 500)) + "\n";

        out.textContent += (await fakeApi("Fetch Profile", 700)) + "\n";

        out.textContent += (await fakeApi("Fetch Posts", 500)) + "\n";

        out.textContent += "All done!";
    } catch (err) {
        out.textContent += "Error: " + err.message;
    }
});
document.getElementById("btn-fetch").addEventListener("click", async () => {
  const out = document.getElementById("out-fetch");

  out.textContent = "Loading...";

  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    out.textContent = data.joke;
  } catch (err) {
    out.textContent = "Failed to fetch joke: " + err.message;
  }
});
document.getElementById("btn-axios").addEventListener("click", async () => {
  const out = document.getElementById("out-axios");
  out.textContent = "Loading...";

  try {
    const response = await axios.get("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });

    out.textContent = response.data.joke;
  } catch (err) {
    out.textContent = "Failed to fetch joke: " + err.message;
  }
});
document.getElementById("btn-parallel").addEventListener("click", async () => {
  const out = document.getElementById("out-parallel");

  out.textContent = "Fetching 3 jokes in parallel...\n";

  const start = performance.now();

  try {
    const promises = [
      axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      }),
      axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      }),
      axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      }),
    ];

    const responses = await Promise.all(promises);

    const jokes = responses.map((r) => r.data.joke);

    const elapsed = Math.round(performance.now() - start);

    out.textContent =
      jokes.join("\n\n") + `\n\n(Fetched in ${elapsed}ms)`;
  } catch (err) {
    out.textContent =
      "One or more requests failed: " + err.message;
  }
});