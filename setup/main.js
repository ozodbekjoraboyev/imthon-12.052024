

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector(".main");

  // API orqali ma'lumotlarni olish
  fetch("http://localhost:3000/portfolio")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((elem) => {
        const div = document.createElement("div");
        const ul = document.createElement("ul");
        const theme = document.createElement("li");
        const language = document.createElement("li");
        const primaryColor = document.createElement("li");
        const editBtn = document.createElement("button");
        editBtn.classList = ("editbtn")
        
        theme.textContent = `Theme: ${elem.theme}`;
        language.textContent = `Language: ${elem.language}`;
        primaryColor.textContent = `Primary Color: ${elem.primaryColor}`;
        editBtn.textContent = "edit";
        div.classList.add("portfolio-item");
        ul.classList.add("portfolio-list");

        ul.append(theme, language, primaryColor);
        div.append(ul, editBtn);
        main.append(div);

        editBtn.addEventListener("click", () => {
          const isEditing = editBtn.textContent === "edit";

          if (isEditing) {
            editBtn.textContent = "save";
            theme.contentEditable = true;
            language.contentEditable = true;
            primaryColor.contentEditable = true;
          } else {
            fetch(`http://localhost:3000/portfolio/${elem.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                theme: theme.textContent,
                language: language.textContent,
                primaryColor: primaryColor.textContent,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
              })
              .then((updatedData) => {
                editBtn.textContent = "edit";
                theme.contentEditable = false;
                language.contentEditable = false;
                primaryColor.contentEditable = false;

                theme.textContent = updatedData.theme;
                language.textContent = updatedData.language;
                primaryColor.textContent = updatedData.primaryColor;
              })
              .catch((err) => console.error("Xatolik:", err));
          }
        });
      });
    })
    .catch((err) => console.error("Ma'lumot olishda xatolik:", err));
});
