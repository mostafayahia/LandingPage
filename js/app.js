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
const tolerance = document.querySelectorAll('section')[0].getBoundingClientRect().height * 0.1;
const intersectionThreshold = 0.7;

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

        window.scrollBy({
            top: selectedSection.getBoundingClientRect().y - tolerance,
            behavior: 'smooth'
        });
    }
});

// Set sections as active

let observer = new IntersectionObserver(function (entries) {
    const observedEntry = entries[0];
    const classList = observedEntry.target.classList;
    observedEntry.isIntersecting ? classList.add('active') : classList.remove('active');
}, {
    root: document.querySelector("#main"),
    threshold: intersectionThreshold
});

for (const section of document.querySelectorAll('section')) {
    observer.observe(section);
}




