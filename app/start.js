function loading(){
   var loadingJEl = $('<div/>',{
      'id':'appLoading',
       'css':{
            'width':window.screen.width,
            'height':window.screen.height,
       } 
   });
   $('#app').append(loadingJEl);
    var rand = 1 + Math.random() * (3 - 1);
    var time = parseInt(rand)*1000;
    console.log(time);
    setTimeout(function(){
        $('#app').html('');
        var m = new AppModel(); var v = new AppView({model:m});
    },1500);
}

function onAppReady() {

        AndroidFullScreen.immersiveMode(function(){
            loading();
        });
}
document.addEventListener("app.Ready", onAppReady, false) ;