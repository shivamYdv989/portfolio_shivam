$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });



});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Shivam Yadav";
            $("#favicon").attr("href", "assets/images/hero.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/hero.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["frontend development", "web designing", "Software Engineer", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 1000,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("projects.json")

    console.log(response)
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 9).forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.jpg" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}



/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 1200 });
srtop.reveal('.home .github', { interval: 1000 });
srtop.reveal('.home .twitter', { interval: 800 });
srtop.reveal('.home .whatsapp', { interval: 600 });
srtop.reveal('.home .telegram', { interval: 400 });
srtop.reveal('.home .instagram', { interval: 200 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });
// Function to submit form data
async function submitForm(event) {
    event.preventDefault();

    const submitButton = document.querySelector('.button-area button');
    const originalButtonContent = submitButton.innerHTML; // Save the original button content

    // Add loader animation
    submitButton.innerHTML = `Loading.. <i class="fas fa-spinner fa-spin" style="top:0;"></i>`;
    submitButton.disabled = true; 

    const formData = {
        name: document.querySelector('[name="name"]').value,
        email: document.querySelector('[name="email"]').value,
        phone: document.querySelector('[name="phone"]').value,
        message: document.querySelector('[name="message"]').value,
    };

    try {
        const response = await fetch('https://portfolio-backend-1-jztl.onrender.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const responseData = await response.json();

        if (response.ok) {
            Toastify({
                text: responseData.message || 'Form submitted successfully!',
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'center',
                style: {
                    padding: "16px",
                    borderRadius: "8px",
                    width: "310px",
                    height: "60px",
                    fontSize: "16px",
                    display: "flex",
                    justifyContent: "spaceBetween",
                    alignItems: "center"
                },
                backgroundColor: 'yellowGreen', 
            }).showToast();

            document.getElementById('contact-form').reset();
        } else {
            Toastify({
                text: responseData.error || 'Failed to submit form. Please try again.',
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'center',
                style: {
                    padding: "16px",
                    borderRadius: "8px",
                    width: "310px",
                    height: "60px",
                    fontSize: "16px",
                    display: "flex",
                    justifyContent: "spaceBetween",
                    alignItems: "center"
                },
                backgroundColor: 'red', 
            }).showToast();
        }
    } catch (error) {
        console.error('Shivam:', error);
        Toastify({
            text: 'An error occurred. Please try again.',
            duration: 3000,
            close: true,
            gravity: 'top',
            position: 'center',
            style: {
                padding: "16px",
                borderRadius: "8px",
                width: "310px",
                height: "60px",
                fontSize: "16px",
                display: "flex",
                justifyContent: "spaceBetween",
                alignItems: "center"
            },
            backgroundColor: 'red', 
        }).showToast();
    } finally {
        // Restore the original button content and re-enable the button
        submitButton.innerHTML = originalButtonContent;
        submitButton.disabled = false;
    }
}
