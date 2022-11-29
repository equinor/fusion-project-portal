export function handleFullscreenClick() {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch((err) => console.error(err));
  } else {
    document.documentElement.requestFullscreen();
  }
}
