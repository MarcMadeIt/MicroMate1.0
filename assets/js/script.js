
var initialRotate = [];
var maxTranslateX = 250; // Adjust as needed

window.addEventListener('DOMContentLoaded', function () {
    var paraReviews = document.querySelectorAll('.para-review');

    paraReviews.forEach(function (review) {
        var style = window.getComputedStyle(review);
        initialRotate.push(parseFloat(style.transform.split('rotate(')[1]) || 15);
    });
});

window.addEventListener('scroll', function () {
    var scrollPosition = window.scrollY;
    var paraReviews = document.querySelectorAll('.para-review');

    paraReviews.forEach(function (review, index) {
        var speed = 0.5;
        var translateX = Math.min(scrollPosition * speed, maxTranslateX); // Limit maximum translation
        var opacity = 1 - Math.abs(scrollPosition * 0.003); // Adjust opacity based on scroll position
        var rotate = initialRotate[index] + (scrollPosition * 0.06);

        if (index === 2 || index === 3) {
            rotate *= -1;
            translateX = -translateX;
        }

        review.style.transform = 'translateX(' + translateX + 'px) rotate(' + rotate + 'deg)';
        review.style.opacity = opacity; // Apply opacity
    });
});


window.addEventListener('scroll', function () {
    var scrollPosition = window.scrollY;
    var myComponent = document.getElementById('myComponent');
    var speed = 0.1;

    var translateX = scrollPosition * speed;
    myComponent.style.transform = 'translateX(' + translateX + 'px)';
});


document.addEventListener('scroll', function () {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;

    elements.forEach(function (element) {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) { // Adjust 100 to control the trigger point
            element.classList.add('visible');
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    var startButton = document.getElementById('start-button');
    var videoPlayer = document.getElementById('video-player');
    var overlay = document.getElementById('overlay-video');

    // Show overlay initially
    overlay.style.display = 'block';

    // Hide overlay when video is played
    videoPlayer.addEventListener('play', function () {
        overlay.style.display = 'none';
    });

    startButton.addEventListener('click', function () {
        videoPlayer.play();
        startButton.style.display = 'none'; // Hide the button
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.getElementById("overlay-final");
    var btn = document.getElementById("course-final-btn");
    var sendBtn = document.getElementById("send-btn");
    var videoPlayer = document.querySelector("video"); // Assuming there's only one video on the page

    // Ensure overlay is hidden initially
    overlay.style.display = 'none';

    // When the user clicks the "Afslut kursus" button, open the overlay and modal
    btn.onclick = function () {
        overlay.style.display = "block";
        videoPlayer.pause();
        videoPlayer.currentTime = 0; // Reset video to start
    }

    // When the user clicks the "Send" button, close the overlay
    sendBtn.onclick = function () {
        overlay.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close the overlay and stop the video
    window.onclick = function (event) {
        if (event.target == overlay) {
            overlay.style.display = "none";
            videoPlayer.pause();
            videoPlayer.currentTime = 0; // Reset video to start
        }
    }
});

    // EmailJS
    function sendMail(){
        var info={
            message:document.getElementById("message").value,
            message:document.getElementById("email").value,
        }
    }
    const serviceID="service_uj268gt";
    const templateID="template_59c6yyd";

    emailjs.send(serviceID,templateID,info).then(res=>{
        document.getElementById("message").value="";
        document.getElementById("email").value="";
    }).catch((err)=>console.log(err));