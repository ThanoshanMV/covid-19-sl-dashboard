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

    document.getElementById('local_new_cases').innerHTML =
      apiData.local_new_cases;

    document.getElementById('local_total_cases').innerHTML =
      apiData.local_total_cases;

    document.getElementById('local_active_cases').innerHTML =
      apiData.local_active_cases;

    document.getElementById('local_deaths').innerHTML = apiData.local_deaths;

    document.getElementById('local_recovered').innerHTML =
      apiData.local_recovered;

    let tableRows = '';
    let lastTableUpdate = '';
    apiData.hospital_data.forEach(item => {
      tableRows += `<tr>
				<td style="text-align:left">${item.hospital.name}</td>
				<td style="text-align:center">${item.treatment_local}</td>
				<td style="text-align:center">${item.treatment_foreign}</td>
				<td style="text-align:center">${item.treatment_total}</td>
               </tr>`;
    });
    document.getElementById('table-body').innerHTML = tableRows;
    document.getElementById('table-last-updated').innerHTML =
      '(Table last updated: ' + apiData.update_date_time + ')';

    /* document.getElementById('local_progress').max =
      sldata.local_total_cases - sldata.local_deaths;
    document.getElementById('local_progress').value = sldata.local_recovered;

    document.getElementById(
      'global_total_cases'
    ).innerHTML = sldata.global_total_cases
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    document.getElementById('global_active_cases').innerHTML = (
      sldata.global_total_cases -
      sldata.global_deaths -
      sldata.global_recovered
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    document.getElementById(
      'global_deaths'
    ).innerHTML = sldata.global_deaths
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    document.getElementById(
      'global_recovered'
    ).innerHTML = sldata.global_recovered
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    document.getElementById('global_progress').max =
      sldata.global_total_cases - sldata.global_deaths;
    document.getElementById('global_progress').value = sldata.global_recovered;*/
  });
