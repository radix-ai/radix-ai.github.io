// extend a Siema class by two methods
// addDots - to create a markup for dots
// updateDots - to update classes on dots on change callback
class SiemaWithDots extends Siema {

    addDots() {
        // create a contnier for all dots
        // add a class 'dots' for styling reason
        this.dots = document.createElement('div');
        this.dots.classList.add('dots');

        // loop through slides to create a number of dots
        for(let i = 0; i < this.innerElements.length; i++) {
        // create a dot
        const dot = document.createElement('button');

        // add a class to dot
        dot.classList.add('dots__item');

        // add an event handler to each of them
        dot.addEventListener('click', () => {
            this.goTo(i);
        })

        // append dot to a container for all of them
        this.dots.appendChild(dot);
        }

        // add the container full of dots after selector
        this.selector.parentNode.insertBefore(this.dots, this.selector.nextSibling);
    }

    updateDots() {
        // loop through all dots
        for(let i = 0; i < this.dots.querySelectorAll('button').length; i++) {
        // if current dot matches currentSlide prop, add a class to it, remove otherwise
        const addOrRemove = this.currentSlide === i ? 'add' : 'remove';
        this.dots.querySelectorAll('button')[i].classList[addOrRemove]('dots__item--active');
        }
    }
}

mySiema = null;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    mySiema = new SiemaWithDots({
        perPage: 1, 
        multipleDrag: false,
        onInit: function(){
            this.addDots();
            this.updateDots();
        },
        onChange: function(){
            this.updateDots()
        },
    });
}else{
    mySiema = new Siema({
        perPage: 1, 
        multipleDrag: false,
    });
}

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
prev.addEventListener('click', () => mySiema.prev());
next.addEventListener('click', () => mySiema.next());


    
  