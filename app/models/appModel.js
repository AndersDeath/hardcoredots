var AppModel = Backbone.Model.extend({
  toolsOwl:new ToolsOwl(),
  defaults:{
    'lang':'eng',
    'cWidth':800,
    'cHeight':650,
    'centerBtn':true,
    'timerInit':false,
    'second':5,
    'circleCol':1,
    'superCol':0,
    'superColRandMax':3,
    'superColRandMin':2,
    'circleData':false,
    'endGame':false,
    'wave':1,
    'score':0,
    'pause':false,
    'restart':1,
    'colors':[[5,'rgb(129, 37, 17)'],
              [10,'rgb(131, 126, 39)'],
              [15,'rgb(39, 131, 60)'],
              [20,'rgb(39, 104, 131)'],
              [25,'rgb(99, 39, 131)'],
              [30,'rgb(191, 73, 35)'],
              [35,'rgb(0, 107, 14)'],
              [40,'rgb(15, 11, 204)'],
              [45,'rgb(37, 196, 5)'],
              [50,'rgb(131, 126, 39)'],
              [55,'rgb(76, 140, 207)'],
              [60,'rgb(17, 167, 131)'],
              [65,'rgb(131, 72, 39)'],
              [70,'rgb(74, 39, 131)'],
              [75,'rgb(249, 96, 21)'],
              [80,'rgb(11, 117, 88)'],
              [85,'rgb(131, 39, 92)'],
              [90,'rgb(50, 131, 39)'],
              [95,'rgb(193, 141, 42)'],
              [100,'rgb(188, 142, 254)'],
          ]
  },
  initialize:function(){
    var self =this;
    this.checkScoreTbl();
    this.hardwareButtonsBind();
    $(window).bind('keyup',function(e){
      if(e.keyCode===80){

        if (self.get('pause')===false) {
          self.set('pause',true);
        } else {
          self.set('pause',false);
        }
      }
    });
  },
  hardwareButtonsBind:function(){

    var self = this;
    var buttonsCMD = ['backbutton','pause','resume','menubutton'];
    for (var i in buttonsCMD){
      document.addEventListener(buttonsCMD[i], function() {
        if(self.get('centerBtn')==false){
          if (self.get('pause')===false) {
            self.set('pause',true);
          } else {
            self.set('pause',false);
          }

        }
      }, false);
    }
  },
  resetData:function(){
    this.set({'timerInit':false,
              'second':AppModel.prototype.defaults.second,
              'circleCol':1,
              'circleData':false,
              'superColRandMax':3,
              'superColRandMin':2,
              'superCol':0,
              'wave':1
            });
  },
  getCircleColor:function(){
    var colors = this.get('colors');
    for(var i in colors){
      if(this.get('wave')<colors[i][0]){
        return colors[i][1];
      }
    }
  },
  checkScoreTbl:function(){
    var cleanTbl = [];
    var tbl = localStorage.getItem("CKScoreTable");
    if(tbl===null){
      localStorage.setItem("CKScoreTable",JSON.stringify(cleanTbl));
    }
  },
  getScoreTable:function(){
    var tbl = localStorage.getItem("CKScoreTable");
    tbl =  JSON.parse(tbl);
    return tbl;
  },
  checkScoreStatus:function(score){
    var obj = this.getScoreTable();
    if(obj.length>9){
      if(score>obj[9].score){
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  },
  setScoreTable:function(data){
    var obj = this.getScoreTable();
    if(obj.length>9){
      console.log('sss');
    }
    obj.push({
      'name':data[0],
      'score':data[1],
    });
    obj = this.toolsOwl.sortObj(obj);
    localStorage.setItem("CKScoreTable",JSON.stringify(obj));
  },
});
