


document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector(".main");
  
    fetch("http://localhost:3000/contact")
      .then((response) => response.json())
      .then((data) => {
        const email = document.createElement("h2");
        const phone = document.createElement("p");
        const address = document.createElement("p");
        const mapLink = document.createElement("a");
        const div = document.createElement("div");
        const editButton = document.createElement("button");
  
        // Ma'lumotlarni qo'shish
        email.textContent = data.email;
        phone.textContent = data.phone;
        address.textContent = data.address;
        mapLink.textContent ="https://yandex.uz/maps/?l=sat%2Ctrf%2Ctrfe&ll=121.615109%2C43.517208&z=2";

        mapLink.href = data.mapLink;
        editButton.classList.add("buttton")
        mapLink.target = "_blank";
  
        // Edit tugmasi
        editButton.textContent = "Edit";
        editButton.classList.add("edit-btn");
  
        // Edit tugmasi funksiyasi
        editButton.addEventListener("click", () => {
          if (editButton.textContent === "Edit") {
            // Tahrirlash rejimiga o'tish
            email.contentEditable = true;
            phone.contentEditable = true;
            address.contentEditable = true;
            editButton.textContent = "Save";
          } else {
            // Saqlash rejimi
            const updatedData = {
              email: email.textContent,
              phone: phone.textContent,
              address: address.textContent,
            };
  
            // Backendga yuborish
            fetch("http://localhost:3000/contact", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedData),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
              })
              .then((updatedElem) => {
                // Tahrirlashni yakunlash
                email.contentEditable = false;
                phone.contentEditable = false;
                address.contentEditable = false;
                editButton.textContent = "Edit";
                console.log("Ma'lumot yangilandi:", updatedElem);
              })
              .catch((err) => {
                console.error("Ma'lumotni saqlashda xatolik:", err);
              });
          }
        });
  
        // Elementlarni qo'shish
        div.append(email, phone, address, mapLink, editButton);
        div.classList.add("div");
        main.append(div);
      })
      .catch((err) => {
        console.error("Serverdan ma'lumot olishda xatolik:", err);
      });
  });
  

  