

const galleryItems = document.querySelectorAll(".gallery-item");

const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxCategory = document.getElementById("lightboxCategory");

const imageCounter = document.getElementById("imageCounter");

const lightboxClose = document.getElementById("lightboxClose");

const lightboxPrev = document.getElementById("lightboxPrev");

const lightboxNext = document.getElementById("lightboxNext");


/* ================= GALLERY DATA ================= */

const images = Array.from(galleryItems).map((item) => {

    const image = item.querySelector("img");

    const category = item.querySelector(".image-overlay span");

    const title = item.querySelector(".image-overlay h3");

    return {
        element: item,
        src: image.src,
        alt: image.alt,
        category: category.textContent,
        title: title.textContent
    };

});


/* ================= CURRENT IMAGE ================= */

let currentIndex = 0;


/* ================= FILTER GALLERY ================= */

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        /* Remove active class */

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        /* Add active class */

        button.classList.add("active");

        const filter = button.dataset.filter;


        /* Filter images */

        galleryItems.forEach((item) => {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {

                item.style.display = "";

                setTimeout(() => {
                    item.style.opacity = "1";
                    item.style.transform = "scale(1)";
                }, 50);

            } else {

                item.style.opacity = "0";
                item.style.transform = "scale(0.95)";

                setTimeout(() => {
                    item.style.display = "none";
                }, 300);

            }

        });

    });

});


/* OPEN LIGHTBOX */

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        openLightbox(index);

    });

});


function openLightbox(index) {

    currentIndex = index;

    updateLightbox();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* UPDATE LIGHTBOX */

function updateLightbox() {

    const image = images[currentIndex];

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightboxTitle.textContent = image.title;

    lightboxCategory.textContent = image.category;

    imageCounter.textContent =
        `${String(currentIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;

}


/* CLOSE LIGHTBOX */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}

lightboxClose.addEventListener("click", closeLightbox);


/* NEXT IMAGE */

function nextImage() {

    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    updateLightbox();

}


/* PREVIOUS IMAGE */

function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    updateLightbox();

}


lightboxNext.addEventListener("click", nextImage);

lightboxPrev.addEventListener("click", previousImage);


/* KEYBOARD CONTROLS */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }


    /* ESC = Close */

    if (event.key === "Escape") {

        closeLightbox();

    }


    /* Arrow Right = Next */

    if (event.key === "ArrowRight") {

        nextImage();

    }


    /* Arrow Left = Previous */

    if (event.key === "ArrowLeft") {

        previousImage();

    }

});


/* CLOSE ON BACKDROP CLICK */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* SMOOTH IMAGE TRANSITION */

lightboxImage.addEventListener("load", () => {

    lightboxImage.style.animation = "none";

    lightboxImage.offsetHeight;

    lightboxImage.style.animation = "lightboxImageIn 0.4s ease";

});