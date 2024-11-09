const topBarElem = document.querySelector('[data-topBar]');

// top bar functionality
const topBarScrolling = () => {
    const atTop = window.scrollY === 0;
    topBarElem.classList.toggle('js-bar-visible', atTop);
    topBarElem.classList.toggle('js-bar-hidden', !atTop);
}
// using requestAnimationFrame for performace issues in this context
window.addEventListener('scroll', () => requestAnimationFrame(topBarScrolling));