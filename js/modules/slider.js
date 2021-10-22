function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          next = document.querySelector(nextArrow),
          prev = document.querySelector(prevArrow),
          current = document. querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = slidesWrapper.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width,
          widthNum = +width.replace(/\D/g, '');

    let slideIndex = 1,
        offset = 0;
    
    total.textContent = getZero(slides.length);
    current.textContent = getZero(slideIndex);

    slidesField.style.width = slides.length * 100 + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
          dotsArray = [];

    dots.classList.add('carousel-indicators');
    dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(dots);

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0){
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsArray.push(dot);
    }

    function fieldMove(off){
        slidesField.style.transform = `translateX(-${off}px)`;
    }

    function showDots(array, index){
        array.forEach(dot => dot.style.opacity = 0.5);
        array[index - 1].style.opacity = 1;
    }

    function getZero(num){
        if (num >= 0 && num < 10){
            return `0${num}`;
        } else {            
            return num;
        }
    }

    next.addEventListener('click', () => {
        if (offset == widthNum * (slides.length - 1)){
            offset = 0;
        } else {
            offset += widthNum;
        }
        fieldMove(offset);

        if (slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex ++;
        }

        current.textContent = getZero(slideIndex);

        showDots(dotsArray, slideIndex);
    });

    prev.addEventListener('click', () => {
        if (offset == 0){
            offset = widthNum * (slides.length - 1);
        } else {
            offset -= widthNum;
        }
        fieldMove(offset);

        if (slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex --;
        }

        current.textContent = getZero(slideIndex);

        showDots(dotsArray, slideIndex);
    });

    dotsArray.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = widthNum * (slideTo - 1);

            fieldMove(offset);

            current.textContent = getZero(slideIndex);

            showDots(dotsArray, slideIndex);    
        });
    });
}

export default slider;