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
    for(var resource in this.cost){
      resources[resource].amount-=this.cost[resource]
    }
    this.amount+=1;
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
    description:"TODO",
    enabled:true,
    amount:1,
    cost:{
      r_pl:10
    },
    multiplier:1.1,
    produce:{
      r_pl:1.25,
      r_st:0.05
    },
    consume:{
      r_pl:1.0
    }
  })
};
