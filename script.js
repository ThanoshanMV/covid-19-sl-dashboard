/**
 * Initiating variables related to Sri Lanka
 */
let localTotalCases,
  localActiveCases,
  localDeaths,
  localRecovered,
  localTotalNumberOfIndividualsInHospitals,
  lastUpdate;

/**
 * Initiating variables related to Globe
 */
let globalTotalCases, globalActiveCases, globalDeaths, globalRecovered;

//local,global data. src:HPB
fetch('https://hpb.health.gov.lk/api/get-current-statistical')
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw Error('Sorry, unable to retieve data');
  })
  .then(hpb => {
    const apiData = hpb.data;

    /*document.getElementById('update_date_time').innerHTML =
      sldata.update_date_time;*/

    localTotalCases = apiData.local_total_cases;
    localActiveCases = apiData.local_active_cases;
    localRecovered = apiData.local_recovered;
    localDeaths = apiData.local_deaths;
    lastUpdate = apiData.update_date_time;

    document.getElementById('local_new_cases').innerHTML =
      apiData.local_new_cases;

    document.getElementById('lastUpdate').innerHTML =
      'Last updated on ' + lastUpdate;

    document.getElementById('local_total_cases').innerHTML = localTotalCases;

    document.getElementById('local_active_cases').innerHTML = localActiveCases;

    document.getElementById('local_deaths').innerHTML = localDeaths;

    document.getElementById('local_recovered').innerHTML = localRecovered;

    document.getElementById(
      'local_total_number_of_individuals_in_hospitals'
    ).innerHTML = apiData.local_total_number_of_individuals_in_hospitals;

    let tableRows = '';
    apiData.hospital_data.forEach(item => {
      tableRows += `<tr>
				<td style="text-align:left">${item.hospital.name}</td>
				<td style="text-align:center">${item.treatment_local}</td>
				<td style="text-align:center">${item.treatment_foreign}</td>
				<td style="text-align:center">${item.treatment_total}</td>
               </tr>`;
    });
    document.getElementById('table-body').innerHTML = tableRows;
    /*document.getElementById('table-last-updated').innerHTML =
      '(Table last updated: ' + lastUpdate + ')';*/

    /* document.getElementById('local_progress').max =
      sldata.local_total_cases - sldata.local_deaths;
    document.getElementById('local_progress').value = sldata.local_recovered;*/

    globalTotalCases = apiData.global_total_cases;
    globalActiveCases =
      apiData.global_total_cases -
      (apiData.global_deaths + apiData.global_recovered);
    globalDeaths = apiData.global_deaths;
    globalRecovered = apiData.global_recovered;

    document.getElementById('global_total_cases').innerHTML =
      apiData.global_total_cases;

    document.getElementById('global_active_cases').innerHTML =
      apiData.global_total_cases -
      (apiData.global_deaths + apiData.global_recovered);

    document.getElementById('global_deaths').innerHTML = apiData.global_deaths;

    document.getElementById('global_recovered').innerHTML =
      apiData.global_recovered;

    /*document.getElementById('global_progress').max =
      sldata.global_total_cases - sldata.global_deaths;
    document.getElementById('global_progress').value = sldata.global_recovered;*/
  });

/**
 * Sri Lanka and Global Pie charts
 */
// Load google charts
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  const dataSL = google.visualization.arrayToDataTable([
    ['Category', 'Count'],
    ['Total', localTotalCases],
    ['Active', localActiveCases],
    ['Deaths', localDeaths],
    ['Recovered', localRecovered]
  ]);
  const dataGlobal = google.visualization.arrayToDataTable([
    ['Category', 'Count'],
    ['Total', globalTotalCases],
    ['Active', globalActiveCases],
    ['Deaths', globalDeaths],
    ['Recovered', globalRecovered]
  ]);
  // Optional; add a title and set the width and height of the chart
  let optionsSL = {
    title: '% of COVID-19 persons affected in Sri Lanka level',
    height: 400
  };
  let optionsGlobal = {
    title: '% of COVID-19 persons affected in global level',
    height: 400
  };

  // Display the chart inside the <div> element with id="piechart"
  let chartSL = new google.visualization.PieChart(
    document.getElementById('charts-pie-sl')
  );
  let chartGlobal = new google.visualization.PieChart(
    document.getElementById('charts-pie-global')
  );
  chartSL.draw(dataSL, optionsSL);
  chartGlobal.draw(dataGlobal, optionsGlobal);
}
