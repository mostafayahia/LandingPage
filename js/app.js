/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const tolerance = document.querySelectorAll('section')[0].clientHeight * 0.1;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport
function moveActiveClass(fromElement, toElement, activeClassName = "active") {
    if (fromElement === toElement)
        return;
    fromElement.classList.remove(activeClassName);
    toElement.classList.add(activeClassName);
}

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
// create a fragment to hold menu items
const fragment = document.createDocumentFragment();

for (const section of document.querySelectorAll('section')) {
    // get section name from the data-nav attribute in the section element
    const sectionName = section.getAttribute("data-nav");

    // create a menu item
    const menuItem = document.createElement('li');

    menuItem.classList = ["menu__link"];

    // set nav-data attribute for each of menu item to section id
    menuItem.setAttribute("nav-data", section.id);

    // set displayed text of the link to the section Name
    menuItem.textContent = sectionName;

    // append this item to the fragment
    fragment.appendChild(menuItem);
}

// finally populate the fragment into navbar menu
document.querySelector("#navbar__list").appendChild(fragment);

// Scroll to section on link click
document.querySelector('#navbar__list').addEventListener('click', function (event) {
    event.preventDefault();
    const item = event.target;
    if (item.nodeName === "LI") {
        const selectedSection = document.querySelector(`#${item.getAttribute('nav-data')}`);

        window.scroll({
            top: selectedSection.offsetTop - tolerance,
            behavior: 'smooth'
        });
    }
});

// Set sections as active
let activeSection = document.querySelectorAll('section')[0]; /* default value */

// construct section tops array
/*
  array of sectionData objects which is consist of {top: number, section: sectionElement}
*/
const sectionDataArray = [];
for (const section of document.querySelectorAll('section')) {
    sectionDataArray.push({ top: section.offsetTop, section });
};


document.addEventListener('scroll', function (event) {
    // looping in sectionDataArray in reverse order
    for (let i = sectionDataArray.length - 1; i >= 0; i--) {
        const sectionData = sectionDataArray[i];

        if (window.pageYOffset >= (sectionData.top - tolerance)) {
            // move active class from the old one and assign it to the new one
            moveActiveClass(activeSection, sectionData.section);

            // now assign active section to the section in the our section data object
            activeSection = sectionData.section;

            break;
        }
    }
});


