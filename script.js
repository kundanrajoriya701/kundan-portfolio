(function () {
  const data = window.profile || {};
  const profileImage = document.getElementById("profilePhoto");
  const profilePlaceholder = document.getElementById("profilePlaceholder");
  const brand = document.querySelector(".brand");
  const brandLogo = document.getElementById("brandLogo");
  const galleryGrid = document.getElementById("galleryGrid");
  const emptyGallery = document.getElementById("emptyGallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const scrollTop = document.getElementById("scrollTop");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  const cleanPhone = (data.whatsappNumber || "").replace(/[^\d]/g, "");
  const links = {
    instagram: data.instagramUrl || "#",
    whatsapp: cleanPhone ? `https://wa.me/${cleanPhone}` : "#",
    linkedin: data.linkedinUrl || "#"
  };

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value || "";
    });
  }

  function applyProfile() {
    setText('[data-profile="name"]', data.name || "Your Name");
    setText('[data-profile="tagline"]', data.tagline || "Content Creator | Digital Enthusiast | Let's Connect");
    setText('[data-profile="instagramUsername"]', data.instagramUsername || "your_username");
    setText('[data-profile="bio"]', data.bio || "Welcome to my digital space.");

    document.title = `${data.name || "Personal Portfolio"} | Personal Portfolio`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", data.bio || "");
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", `${data.name || "Personal Portfolio"} | Personal Portfolio`);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", data.tagline || "");
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", window.location.href);
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", data.profileImage || "images/profile/current/profile.jpg");

    document.querySelectorAll("[data-link]").forEach((element) => {
      const key = element.dataset.link;
      element.href = links[key] || "#";
    });

    document.getElementById("year").textContent = new Date().getFullYear();
  }

  function loadProfileImage() {
    if (!profileImage) return;

    profileImage.onload = () => {
      profileImage.style.display = "block";
      profilePlaceholder.style.display = "none";
    };

    profileImage.onerror = () => {
      profileImage.style.display = "none";
      profilePlaceholder.style.display = "grid";
    };

    profileImage.src = data.profileImage || "images/profile/current/profile.jpg";
  }

  function loadBrandLogo() {
    if (!brandLogo) return;

    brandLogo.onload = () => {
      brand?.classList.remove("logo-missing");
      brandLogo.style.display = "block";
    };

    brandLogo.onerror = () => {
      brand?.classList.add("logo-missing");
      brandLogo.style.display = "none";
    };

    brandLogo.src = data.logoImage || "images/profile/logos/logo.png";
  }

  function imageExists(src) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(src);
      image.onerror = () => resolve(null);
      image.src = src;
    });
  }

  async function discoverGalleryImages() {
    const folder = data.galleryFolder || "images/gallery/";
    const maxPhotos = Number(data.galleryMaxPhotos || 40);
    const extensions = data.galleryExtensions || ["jpg", "jpeg", "png", "webp"];
    const checks = [];

    for (let index = 1; index <= maxPhotos; index += 1) {
      extensions.forEach((extension) => {
        checks.push(imageExists(`${folder}photo${index}.${extension}`));
      });
    }

    const results = await Promise.all(checks);
    return results.filter(Boolean);
  }

  function renderGallery(images) {
    galleryGrid.innerHTML = "";
    emptyGallery.style.display = images.length ? "none" : "block";

    images.forEach((src, index) => {
      const button = document.createElement("button");
      button.className = "gallery-item reveal";
      button.type = "button";
      button.setAttribute("aria-label", `Open gallery photo ${index + 1}`);

      const image = document.createElement("img");
      image.src = src;
      image.alt = `Gallery photo ${index + 1}`;
      image.loading = "lazy";

      button.appendChild(image);
      button.addEventListener("click", () => openLightbox(src, image.alt));
      galleryGrid.appendChild(button);
    });

    observeReveals();
  }

  function openLightbox(src, alt) {
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    lightboxImage.src = "";
  }

  function observeReveals() {
    const revealElements = document.querySelectorAll(".reveal:not(.visible)");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealElements.forEach((element) => observer.observe(element));
  }

  navToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks?.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      navLinks.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });

  scrollTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  window.addEventListener("scroll", () => {
    scrollTop.classList.toggle("visible", window.scrollY > 420);
    document.querySelector(".site-header")?.classList.toggle("is-scrolled", window.scrollY > 8);
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
  });

  applyProfile();
  loadProfileImage();
  loadBrandLogo();
  observeReveals();
  discoverGalleryImages().then(renderGallery);
})();
