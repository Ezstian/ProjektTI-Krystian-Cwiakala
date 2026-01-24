document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const planet = document.getElementById("planet3d");
  const nameLabel = document.getElementById("planet-name");
  const dataLabel = document.getElementById("planet-data");
  const overlay = document.querySelector(".planet-overlay");
  const viewportSection = document.querySelector(".planet-viewport");

  const planetsData = [
    {
      name: "MERKURY",
      details: "DYSTANS: 58 MLN KM | TYP: SKALISTA",
      cssClass: "mercury",
    },
    {
      name: "WENUS",
      details: "DYSTANS: 108 MLN KM | TYP: SKALISTA",
      cssClass: "venus",
    },
    {
      name: "ZIEMIA",
      details: "DYSTANS: 150 MLN KM | STATUS: ZAMIESZKANA",
      cssClass: "earth",
    },
    {
      name: "MARS",
      details: "DYSTANS: 228 MLN KM | TYP: SKALISTA",
      cssClass: "mars",
    },
    {
      name: "JOWISZ",
      details: "DYSTANS: 778 MLN KM | TYP: GAZOWY GIGANT",
      cssClass: "jupiter",
    },
    {
      name: "SATURN",
      details: "DYSTANS: 1.4 MLD KM | TYP: GAZOWY GIGANT",
      cssClass: "saturn",
    },
    {
      name: "URAN",
      details: "DYSTANS: 2.9 MLD KM | TYP: LODOWY GIGANT",
      cssClass: "uranus",
    },
    {
      name: "NEPTUN",
      details: "DYSTANS: 4.5 MLD KM | TYP: LODOWY GIGANT",
      cssClass: "neptune",
    },
  ];

  let currentPlanetIndex = -1;

  const updatePlanetInfo = (index) => {
    if (planetsData.length === 0) return;
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
    if (!viewportSection || planetsData.length === 0) return;

    const sectionTop = viewportSection.offsetTop;
    const sectionHeight = viewportSection.offsetHeight - window.innerHeight;

    let scrollProgress = (scrollY - sectionTop) / sectionHeight;

    if (scrollProgress < 0) scrollProgress = 0;
    if (scrollProgress > 1) scrollProgress = 1;
    if (
      scrollY >= sectionTop - window.innerHeight &&
      scrollY <= sectionTop + viewportSection.offsetHeight
    ) {
      let targetIndex = 0;

      if (scrollProgress < 0.125) {
        targetIndex = 0; // Merkury
      } else if (scrollProgress >= 0.125 && scrollProgress < 0.25) {
        targetIndex = 1; // Wenus
      } else if (scrollProgress >= 0.25 && scrollProgress < 0.375) {
        targetIndex = 2; // Ziemia
      } else if (scrollProgress >= 0.375 && scrollProgress < 0.5) {
        targetIndex = 3; // Mars
      } else if (scrollProgress >= 0.5 && scrollProgress < 0.625) {
        targetIndex = 4; // Jowisz
      } else if (scrollProgress >= 0.625 && scrollProgress < 0.75) {
        targetIndex = 5; // Saturn
      } else if (scrollProgress >= 0.75 && scrollProgress < 0.875) {
        targetIndex = 6; // Uran
      } else {
        targetIndex = 7; // Neptun
      }

      updatePlanetInfo(targetIndex);
    }
  });
});

const ciekawostki = [
  "Jeden dzień na Wenus trwa dłużej niż jeden rok na Wenus.",
  "Zachody słońca na Marsie są niebieskie.",
  "W Drodze Mlecznej jest więcej gwiazd niż ziaren piasku na wszystkich plażach Ziemi.",
  "Łyżeczka materii z gwiazdy neutronowej ważyłaby około 6 miliardów ton.",
  "Ślady astronautów na Księżycu pozostaną tam przez miliony lat, bo nie ma tam wiatru.",
  "Gdyby Saturn został umieszczony w gigantycznej wannie z wodą, unosiłby się na powierzchni.",
  "Jowisz jest tak duży, że zmieściłby w sobie wszystkie inne planety Układu Słonecznego.",
  "Najwyższa góra w Układzie Słonecznym to Olympus Mons na Marsie – jest 3 razy wyższa od Mount Everest.",
  "Światło ze Słońca potrzebuje około 8 minut i 20 sekund, aby dotrzeć do Ziemi.",
  "W kosmosie panuje absolutna cisza, ponieważ nie ma tam atmosfery do przenoszenia dźwięku.",
  "Wenus jest tak gorąca, że jej powierzchnia świeci w świetle widzialnym, co udało się uchwycić sondzie Parker Solar Probe.",
  "Długotrwały pobyt w stanie nieważkości powoduje zmiany w organizmie przypominające przyspieszone starzenie – rok w kosmosie to jak 10 lat życia na Ziemi.",
  "Wbrew pozorom, w przestrzeni kosmicznej (powyżej 100 km) zginęły tylko trzy osoby – załoga radzieckiego Sojuza 11, którzy udusili się po rozszczelnieniu kapsuły.",
];

function losujCiekawostke() {
  const display = document.getElementById("fact-display");
  const losowaLiczba = Math.floor(Math.random() * ciekawostki.length);
  display.innerText = ciekawostki[losowaLiczba];
}

function obliczWiek() {
  const earthAge = document.getElementById("earthAge").value;

  if (isNaN(earthAge) || earthAge <= 0) {
    alert("Proszę podać poprawny wiek!");
    return;
  }

  const orbitalPeriods = {
    mercury: 0.2408467,
    venus: 0.61519726,
    mars: 1.8808158,
    jupiter: 11.862,
    neptune: 164.79,
  };

  document.getElementById("age-mercury").innerText = (
    earthAge / orbitalPeriods.mercury
  ).toFixed(1);
  document.getElementById("age-venus").innerText = (
    earthAge / orbitalPeriods.venus
  ).toFixed(1);
  document.getElementById("age-mars").innerText = (
    earthAge / orbitalPeriods.mars
  ).toFixed(1);
  document.getElementById("age-jupiter").innerText = (
    earthAge / orbitalPeriods.jupiter
  ).toFixed(1);
  document.getElementById("age-neptune").innerText = (
    earthAge / orbitalPeriods.neptune
  ).toFixed(1);

  document.getElementById("age-results").style.display = "block";
}
