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
const navbar = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section')


/**
 * End Global Variables
 *
 */


/**
 * Begin Main Functions
 *
 */

// build the nav
function addSections() {
  for (let item of sections) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.className = 'menu__link';
    a.dataset.nav = item.id;
    a.innerText = item.dataset.nav;
    a.href = '#' + a.dataset.nav;
    li.appendChild(a);
    navbar.appendChild(li);
  };
};

// Scroll to anchor ID using scrollTO event
const scrollTo = function(elem) {
  elem.scrollIntoView({
    behavior: 'smooth'
  });
};


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
addSections();
// Scroll to section on link click
const navLists = document.querySelector('ul#navbar__list')
navLists.addEventListener('click', function(event) {
  if (event.target.nodeName === 'A' && event.target.className === 'menu__link') {
    event.preventDefault();
    let selectedSection = document.querySelector(event.target.getAttribute('href'));
    scrollTo(selectedSection);
  }
});

// Set sections as active
// simple function to use for callback in the intersection observer
document.querySelector("a").classList.add('active');
const changeNav = (entries, observer) => {
    entries.forEach((entry) => {
        // verify the element is intersecting
        if(entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          document.querySelector('.active').classList.remove('active');

            // get id of the intersecting section
            var id = entry.target.getAttribute('id');
            // find matching link & add appropriate class
            var newLink = document.querySelector(`[href="#${id}"]`).classList.add('active');
            entry.target.classList.add('your-active-class');
        }
        else{
          entry.target.classList.remove('your-active-class');
        }

    });
}

// init the observer
const options = {
    threshold: 0.55
}

const observer = new IntersectionObserver(changeNav, options);

// target the elements to be observed

sections.forEach((section) => {
    observer.observe(section);
});
