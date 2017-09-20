class Building_Class{
  constructor(options){
    this.enabled=options.enabled;
    this.name=options.name;
    this.description=options.description;
    this.amount=options.amount;
    this.cost=options.cost;
    this.multiplier=options.multiplier;
    this.capacity=options.capacity;
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
  cap(resource){
    var value=this.capacity[resource]
    return value==undefined ? 0 : value
  };
}

var buildings={};
// name, description, id, enabled, amount, cost, multiplier
buildings={
  b_ss: new Building_Class({
    name:"Simple Shelter",
    description:"TODO b_ss",
    enabled:true,
    amount:1,
    cost:{
      r_fd:10,
      r_st:5
    },
    multiplier:1.2,
    capacity:{
      r_fd:50,
      r_st:10,
      r_wd:5,
      r_pp:2
    }
  }),
  b_ht: new Building_Class({
    name:"Sturdy Hut",
    description:"TODO b_ht",
    enabled:false,
    amount:0,
    cost:{
      r_wd:50,
      r_st:50
    },
    multiplier:1.2,
    capacity:{
      r_fd:100,
      r_st:25,
      r_wd:20,
      r_pp:5
    }
  })
};
