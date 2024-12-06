document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const abaut__p1 = document.querySelector(".abaut__p1");
    const abaut__h2 = document.querySelector(".abaut__h2");
    const abaut__p2 = document.querySelector(".abaut__p2");
    const edit_btn = document.querySelector(".edit_btn");
  
    fetch("http://localhost:3000/aboutme")
      .then((response) => response.json())
      .then((data) => {
        abaut__p1.textContent = data.name;
        abaut__h2.textContent = data.job;
        abaut__p2.textContent = data.bio;
  
        edit_btn.addEventListener("click", () => {
          abaut__p1.contentEditable = true;
          abaut__h2.contentEditable = true;
          abaut__p2.contentEditable = true;
          edit_btn.textContent = "Saqlash";
          edit_btn.classList.add("save-mode");
  
          edit_btn.addEventListener("click", () => {
            if (edit_btn.classList.contains("save-mode")) {
              const updatedData = {
                name: abaut__p1.textContent.trim(),
                job: abaut__h2.textContent.trim(),
                bio: abaut__p2.textContent.trim(),
              };
  
              fetch("http://localhost:3000/aboutme", {
                method: "PATCH", 
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Yangilashda xatolik: " + response.statusText);
                  }
                  return response.json();
                })
                .then((updatedResponse) => {
                  console.log("Ma'lumot muvaffaqiyatli yangilandi:", updatedResponse);
  
                  // Tahrir rejimini yopish
                  abaut__p1.contentEditable = false;
                  abaut__h2.contentEditable = false;
                  abaut__p2.contentEditable = false;
  
                  edit_btn.textContent = "Tahrirlash";
                  edit_btn.classList.remove("save-mode");
                })
                .catch((error) => {
                  console.error("Yangilashda xatolik:", error);
                });
            }
          });
        });
      })
      .catch((error) => {
        console.error("Ma'lumotlarni olishda xatolik:", error);
      });
  });
  