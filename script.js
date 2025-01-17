const topBarElem = document.querySelector('[data-topBar]');
const exteriorOptions = document.querySelector('[data-exterior-options]');
const interiorOptions = document.querySelector('[data-interior-options]');
const exteriorImgElem = document.querySelector('[data-exterior]');
const interiorImgElem = document.querySelector('[data-interior]');
const wheelsOptionsBtns = document.querySelector('[data-wheels]');
const performanceUpgBtn = document.querySelector('[data-Performance-upg]');
const totalPriceElem = document.querySelector('[data-total-price]');
const fullSelfDrivingCheckbox = document.querySelector('[data-self-driving]');
const accessoriesCheckboxes = document.querySelectorAll('.accessory-form-checkbox');

const basePrice = 52490;
let currentPrice = basePrice;

const downPaymentElem = document.querySelector('[data-down-payment]');
const monthlyPaymentElem = document.querySelector('[data-monthy-payment]');

const optionsPricing = {
    'Performance Wheels': 2500,
    'Performance Package': 5000,
    'Full Self-Driving': 8500,
    'Accessories': {
        'Center Console Trays': 35,
        'Sunshade': 105,
        'All-Weather Interior Liners': 225
    }
}

// updating total price based on selected options functionality
const updateTotalPrice = () => {
    // first reseting the current price to base price everytime the function is called
    currentPrice = basePrice;

    if (selectedOptions['Performance Wheels']) {
        currentPrice += optionsPricing['Performance Wheels'];
    }

    if (selectedOptions['Performance Package']) {
        currentPrice += optionsPricing['Performance Package'];
    }

    if (selectedOptions['Full Self-Driving']) {
        currentPrice += optionsPricing['Full Self-Driving'];
    }

    // looping over accessories checkboxes
    accessoriesCheckboxes.forEach(checkbox => {
        // extracting the accessory label
        const accessoryLabel = checkbox
            .closest('label')
            .querySelector('span')
            .textContent.trim();

        const accessoryPrice = optionsPricing['Accessories'][accessoryLabel];

        // add to current price if option is checked
        if (checkbox.checked) {
            currentPrice += accessoryPrice;
        }
    });

    // display the update on the element in the UI
    totalPriceElem.textContent = `$${currentPrice.toLocaleString()}`;

    updatePaymentBreakdown();
}

// update payment breakdown based on current price
const updatePaymentBreakdown = () => {
    // calculate down payment
    const downPayment = currentPrice * .1;
    downPaymentElem.textContent = `$${downPayment.toLocaleString()}`;

    // calculate load details assuming 60 months load and 3% interest rate
    const loanTermMonths = 60;
    const interestRate = .03;

    const loanAmount = currentPrice - downPayment;

    // calculating monthly payment with formula P * (r(1+r)^n) / ((1 + r)^n - 1)
    const monthlyInterestRate = interestRate / 12;

    const monthlyPayment = (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths))) / (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

    monthlyPaymentElem.textContent = `$${monthlyPayment.toFixed(2).toLocaleString()}`;
}

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
// refactor to keep selected exterior image while switching wheels

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

// wheel options buttons selection functionality
const wheelsOptionsSelection = (e) => {
    if (e.target.tagName === 'BUTTON') {
        const buttons = document.querySelectorAll('[data-wheels] button');

        buttons.forEach(btn => btn.classList.remove('bg-gray-700', 'text-white'));
        e.target.classList.add('bg-gray-700', 'text-white');

        // const selectedWheelsOption = e.target.textContent.includes('Performance');
        selectedOptions['Performance Wheels'] = e.target.textContent.includes('Performance');

        // exteriorImgElem.src = selectedWheelsOption ? 
        //     'assets/images/model-y-stealth-grey-performance.jpg' :
        //     'assets/images/model-y-stealth-grey.jpg';

        updateExteriorImage();  

        updateTotalPrice();
    } 
}

wheelsOptionsBtns.addEventListener('click', wheelsOptionsSelection);

// performance option button select functionality
const handlePerformanceBtnClick = () => {
    const isSelected = performanceUpgBtn.classList.toggle('bg-gray-700');
    performanceUpgBtn.classList.toggle('text-white');

    // update selected options 
    selectedOptions['Performance Package'] = isSelected;

    updateTotalPrice();
}

performanceUpgBtn.addEventListener('click', handlePerformanceBtnClick);

// full self driving option selecting functionality
const fullSelfDrivingOption = () => {
    const isSelected = fullSelfDrivingCheckbox.checked;

    selectedOptions['Full Self-Driving'] = isSelected;

    updateTotalPrice();
}

fullSelfDrivingCheckbox.addEventListener('change', fullSelfDrivingOption);

// handle eventlisteners for accessories checkboxes
accessoriesCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => updateTotalPrice());
});

// initial update total price
updateTotalPrice();