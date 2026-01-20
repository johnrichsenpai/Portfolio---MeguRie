const Portfolio = (function () {
 const cloud = document.getElementById("cloud");
  if (cloud) {
    const words1 = ["HTML","CSS","JS","PYTHON","C#","java","Digital Artist"];
    const words2 = ["Curious","Focused","Persistent","Creative","Adaptive"];

    const radius1 = 150;
    const radius2X = 150;
    const radius2Y = 50;

    const group1 = [];
    const group2 = [];

    words1.forEach((text, i) => {
      const el = document.createElement("div");
      el.className = "word";
      el.textContent = text;
      cloud.appendChild(el);
      group1.push({ el, angle: (i / words1.length) * Math.PI * 2 });
    });

    words2.forEach((text, i) => {
      const el = document.createElement("div");
      el.className = "word";
      el.textContent = text;
      cloud.appendChild(el);
      group2.push({ el, angle: (i / words2.length) * Math.PI * 2 });
    });

    (function animate() {
      group1.forEach(w => {
        w.angle += 0.01;
        w.el.style.transform = `translate(${radius1*Math.cos(w.angle)}px, ${radius1*Math.sin(w.angle)}px)`;
      });

      group2.forEach(w => {
        w.angle -= 0.008;
        const x = radius2X * Math.cos(w.angle);
        const y = radius2Y * Math.sin(w.angle);
        w.el.style.transform = `translate(${x}px, ${y}px)`;
      });

      requestAnimationFrame(animate);
    })();
  }

  function makeWordCloud(words) {
    $(".teaching-domains").jQCloud(words, { delay: 120 });
  }

  function displayWordCloud() {
    var count = 1;
    $(window).on("scroll", function () {
      var y_scroll_pos = window.pageYOffset;
      var scroll_pos_test = 2700; // set to whatever you want it to be
      var words = makeWords();
      if (y_scroll_pos > scroll_pos_test && count <= 1) {
        makeWordCloud(words);
        count++;
      }
    });
  }

  function designForm() {
    $("#my-modal form").addClass("my-form");
  }

  function typeAnimation() {
    Typed.new("#writing-text", {
      strings: [
        "BSIT student passionate about web development and UI/UX.",
        "Highly motivated to learn and explore new technologies through hands-on, trial-and-error coding.",
        "I enjoy building practical and creative solutions through experimentation.",
      ],
      // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
      stringsElement: null,
      // typing speed
      typeSpeed: 20,
      contentType: "text",
      callback: function () {
        $("#writing-text").css({
          color: "#fff",
          "background-color": "#C8412B",
        });
      },
      preStringTyped: function () {},
      onStringTyped: function () {},
    });
  }

  return {
    displayWordCloud: displayWordCloud,
    typeAnimation: typeAnimation,
  };
})();

// Portfolio.displayWordCloud();
Portfolio.typeAnimation();

// --- Setup modal elements (inject modal container to body) ---
const modalHtml = `
<div id="customGalleryModal" style="display:none; position:fixed; z-index:10000; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); align-items:center; justify-content:center; flex-direction: column;">
  <span id="customGalleryClose" style="position:absolute; top:20px; right:40px; font-size:40px; color:white; cursor:pointer;">&times;</span>
  <img id="customGalleryImage" src="" style="max-width:90%; max-height:80vh; border-radius: 15px; box-shadow: 0 0 20px black;" />
  <div id="customGalleryCaption" style="color:white; margin-top:15px; font-size:18px; max-width:90%; text-align:center;"></div>
  <div style="margin-top:20px;">
    <button id="customGalleryPrev" style="font-size:30px; margin-right:40px; cursor:pointer;">&#10094;</button>
    <button id="customGalleryNext" style="font-size:30px; cursor:pointer;">&#10095;</button>
  </div>
</div>`;

document.body.insertAdjacentHTML('beforeend', modalHtml);

// --- Variables ---
const modal = document.getElementById('customGalleryModal');
const modalImg = document.getElementById('customGalleryImage');
const modalVideo = document.getElementById('customGalleryVideo');
const modalCaption = document.getElementById('customGalleryCaption');
const closeBtn = document.getElementById('customGalleryClose');
const prevBtn = document.getElementById('customGalleryPrev');
const nextBtn = document.getElementById('customGalleryNext');

// const galleryLinks = Array.from(document.querySelectorAll('.gallery a[data-lightbox="arts"]'));
const galleryLinks = Array.from(document.querySelectorAll('.art-gallery a[data-lightbox="art-gallery"]'));

const galleryDiv = document.querySelector('.art-gallery');

// Prepare an array of {src, title} for all images
const images = galleryLinks.map(link => ({
  src: link.getAttribute('href'),
  title: link.getAttribute('data-title') || link.querySelector('img').alt || ''
}));


let currentIndex = 0;

// --- Functions ---


