document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector(".main")
  fetch("http://localhost:3000/testimonials")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((elem) => {
        const name = document.createElement("h2")
        const role = document.createElement("p")
        const massage = document.createElement("p")
        const img = document.createElement("img")
        const div = document.createElement("div")
        const text = document.createElement("div")
        name.textContent = elem.name
        role.textContent = elem.role
        massage.textContent = elem.message
        img.src = elem.image

        div.classList.add("divvv")
        img.classList.add("imgg")
        text.classList.add("text")
        text.append(name,role,massage)
        div.append(img,text)
        main.append(div)



      });
    });
});
