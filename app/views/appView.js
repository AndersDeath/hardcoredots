var AppView = Backbone.View.extend({
  initialize:function(){
    this.calculateData();
    this.build();
    this.konva = new KonvaView({model:this.model});
    this.resize();
    this.bind();
    var self = this;
  },
  calculateData:function(){
    var coef = null;
    var docW = $(window).width();
    var docH = $(window).height();
    coef = docH<docW  ? docH : docW;
    var useragent=navigator.userAgent;
    if(useragent.indexOf("Android")!=-1){
      this.model.set({'cWidth':docW});
      this.model.set({'cHeight':docH});
    } else if (useragent.indexOf("iPhone")!=-1) {
      this.model.set({'cWidth':docW});
      this.model.set({'cHeight':docH});
    } else if (useragent.indexOf("iPad")!=-1) {
      this.model.set({'cWidth':docW});
      this.model.set({'cHeight':docH});
    } else {
      this.model.set({'cWidth':coef/1.5});
      this.model.set({'cHeight':coef/1.3});
    }
  },
  build:function(){
    var self=this;
    var indentLeft = ($(window).width()/2)-(self.width/2);
    var indentTop = ($(window).height()/2)-(self.height/2);
    $('#app').append($('<div/>',{
      'id':'container',
      'css':{
        'width':self.width+'px',
        'height':self.height+'px',
        'top':indentTop+'px',
        'left':indentLeft+'px',
        'position':'absolute',
        'border':'1px solid #746d6d'
      }
    }));
  },
  bind:function(){
    $(window).bind('resize',$.proxy(this.resize,this));
  },
  resize:function(){
    var self = this;
    this.calculateData();
    this.width = this.model.get('cWidth');
    this.height = this.model.get('cHeight');
    $('#app').css({
      'height':$(window).height()+'px',
    });
    var indentLeft = ($(window).width()/2)-(self.width/2);
    var indentTop = ($(window).height()/2)-(self.height/2);
    $('#container').css({
      'top':indentTop+'px',
      'left':indentLeft+'px',
      'width':self.width+'px',
      'height':self.height+'px',
    });
    this.konva.resize();
  }
});
