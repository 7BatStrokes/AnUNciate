import {v4 as uuidv4} from 'uuid';

document.getElementById("submitBtn")?.addEventListener("click", () => {
  let postid = uuidv4();
  let inputElem = document.getElementById("imgfile") as HTMLInputElement;
  let file = inputElem.files?.[0];

  // Create new file so we can rename the file
  let blob = file?.slice(0, file.size, "image/jpeg");
  let newFile = new File([blob as Blob], `${postid}_post.jpeg`, { type: "image/jpeg" });

  // Build the form data - You can add other input values to this i.e descriptions, make sure img is appended last
  let formData = new FormData();
  formData.append("imgfile", newFile);

  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then(loadPosts);
})

// Loads the posts on page load
export function loadPosts() {
  fetch("/upload")
    .then((res) => res.json())
    .then((x) => {
      for (let y = 0; y < x[0].length; y++) {
        console.log(x[0][y]);
        const newimg = document.createElement("img");
        newimg.setAttribute(
          "src",
          "https://storage.googleapis.com/img-anunciate/" + x[0][y].id
        );
        newimg.setAttribute("width", "50");
        newimg.setAttribute("height", "50");
        document.getElementById("images")?.appendChild(newimg);
      }
    });
}
