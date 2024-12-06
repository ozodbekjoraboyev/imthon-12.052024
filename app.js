

document.addEventListener("DOMContentLoaded", () => {
  const userName = document.querySelector("h1");
  const main__p = document.querySelector("p");
  const edit = document.querySelector(".edit-btn");

  fetch("http://localhost:3000/home")
    .then((response) => response.json())
    .then((data) => {
      // Ma'lumotlarni qo'yish
      userName.textContent = data.title;
      main__p.textContent = data.description;

      // Tahrirlash rejimi
      edit.addEventListener("click", () => {
        const isEditing = edit.textContent === "edit";

        if (isEditing) {
          // Tahrirlashni boshlash
          edit.textContent = "save";
          userName.contentEditable = true;
          main__p.contentEditable = true;
          userName.focus();
        } else {
          // Ma'lumotni serverga yuborish
          fetch("http://localhost:3000/home", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: userName.textContent,
              description: main__p.textContent,
              subtitle: "Crafting web solutions with passion and precision",
              heroImage: "https://via.placeholder.com/1920x1080",
              ctaButton: {
                text: "View My Work",
                link: "/portfolio",
              },
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              // Tahrirlashni tugatish
              edit.textContent = "edit";
              userName.contentEditable = false;
              main__p.contentEditable = false;
              userName.textContent = data.title;
              main__p.textContent = data.description;
            })
            .catch((err) => console.error("Xatolik:", err));
        }
      });
    })
    .catch((err) => console.error("Ma'lumot olishda xatolik:", err));
});
