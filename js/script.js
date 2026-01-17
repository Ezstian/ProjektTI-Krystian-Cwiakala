document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const planet = document.getElementById("planet3d");
  const nameLabel = document.getElementById("planet-name");
  const dataLabel = document.getElementById("planet-data");
  const overlay = document.querySelector(".planet-overlay");
  const viewportSection = document.querySelector(".planet-viewport");

  const planetsData = [
    {
      id: "mercury",
      name: "MERKURY",
      details: "DYSTANS: 58M KM | TYP: SKALISTY",
      cssClass: "mercury",
    },
    {
      id: "venus",
      name: "WENUS",
      details: "DYSTANS: 108M KM | TYP: GORĄCY KLIMAT",
      cssClass: "venus",
    },
    {
      id: "earth",
      name: "ZIEMIA",
      details: "DYSTANS: 1 AU | TYP: ZAMIESZKANA",
      cssClass: "earth",
    },
    {
      id: "mars",
      name: "MARS",
      details: "DYSTANS: 228M KM | TYP: CZERWONA PLANETA",
      cssClass: "mars",
    },
    {
      id: "jupiter",
      name: "JOWISZ",
      details: "DYSTANS: 778M KM | TYP: GAZOWY GIGANT",
      cssClass: "jupiter",
    },
    {
      id: "saturn",
      name: "SATURN",
      details: "DYSTANS: 1.4MLD KM | TYP: PIERŚCIENIE",
      cssClass: "saturn",
    },
    {
      id: "uranus",
      name: "URAN",
      details: "DYSTANS: 2.9MLD KM | TYP: LODOWY GIGANT",
      cssClass: "uranus",
    },
    {
      id: "neptune",
      name: "NEPTUN",
      details: "DYSTANS: 4.5MLD KM | TYP: WIETRZNY",
      cssClass: "neptune",
    },
  ];

  let currentPlanetIndex = -1;
  const updatePlanetInfo = (index) => {
    if (index < 0) index = 0;
    if (index >= planetsData.length) index = planetsData.length - 1;
    if (currentPlanetIndex !== index) {
      currentPlanetIndex = index;
      const planetInfo = planetsData[index];
      overlay.style.opacity = "0";
      overlay.style.transform = "translateY(20px)";
      setTimeout(() => {
        planet.className = `planet-sphere ${planetInfo.cssClass}`;
        nameLabel.innerText = planetInfo.name;
        dataLabel.innerText = planetInfo.details;
        overlay.style.opacity = "1";
        overlay.style.transform = "translateY(0)";
      }, 200);
    }
  };
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    if (!viewportSection) return;

    const sectionTop = viewportSection.offsetTop;
    const sectionHeight = viewportSection.offsetHeight - window.innerHeight;
    let scrollProgress = (scrollY - sectionTop) / sectionHeight;

    if (scrollProgress < 0) scrollProgress = 0;
    if (scrollProgress > 1) scrollProgress = 1;
    if (
      scrollY >= sectionTop - window.innerHeight &&
      scrollY <= sectionTop + viewportSection.offsetHeight
    ) {
      const targetIndex = Math.floor(scrollProgress * planetsData.length);
      updatePlanetInfo(targetIndex);
    }
  });

  const cards = document.querySelectorAll(".card, .planet-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
});
