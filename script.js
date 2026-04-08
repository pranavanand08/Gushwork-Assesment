// Ensure the DOM is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", () => {
  
  // =========================================
  // 1. STICKY HEADER
  // =========================================
  const header = document.getElementById("header");

  // Listen to the scroll event on the window
  window.addEventListener("scroll", () => {
    // If we scroll past 50 pixels from the top, add the 'scrolled' class
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });


  // =========================================
  // 2. MOBILE MENU TOGGLE
  // =========================================
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    // Toggle the 'active' class on the ul to show/hide it on mobile
    navMenu.classList.toggle("active");
  });


  // =========================================
  // 3. IMAGE CAROUSEL
  // =========================================
  const track = document.getElementById("carousel-track");
  const slides = Array.from(track.children);
  const nextButton = document.getElementById("btn-right");
  const prevButton = document.getElementById("btn-left");

  // Determine slide width (we get the bounding client rect of the first slide)
  const slideWidth = slides[0].getBoundingClientRect().width;

  // Position each slide next to each other horizontally
  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };
  slides.forEach(setSlidePosition);

  let currentSlideIndex = 0;

  // Function to move the track
  const moveToSlide = (track, currentSlideIndex) => {
    // We translate the track negatively on the X axis to slide left
    track.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
  };

  // Click Right
  nextButton.addEventListener("click", () => {
    if (currentSlideIndex < slides.length - 1) {
      currentSlideIndex++;
      moveToSlide(track, currentSlideIndex);
    }
  });

  // Click Left
  prevButton.addEventListener("click", () => {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      moveToSlide(track, currentSlideIndex);
    }
  });

  // Optional: Update slide widths and positions upon window resize
  window.addEventListener('resize', () => {
    const newSlideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach((slide, index) => {
      slide.style.left = newSlideWidth * index + 'px';
    });
    track.style.transform = `translateX(-${currentSlideIndex * newSlideWidth}px)`;
  });


  // =========================================
  // 4. PROCESS TABS
  // =========================================
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons and panes
      tabBtns.forEach(b => b.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));

      // Add active class to the clicked button
      btn.classList.add("active");

      // Get target pane ID from data-target attribute and make it active
      const targetId = btn.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");
    });
  });


  // =========================================
  // 5. FAQ ACCORDION
  // =========================================
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(item => {
    const header = item.querySelector(".accordion-header");
    const body = item.querySelector(".accordion-body");

    header.addEventListener("click", () => {
      // Toggle active class on the item container
      const isActive = item.classList.contains("active");

      // Optional: Close all other accordions
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".accordion-body").style.maxHeight = null;
      });

      // If it wasn't active, open it
      if (!isActive) {
        item.classList.add("active");
        // ScrollHeight gives the exact height needed based on content
        body.style.maxHeight = body.scrollHeight + "px";
      } else {
        item.classList.remove("active");
        body.style.maxHeight = null;
      }
    });
  });

});
