document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const planet = document.getElementById("planet3d");
  const name = document.getElementById("planet-name");
  const data = document.getElementById("planet-data");
  const overlay = document.querySelector(".planet-overlay");

  const updatePlanetInfo = (planetClass, planetName, planetDetails) => {
    if (planet.className !== planetClass) {
      overlay.style.opacity = "0";
      overlay.style.transform = "translateY(20px)";

      setTimeout(() => {
        planet.className = planetClass;
        name.innerText = planetName;
        data.innerText = planetDetails;
        overlay.style.opacity = "1";
        overlay.style.transform = "translateY(0)";
      }, 400);
    }
  };

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    if (scrollPos < 1200) {
      updatePlanetInfo(
        "planet-sphere",
        "ZIEMIA",
        "DYSTANS: 0 KM | STATUS: ZAMIESZKANA",
      );
    } else if (scrollPos >= 1200 && scrollPos < 1800) {
      updatePlanetInfo(
        "planet-sphere mars",
        "MARS",
        "DYSTANS: 225M KM | STATUS: JAŁOWA",
      );
    } else if (scrollPos >= 1800 && scrollPos < 2400) {
      updatePlanetInfo(
        "planet-sphere jupiter",
        "JOWISZ",
        "DYSTANS: 778M KM | STATUS: GAZOWY GIGANT",
      );
    }
  });

  const cards = document.querySelectorAll(".planet-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.5)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "none";
    });
  });
});
