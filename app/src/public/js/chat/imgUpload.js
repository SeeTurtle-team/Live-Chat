"use strict";

const imageForm = document.querySelector("#uploadForm");
const imageFile = document.querySelector('#imgTest');

imageForm.addEventListener('submit', async () => {
    alert("비비비비비")
    event.preventDefault();
    const file = imageFile.files[0];
    const response = await fetch('/chat/imgurl');
    const { url } = await response.json();
    console.log(url)

    await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: file
      })
    
      const imageURL = url.split('?')[0];
      alert(imageURL)
  })