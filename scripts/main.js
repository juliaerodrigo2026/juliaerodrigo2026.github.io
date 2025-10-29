document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('success')) {
        alert('Resposta enviada com sucesso. Response sent successfully.');
        
        // Remove the query parameter from URL without reloading
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.spanhalf img');
    
    // Intersection Observer for fade-in effect
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Observe all images
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Subtle parallax effect
    let ticking = false;
    
    function updateParallax() {
        images.forEach(img => {
            if (img.classList.contains('active')) {
                const rect = img.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Calculate position relative to viewport (0 to 1)
                const scrollProgress = 1 - (rect.top / windowHeight);
                
                // Apply subtle parallax (only moves 30px max)
                if (scrollProgress > -0.2 && scrollProgress < 1.2) {
                    const parallaxOffset = (scrollProgress - 0.5) * 100;
                    img.style.transform = `translateY(${parallaxOffset}px)`;
                }
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Initial check
    updateParallax();



    //MENU LINKS
    const menuLinks = document.querySelectorAll('nav ul a');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // ObtÃ©m o ID da seÃ§Ã£o sendo observada
            const id = entry.target.getAttribute('id');
            
            // Encontra o link correspondente no menu
            const menuLink = document.querySelector(`nav ul a[href="#${id}"]`);
            
            if (entry.isIntersecting) {
                menuLink.classList.add('active');

            } else {
                menuLink.classList.remove('active');
            }
        });
    }, {
        root: null, // observa em relaÃ§Ã£o Ã  viewport
        rootMargin: '0px',
        threshold: 0.2 // 20% da seÃ§Ã£o precisa estar visÃ­vel
    });
    
    // Observa cada seÃ§Ã£o referenciada no menu
    menuLinks.forEach(link => {
        const hash = link.getAttribute('href');
        if (hash.startsWith('#')) {
            const section = document.querySelector(hash);
            if (section) {
                observer.observe(section);
            }
        }
    });
});




$(document).ready(function () {


    //HOVER BIG LIST
    if (!('ontouchstart' in window) && $(window).width() >= 1024) {
        
        var $img = $('.big_list img');
        var originalImgSrc = $img.attr('src'); // Store the original image
        
        $('.big_list ol.xl li').on('mouseenter', function() {
            var newImgSrc = $(this).data('img');
            $img.attr('src', newImgSrc);
        });
        
        $('.big_list ol.xl').on('mouseleave', function() {
            $img.attr('src', originalImgSrc); // Reset to original image
        });
        
    }

});


//DYNAMIC LOGO
let ticking = false;

$(window).on('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      const $main = $('main');
      
      if ($(window).scrollTop() >= 200) {
        $main.stop().addClass('scrolled');
        console.log('added scrolled');
      } else {
        $main.stop().removeClass('scrolled');
        console.log('removed scrolled');
      }
      
      ticking = false;
    });
    
    ticking = true;
  }
});


// FORM
/*
const form = document.getElementById('rsvpForm');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Aguarde..."
  result.classList.add('active');

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Resposta enviada";
            } else {
                console.log(response);
                result.innerHTML = "Resposta enviada";
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Tente novamente";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.classList.remove('active');
            }, 3000);
        });
});
*/