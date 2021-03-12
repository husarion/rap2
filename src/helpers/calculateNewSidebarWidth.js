export default function calculateNewSidebarWidth(currentX) {
  // simplicity of this function is based on an assumption
  // that sidebar is positioned on the left side of the viewport
  // hence we only need cursor X position to effectively resize.
  const minSidebarWidth = 300;
  return (minSidebarWidth > currentX) ? minSidebarWidth : currentX;
}