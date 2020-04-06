// @ts-check
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
let sectionList = [];

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
function setActiveSection() {
    const links = document.getElementById('navbar__list').getElementsByTagName('li');
    console.log(links);
    const eventTarget = EventTarget;
    console.log(eventTarget);
    // for (let i = 0; i < links.length; i++) {
    //     if (document.location.href.indexOf(links[i].href) >= 0) {
    //         links[i].className = 'your-active-class';
    //     }
    // }
}

function getSectionList() {
    const sections = document.getElementsByTagName('section');
    for (let section of sections) {
        sectionList.push(section.getAttribute('data-nav'));
    };

    return sectionList;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */
console.log(sectionList);
// build the nav
function buildNavMenu(sectionList) {
    for (let listItem of sectionList) {
        const newListItem = document.createElement('li');
        const newTextElement = document.createTextNode(listItem);
        newListItem.appendChild(newTextElement);
        const navBarList = document.querySelector('#navbar__list');
        navBarList.appendChild(newListItem);
        newListItem.addEventListener('click', setActiveSection);
    }
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu 
// sectionList = getSectionList();
buildNavMenu(getSectionList());
// Scroll to section on link click

// Set sections as active