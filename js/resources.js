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
  r_pp: new Resources_Class({
    name:"Population",
    description:"TODO r_pp",
    enabled:true,    capacity:0,    amount:1,    delta:0
  }),
  r_fd: new Resources_Class({
    name:"Food",
    description:"TODO r_fd",
    enabled:true,    capacity:0,    amount:1,    delta:0
  }),
  r_st: new Resources_Class({
    name:"Stone",
    description:"TODO r_st",
    enabled:true,    capacity:0,    amount:1,    delta:0
  }),
  r_wd: new Resources_Class({
    name:"Wood",
    description:"TODO r_wd",
    enabled:false,    capacity:0,    amount:0,    delta:0
  }),
  r_or: new Resources_Class({
    name:"Strange Rock",
    description:"TODO r_or",
    enabled:false,    capacity:0,    amount:0,    delta:0
  }),
  r_hi: new Resources_Class({
    name:"Hide",
    description:"TODO r_hi",
    enabled:false,    capacity:0,    amount:0,    delta:0
  }),
  r_cl: new Resources_Class({
    name:"Clothing",
    description:"TODO r_cl",
    enabled:false,    capacity:0,    amount:0,    delta:0
  }),
  r_me: new Resources_Class({
    name:"Metal",
    description:"TODO r_me",
    enabled:false,    capacity:0,    amount:0,    delta:0
  })
};
