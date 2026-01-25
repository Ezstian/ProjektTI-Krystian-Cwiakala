document.addEventListener("DOMContentLoaded", () => {
  /* Pobieranie elementów DOM */
  const header = document.querySelector(".main-header");
  const planetSphere = document.getElementById("planet3d");
  const nameLabel = document.getElementById("planet-name");
  const detailsLabel = document.getElementById("planet-details");
  const infoOverlay = document.querySelector(".planet-info-overlay");
  const viewerSection = document.querySelector(".planet-viewer");

  /* Dane planet*/
  const planetsData = [
    {
      name: "Merkury",
      details: "Dystans: 58 mln km | Typ: Skalista",
      cssClass: "mercury",
    },
    {
      name: "Wenus",
      details: "Dystans: 108 mln km | Typ: Skalista",
      cssClass: "venus",
    },
    {
      name: "Ziemia",
      details: "Dystans: 150 mln km | Status: Zamieszkana",
      cssClass: "earth",
    },
    {
      name: "Mars",
      details: "Dystans: 228 mln km | Typ: Skalista",
      cssClass: "mars",
    },
    {
      name: "Jowisz",
      details: "Dystans: 778 mln km | Typ: Gazowy gigant",
      cssClass: "jupiter",
    },
    {
      name: "Saturn",
      details: "Dystans: 1.4 mld km | Typ: Gazowy gigant",
      cssClass: "saturn",
    },
    {
      name: "Uran",
      details: "Dystans: 2.9 mld km | Typ: Lodowy gigant",
      cssClass: "uranus",
    },
    {
      name: "Neptun",
      details: "Dystans: 4.5 mld km | Typ: Lodowy gigant",
      cssClass: "neptune",
    },
  ];

  let currentPlanetIndex = -1;

  /* Funkcja aktualizująca interfejs planety (Animacje + Treść) */
  const updatePlanetDisplay = (index) => {
    if (index === currentPlanetIndex || !planetSphere || !infoOverlay) return;

    currentPlanetIndex = index;
    const data = planetsData[index];

    // Efekt przejścia
    infoOverlay.style.opacity = "0";
    infoOverlay.style.transform = "translateY(20px)";

    setTimeout(() => {
      /*Zmiana klasy sfery i tekstów */
      planetSphere.className = `planet-sphere ${data.cssClass}`;
      nameLabel.textContent = data.name;
      detailsLabel.textContent = data.details;

      /*Efekt wejścia */
      infoOverlay.style.opacity = "1";
      infoOverlay.style.transform = "translateY(0)";
    }, 250);
  };

  /* Obsługa scrollowania (Sticky header & Planet viewer)*/
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    /*zmiana headera po scrollowaniu */
    if (header) {
      header.classList.toggle("scrolled", scrollY > 80);
    }

    /* Przewijanie planet (tylko jeśli sekcja istnieje)*/
    if (viewerSection) {
      const sectionTop = viewerSection.offsetTop;
      const sectionHeight = viewerSection.offsetHeight - window.innerHeight;

      let progress = (scrollY - sectionTop) / sectionHeight;
      progress = Math.max(0, Math.min(1, progress)); // Clamp 0-1

      /*Obliczanie indeksu planety na podstawie postępu scrolla */
      const targetIndex = Math.floor(progress * (planetsData.length - 0.01));

      if (
        scrollY >= sectionTop - 100 &&
        scrollY <= sectionTop + viewerSection.offsetHeight
      ) {
        updatePlanetDisplay(targetIndex);
      }
    }
  });
});

/* Sekcja Ciekawostek*/
const TRIVIA_LIST = [
  "Jeden dzień na Wenus trwa dłużej niż jeden rok na tej planecie.",
  "Zachody słońca na Marsie mają niebieskawy odcień.",
  "W Drodze Mlecznej jest więcej gwiazd niż ziaren piasku na Ziemi.",
  "Łyżeczka materii z gwiazdy neutronowej ważyłaby około 6 miliardów ton.",
  "Ślady astronautów na Księżycu zostaną tam na miliony lat przez brak atmosfery.",
  "Jowisz jest tak wielki, że pomieściłby wszystkie inne planety układu dwukrotnie.",
  "Najwyższa góra w Układzie Słonecznym to Olympus Mons na Marsie (21 km wysokości).",
  "Światło ze Słońca leci do Ziemi średnio 8 minut i 20 sekund.",
];

/* Losowanie ciekawostki z zabezpieczeniem przed powtórzeniami*/
function losujCiekawostke() {
  const display = document.getElementById("fact-display");
  if (!display) return;

  const randomIndex = Math.floor(Math.random() * TRIVIA_LIST.length);
  display.textContent = TRIVIA_LIST[randomIndex];
}

/* Sekcja kalkulatora */
function obliczWiek() {
  const input = document.getElementById("earthAge");
  const earthAge = parseFloat(input.value);

  if (isNaN(earthAge) || earthAge <= 0 || earthAge > 120) {
    alert("Proszę podać realny wiek (1-120 lat).");
    input.focus();
    return;
  }

  /* Obiekty mapujące okresy obiegu wokol slonca*/
  const ORBITAL_RATIOS = {
    mercury: 0.24,
    venus: 0.62,
    mars: 1.88,
    jupiter: 11.86,
    neptune: 164.8,
  };

  /* Iteracja po elementach wyników i aktualizacja danych*/
  Object.keys(ORBITAL_RATIOS).forEach((planet) => {
    const resultElement = document.getElementById(`age-${planet}`);
    if (resultElement) {
      const calculatedAge = (earthAge / ORBITAL_RATIOS[planet]).toFixed(1);
      resultElement.textContent = calculatedAge;
    }
  });

  /* Log w konsoli dla potwierdzenia poprawnej operacji*/
  console.log(`Pomyślnie obliczono wiek dla: ${earthAge} lat ziemskich.`);
}
