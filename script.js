$(document).ready(function () {
    // Carousel Initialization Function
    function initializeCarousel(selector) {
        $(selector).carousel({ interval: 10000 });
        $(`${selector} .carousel-item`).each(function () {
            let next = $(this).next();
            if (!next.length) next = $(this).siblings(":first");
            next.children(":first-child").clone().appendTo($(this));
    
            for (let i = 0; i < 3; i++) {
                next = next.next();
                if (!next.length) next = $(this).siblings(":first");
                next.children(":first-child").clone().appendTo($(this));
            }
        });
    }
  
    // display Class
    class display {
        constructor() {
            this.quotesLoader = document.querySelector("#quote-loader");
            this.quotesCarousel = document.querySelector("#quote-carousel");
            this.quotesCarouselInner = document.querySelector("#quote-carousel .carousel-inner");
            this.popularLoader = document.querySelector("#popular-loader");
            this.popularCarousel = document.querySelector("#popular-carousel");
            this.popularCarouselInner = document.querySelector("#popular-carousel .carousel-inner");
            this.latestLoader = document.querySelector("#latest-loader");
            this.latestCarousel = document.querySelector("#latest-carousel");
            this.latestCarouselInner = document.querySelector("#latest-carousel .carousel-inner");
            this.keywordsField = document.querySelector("#keywords");
            this.topicField = document.querySelector("#topic");
            this.sortField = document.querySelector("#sort-by");
            this.coursesLoader = document.querySelector("#courses-loader");
            this.numberCourses = document.querySelector("#courses-loader + h6");
            this.courseListing = document.querySelector("#course-listing");
        }
  
        showQuotes(quotes) {
            quotes.forEach(quote => {
                const item = document.createElement("div");
                item.classList.add("carousel-item");
                item.innerHTML = `
                    <div class="d-flex align-items-center pt-5">
                        <img src="${quote.pic_url}" alt="${quote.name} Avatar" class="rounded-circle">
                        <div class="text-white quote-text">
                            <h4>${quote.text}</h4>
                            <p class="font-weight-bold">${quote.name}</p>
                            <p class="font-italic">${quote.title}</p>
                        </div>
                    </div>`;
                this.quotesCarouselInner.appendChild(item);
            });
            this.quotesCarouselInner.children[0].classList.add("active");
            this.quotesLoader.classList.add("d-none");
            this.quotesCarousel.classList.remove("d-none");
        }
  
        showPopularVideos(videos) {
            videos.forEach(video => {
                this.popularCarouselInner.appendChild(this.createCarouselVideoCard(video));
            });
            this.popularCarouselInner.children[0].classList.add("active");
            this.popularLoader.classList.add("d-none");
            this.popularCarousel.classList.remove("d-none");
        }
  
        showLatestVideos(videos) {
            videos.forEach(video => {
                this.latestCarouselInner.appendChild(this.createCarouselVideoCard(video));
            });
            this.latestCarouselInner.children[0].classList.add("active");
            this.latestLoader.classList.add("d-none");
            this.latestCarousel.classList.remove("d-none");
        }
  
        createCarouselVideoCard(video) {
            const item = document.createElement("div");
            item.classList.add("carousel-item");
            item.innerHTML = `
                <div class="col-md-6 col-lg-3">
                    <div class="card card-body">
                        <div class="video">
                            <img class="img-fldisplayd" src="${video.thumb_url}" alt="">
                            <img src="images/play.png" alt="" class="play-btn">
                        </div>
                        <h5 class="card-title font-weight-bold mt-3">${video.title}</h5>
                        <p class="card-text">${video["sub-title"]}</p>
                        <div class="tutorial-author d-flex align-items-center">
                            <img src="${video.author_pic_url}" alt="" class="rounded-circle">
                            <span class="ml-2 font-weight-bold">${video.author}</span>
                        </div>
                        <div class="mt-3 tutorial-info d-flex justify-content-between align-items-center">
                            <span class="rating">
                                ${[...Array(5)].map((_, i) => `<img src="images/star_${video.star >= i + 1 ? "on" : "off"}.png" alt="">`).join('')}
                            </span>
                            <span class="length font-weight-bold video-duration">${video.duration}</span>
                        </div>
                    </div>
                </div>`;
            return item;
        }
  
        showCourses(courses) {
            this.numberCourses.textContent = `${courses.length} results`;
            courses.forEach(course => {
                const item = document.createElement("div");
                item.className = "col-md-6 col-lg-4 col-xl-3 my-4";
                item.innerHTML = `
                    <div class="card card-body">
                        <div class="video">
                            <img class="img-fldisplayd" src="${course.thumb_url}" alt="">
                            <img src="images/play.png" alt="" class="play-btn">
                        </div>
                        <h5 class="card-title font-weight-bold mt-3">${course.title}</h5>
                        <p class="card-text">${course["sub-title"]}</p>
                        <div class="tutorial-author d-flex align-items-center">
                            <img src="${course.author_pic_url}" alt="" class="rounded-circle">
                            <span class="ml-2 font-weight-bold">${course.author}</span>
                        </div>
                        <div class="mt-3 tutorial-info d-flex justify-content-between align-items-center">
                            <span class="rating">
                                ${[...Array(5)].map((_, i) => `<img src="images/star_${course.star >= i + 1 ? "on" : "off"}.png" alt="">`).join('')}
                            </span>
                            <span class="length font-weight-bold">${course.duration}</span>
                        </div>
                    </div>`;
                this.courseListing.appendChild(item);
            });
            this.coursesLoader.classList.add("d-none");
            this.numberCourses.classList.remove("d-none");
            this.courseListing.classList.remove("d-none");
        }
  
        updateCourses(courses) {
            this.clearCourses();
            this.showCourses(courses);
        }
  
        clearCourses() {
            this.numberCourses.classList.add("d-none");
            this.courseListing.classList.add("d-none");
            this.coursesLoader.classList.remove("d-none");
            while (this.courseListing.firstElementChild) {
                this.courseListing.firstElementChild.remove();
            }
        }
    }
  
    // SmileSchool Class
    class SmileSchool {
        async getquotes() {
            let response = await fetch("https://smileschool-api.hbtn.info/quotes");
            return await response.json();
        }
  
        async getPopularVideos() {
            let response = await fetch("https://smileschool-api.hbtn.info/popular-tutorials");
            return await response.json();
        }
  
        async getLatestVideos() {
            let response = await fetch("https://smileschool-api.hbtn.info/latest-videos");
            return await response.json();
        }
  
        async getCourses() {
            let response = await fetch("https://smileschool-api.hbtn.info/courses");
            return await response.json();
        }
  
        async getFilteredCourses(keywords, topic, sortBy) {
            let response = await fetch(`https://smileschool-api.hbtn.info/courses?q=${keywords}&topic=${topic}&sort=${sortBy}`);
            return await response.json();
        }
    }
  
    // App Initialization
    const App = (function () {
        let display, smileSchool;
  
        function filterCourses() {
            const keywords = display.keywordsField.value;
            const topic = display.topicField.value;
            const sortBy = display.sortField.value;
            smileSchool.getFilteredCourses(keywords, topic, sortBy).then(data => {
                display.updateCourses(data.courses);
            });
        }
  
        return {
            init: function () {
                const pageId = document.body.id;
                display = new display();
                smileSchool = new SmileSchool();
  
                if (["homepage", "pricing"].includes(pageId)) {
                    console.log("Fetching quotes...");
                    smileSchool.getquotes().then(data => display.showquotes(data));
                }
                if (pageId === "homepage") {
                    console.log("Fetching popular videos...");
                    smileSchool.getPopularVideos().then(data => {
                        display.showPopularVideos(data);
                        initializeCarousel("#popular-carousel");
                    });
                    console.log("Fetching latest videos...");
                    smileSchool.getLatestVideos().then(data => {
                        display.showLatestVideos(data);
                        initializeCarousel("#latest-carousel");
                    });
                }
                if (pageId === "courses") {
                    console.log("Fetching courses...");
                    smileSchool.getCourses().then(data => display.showCourses(data.courses));
                    display.keywordsField.addEventListener("input", filterCourses);
                    display.topicField.addEventListener("input", filterCourses);
                    display.sortField.addEventListener("input", filterCourses);
                }
            }
        };
    })();
  
    document.addEventListener("DOMContentLoaded", App.init);
});
