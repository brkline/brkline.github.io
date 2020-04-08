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

/**
 * Removes 'your-active-class' from the current active section and
 * adds the 'your-active-class' value to the section that was selected
 * in the menu.
 * 
 */
function setActiveSection(event) {
    const links = document.getElementById('navbar__list').getElementsByTagName('li');
    const eventTarget = event.currentTarget.innerText;
    let currentActiveSection = document.getElementsByClassName('your-active-class');
    console.log(currentActiveSection);
    console.log(currentActiveSection.length);
    currentActiveSection[0].removeAttribute('class');

    let sectionId = eventTarget.split(' ');
    sectionId[0] = sectionId[0].toLowerCase();
    let newActive = document.getElementById(`${sectionId[0]}${sectionId[1]}`);
    if (newActive.className = '') {
        newActive.className += ' your-active-class';
    } else {
        newActive.className = 'your-active-class';
    }
    scrollTo(newActive);
}

/**
 * Gets a list of existing sections on the page.
 *  
 */
function getSectionList() {
    const sections = document.getElementsByTagName('section');
    for (let section of sections) {
        sectionList.push(section.getAttribute('data-nav'));
    };

    return sectionList;
}


/**
 * Scrolls to the active section.
 * 
 */
function scrollTo(newActive) {
    const sectionToScroll = document.getElementById(newActive.id);    
    sectionToScroll.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
    });
}

/**
 * Processes the list of sections and builds the Navigation Menu
 * 
 */
function buildNavMenu(sectionList) {
    for (let listItem of sectionList) {
        const newListItem = document.createElement('li');
        const newTextElement = document.createTextNode(listItem);
        newListItem.setAttribute('class', 'menu__link');
        newListItem.appendChild(newTextElement);
        const navBarList = document.querySelector('#navbar__list');
        navBarList.appendChild(newListItem);
        newListItem.addEventListener('click', setActiveSection);
    }
}
/**
 * End Helper Functions
 * Begin Main
 * 
 */

// build the nav
buildNavMenu(getSectionList());

/**
 * End Main
 *
 */