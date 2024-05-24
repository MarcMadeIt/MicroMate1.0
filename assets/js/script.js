document.addEventListener('DOMContentLoaded', function () {
    // Handle overlay for "Afslut kursus"
    var overlayFinal = document.getElementById("overlay-final");
    var courseFinalBtn = document.getElementById("course-final-btn");
    var homeLink = document.getElementById("home-link");
    var videoPlayer = document.querySelector("video");

    if (overlayFinal) {
        overlayFinal.style.display = 'none';
    }

    if (courseFinalBtn) {
        courseFinalBtn.onclick = function () {
            if (overlayFinal) {
                overlayFinal.style.display = "block";
            }
            if (videoPlayer) {
                videoPlayer.pause();
                videoPlayer.currentTime = 0; // Reset video to start
            }
        }
    }

    if (homeLink) {
        homeLink.onclick = function () {
            if (overlayFinal) {
                overlayFinal.style.display = "none";
            }
            // Assuming the link will navigate away, so no need to reset the video here
        }
    }

    window.onclick = function (event) {
        if (event.target == overlayFinal) {
            if (overlayFinal) {
                overlayFinal.style.display = "none";
            }
            if (videoPlayer) {
                videoPlayer.pause();
                videoPlayer.currentTime = 0; // Reset video to start
            }
        }
    }

    // Handle video overlay and start button
    var startButton = document.getElementById('start-button');
    var videoPlayer2 = document.getElementById('video-player');
    var overlayVideo = document.getElementById('overlay-video');

    if (overlayVideo) {
        overlayVideo.style.display = 'block';
    }

    if (videoPlayer2) {
        videoPlayer2.addEventListener('play', function () {
            if (overlayVideo) {
                overlayVideo.style.display = 'none';
            }
        });
    }

    if (startButton) {
        startButton.addEventListener('click', function () {
            if (videoPlayer2) {
                videoPlayer2.play();
                startButton.style.display = 'none'; // Hide the button
            }
        });
    }

    // Handle parallax reviews
    var paraReviews = document.querySelectorAll('.para-review');
    var initialRotate = [];
    var maxTranslateX = 250; // Adjust as needed

    paraReviews.forEach(function (review) {
        var style = window.getComputedStyle(review);
        initialRotate.push(parseFloat(style.transform.split('rotate(')[1]) || 15);
    });

    // Handle fade-in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;

    document.addEventListener('scroll', function () {
        fadeElements.forEach(function (element) {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) { // Adjust 100 to control the trigger point
                element.classList.add('visible');
            }
        });

        // Parallax effect
        var scrollPosition = window.scrollY;

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

        // My component translation
        var myComponent = document.getElementById('myComponent');
        if (myComponent) {
            var speed = 0.1;
            var translateX = scrollPosition * speed;
            myComponent.style.transform = 'translateX(' + translateX + 'px)';
        }
    });
});

// EmailJS
function sendMail() {
    var params = {
        message: document.getElementById("message").value,
        email: document.getElementById("email").value,
    };

    emailjs.send("service_uj268gt", "template_59c6yyd", params)
        .then(function (res) {
            console.log("Email sent successfully:", res);
            document.getElementById("success-message").innerText = "Certifikatet er sendt!";

            // Add a delay before hiding the overlay or redirecting
            setTimeout(function () {
                document.getElementById("overlay-final").style.display = 'none';
                // Redirect or any other action here
                window.location.href = "/"; // Change to your homepage URL
            }, 3000); // Delay in milliseconds (3000ms = 3 seconds)
        })
        .catch(function (error) {
            console.error("Failed to send email:", error);
            document.getElementById("success-message").innerText = "Fejl ved afsendelse af certifikat.";
        });
}


function sendNewsletter() {
    var params = {
        newsletter: document.getElementById("newsletter").value,
    };

    emailjs.send("service_uj268gt", "template_7xz5xre", params)
        .then(function (res) {
            console.log("Email sent successfully:", res);
            document.getElementById("newsletter-message").innerText = "Du er nu tilmeldt vores nyhedsbrev.";

            document.getElementById("newsletter").value = "";
        })
        .catch(function (error) {
            console.error("Failed to send email:", error);
            document.getElementById("newsletter-message").innerText = "Fejl ved tilmeldelse.";
        });
}
