function KonvaOwl(width,height,defaultSettings) {
  if(width===undefined || height === undefined){
    console.log('KonvaOwl: not init width or height');
    return false;
  }
  this.settings = defaultSettings===undefined ? {} : defaultSettings; //необходимо реализовать, это заготовка
  this.width = width;
  this.height = height;
}
KonvaOwl.prototype.Circle = function(objStatic,objZoom){
  return this.createElement('Circle',objStatic,objZoom);
};
KonvaOwl.prototype.Text = function(objStatic,objZoom){
  return this.createElement('Text',objStatic,objZoom);
};
KonvaOwl.prototype.Group = function(objStatic,objZoom){
  return this.createElement('Group',objStatic,objZoom);
};
KonvaOwl.prototype.Image = function(src,objStatic,objZoom,callback){
  var self = this;
  var imageObj = new Image();
  objStatic.image = imageObj;
  imageObj.onload = function() {
    //  new Konva.Image(objStatic);
    var img =self.createElement('Image',objStatic,objZoom);
    callback(img);

  };
  imageObj.src = src;

};
KonvaOwl.prototype.createElement = function(element,objStatic,objZoom){
  var self = this;
  var specificStyle = {};
  var obj = {};
  if (objZoom===undefined) { objZoom = {}; }
  this.each(objZoom,function(key,value){
    switch (key) {
      case 'x': obj.x = self.width/value; break;
      case 'y': obj.y = self.height/value; break;
      case 'radius': obj.radius = self.height/value; break;
      case 'offsetX': obj.offsetX = self.width/value; break;
      case 'offsetY': obj.offsetY = self.height/value;  break;
      case 'width': obj.width = self.width/value; break;
      case 'height':  obj.height = self.height/value; break;
      case 'fontSize':  obj.fontSize = self.width/value; break;
    }
  });
  this.each(objStatic,function(key,value){
    switch (key) {
      case 'cursor':
        specificStyle.cursor = 'pointer';
        delete objStatic[key];
      break;
      case 'click':
        specificStyle.click = value;
        delete objStatic[key];
      break;
    }
  });
  $.extend(obj, objStatic);
  var output = new Konva[element](obj);
  this.each(specificStyle,function(key,value){
    switch (key) {
      case 'cursor': self.stylingCursor(output,value); break;
      case 'click': self.addClick(output,value[0],value[1]); break;
    }
  });
  return output;
};
KonvaOwl.prototype.stylingCursor = function(element,type){
  element.on('mouseover', function() {
      document.body.style.cursor = type;
  });
  element.on('mouseout', function() {
      document.body.style.cursor = 'default';
  });
};
KonvaOwl.prototype.addClick = function(element,callback,context){
  element.on('mousedown touchstart', function() {
        callback(element,context);
      });
};
KonvaOwl.prototype.each = function(obj,callback){
  for(var i in obj){
    callback(i,obj[i]);
  }
};
