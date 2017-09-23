class Job_Class{
  constructor(options){
    this.enabled=options.enabled
    this.name=options.name;
    this.description=options.description;
    this.amount=options.amount;
    this.cost=options.cost;
    this.multiplier=options.multiplier
    this.produce=options.produce;
    this.consume=options.consume;
  };

  buy(resources){
    for(var resource in this.cost){
      if(resources[resource].amount<this.cost[resource]){
        return resources
      }
    }
    if(resources["r_pp"].amount==resources["r_pp"].capacity){
      return resources
    }
    for(var resource in this.cost){
      resources[resource].amount-=this.cost[resource]
    }
    this.amount+=1;
    resources["r_pp"].amount+=1;
    return resources
  };

  produces(resource){
    var value=this.produce[resource]
    return value==undefined ? 0 : value
  };

  consumes(resource){
    var value=this.consume[resource]
    return value==undefined ? 0 : value
  };
}

var jobs={};
// name, description, id, enabled, amount, cost, multiplier, produce, consume
jobs={
  j_ga: new Job_Class({
    name:"Gatherer",
    description:"TODO j_ga",
    enabled:true,    amount:1,
    cost:{r_fd:10},
    multiplier:1.1,
    produce:{r_fd:1.25,r_st:0.05},
    consume:{r_fd:1.0}
  }),
  j_wd: new Job_Class({
    name:"Wood dude",
    description:"TODO j_wd",
    enabled:false,    amount:0,
    cost:{r_fd:20,r_st:5},
    multiplier:1.1,
    produce:{r_wd:0.5},
    consume:{r_fd:1.0 }
  }),
  j_mi: new Job_Class({
    name:"Mining dude",
    description:"TODO j_mi",
    enabled:false,    amount:0,
    cost:{r_fd:20,r_st:20,r_wd:10},
    multiplier:1.1,
    produce:{r_st:0.5,r_or:0.01},
    consume:{r_fd:1.0 }
  }),
  j_hu: new Job_Class({
    name:"hunt dude",
    description:"TODO j_hu",
    enabled:false,    amount:0,
    cost:{r_fd:20,r_st:20,r_wd:10},
    multiplier:1.1,
    produce:{r_fd:1.25,r_hi:1},
    consume:{r_fd:1.0 }
  })
};
