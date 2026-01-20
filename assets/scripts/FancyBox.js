Fancybox.bind("[data-fancybox]", {
  Toolbar: {
    display: ["close", "play", "fullscreen", "download", "thumbs"]
  },
  Video: {
    autoplay: false,
    controls: true
  }
});

Fancybox.bind("[data-fancybox]", {
  animated: true,
  dragToClose: true,
  closeButton: "top",
});