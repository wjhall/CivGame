class Resources_Class{
  constructor(options){
    this.enabled=options.enabled;
    this.name=options.name;
    this.description=options.description;
    this.amount=options.amount;
    this.delta=options.delta;
    this.capacity=options.capacity;
  };
  increment(){
    this.amount+=this.delta;
    if (this.amount>this.capacity){
      this.amount=this.capacity;
    }
  }
}

var resources={};
// name, description, id, enabled, ammount, delta
resources={
  r_fd: new Resources_Class({
    name:"Food",
    description:"TODO r_fd",
    enabled:true,
    capacity:0,
    amount:1,
    delta:0
  }),
  r_st: new Resources_Class({
    name:"Stone",
    description:"TODO r_st",
    enabled:true,
    capacity:0,
    amount:1,
    delta:0
  }),
  r_wd: new Resources_Class({
    name:"Wood",
    description:"TODO r_wd",
    enabled:false,
    capacity:0,
    amount:0,
    delta:0
  })
};
