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
let newActive;

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
function setActiveSection(event) {
    const links = document.getElementById('navbar__list').getElementsByTagName('li');
    console.log(links);
    const eventTarget = event.currentTarget.innerText;
    console.log(eventTarget);
    const currentActive = document.getElementsByClassName('your-active-class');
    const elements = document.getElementsByTagName('section');
    for (let element of elements) {
        element.className = ' ';
        break;
    }

    let sectionId = eventTarget.split(' ');
    sectionId[0] = sectionId[0].toLowerCase();
    newActive = document.getElementById(`${sectionId[0]}${sectionId[1]}`);
    if (newActive.className = '') {
        newActive.className += ' your-active-class';
    } else {
        newActive.className = 'your-active-class';
    }

}

// for (let i = 0; i < links.length; i++) {
//     if (document.location.href.indexOf(links[i].href) >= 0) {
//         links[i].className = 'your-active-class';
//     }
// }


function getSectionList() {
    const sections = document.getElementsByTagName('section');
    for (let section of sections) {
        sectionList.push(section.getAttribute('data-nav'));
    };

    return sectionList;
}

function scrollTo(newActive) {
    const sectionToScroll = document.getElementById(newActive.id);
    sectionToScroll.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function buildNavMenu(sectionList) {
    for (let listItem of sectionList) {
        const newListItem = document.createElement('li');
        const newTextElement = document.createTextNode(listItem);
        newListItem.appendChild(newTextElement);
        // let sectionId = listItem.split(' ');
        // sectionId[0] = sectionId[0].toLowerCase();
        // newListItem.setAttribute('id', `${sectionId[0]}${sectionId[1]}`);
        const navBarList = document.querySelector('#navbar__list');
        navBarList.appendChild(newListItem);
        newListItem.addEventListener('click', setActiveSection);
        newListItem.addEventListener('click', function () {
            scrollTo(newActive)
        });
    }
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */
console.log(sectionList);

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu 
buildNavMenu(getSectionList());
// Scroll to section on link click

// Set sections as active