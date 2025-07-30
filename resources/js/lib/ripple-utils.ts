export const createRippleEffect = (
  event: React.MouseEvent<HTMLElement>,
  color = 'rgba(255, 255, 255, 0.4)'
) => {
  const element = event.currentTarget
  const rect = element.getBoundingClientRect()

  // Calculate cursor position relative to element
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const ripple = document.createElement('span')
  ripple.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    background: ${color};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    animation: ripple 1s linear;
    width: 0px;
    height: 0px;
  `

  element.appendChild(ripple)

  // Store ripple reference for cleanup
  if (!element.dataset.ripples) {
    element.dataset.ripples = '0'
  }
  const rippleCount = parseInt(element.dataset.ripples) + 1
  element.dataset.ripples = rippleCount.toString()
  ripple.dataset.rippleId = rippleCount.toString()

  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.remove()
    }
  }, 1000)
}

export const cleanupRipples = (element: HTMLElement) => {
  const ripples = element.querySelectorAll('span[data-ripple-id]')
  ripples.forEach((ripple) => {
    if (ripple.parentNode) {
      ripple.remove()
    }
  })
}