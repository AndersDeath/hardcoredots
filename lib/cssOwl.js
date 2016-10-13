function CssOwl(width,height){
  if(width===undefined || height === undefined){
    console.log('ZoomCss: not init width or height');
    return false;
  }
  this.width = width;
  this.height = height;
}
CssOwl.prototype.calcCssObj = function(obj){
  var width = this.width;
  var height = this.height;
  var output = {};
  this.each(obj,function(key,value){
    switch (key) {
      case 'width': output.width = width/value; break;
      case 'height': output.height = height/value; break;
      case 'font-size': output['font-size'] = height/value; break;
      case 'border-radius': output['border-radius'] = height/value; break;
      case 'indentTop': output.top = (document.documentElement.clientHeight/2)-(height/value); break;
      case 'indentLeft': output.left = (document.documentElement.clientWidth/2)-(width/value); break;
      case 'margin':
          output.margin = "";
          for(var i in value){
            if(value[i]!==0){
              output.margin+= " "+height/value[i]+'px';
            } else {
              output.margin+=' 0';
            }
          }
      break;
      case 'padding':
          output.padding = "";
          for(var j in value){
            if(value[j]!==0){
              output.padding+= " "+height/value[j]+'px';
            } else {
              output.padding+=' 0';
            }
          }
      break;
    }
  });
  return output;
};
CssOwl.prototype.each = function(obj,callback){
  for(var i in obj){
    callback(i,obj[i]);
  }
};
