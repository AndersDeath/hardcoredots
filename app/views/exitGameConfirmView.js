var ExitGameConfirmView = Backbone.View.extend({
  initialize:function(){
    this.width = this.model.get('cWidth');
    this.height = this.model.get('cHeight');
    this.cssOwl = new CssOwl(this.width,this.height);
    this.build();
  },
  build:function(){
    var self = this;
    var startAreaCssObj = this.cssOwl.calcCssObj({'width':1,'height':1,'indentTop':2,'indentLeft':2,});
    var logoGameCssObj = this.cssOwl.calcCssObj({'font-size':18,'margin':[4,0,32,0],'height':5});
    var buttonsAreaCssObj = this.cssOwl.calcCssObj({'width': 1.3,'margin':[32,0,32,13.5],'font-size':22,});
    var btnStartCssObj = this.cssOwl.calcCssObj({'height':15,'width': 1,'margin':[32,0,32,13.5],'font-size':18,'border-radius':72,});
    var btnCssObj = this.cssOwl.calcCssObj({'margin':[0,0,140,0],'padding':[250,0,250,0],});
    if($('#exitGameConfirm').length===0){
      var startArea = $('<div/>',{'id':'exitGameConfirm', 'class':'logoMain','css':startAreaCssObj,});
      var logoGame = $('<div/>',{'id':'logoGame','css':logoGameCssObj});
      var buttonsArea = $('<div/>',{'id':'buttonsArea','css':buttonsAreaCssObj});

      var btnScores = $('<div/>',{
        'text':'Resume',
        'class':'btn',
        'css':btnCssObj,
        'click':function(){
            $('#exitGameConfirm').remove();
            new StartAreaView({model:self.model});
        },
      });
      var btnScores2 = $('<div/>',{
        'text':'Yes, i want to exit game',
        'class':'btn',
        'css':btnCssObj,
        'click':function(){
             navigator.app.exitApp();
         },
      });
      buttonsArea.append(btnScores);
      buttonsArea.append(btnScores2);
      startArea.append(logoGame);
      startArea.append(buttonsArea);
      $('body').append(startArea);
    } else {
      $('#exitGameConfirm').css(startAreaCssObj);
      $('#logoGame').css(logoGameCssObj);
      $('#buttonsArea').css(buttonsAreaCssObj);
      $('#buttonsArea .btn').css(btnCssObj);
      $('#btnStart').css(btnStartCssObj);
    }
  },
});
