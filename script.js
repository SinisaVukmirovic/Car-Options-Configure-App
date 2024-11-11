const topBarElem = document.querySelector('[data-topBar]');
const exteriorOptions = document.querySelector('[data-exterior-options]');
const interiorOptions = document.querySelector('[data-interior-options]');
const exteriorImgElem = document.querySelector('[data-exterior]');
const interiorImgElem = document.querySelector('[data-interior]');
const wheelsOptionsBtns = document.querySelector('[data-wheels]');

// top bar functionality
const topBarScrolling = () => {
    const atTop = window.scrollY === 0;
    topBarElem.classList.toggle('js-bar-visible', atTop);
    topBarElem.classList.toggle('js-bar-hidden', !atTop);
}
// using requestAnimationFrame for performace issues in this context
window.addEventListener('scroll', () => requestAnimationFrame(topBarScrolling));

// obj of the images for the exterior
const exteriorImgs = {
    'Stealth Grey': './assets/images/model-y-stealth-grey.jpg',
    'Pearl White': './assets/images/model-y-pearl-white.jpg',
    'Deep Blue Metalic': './assets/images/model-y-deep-blue-metallic.jpg',
    'Solid Black': './assets/images/model-y-solid-black.jpg',
    'Ultra Red': './assets/images/model-y-ultra-red.jpg',
    'Quicksilver': './assets/images/model-y-quicksilver.jpg', 
}
// obj of thw images for the interior
const interiorImgs = {
    Dark: './assets/images/model-y-interior-dark.jpg',
    Light: './assets/images/model-y-interior-light.jpg'
}
// ===========================================================

let selectedExteriorColor = 'Stealth Grey';
const selectedOptions = {
    'Performance Wheels': false,
    'Performance Package': false,
    'Full Self-Driving': false
}

// update exterior image based on color and wheels functionality
const updateExteriorImage = () => {
    const performanceSuffix = selectedOptions['Performance Wheels'] ?
    '-performance' : '';
    const colorKey = selectedExteriorColor in exteriorImgs ? selectedExteriorColor : 'Stealth Grey';
    console.log(colorKey)
    
    exteriorImgElem.src = exteriorImgs[colorKey].replace('.jpg', `${performanceSuffix}.jpg`);
}

// handle color selection functionality (for both, exterior and interior)
const handleOptionSelection = (e) => {
    let button;

    if (e.target.tagName === 'IMG') {
        button = e.target.closest('button');
    } else if (e.target.tagName === 'BUTTON') {
        button = e.target;
    }

    if (button) {
        const allButtons = e.currentTarget.querySelectorAll('button');
        allButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');

        // exterior image change
        if (e.currentTarget === exteriorOptions) {
            selectedExteriorColor = button.querySelector('img').alt;
            // exteriorImgElem.src = exteriorImgs[selectedColor];
            updateExteriorImage();
        }
        // interior image change
        if (e.currentTarget === interiorOptions) {
            const selectedColor = button.querySelector('img').alt;
            interiorImgElem.src = interiorImgs[selectedColor];
        }
    }
}

exteriorOptions.addEventListener('click', handleOptionSelection);
interiorOptions.addEventListener('click', handleOptionSelection);

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// wheel options buttons selection functionality
// const wheelsOptionsSelection = (e) => {
//     if (e.target.tagName === 'BUTTON') {
//         const buttons = document.querySelectorAll('[data-wheels] button');

//         buttons.forEach(btn => btn.classList.remove('bg-gray-700', 'text-white'));
//         e.target.classList.add('bg-gray-700', 'text-white');

//         const selectedWheelsOption = e.target.textContent.includes('Performance');

//         exteriorImgElem.src = selectedWheelsOption ? 
//             'assets/images/model-y-stealth-grey-performance.jpg' :
//             'assets/images/model-y-stealth-grey.jpg';
//     } 
// }

// wheelsOptionsBtns.addEventListener('click', wheelsOptionsSelection);
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

