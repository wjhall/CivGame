class Research_Class{
  constructor(options){
    this.visible=options.visible
    this.enabled=options.enabled;
    this.name=options.name;
    this.description=options.description;
    this.cost=options.cost;
    this.r_unlock=options.r_unlock
    this.j_unlock=options.j_unlock
    this.b_unlock=options.b_unlock
    this.requires=options.requires

  };

  buy(resources,jobs,buildings,researches){
    for(var res in this.cost){
      if (resources[res].amount<this.cost[res]){
        return [resources,jobs,buildings,researches]
      }
    }
    for(var res in this.cost){
      resources[res].amount-=this.cost[res]
    }
    this.enabled=true;
    this.visible=false;
    for(var each in this.r_unlock){
      resources[this.r_unlock[each]].enabled=true;
    }
    for(var each in this.j_unlock){
      jobs[this.j_unlock[each]].enabled=true;
    }
    for(var each in this.b_unlock){
      buildings[this.b_unlock[each]].enabled=true;
    }
    for(var each in researches){
      var flag=true;
      if(researches[each].visible || researches[each].enabled){
        continue;
      }
      for(var sub in researches[each].requires){
        if(!researches[researches[each].requires[sub]].enabled){
          flag=false;
          break;
        }
      }
      if(flag){
        researches[each].visible=true;
      }
    }
    return [resources,jobs,buildings,researches]
  }
}

var researches={};
researches={
  u_st: new Research_Class({
    visible:true,    enabled:false,
    name:"Stone Tools",
    description:"todo u_st",
    cost:{
      r_fd:100,      r_st:50
    },
    r_unlock:["r_wd"],    j_unlock:["j_wd"],    b_unlock:["b_ht"],
    requires:[]
  }),
  u_fi: new Research_Class({
    visible:false,    enabled:false,
    name:"Fire",
    description:"todo u_fi",
    cost:{
      r_wd:100,      r_st:50
    },
    r_unlock:[],    j_unlock:[],    b_unlock:[],
    requires:['u_st']
  }),
  u_mi: new Research_Class({
    visible:false,    enabled:false,
    name:"Mining",
    description:"todo u_mi",
    cost:{
      r_wd:100,      r_st:50
    },
    r_unlock:["r_or"],    j_unlock:["j_mi"],    b_unlock:[],
    requires:['u_st']
  }),
  u_hu: new Research_Class({
    visible:false,    enabled:false,
    name:"Hunting",
    description:"todo u_hu",
    cost:{
      r_wd:100,      r_st:50
    },
    r_unlock:["r_hi"],    j_unlock:["j_hu"],    b_unlock:[],
    requires:['u_st']
  })
}
