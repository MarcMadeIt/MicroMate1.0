document.addEventListener('DOMContentLoaded', function () {
    // Overlay og Modal
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
                videoPlayer.currentTime = 0; /// Reset video til starten
            }
        }
    }

    if (homeLink) {
        homeLink.onclick = function () {
            if (overlayFinal) {
                overlayFinal.style.display = "none";
            }
        }
    }

    window.onclick = function (event) {
        if (event.target == overlayFinal) {
            if (overlayFinal) {
                overlayFinal.style.display = "none";
            }
            if (videoPlayer) {
                videoPlayer.pause();
                videoPlayer.currentTime = 0; // Reset video til starten
            }
        }
    }


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
                startButton.style.display = 'none';
            }
        });
    }

    // Parallax Effekt anmeldelse i hero
    var paraReviews = document.querySelectorAll('.para-review');
    var initialRotate = [];
    var maxTranslateX = 250;

    paraReviews.forEach(function (review) {
        var style = window.getComputedStyle(review);
        initialRotate.push(parseFloat(style.transform.split('rotate(')[1]) || 15);
    });

    // Hjælp til logikken bag parallax effekt scroll = translate + rotate + fade 
    // Link til chatgpt tråd https://chatgpt.com/c/922a6164-ebbf-4c6a-a64a-dcb2e024cb5a

    // Handle fade-in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;

    document.addEventListener('scroll', function () {
        // For hver 'fade' element, tilføjes klassen 'visible' når elementet er 100px indenfor synsvidde
        fadeElements.forEach(function (element) {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) { // 100 px før elementets top
                element.classList.add('visible');
            }
        });

        // Parallax Effekt til anmeldelser farver
        var scrollPosition = window.scrollY;

        paraReviews.forEach(function (review, index) {
            var speed = 0.5;
            var translateX = Math.min(scrollPosition * speed, maxTranslateX);
            var opacity = 1 - Math.abs(scrollPosition * 0.003);
            var rotate = initialRotate[index] + (scrollPosition * 0.06);

            if (index === 2 || index === 3) { // Skift rotation og translation retning for specifikke elementer
                rotate *= -1;
                translateX = -translateX;
            }

            review.style.transform = 'translateX(' + translateX + 'px) rotate(' + rotate + 'deg)';
            review.style.opacity = opacity;
        });

        // Translation af Review cards
        var myComponent = document.getElementById('myComponent');
        if (myComponent) {
            var speed = 0.1;
            var translateX = scrollPosition * speed;
            myComponent.style.transform = 'translateX(' + translateX + 'px)';
        }
    });

    // Tilføj din overlay form logik her
    var openOverlayBtn = document.getElementById('openOverlay');
    var closeOverlayBtn = document.getElementById('closeOverlay');
    var overlayRegister = document.getElementById('overlay-register');

    if (openOverlayBtn) {
        openOverlayBtn.addEventListener('click', function () {
            if (overlayRegister) {
                overlayRegister.style.display = 'flex';
            }
        });
    }

    if (closeOverlayBtn) {
        closeOverlayBtn.addEventListener('click', function () {
            if (overlayRegister) {
                overlayRegister.style.display = 'none';
            }
        });
    }

    if (overlayRegister) {
        overlayRegister.addEventListener('click', function (event) {
            if (event.target === overlay) {
                overlayRegister.style.display = 'none';
            }
        });
    }
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

            setTimeout(function () {
                document.getElementById("overlay-final").style.display = 'none';
                window.location.href = "/"; // Skifter til forsiden. 
            }, 2500);
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


        })
        .catch(function (error) {
            console.error("Failed to send email:", error);
            document.getElementById("newsletter-message").innerText = "Fejl ved tilmeldelse.";
        });
}
