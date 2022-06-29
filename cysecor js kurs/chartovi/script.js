// LINE CHART

const lineChart = document.getElementById("lineChart");

const labels2 = [
  "22 Maj",
  "23 Maj",
  "24 Maj",
  "25 Maj",
  "26 Maj",
  "27 Maj",
  "28 Maj",
  "29 Maj",
  "30 Maj",
  "31 Maj",
  "01 Jun",
  "03 Jun",
  "04 Jun",
  "05 Jun",
  "06 Jun",
  "07 Jun",
  "08 Jun",
  "09 Jun",
];

new Chart(lineChart, {
  type: "line",
  data: {
    labels: labels2,
    datasets: [
      {
        label: "Povratni prelgedi",
        data: [
          1844, 1554, 1273, 1284, 1126, 946, 964, 1793, 1432, 1130, 1074, 954,
          856, 833, 1536, 1416, 1248, 1226,
        ],
        borderColor: "rgba(66, 138, 245, 1)",
      },
      {
        label: "Novi pregledi",
        data: [
          1199, 1314, 1147, 1403, 1217, 1015, 1138, 1272, 957, 862, 716, 712,
          610, 585, 847, 744, 756, 781,
        ],
        borderColor: "rgba(235, 134, 52, 1)",
      },
    ],
  },
});

//PIE CHART
const pieChart = document.getElementById("pieChart");

new Chart(pieChart, {
  type: "pie",
  data: {
    labels: ["Serbia", "BiH", "Croatia", "S. Makedonija", "CG", "Ostali"],
    datasets: [
      {
        label: "Drzave",
        data: [49.6, 20.3, 9.5, 3.6, 2.6, 14.4],
        backgroundColor: [
          "rgba(53, 235, 143, 1)",
          "rgba(235, 201, 52, 1)",
          "rgba(52, 153, 235, 1)",
          "rgba(235, 52, 119, 1)",
          "rgba(186, 52, 235, 1)",
          "rgba(52, 153, 170, 1)",
        ],
      },
    ],
  },
});

// BAR CHART
const barChart = document.getElementById("barChart");

new Chart(barChart, {
  type: "bar",
  data: {
    labels: [
      "13 - 17",
      "18 - 24",
      "25 - 34",
      "35 - 44",
      "45 - 54",
      "55 - 64",
      "65+",
    ],
    datasets: [
      {
        label: "Publika po godinama",
        data: [1.7, 43.3, 34.4, 13.6, 5.6, 1.2, 0.3],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(155, 159,64,1)",
        ],
      },
    ],
  },
});

// ZADACA

const zadacaChart = document.querySelector("#zadacaChart");
let xValues = [0, 1, 100, 55, 464, 513];

new Chart(zadacaChart, {
  type: "bubble",
  data: {
    labels: [100, 150, 300, 180, 220, 200, 260],
    datasets: [
      {
        label: "Bull market",
        data: [450, 300, 600, 400, 553, 330, 270],
        borderColor: "blue",
        backgroundColor: "rgba(20,20,255,0.5)",
        height: "50px",
        innerWidth: "50px",
      },
      {
        label: "Bear market",
        data: [20, 55, 44, 31, 170, 220, 300],
        borderColor: "orange",
        backgroundColor: "rgba(220,20,25,0.5)",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bubble Chart",
      },
    },
  },
});

const barChart2 = document.querySelector("#barChart2");
new Chart(barChart2, {
  type: "bar",
  data: {
    labels: [1, 2, 3],
    datasets: [
      {
        label: "Serbia",
        data: [2210, 7830, 2478],
        backgroundColor: "rgba(100,15,150,0.5)",
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      },

      {
        label: "BiH",
        data: [5000, 6000, 7000],
        backgroundColor: "rgba(70,155,15,0.5)",
        borderWidth: 2,
        borderRadius: 50,
        borderSkipped: false,
      },
      {
        label: "Macedonia",
        data: [300, 5000, 6000],
        backgroundColor: "rgba(70,155,255,0.5)",
        borderWidth: 2,
        borderRadius: 30,
        borderSkipped: false,
      },
    ],
  },
  options: {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Neka analitika",
      },
    },
  },
});
