var job_update = true;
var building_update = true;
var delta_update=true;
var capacity_update=true;
var resource_update=true;
var research_update=true;

function civ_interval(){
  setInterval(civ_main,50);
}

function civ_main(){
  increment_values()
  if (resource_update){
    update_resources()
    resource_update=false;
  }
  if (job_update){
    update_jobs()
    job_update=false;
  }
  if (building_update){
    update_buildings()
    building_update=false;
  }
  if (research_update){
    update_research()
    research_update=false;
  }
  update_res_values()
}

function increment_values(){
  if(delta_update){
    for (var resource in resources) {
      var delta=0;
      for (var job in jobs){
        delta+=jobs[job].amount*(jobs[job].produces(resource)-jobs[job].consumes(resource))
      }
      resources[resource].delta=delta;
    }
  };
  delta_update=false;
  if(capacity_update){
    for (var resource in resources) {
      var capacity=0;
      for (var building in buildings){
        capacity+=buildings[building].amount*buildings[building].cap(resource)
      }
      resources[resource].capacity=capacity;
    }
  };
  capacity_update=false;
  for(var resource in resources){
    resources[resource].increment()
  }
}

function update_res_values(){
  for (var resource in resources) {
    if (resources[resource].enabled){
      $('#'+resource+'_value').html(resource_amt_format(resources[resource].amount)+'/'+
      resource_amt_format(resources[resource].capacity))
      $('#'+resource+'_delta').html(resource_delta_format(resources[resource].delta))
    }
  }
}

function update_resources(){
  $("#r_table").empty()
  for (var resource in resources) {
    if (resources[resource].enabled){
      var markup='<tr title="'+resources[resource].description+'">\
      <td >'+
      resources[resource].name+'</td><td id="'+resource+'_value">'+
      resource_amt_format(resources[resource].amount)+'/'+
      resource_amt_format(resources[resource].capacity)+'</td><td id="'+resource+'_delta">'+
      resource_delta_format(resources[resource].delta)+'</td></tr>'
      $("#r_table").append(markup)
    }
  };
}

function update_jobs(){
  $("#j_table").empty()
  for (var job in jobs) {
    if (jobs[job].enabled){
      var markup='<tr value="'+job+'" id="'+job+'_desc"><td>\
      <button class="btn buy_job" \
      name="'+job+'" value=1>\
      +1\
      </button></td>\
      <td >'+
      jobs[job].name+
      '</td><td>'+jobs[job].amount+'</td></tr>'
      $("#j_table").append(markup)
    }
  };
  $('.buy_job').on("click",function(){buy_job(this.name)})
  for (var job in jobs){
    $('#'+job+'_desc').on("mouseover",function(){
      innerhtml=jobs[$(this).attr('value')].getDesc()
      $('#DescBox').html(innerhtml)
    });
  }
}

function update_buildings(){
  $("#b_table").empty()
  for (var building in buildings) {
    if (buildings[building].enabled){
      var markup='<tr title="'+buildings[building].description+'"><td>\
      <button class="btn buy_building" \
      name="'+building+'" value=1>\
      +1\
      </button></td>\
      <td>'+
      buildings[building].name+'</td><td>'+
      buildings[building].amount+'</td></tr>'
      $("#b_table").append(markup)
    }
  };
  $('.buy_building').on("click",function(){buy_building(this.name)})
}

function update_research(){
  $("#u_table").empty()
  for (var research in researches) {
    if (researches[research].visible){
      var markup='<tr title="'+researches[research].description+'"><td>\
      <button class="btn buy_research" \
      name="'+research+'" value=1>\
        +\
      </button></td>\
      <td>'+
      researches[research].name+'</td></tr>'
      $("#u_table").append(markup)
    }
  };
  $('.buy_research').on("click",function(){buy_research(this.name)})
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
  delta_update=true;
}

function buy_research(u_id){
  [resources,jobs,buildings,researches]=researches[u_id].buy(resources,jobs,buildings,researches)
  job_update = true;
  building_update = true;
  delta_update=true;
  capacity_update=true;
  resource_update=true;
  research_update=true;
}

function buy_building(b_id){
  resources=buildings[b_id].buy(resources)
  building_update=true;
  capacity_update=true;
}
