var job_update = true;
var building_update = true;

function civ_interval(){
  //civ_setup();
  setInterval(civ_main,50);
}

function civ_setup(){
  $('.BBuy').on("click",function(){buy_building(this.name)})
}

function civ_main(){
  increment_values()
  update_resources()
  if (job_update){
    update_jobs()
    job_update=false;
  }
  if (building_update){
    update_buildings()
    building_update=false;
  }
}

function increment_values(){
  for (var resource in resources) {
    var delta=0
    for (var job in jobs){
      delta+=jobs[job].amount*(jobs[job].produces(resource)-jobs[job].consumes(resource))
    }
    resources[resource].delta=delta//+=resource_delta[resource]/20;
    resources[resource].amount+=resources[resource].delta/20
  };
}

function update_resources(){
  $("#r_table").empty()
  for (var resource in resources) {
    if (resources[resource].enabled){
      var markup='<tr>\
      <td class=&quot;mdl-data-table__cell--non-numeric&quot;>'+
      resources[resource].name+'</td><td>'+
      resource_amt_format(resources[resource].amount)+'</td><td>'+
      resource_delta_format(resources[resource].delta)+'</td></tr>'
      $("#r_table").append(markup)
    }
  };
}

function update_jobs(){
  $("#j_table").empty()
  for (var job in jobs) {
    if (jobs[job].enabled){
      var markup='<tr><td>\
      <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab buy_job" \
      name="'+job+'" value=1>\
        <i class="material-icons">add</i>\
      </button></td>\
      <td class=&quot;mdl-data-table__cell--non-numeric&quot;>'+
      jobs[job].name+'</td><td>'+
      jobs[job].amount+'</td></tr>'
      $("#j_table").append(markup)
    }
  };
  $('.buy_job').on("click",function(){buy_job(this.name)})
}

function update_buildings(){
  $("#b_table").empty()
  for (var building in buildings) {
    if (buildings[building].enabled){
      var markup='<tr>\
      <td class=&quot;mdl-data-table__cell--non-numeric&quot;>'+
      buildings[building].name+'</td><td>'+
      buildings[building].amount+'</td></tr>'
      $("#b_table").append(markup)
    }
  };
}

function resource_amt_format(resource_value){
  var pow_ten = Math.log(resource_value)/Math.LN10
  if (pow_ten<3){
    return resource_value.toPrecision(3)
  } else if(pow_ten<6) {
    return (resource_value/1E3).toPrecision(3)+'k'
  } else if(pow_ten<9) {
    return (resource_value/1E6).toPrecision(3)+'M'
  } else if(pow_ten<12) {
    return (resource_value/1E9).toPrecision(3)+'B'
  } else {
    return (resource_value/1E12).toPrecision(3)+'T'
  }
}

function resource_delta_format(resource_value){
  var magnitude = resource_amt_format(Math.abs(resource_value));
  if (resource_value>=0){
    return '<font color="green">+'+magnitude+'</font>'
  } else{
    return '<font color="red">-'+magnitude+'</font>'
  }
}

function buy_job(j_id){
  resources=jobs[j_id].buy(resources)
  job_update=true;
}

function buy_research(){

}
