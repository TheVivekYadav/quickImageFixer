let result = document.querySelector(".result");
let image_result = document.querySelector(".img-result");
let img_w = document.querySelector(".img-w");
let img_h = document.querySelector(".img-h");
let options = document.querySelector(".options");
let save = document.querySelector(".save");
let cropped = document.querySelector(".cropped");
let dwn = document.querySelector(".download");
let cropper = "";

document.addEventListener("DOMContentLoaded", function() {
    let upload = document.querySelector(".form-control");
    
    if (upload) {
        upload.addEventListener("change", (e) => {
          if (e.target.files.length) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = (e) => {
              if (e.target.result) {
                let img = document.createElement("img");
                img.id = "image";
                img.src = e.target.result;
        
                result.innerHTML = "";
        
                result.appendChild(img);
        
                save.classList.remove("hide");
        
                cropper = new Cropper(img, {
                  aspectRatio: NaN // or your desired aspect ratio
                });
              }
            };
      
            reader.readAsDataURL(file); // Read the selected file as a data URL
          }
        });      
    } else {
      console.error("The element with ID 'upload' was not found.");
    }
  });

  save.addEventListener('click', () => {
    // Check if the 'cropper' instance is valid and has the 'getCroppedCanvas' method
    if (cropper && typeof cropper.getCroppedCanvas === 'function') {
      // Get the cropped canvas data
      const croppedCanvas = cropper.getCroppedCanvas();
      
  
      // Convert the cropped canvas to a data URL (JPEG format, 80% quality)
      const croppedDataURL = croppedCanvas.toDataURL('image/jpeg', 0.8);
      cropped.classList.remove("hide")
      cropped.src=croppedDataURL;
      image_result.classList.remove('hide')
      
      dwn.href = croppedDataURL;
      dwn.classList.remove("hide");
      const filename = 'cropped_image.jpg';
      dwn.setAttribute('download', filename);

      // You can now use the 'croppedDataURL' variable to save or display the cropped image
      console.log(croppedDataURL); // For demonstration purposes, log the data URL to the console
    } else {
      console.error("The 'cropper' instance is not valid or does not have the 'getCroppedCanvas' method.");
    }
  });
