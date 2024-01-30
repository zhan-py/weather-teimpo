<script>
  import { onMount } from 'svelte'
  import moment from 'moment-timezone';

  export let checkoutCity;
  const weather = checkoutCity.weather;

  function getHourlyTemp(obj) {
    let temp = [];
    for (const HourlyData of obj.hourly) {
      temp.push(Math.round(HourlyData.temp));
    }
    console.log("templog", temp.slice(0,24));
    return temp.slice(0,24);
  } 


  const getHour = (timestamp, timezone) => {
    const date = moment.unix(timestamp).tz(timezone);
    const hour = date.hour();
    return hour;
  }


  function lineChart(tempData, hour) {
    Highcharts.chart("lineChartTemp", {
      chart: {
        type: "areaspline",
        height: 300,
      },
      title: {
          text: null,
      },
      legend: {
        enabled: false
      },
      xAxis: {
        tickInterval: 1,
        tickLength: 5,
        labels: {
          formatter: function () {
            if (this.value > 24) {
              return this.value - 24;
            } else {
              return this.value;
            }
          }
        }
      },
      yAxis: {
          title: {
              text: null
          },
          labels: {
            enabled: false,
          },
          gridLineWidth: 0
      },
      tooltip: {
        enabled: false
      },
      credits: {
          enabled: false
      },
      plotOptions: {
          series: {
              pointStart: hour,
              pointInterval: 1,
              dataLabels: {
                enabled: true, 
                format: "{point.y}"
              }
          },
          areaspline: {
              fillOpacity: 0.2
          }
      },
      series: [{ 
          name: "Temperature",
          data: tempData
      }]      
    });
  }


  onMount(async () => {
    lineChart(getHourlyTemp(weather), getHour(weather.current.dt, weather.timezone));
  });

</script>


<section>
  <ul class="nav nav-tabs mt-3">
    <li class="nav-item">
      <p class="nav-link active" aria-current="page">Temperature °C</p>
    </li>
  </ul>

  <div id="lineChartTemp"></div>
  <div class="d-none d-md-block">
    <div class="d-flex justify-content-evenly" id="hourlyWeatherDesc"></div>
  </div>
</section>

