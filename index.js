let hoje = moment().format('YYYY-MM-DD')
let cincoDiasAtras = moment().subtract(5, 'days').format('YYYY-MM-DD');
console.log(moment().format('YYYY-MM-DD'))

let primeiraMoeda = "USD"
let segundaMoeda = "BRL"

let valores = document.querySelectorAll(".amount")

let selected1 = document.querySelectorAll(".selected")[0]
let selected2 = document.querySelectorAll(".selected")[1]
let dropdown = document.querySelectorAll("li")

dropdown.forEach((li)=>{
  li.addEventListener("click", (e)=>{
    e.target.parentNode.parentNode.childNodes[1].innerHTML = e.target.innerHTML
    primeiraMoeda = document.querySelectorAll(".selected")[0].innerText
    segundaMoeda = document.querySelectorAll(".selected")[1].innerText
    getMoedasGrafico(primeiraMoeda,segundaMoeda)
  })
})

valores.forEach((el)=>{
    el.addEventListener("change", async (e)=>{
        let inputAlterado = ""
        if(e.target.classList[1] == "valor1"){
            inputAlterado = ".valor2"
        }else{
            inputAlterado = ".valor1"
        }
        
        const response = await fetch(`https://economia.awesomeapi.com.br/last/${selected1.innerText}-${selected2.innerText}`)
        const moedas = await response.json()
        for (var moeda in moedas) {
            moedas.hasOwnProperty(moeda) 
            if(inputAlterado == ".valor2"){
                document.querySelector(inputAlterado).value = (e.target.value * moedas[moeda].ask).toFixed(2)
            }else{
                document.querySelector(inputAlterado).value = (e.target.value / moedas[moeda].ask).toFixed(2)
            }
                

        }


    })
})



async function getMoedasGrafico(primeiraMoeda, segundaMoeda){
    console.log("entrou")
	const response = await fetch(`https://economia.awesomeapi.com.br/json/daily/${primeiraMoeda}-${segundaMoeda}/9`)
    const moedas = await response.json()
    console.log(moedas)


    document.querySelector("#chart").innerHTML = ""


    let options = {
        series: [
          {
            name: "cambio",
            data: [
              {
                x: new Date(moment().format('YYYY-MM-DD')).getTime(),
                y: moedas[1].high,
              },
              {
                x: new Date(moment().subtract(1, 'days').format('YYYY-MM-DD')).getTime(),
                y: moedas[2].high,
              },
              {
                x: new Date(moment().subtract(2, 'days').format('YYYY-MM-DD')).getTime(),
                y: moedas[3].high,
              },
              {
                x: new Date(moment().subtract(3, 'days').format('YYYY-MM-DD')).getTime(),
                y: moedas[4].high,
              },
              {
                x: new Date(moment().subtract(4, 'days').format('YYYY-MM-DD')).getTime(),
                y: moedas[5].high,
              },
              {
                x: new Date(moment().subtract(5, 'days').format('YYYY-MM-DD')).getTime(),
                y: moedas[6].high,
              },
              {
                x: new Date(moment().subtract(6, 'days').format('YYYY-MM-DD')).getTime(),
                y: moedas[7].high,
              },
              {
                x: new Date(moment().subtract(7, 'days').format('YYYY-MM-DD')).getTime(),
                y: moedas[8].high
              },
            ],
          },
        ],
        chart: {
          height: 350,
          type: "area",
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        yaxis: {
          min: moedas[4].high - 0.3,
          tickAmount: 4,
          labels: {
            formatter: (value) => {
              return value.toFixed(1).replace('.', ',')
            },
          },
        },
        xaxis: {
          labels: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
          axisTicks: {
            show: false,
          },
        },
        fill: {
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
          },
        },
        colors: ["#7C3AED"],
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            return `<div class="tooltip">
          <span>${String(series[seriesIndex][dataPointIndex]).replace('.', ',')}</span>
          <span>${new Date(
            w.globals.seriesX[seriesIndex][dataPointIndex]
          ).toLocaleDateString("pt-BR", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}</span>
          </div>`
          },
        },
      }
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    
}

getMoedasGrafico(primeiraMoeda,segundaMoeda)



