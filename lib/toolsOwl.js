function ToolsOwl(){
}
ToolsOwl.prototype.getRandom = function(min,max){
  var rand = min + Math.random() * (max - min);
  return rand;
};
ToolsOwl.prototype.each = function(obj,callback){
  for(var i in obj){
    callback(i,obj[i]);
  }
};
ToolsOwl.prototype.sortObj = function(obj){
  function compareAge(obj1, obj2) {
    if (obj1.score < obj2.score) return -1;
    if (obj1.score > obj2.score) return 1;
    return 0;
  }
  obj.sort(compareAge);
  return obj;
};