function openModal(index) {
  currentIndex = index;
  showImage();
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

function showImage() {
  modalImg.src = images[currentIndex].src;
  modalCaption.textContent = images[currentIndex].title;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
}

// --- Event Listeners ---

// --- PDF Viewer ---
const openPdfBtn = document.getElementById("openPdfBtn");
const pdfModal = document.getElementById("pdfModal");
const pdfFrame = document.getElementById("pdfFrame");
const closePdf = document.getElementById("closePdf");
const downloadBtn = document.getElementById('downloadPdfBtn');
const pdfUrl = "assets/documents/AcademicWorks.pdf";

openPdfBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Force fresh instance (kills zoom memory)
  pdfFrame.src = "";
  setTimeout(() => {
    pdfFrame.src = "assets/documents/AcademicWorks.pdf";
  }, 10);

  pdfModal.style.display = "flex";
});

downloadBtn.addEventListener('click', () => {
  // Create an invisible link, click it to download the PDF
  window.open(pdfUrl, '_blank');
});

// Close button
closePdf.addEventListener("click", closePdfModal);

function closePdfModal() {
  pdfModal.style.display = "none";
  pdfFrame.src = "";
}

// // Click outside iframe
// pdfModal.addEventListener("click", (e) => {
//   if (e.target === pdfModal) closePdfModal();
// });

// // ESC key
// document.addEventListener("keydown", (e) => {
//   if (e.key === "Escape") closePdfModal();
// });


// Video Preview for .gallery2
document.querySelectorAll('.gallery2 a.gallery-item').forEach(item => {
  const videoSrc = item.querySelector('.Art-button2').getAttribute('data-src');

  // Create video element
  const video = document.createElement('video');
  video.classList.add('preview-video');
  video.src = videoSrc;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  item.appendChild(video);

  // Create dark overlay
  const dimOverlay = document.createElement('div');
  dimOverlay.classList.add('video-dim');
  item.appendChild(dimOverlay);

  item.addEventListener('mouseenter', () => {
    video.currentTime = 0;
    video.style.display = 'block';
    video.play();
    dimOverlay.style.display = 'block';  // show dim overlay
    const img = item.querySelector('img');
    if (img) img.style.opacity = '0';
  });

  item.addEventListener('mouseleave', () => {
    video.pause();
    video.style.display = 'none';
    dimOverlay.style.display = 'none';  // hide dim overlay
    const img = item.querySelector('img');
    if (img) img.style.opacity = '1';
  });
});

// Video Preview for .gallery
document.querySelectorAll('.gallery a.gallery-item').forEach(item => {
  const videoSrc = item.querySelector('.Art-button3').getAttribute('data-src');

  // Create video element
  const video = document.createElement('video');
  video.classList.add('preview-video');
  video.src = videoSrc;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  item.appendChild(video);

  // Create dark overlay
  const dimOverlay = document.createElement('div');
  dimOverlay.classList.add('video-dim');
  item.appendChild(dimOverlay);

  item.addEventListener('mouseenter', () => {
    video.currentTime = 0;
    video.style.display = 'block';
    video.play();
    dimOverlay.style.display = 'block';  // show dim overlay
    const img = item.querySelector('img');
    if (img) img.style.opacity = '0';
  });

  item.addEventListener('mouseleave', () => {
    video.pause();
    video.style.display = 'none';
    dimOverlay.style.display = 'none';  // hide dim overlay
    const img = item.querySelector('img');
    if (img) img.style.opacity = '1';
  });
});


// disable href on first image
document.getElementById('Image').addEventListener('click', function(event) {
    event.preventDefault(); // Stops the navigation
  });

// When VIEW button is clicked, open modal for that image
document.querySelectorAll('.gallery2 a.gallery-item, .gallery a.gallery-item')
  .forEach(item => {

    // Find the button that contains the video src
    const btn =
      item.querySelector('.Art-button0');

    if (!btn) return;

    const videoSrc = btn.dataset.videoSrc;
    if (!videoSrc) return;

    // Create video element
    const video = document.createElement('video');
    video.src = videoSrc;
    video.className = 'preview-video';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';

    // Insert video ABOVE image
    item.style.position = 'relative';
    item.appendChild(video);

    // Hover IN
    item.addEventListener('mouseenter', () => {
      video.style.display = 'block';
      video.currentTime = 0;
      video.play().catch(() => {});
      
      const img = item.querySelector('img');
      if (img) img.style.opacity = '0';
    });

    // Hover OUT
    item.addEventListener('mouseleave', () => {
      video.pause();
      video.style.display = 'none';

      const img = item.querySelector('img');
      if (img) img.style.opacity = '1';
    });
});


// Close modal when clicking the close button
closeBtn.addEventListener('click', closeModal);

// Next / Prev buttons
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);


function positionCloseButton() {
  const img = document.querySelector('.lb-image');
  const closeBtn = document.querySelector('.lb-close');
  const outer = document.querySelector('.lb-outerContainer');

  if (!img || !closeBtn || !outer) return;

  const imgRect = img.getBoundingClientRect();
  const outerRect = outer.getBoundingClientRect();

  // Distance from container to image
  const offsetTop = imgRect.top - outerRect.top;
  const offsetLeft = imgRect.left - outerRect.left;

  closeBtn.style.top = `${offsetTop + 8}px`;
  closeBtn.style.left = `${offsetLeft + imgRect.width - 40}px`;
}

// Re-run every time image changes
document.addEventListener('lightbox:opened', () => {
  setTimeout(positionCloseButton, 50);
});

document.addEventListener('lightbox:change', () => {
  setTimeout(positionCloseButton, 50);
});

window.addEventListener('resize', positionCloseButton);
