document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector(".main");

  fetch("http://localhost:3000/portfolio")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((elem) => {
        const title = document.createElement("h2");
        const info = document.createElement("p");
        const img = document.createElement("img");
        const btnEdit = document.createElement("button");
        const btnLink = document.createElement("button");
        const div = document.createElement("div");
        const div2 = document.createElement("div");

        title.textContent = elem.title;
        info.textContent = elem.description;
        img.src = elem.img;
        img.classList.add("img");

        btnEdit.textContent = "edit";
        btnEdit.classList.add("btn1");

        btnLink.textContent = "link";
        btnLink.classList.add("btn2");

        div.classList.add("divv");
        div2.classList.add("div2");
        info.classList.add("info");

        div.append(title, info, btnEdit, btnLink);
        div2.append(img, div);
        main.append(div2);
        btnEdit.addEventListener("click", () => {
          const isEditing = btnEdit.textContent === "edit";

          if (isEditing) {
            btnEdit.textContent = "save";
            title.contentEditable = true;
            info.contentEditable = true;
            title.focus();
          } else {
            fetch(`http://localhost:3000/portfolio/${elem.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: title.textContent,
                description: info.textContent,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
              })
              .then((updatedData) => {
                btnEdit.textContent = "edit";
                title.contentEditable = false;
                info.contentEditable = false;
                title.textContent = updatedData.title;
                info.textContent = updatedData.description;
              })
              .catch((err) => console.error("Xatolik:", err));
          }
        });

        btnLink.addEventListener("click", () => {
          window.open("https://www.kinopoisk.ru/?utm_referrer=www.google.com", "_blank");
        });
      });
    })
    .catch((err) => console.error("Ma'lumot olishda xatolik:", err));
});
