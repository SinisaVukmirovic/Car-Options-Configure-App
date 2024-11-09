const topBarElem = document.querySelector('[data-topBar]');

// top bar functionality
const topBarScrolling = () => {
    const atTop = window.screenY === 0;
    topBarElem.classList.toggle('bar-visible', atTop);
    topBarElem.classList.toggle('bar-hidden', !atTop);
}
// using requestAnimationFrame for performace issues in this context
window.addEventListener('scroll', () => requestAnimationFrame(topBarScrolling));