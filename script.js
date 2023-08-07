const input = document.querySelector("input");
const btn = document.getElementById("submit");
const section = document.querySelectorAll("section > div");
const map = L.map("map");
btn.addEventListener("click", () => {
  const addres = input.value;
  new Data(addres).getData();
});

let count = 0;
class Data {
  constructor(ip) {
    this.ip = ip;
  }
  getData() {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_RmnlJn2nyHjFmwVVOZSCrlWmc61jO&ipAddress=${this.ip}`
    )
      .then((e) => {
        if (!e.ok) throw new Error("You misspelled ip");
        return e.json();
      })
      .then((e) => {
        this.lat = e["location"]["lat"];
        this.lng = e["location"]["lng"];
        const elements = [
          e["ip"],
          e["location"]["region"],
          e["location"]["timezone"],
          e["isp"],
        ];
        section.forEach((item, index) => {
          if (item.children[1]) {
            item.removeChild(item.children[1]);
          }
          const p = document.createElement("p");
          p.textContent = elements[index];
          item.appendChild(p);
        });
        this.setMap();
      }).catch(error => {
        alert(error)
      })
  }
  setMap() {
    if (count == 1) {
      map.remove();
    }
    map.setView([this.lat, this.lng], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
      map
    );

    L.marker([this.lat, this.lng], {icon: L.icon({iconUrl:"images/icon-location.svg"})})
      .addTo(map)
      .openPopup();
  }
  count = 1;
}

new Data("192.212.174.101").getData();