import './style.css';

import storeImg from './images/store.svg'
import containerImg from './images/container.svg'

import * as L from 'leaflet';
import 'leaflet-gesture-handling';

//menu
const paths = {
  "/": "Home",
  "/kufstein/": "Kufstein",
  "/landeck/": "Landeck",
  "/wipptal/": "Wipptal",
  "/imst/": "Imst",
  "/telfs/": "Telfs",
  "/kramsach/": "Kramsach",
};
const menu = document.getElementById("menu");
for (const [key, value] of Object.entries(paths)) {
  // console.log(`${key}: ${value}`);
  let item = document.createElement("a");
  item.setAttribute("href", key);
  item.innerHTML = value;
  menu.append(item);
}
menu.querySelector(`[href="${window.location.pathname}"]`).classList.add("active");

/* --------------------------------- swiper --------------------------------- */

let defaultSliderOptions = {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
};
const ENABLE_TYPES = true;

document.querySelectorAll('.swiper').forEach((swiper) => {
  let slides = swiper.querySelectorAll('.swiper-slide');
  if (slides.length > 1) {
    let slider;
    if (ENABLE_TYPES) {
      switch (true) {
        case swiper.classList.contains('multi-slider'):
          slider = new Swiper(swiper, {
            ...defaultSliderOptions,
            ...{
              loopedSlides: 2,
              spaceBetween: 10,
              breakpoints: {
                768: {
                  spaceBetween: 20
                },
                1024: {
                  spaceBetween: 80
                }
              }
            }
          });
          break;
        default:
          slider = new Swiper(swiper, defaultSliderOptions);
      }
    } else {
      slider = new Swiper(swiper, defaultSliderOptions);
    }
  } else {
    swiper.querySelectorAll('.swiper-button').forEach(button => {
      button.style.display = "none"
    }
    )
  }
});

const isMobile = () => { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) }
const actualViewport = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
actualViewport();
let prevWindowHeight = window.innerHeight;
window.addEventListener("resize", () => {
  if (window.innerHeight !== prevWindowHeight && !isMobile()) {
    actualViewport();
  }
  prevWindowHeight = window.innerHeight;
})

var map = L.map('map', {
    gestureHandling: true,
}).setView([50.4, 30.5], 9);
map.createPane("stores", document.getElementById("#map"));
map.createPane("containers", document.getElementById("#map"));

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);
L.tileLayer('https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=PFmBE0K0sqr37nl5RjoBhS8xFgB4rjvaQarqAcjaKKvCJaqHRXvZoFqV9gYz8K43', {}).addTo(map);
map.attributionControl.addAttribution("<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors")

let storeIcon = L.icon({
  iconUrl: storeImg,
  iconSize: [30,30],
  iconAnchor: [12,24],
});
let containerIcon = L.icon({
  iconUrl: containerImg,
  iconSize: [30,30],
  iconAnchor: [12,24],
});
let stores = [
  {
    latlng: L.latLng(50.1, 30.5),
    options: {
      title: "",
      pane: "stores",
    }
  },
  {
    latlng: L.latLng(50.2, 30.5),
    options: {
      title: "",
      pane: "stores",
    }
  },
  {
    latlng: L.latLng(50.3, 30.5),
    options: {
      title: "",
      pane: "stores",
    }
  },
  {
    latlng: L.latLng(50.4, 30.5),
    options: {
      title: "",
      pane: "stores",
    }
  },
  {
    latlng: L.latLng(50.5, 30.5),
    options: {
      title: "",
      pane: "stores",
    }
  },
  {
    latlng: L.latLng(50.6, 30.5),
    options: {
      title: "",
      pane: "containers",
    }
  },
].forEach(marker => {
  L.marker(marker.latlng, {...marker.options,...{
    icon: marker.options.pane == "stores" ? storeIcon : containerIcon,
  }}).addTo(map);
});
document.querySelectorAll("#map-filter [data-pane]").forEach(btn => {btn.addEventListener("click", e => {
  switch (btn.dataset.pane) {
    case "stores":
      map.getPane("stores").style.zIndex = 600;
      map.getPane("containers").style.zIndex = 0;
      break;
    case "containers":
      map.getPane("stores").style.zIndex = 0;
      map.getPane("containers").style.zIndex = 600;
      break;
    default:
      map.getPane("stores").style.zIndex = 600;
      map.getPane("containers").style.zIndex = 600;
      break;
  }
});
})