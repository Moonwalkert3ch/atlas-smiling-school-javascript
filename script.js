$(document).ready(function () {
    // Initialize the loader
    $('.loader').hide();

    // Function to get quotes
    function getQuotes() {
        $('.loader').show();
        $.ajax({
            url: 'https://smileschool-api.hbtn.info/quotes',
            method: 'GET',
            success: function (response) {
                $('.loader').hide();
                response.forEach(function (quote, index) {
                    let item = `
              <div class="item">
                <div class="row mx-auto align-items-center">
                  <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                    <img src="${quote.pic_url}" class="d-block align-self-center" alt="Carousel Pic ${index + 1}" />
                  </div>
                  <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0 pl-0 pl-sm-3">
                    <div class="quote-text">
                      <p class="text-white">${quote.text}</p>
                      <h4 class="text-white font-weight-bold">${quote.name}</h4>
                      <span class="text-white">${quote.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
                    $('.carousel-quote').append(item);
                });

                // Reinitialize Slick after adding new items
                $('.carousel-quote').slick('unslick');
                $('.carousel-quote').slick({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
            },
            error: function (error) {
                $('.loader').hide();
                console.log('Error getting quotes:', error);
            }
        });
    }

    // Initialize Slick carousel for quotes
    $('.carousel-slick').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    // Function to get and display videos
    function getVideos() {
        $('.loader').show();
        $.ajax({
            url: 'https://smileschool-api.hbtn.info/popular-tutorials',
            method: 'GET',
            success: function (data) {
                $('.loader').hide();
                data.forEach(function (video) {
                    let videoItem = `
              <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center">
                <div class="card">
                  <img src="${video.thumb_url}" class="card-img-top" alt="Video thumbnail">
                  <div class="card-img-overlay text-center">
                    <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay">
                  </div>
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">${video.title}</h5>
                    <p class="card-text text-muted">${video['sub-title']}</p>
                    <div class="creator d-flex align-items-center">
                      <img src="${video.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle">
                      <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                    </div>
                    <div class="info pt-3 d-flex justify-content-between">
                      <div class="rating">
                        ${getStarRating(video.star)}
                      </div>
                      <span class="main-color">${video.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
                    $('.carousel-video').append(videoItem);
                });

                // Reinitialize Slick carousel for videos
                $('.carousel-video').slick('unslick');
                $('.carousel-video').slick({
                    infinite: false,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });
            },
            error: function (xhr, status, error) {
                $('.loader').hide();
                console.error('Error getting videos:', error);
            }
        });
    }

    // Function to generate star ratings
    function getStarRating(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<img src="images/star_on.png" alt="star on" width="15px">';
            } else {
                stars += '<img src="images/star_off.png" alt="star off" width="15px">';
            }
        }
        return stars;
    }

    // Function to get dropdown options
    function getDropdownOptions() {
        $.ajax({
            url: 'https://smileschool-api.hbtn.info/courses',
            method: 'GET',
            success: function(response) {
                // Populate Topics Dropdown
                response.topics.forEach(topic => {
                    $('.expertness-menu').append(`<a class="dropdown-item" href="#">${topic}</a>`);
                });

                // Populate Sort By Dropdown
                response.sorts.forEach(sort => {
                    $('.popularity-menu').append(`<a class="dropdown-item" href="#">${sort}</a>`);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error getting dropdown options:', error);
            }
        });
    }

    // Function to get and display courses
    function getCourses(searchVal, topicFilter, sortBy) {
        $('.video-count').hide();
        $('.loader').show();
        $('.courses .row').empty();
        $.ajax({
            url: 'https://smileschool-api.hbtn.info/courses',
            method: 'GET',
            data: {
                q: searchVal,
                topic: topicFilter,
                sort: sortBy
            },
            success: function(response) {
                $('.loader').hide();
                let courses = response.courses;
                let videoCount = courses.length;
                $('.video-count').text(videoCount === 1 ? '1 video' : videoCount + ' videos').show();
                courses.forEach(function(course) {
                    let videoItem = `
                        <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center">
                          <div class="card">
                            <img src="${course.thumb_url}" class="card-img-top" alt="Video thumbnail">
                            <div class="card-img-overlay text-center">
                              <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay">
                            </div>
                            <div class="card-body">
                              <h5 class="card-title font-weight-bold">${course.title}</h5>
                              <p class="card-text text-muted">${course['sub-title']}</p>
                              <div class="creator d-flex align-items-center">
                               <img src="${course.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle">
                               <h6 class="pl-3 m-0 main-color">${course.author}</h6>
                              </div>
                              <div class="info pt-3 d-flex justify-content-between">
                               <div class="rating">
                                  ${getStarRating(course.star)}
                               </div>
                               <span class="main-color">${course.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                    `;
                    $('.courses .row').append(videoItem);
                });
            },
            error: function(xhr, status, error) {
                $('.loader').hide();
                console.error('Error getting courses:', error);
            }
        });
    }

    // Event handlers
    $('.search-text-area').on('input', function() {
        let searchVal = $(this).val();
        getCourses(searchVal, $('.expertness span').text(), $('.popularity span').text());
    });

    $('.search-text-area').keypress(function(event) {
        if (event.which === 13) {
            let searchVal = $(this).val();
            getCourses(searchVal, $('.expertness span').text(), $('.popularity span').text());
        }
    });

    $(document).on('click', '.expertness-menu .dropdown-item', function() {
        let topicFilter = $(this).text();
        $('.expertness span').text(topicFilter);
        getCourses($('.search-text-area').val(), topicFilter, $('.popularity span').text());
    });

    $(document).on('click', '.popularity-menu .dropdown-item', function() {
        let sortBy = $(this).text();
        $('.popularity span').text(sortBy);
        getCourses($('.search-text-area').val(), $('.expertness span').text(), sortBy);
    });

    // Initial calls
    getDropdownOptions();
    getQuotes();
    getVideos();
    getCourses();
});
