var KonvaView = Backbone.View.extend({
  toolsOwl:new ToolsOwl(),
  animArr:[],
  animObj:[],
  initialize:function(){
    this.model.getScoreTable();
    this.initStage();
    this.listenModel();
  },
  initStage:function(){
    this.width = this.model.get('cWidth');
    this.height = this.model.get('cHeight');
    this.konvaOwl = new KonvaOwl(this.width,this.height,{'text':{'fontFamily':'Helvetica'}});
    this.cssOwl = new CssOwl(this.width,this.height);
    this.stage = new Konva.Stage({
      container: 'container',
      width: this.width,
      height: this.height,
    });
    this.bgLayer = new Konva.Layer();
    this.initBg();
    this.timerLayer = new Konva.Layer();
    this.indicatorLayer = new Konva.Layer();
    this.animLayer = new Konva.Layer();
    this.circleLayer = new Konva.Layer();
    this.layer = new Konva.Layer();
    if(this.model.get('centerBtn')===true && this.model.get('endGame')===false) {

      if($('#scoreArea').length!==0){
          this.initScoreBoard();
      } else {
        this.initStartArea();

      }

    }
    if(this.model.get('endGame')===true){
      this.initInput();
    }
    if(this.model.get('timerInit')===true) {
       this.initCenterTimer();
       this.initCircles();
       this.initWaveIndicator();
       this.initScoreIndicator();
    }
    this.stage.add(this.bgLayer);
    this.stage.add(this.timerLayer);
    this.stage.add(this.indicatorLayer);
    this.stage.add(this.circleLayer);
    this.stage.add(this.animLayer);
    this.stage.add(this.layer);



  },
  startAreaAnim:function(state){
      var self = this;
      if(state===true){
       for (var i = 0; i < 7; i++) {
           this.animTest();
       }
     } else if (state===false){

          $.each(this.animArr,function(key,value){
             value.stop();
              self.animLayer.clearBeforeDraw();
              self.animLayer.draw();
          });
          $.each(this.animObj,function(key,value){
             value.destroy();
              self.animLayer.clearBeforeDraw();
              self.animLayer.draw();
          });

      }
  },
  circleBoss:function(){
    var self = this;
    this.group1 = this.konvaOwl.Group({
        'cursor':'pointer',
        'click':[function(){
          alert('222');
        },self],
      });
    this.circle1 = this.konvaOwl.Circle({
      'id':1,
      'fill':'rgb(208, 0, 0)',
      'stroke':'#525252',
      'strokeWidth':2 ,
    },
    { 'x':1.55,
      'y':2.2,
      'radius':24
    });
  this.konvaOwl.Image('/app/data/eye.png',{},{
      'x':1.65,
      'y':2.24,
      'width': 12.5,
      'height': 90,
    },function(img){
      self.group1.add(self.circle1);
      self.group1.add(img);
      self.layer.add(self.group1);
      self.layer.draw();
    });
  },
  plusTimeAnim:function(second){
    var self = this;
    this.plusTimer = this.konvaOwl.Text({
      text: '+'+second,
      fontFamily: 'Helvetica',
      fill: '#706f6f',
      align:'left',
      opacity: 1,
    },{
      x:1.55,
      y:2.2,
      height: 16,
      fontSize: 10
    });
    this.layer.add(this.plusTimer);
    var amplitude = 280;
    var period = 30000;
    var  g = 1;
    this.anim = new Konva.Animation(function(frame) {
      g = g -0.03;
      self.plusTimer.setAttr('opacity',g);
      if(g<0){
        this.stop();
        self.plusTimer.destroy();
      }
    }, this.layer);

    this.anim.start();
  },
  animTest:function(){
    var col = 1 + Math.random() * (20 - 1);

      var colors =  this.model.get('colors');
     var hexagon = this.konvaOwl.Circle(
        {
         'fill':colors[parseInt(col)][1],
         'stroke':'black',
         'strokeWidth':1,
        },{
         'x':2,
         'y':2,
         'radius':24,
        }
    );
    this.animLayer.add(hexagon);
    var amplitude = parseInt(this.stage.getHeight()*0.46);
    var period = 30000;
    var centerX = this.stage.getWidth() / 2;
    var centerН = this.stage.getHeight() / 2;
    var rand1 = this.toolsOwl.getRandom(-15,15);
    var rand2 = this.toolsOwl.getRandom(-15,15);
    this.anim = new Konva.Animation(function(frame) {
      var min3 = -15;
      var max3 = 15;
      var rand3 = min3 + Math.random() * (max3 - min3);
        hexagon.setX(amplitude * Math.sin(frame.time * rand1 * Math.PI / period) + centerX);
        hexagon.setY(amplitude * Math.sin(frame.time * rand2 * Math.PI / period) + centerН);
    }, this.animLayer);

    this.anim.start();
    this.animArr.push(this.anim);
    this.animObj.push(hexagon);
  },
  initStartArea:function(){
    this.startAreaAnim(true);
    new StartAreaView({model:this.model});
  },
  initScoreBoard:function(){
          this.startAreaAnim(true);
    new ScoreBoardView({model:this.model});
  },
  initInput:function(){
    var self = this;
    var inputAreaCssObj = this.cssOwl.calcCssObj({'width':1,'height':1,'indentLeft':2,'indentTop':2});
    var spanScoreCssObj = this.cssOwl.calcCssObj({'height':15,'margin':[3.3,0,72,0],'font-size':12});
    var nameInputCssObj = this.cssOwl.calcCssObj({'width':1.335,'height':20,'margin':[32,0,0,13.5],'font-size':23,'padding':[150]});
    var resultSendCssObj = this.cssOwl.calcCssObj({'width': 1.3,'margin':[32,0,32,13.5],'font-size':22,});
    if($('#inputArea').length===0){
      $('body').append($('<div/>',{
        'id':'inputArea',
        'css':inputAreaCssObj,
      }).append($('<span/>',{
        'id':'spanScore',
        'text':'Score: '+self.model.get('score'),
        'css':spanScoreCssObj,
      })).append($('<input/>',{
        'id':'nameInput',
        'value':'',
        'placeholder':'Enter your name',
        'css':nameInputCssObj,
      })).append($('<input/>',{
        'id':'resultSend',
        'type':'button',
        'value':'Send result',
        'css':resultSendCssObj,
        'click':function(){
          var name = $('#nameInput').val();
          var score = self.model.get('score');
          var k = self.model.checkScoreStatus(score);
          var enterNameStat = self.model.setScoreTable([name,score]);
          self.model.resetData();
          self.model.set({'endGame':false,'score':0});
          $('#inputArea').remove();
          self.initScoreBoard();
          self.layer.draw();
            AndroidFullScreen.immersiveMode();
        },
      })));
    } else {
      $('#inputArea').css(inputAreaCssObj);
      $('#nameInput').css(nameInputCssObj);
      $('#resultSend').css(resultSendCssObj);
      $('#spanScore').css(spanScoreCssObj);
    }
  },
  initBg:function(){
    this.bg = new Konva.Rect({
        width: this.width,
        height:  this.height,
        fill: '#cbcbcb',
      });
    this.bgLayer.add(this.bg);
    var coef = 25;
    var coefW =  this.width/coef;
    for (var i = 1; i <= 50; i++) {
      var lineW = new Konva.Line({
          points: [ coefW*i, 0,  coefW*i, this.height],
          stroke: 'rgb(191, 191, 191)',
          strokeWidth: 1,
      });
      this.bgLayer.add(lineW);
    }
    for (var j = 1; j <= 50; j++) {
      var lineH = new Konva.Line({
        points:[ 0,coefW*j,this.width,coefW*j],
        stroke: 'rgb(191, 191, 191)',
        strokeWidth: 1,
      });
      this.bgLayer.add(lineH);
    }
  },
  initCenterTimer:function(){
    var self = this;
    this.timer = this.konvaOwl.Text({
      text: self.model.get('second'),
      fontFamily: 'Helvetica',
      fill: '#525252',
      align:'center',
    },{
      x:2,
      y:2,
      offsetX:2.5,
      offsetY:9,
      width: 1.2,
      height: 16,
      fontSize: 4
    });

    this.timerLayer.add(this.timer);
    this.timerLayer.draw();

  },
  initCircles:function(){
    var self = this;
    var coef = this.height/24;
    var data = [];
    this.circleArr = [];
   if(this.model.get('circleData')===false){
     var superCol = this.model.get('superCol');
     var superColRandMin = this.model.get('superColRandMin');
     var superColRandMax = this.model.get('superColRandMax');
     var wave = this.model.get('wave');
     if(wave%3===0){
       superCol++;
       this.model.set('superCol',superCol);
     }
     if(wave%4===0){
       if(superColRandMin<2){
         superColRandMin++;
         this.model.set('superColRandMin',superColRandMin);
       }
     }
     if(wave%10===0){
       if(superColRandMax<=10){
         superColRandMax++;
         this.model.set('superColRandMax',superColRandMax);
       }
     }
      for (var i = 0; i < this.model.get('circleCol'); i++) {
        var clicks =null;
        var rand1 = this.toolsOwl.getRandom(0,this.model.get('cWidth')/coef-2);
        var rand2 = this.toolsOwl.getRandom(0,this.model.get('cHeight')/coef-2);
        var x = coef+coef*rand1;
        var y = coef+coef*rand2;
        if(superCol>0){
          clicks = parseInt(this.toolsOwl.getRandom(superColRandMin,superColRandMax));
          superCol--;
        } else {
          clicks =1;
        }

        this.group = this.konvaOwl.Group({
            'cursor':'pointer',
            'click':[self.superCircleKill,self],
          });
        this.circle = this.konvaOwl.Circle({
          'id':i,
          'x':x,
          'y':y,
          'fill':this.model.getCircleColor(),
          'stroke':'#525252',
          'strokeWidth':1,
        },
        {
          'radius':24
        });
        this.wave = this.konvaOwl.Text({
            'text':  clicks==1?"":clicks,
            'clicks':clicks,
            'fill': '#ffffff',
            'align':'right',
            'fontFamily': 'Helvetica',
            'x':x,
            'y':y,
        },{
          fontSize:20,
          offsetX:70,
          offsetY:50,
        });
        this.group.add(this.circle);
        this.group.add(this.wave);
        this.circleLayer.add(this.group);
        data.push([i,rand1,rand2,clicks]);
        this.model.set({'circleData':data});
        this.circleArr.push(this.group);
      }
      this.circleLayer.draw();

   } else {
      $.each(this.model.get('circleData'),function(key,value){
        var x = coef+coef*value[1];
        var y = coef+coef*value[2];
        self.group = self.konvaOwl.Group({
            'cursor':'pointer',
            'click':[self.superCircleKill,self],
          });
        self.circle = self.konvaOwl.Circle({
          'id':value[0],
          'x':x,
          'y':y,
          'fill':self.model.getCircleColor(),
          'stroke':'#525252',
          'strokeWidth':1,
        },
        {
          'radius':24
        });
        self.wave = self.konvaOwl.Text({
            'text':  value[3] ==1?"":value[3]  ,
            'clicks':value[3],
            'fill': '#ffffff',
            'align':'right',
            'fontFamily': 'Helvetica',
            'x':x,
            'y':y,
        },{
          fontSize:20,
          offsetX:70,
          offsetY:50,
        });
        self.group.add(self.circle);
        self.group.add(self.wave);
        self.circleLayer.add(self.group);
        self.circleArr.push(self.group);
      });
      self.circleLayer.draw();
   }
  },
  initWaveIndicator:function(){
    this.waveI = this.konvaOwl.Text({
        'text': this.model.get('wave')+':W',
        'fill': '#525252',
        'align':'right',
        'fontFamily': 'Helvetica',
    },{
      x:2,
      y:2,
      offsetX:2.8,
      offsetY:2.1,
      width: 1.2,
      height:16,
      fontSize:10,
    });
    this.indicatorLayer.add(this.waveI);
    this.indicatorLayer.draw();
  },
  initScoreIndicator:function(){
    this.scoreI = this.konvaOwl.Text({
        'text': 'S:'+this.model.get('score'),
        'fill': '#525252',
        'align':'left',
        'fontFamily': 'Helvetica',
    },{
      x:2,
      y:2,
      offsetX:2.1,
      offsetY:2.1,
      width: 1.2,
      height:16,
      fontSize:10,
    });
    this.indicatorLayer.add(this.scoreI);
    this.indicatorLayer.draw();
  },
  superCircleKill:function(e,y){
    var clicks = e.children[1].getAttr('clicks');
    var score =  y.model.get('score');
    if(clicks==1){
      var id = e.children[0].attrs.id;
      var data = y.model.get('circleData');
      $.each(data,function(key,value){
          if(value[0]===id && value[0]!==undefined){
            delete data[key];
          }
      });
      data.sort();
      data.pop();
      var circleCol = y.model.get('circleCol');
       circleCol--;

      score+=y.model.get('wave')+y.model.get('second');
      y.model.set({'score':score,'circleData':data,'circleCol':circleCol});
      y.scoreI.setAttr('text','S:'+score);
      y.destroyElement(e);
    } else {
      score+=y.model.get('wave')+y.model.get('second');
      y.scoreI.setAttr('text','S:'+score);
        y.model.set({'score':score});
      e.children[0].setAttrs({'clicks':clicks--});
      if(clicks==1){
        e.children[1].setAttrs({'text':''});
      } else {
        e.children[1].setAttrs({'text':clicks});
      }
      e.children[1].setAttrs({'clicks':clicks});
    }
    y.circleLayer.draw();
    y.indicatorLayer.draw();
  },
  destroyElement:function(element){
    document.body.style.cursor = 'default';
    element.destroy();
  },
  listenModel:function(){
    var self = this;
    this.listenTo(this.model,'change:second',function(){
      var second = self.model.get('second');
      self.timer.setAttr('text',second);
      self.timerLayer.draw();
      if(second===0){
        self.model.set({'centerBtn':true});
      }
    });
    this.listenTo(this.model,'change:centerBtn',function(){
      if(self.model.get('centerBtn')===false) {
        self.initWaveIndicator();
        self.initScoreIndicator();
        self.initCenterTimer();
        self.initCircles();
          self.startAreaAnim(false);
        self.engine(true);
        self.indicatorLayer.draw();
      } else {
        $.each(this.circleArr,function(key,value){
          value.destroy();
        });
        self.timer.destroy();
        self.initInput();
        self.waveI.destroy();
        self.scoreI.destroy();
        self.indicatorLayer.draw();
        self.circleLayer.draw();
        this.circleArr = [];
        self.model.set({'endGame':true});
        self.model.resetData();
        clearInterval(self.interval);
      }
    });
    this.listenTo(this.model,'change:restart',function(){
      $.each(this.circleArr,function(key,value){
        value.destroy();
      });
      self.timer.destroy();
      self.initStartArea();
      self.waveI.destroy();
      self.scoreI.destroy();
      self.indicatorLayer.draw();
      self.circleLayer.draw();
      this.circleArr = [];
      self.model.set({'endGame':true,'score':0,'pause':false,'wave':1});
      self.model.set({'centerBtn':true});
      self.model.set({'timerInit':false});
      self.model.resetData();
      clearInterval(self.interval);
      $('#pauseGameArea').remove();
      $('#inputArea').remove();
    });
    this.listenTo(this.model,'change:circleCol',function(){
      if (self.model.get('circleCol')===0) {
        var wave = self.model.get('wave');
        self.model.set({'circleCol':wave+1});
        wave++;
        self.model.set({'wave':wave});
        self.model.set({'circleData':false});
        var bonus = 0;
        var plus = 5;
        if(wave%10===0) {
          bonus = wave;
        } else if(wave%5===0){
            bonus = 5;
        }
        var second = self.model.get('second');
        second+=plus+bonus;
        self.plusTimeAnim(plus+bonus);
        self.model.set({'second':second});
        var score =  self.model.get('score');
        score+=wave+self.model.get('circleCol');
        self.model.set({'score':score});
        self.initCircles();
        self.waveI.setAttr('text',wave+':W');
        self.scoreI.setAttr('text','S:'+score);
        self.indicatorLayer.draw();
      }
    });
    this.listenTo(this.model,'change:pause',function(){
        if(self.model.get('pause')===true){
          new PauseGameView({model:self.model});
          self.engine(false);
        } else if(self.model.get('pause')===false) {
          self.engine(true);
          $('#pauseGameArea').remove();
        }
    });
  },
  engine:function(status){
    var self = this;
    if(status===true){
      this.interval = setInterval(function(){
        var i  = self.model.get('second');
        i--;
        self.model.set({'second':i});
      },500);
    } else {
      clearInterval(this.interval);
    }
  },
  resize:function(){
    this.initStage();
  },
});
