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
    aObj = document.getElementById('nav').getElementsByTagName('a');
    for (i = 0; i < aObj.length; i++) {
        if (document.location.href.indexOf(aObj[i].href) >= 0) {
            aObj[i].className = 'active';
        }
    }
}

function getSectionList() {
    const sections = document.getElementsByTagName('section');
    for (section of sections) {
        sectionList.push(section.getAttribute('data-nav'));
    };

    return sectionList;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */
console.log(getSectionList());
// build the nav
for (let listItem of sectionList){
    const newListItem = document.createElement('li');
    const newTextElement = document.createTextNode(listItem);
    const navBarList = document.getElementById('navbar__list');
    newListItem.appendChild(newTextElement);
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 

// Scroll to section on link click

// Set sections as active