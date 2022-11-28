export function handleFullscreenClick() {
  if (document.fullscreenElement) {
    document
      .exitFullscreen()
      .then(() => console.log('Document Exited from Full screen mode'))
      .catch((err) => console.error(err));
  } else {
    document.documentElement.requestFullscreen();
  }
}
