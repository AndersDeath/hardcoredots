var ScoreBoardView = Backbone.View.extend({
  initialize:function(){
    this.width = this.model.get('cWidth');
    this.height = this.model.get('cHeight');
    this.cssOwl = new CssOwl(this.width,this.height);
    this.build();
  },
  build:function(){
    var self = this;
    var scores =this.model.getScoreTable();
    scores.reverse();
    var num = "";
    var name = "";
    var score = "";
    var tbl = $('<table/>',{'cellpadding':'0','cellspacing':'0'});
    for (var i = 0; i < 10; i++) {
      var tr = $('<tr/>');
      if(scores[i]!==undefined){
        num = i+1+'.';
        name = scores[i].name === "" ? "NoName" : scores[i].name;
        score = scores[i].score;
      } else {
        num = i+1+'.';
        name = '';
        score = '';
      }
      tr.append($('<td/>',{'text':num,'css':{
          width:'20%',
        }}));
      tr.append($('<td/>',{'text':name,'css':{
          width:'60%',
        }
      }));
      tr.append($('<td/>',{'text':score,'css':{
          width:'20%',
        }}));
      tbl.append(tr);
    }
    var startAreaCssObj = this.cssOwl.calcCssObj({'width':1,'height':1,'indentTop':2,'indentLeft':2,});
    var logoGameCssObj = this.cssOwl.calcCssObj({'font-size':12,'margin':[8,0,72,0],});
    var scoreBoardCssObj = this.cssOwl.calcCssObj({'width': 1.3,'margin':[0,0,25,14],'font-size':28,'padding':[50, 0, 400, 0],});
    var btnStartCssObj = this.cssOwl.calcCssObj({'height':15,'width': 4,'margin':[32,0,72,5.5],'font-size':18,'border-radius':72,});

    var buttonsAreaCssObj = this.cssOwl.calcCssObj({'width': 1.3,'margin':[32,0,72,13.5],'font-size':22,});
    var btnCssObj = this.cssOwl.calcCssObj({'margin':[0,0,140,0],'padding':[250,0,250,0],});


    if($('#scoreArea').length===0){
      var startArea = $('<div/>',{'id':'scoreArea','css':startAreaCssObj,});
      var logoGame = $('<div/>',{'id':'scoreBoardTitle','text':'Scores','css':logoGameCssObj});
      var scoreBoard = $('<div/>',{'id':'scoreBoard','css':scoreBoardCssObj});

      var buttonsArea = $('<div/>',{'id':'buttonsArea','css':buttonsAreaCssObj});
      var btnStartN = $('<div/>',{
        'text':'Back',
        'class':'btn',
        'css':btnCssObj,
        'click':function(){
            $('#scoreArea').remove();
            new StartAreaView({model:self.model});
        },
      });
      buttonsArea.append(btnStartN);

      scoreBoard.append(tbl);
      startArea.append(logoGame);
      startArea.append(scoreBoard);
      startArea.append(buttonsArea);
      $('body').append(startArea);
    } else {
      $('#scoreArea').css(startAreaCssObj);
      $('#scoreBoardTitle').css(logoGameCssObj);
      $('#scoreBoard').css(scoreBoardCssObj);
      $('#buttonsArea').css(buttonsAreaCssObj);
      $('#btnStart').css(btnStartCssObj);
    }
  },
});
