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
// let sectionList = [];
let sectionIdList = [];
let previousEvent = ''

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
    const eventTarget = event.currentTarget.innerText;
    const eventType = event.type;
    const sections = document.getElementsByTagName('section');
    // const listItem = document.querySelector('.active');
    // listItem.className = 'menu__link'
    // let currentActiveSection = document.getElementsByClassName('your-active-class');
    // currentActiveSection[0].removeAttribute('class');
    // let newActive = eventTarget;
    // Code below is based on answers found here:
    // https://knowledge.udacity.com/questions/66312
    // https://knowledge.udacity.com/questions/85408#96950

    if (eventType == 'click') {
        // let sectionId = eventTarget.split(' ');
        // sectionId[0] = sectionId[0].toLowerCase();
        // let newActive = document.getElementById(`${sectionId[0]}${sectionId[1]}`);
        // if (newActive.className = '') {
        //     newActive.className += ' your-active-class';
        // } else {
        //     newActive.className = 'your-active-class';
        // }
        // for (let section of sections) {            
        //     if (section.getAttribute('data-nav') == eventTarget) {
        //         if (section.className = '') {
        //             section.className += ' your-active-class';                                
        //         } else {
        //             section.className = 'your-active-class';                
        //         }            
        //         eventTarget.className = 'menu__link active';
        //     } else {
        //         section.removeAttribute('class');

        //     }
        // }      
        for (const section of sections) {
            const menuItem = document.getElementsByClassName(section.id);
            if (section.className.includes('your-active-class')) {
                section.removeAttribute('class');
                menuItem.item(0).className = ''.concat('menu__link ', section.id);
            }
            if (section.getAttribute('data-nav') == eventTarget) {
                section.className = 'your-active-class';
                menuItem.item(0).className = ''.concat('menu__link ', section.id, ' active');
            }
        }
        // for (const item of document.getElementsByClassName('menu__link')){
        //     const className = item.className;
        //     const id = item.id;
        //     // const menuItem = document.querySelector(''.concat('.', item.className));
        //     const section = document.getElementById(item.id)
        //     if (item.className.includes('active')){
        //         item.className = ''.concat('menu__link ', item.id);
        //         section.removeAttribute('class');            
        //     }
        //     if (item.innerHTML = eventTarget) {
        //         item.className += ' active';
        //         section.className = 'your-active-class';
        //     }

        // }
        // const listItem = document.querySelector('.active');
        // listItem.className = 'menu__link'
        scrollTo(eventTarget);
    } else if (eventType == 'scroll') {
        for (const section of sections) {
            const box = section.getBoundingClientRect();
            const menuItem = document.getElementsByClassName(section.id);
            if (box.top <= 150 && box.bottom >= 150) {
                section.className = 'your-active-class';
                menuItem.item(0).className = ''.concat('menu__link ', section.id, ' active');

            } else {
                if (section.className.includes('your-active-class')) {
                    section.removeAttribute('class');
                    menuItem.item(0).className = ''.concat('menu__link ', section.id);
                }
            }
        }       
    }
    // Save the eventType so that if this function is invoked again,
    // we can perform actions based on this value.
    previousEvent = eventType;
}

    /**
     * Gets a list of existing sections on the page.
     *  
     */
    function getSectionList() {
        const sections = document.getElementsByTagName('section');
        let sectionList = [];
        sectionIdList = [];
        for (let section of sections) {
            sectionList.push(section.getAttribute('data-nav'));
            const sectionName = section.getAttribute('data-nav');
            let sectionId = ''.concat(sectionName.slice(0, 1).toLowerCase(), sectionName.replace(/ /g, '').slice(1));
            sectionIdList.push(sectionId);
        };

        return sectionList;
    }


    /**
     * Scrolls to the active section.
     * 
     */
    function scrollTo(newActive) {
        // const sectionToScroll = document.getElementById(newActive.id);    
        const sections = document.getElementsByTagName('section');
        for (let section of sections) {
            if (section.getAttribute('data-nav') == newActive) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end'
                });
            }
        }
    }

    /**
     * Processes the list of sections and builds the Navigation Menu
     * 
     */
    function buildNavMenu(sectionList) {
        for (let [i, sectionName] of sectionList.entries()) {
            const newListItem = document.createElement('li');
            const newTextElement = document.createTextNode(sectionName);
            // If it's the first menu item, we'll set it as active.
            // Otherwise, we'll just added a single class.
            let workClassName = ''.concat('menu__link ', sectionIdList[i]);
            if (i == 0) {
                workClassName += ' active';
            }
            newListItem.setAttribute('class', workClassName);
            // newListItem.setAttribute('id', sectionIdList[i]);
            newListItem.appendChild(newTextElement);
            const navBarList = document.querySelector('#navbar__list');
            navBarList.appendChild(newListItem);
            newListItem.addEventListener('click', setActiveSection);
        }
        document.addEventListener('scroll', setActiveSection);
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