var siteurl = 'http://diaperpin.me.';
var vid = 'pgv3';
var fid = 'goIframe';
var icon_spiner = 'fa-spinner';
var icon_back = 'fa-chevron-left';
var device_version = '';
var device_platform = ''; 

 
var app = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    document.addEventListener("offline", this.onOffline, false);
    document.addEventListener("online", this.online, false);
  },
  onDeviceReady: function() {
    (function($){
      $('.spiner').html('<i class="fa ' + icon_spiner + ' fa-spin"></i>');
    })(jQuery); 
    var miframe = document.getElementById(fid);
    miframe.src = siteurl + "?mob=" + vid; 
    device_version = device.version;
    device_platform = device.platform;   
    
    //alert('device_platform ' + device_platform); 
    //alert('device_version ' + device_version);
    
    if (device_platform == 'iOS' && device_version.charAt(0) == '7') (function($){
      $('.nav').css('margin-top', 25); 
    })(jQuery);      
  },
  onOffline: function() {
    (function($){
      $('.nav').css('display', 'none'); 
      $('.frame').css('display', 'none');
      $('.info_content').html('No network connection');
      $('.info_content').css('display', 'block');
      
    })(jQuery);      
  },
  online: function() {
    (function($){
      $('.nav').css('display', 'block'); 
      $('.frame').css('display', 'block');
      $('.info_content').css('display', 'none');
    })(jQuery);      
  }
};

function go_iframe(href) {
  (function($){
    $('.spiner').html('<i class="fa ' + icon_spiner + ' fa-spin"></i>');
  })(jQuery);  
  var atr_link = href;
	if (strpos('?',atr_link) > 1) {atr_linkk = atr_link + '&mob=' + vid} else {atr_linkk = atr_link + '?mob=' + vid}
	var miframe = document.getElementById(fid);
  miframe.src = siteurl + '/' + atr_linkk; 
  return false;
}  

function go_back() {
  (function($){
    $('.spiner').html('<i class="fa ' + icon_spiner + ' fa-spin"></i>');
  })(jQuery);  
  history.back();
  return false;
}         

function strpos( haystack, needle, offset){
	var i = haystack.indexOf( needle, offset );
	return i >= 0 ? i : false;
}
  
function uploadPH() {
  (function($){
    $('.spiner').html('<i class="fa ' + icon_spiner + ' fa-spin"></i>');
  })(jQuery); 
  navigator.camera.getPicture(uploadPhoto,
    function(message) { alert('Get picture failed: ' + message); },
    { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY, correctOrientation: true}
  );
  return false;
}

function uploadPhoto(imageURI) {
  var options = new FileUploadOptions();
  options.fileKey="file";
  options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
  options.mimeType="image/jpeg";  
  var params = new Object();
  params.value1 = "test";
  params.value2 = "param";
  options.params = params; 
  var ft = new FileTransfer();
  ft.upload(imageURI, encodeURI(siteurl + "/pbmobile/upload?mob=" + vid), uploadPhotowin, uploadPhotofail, options);
}

function uploadPhotowin(r) {
  if (r.response) {
    var miframe = document.getElementById(fid);
    miframe.src = siteurl + "/node/add/pin?mob=" + vid + "&fid=" + r.response; 
  }
}

function uploadPhotofail(error) {
  alert("An error has occurred: " + error.code);
}
 
 
jQuery(document).ready(function($) {
  app.initialize();
  $('#' + fid).load(function(){
    //$(this).contents().find('div.myClass').append("Hallo, Welt!");
    //alert('123');
    $.get( siteurl + "/pbmobile/getuser", function( data ) {
      if (data > 0) {
        $('.nologin').css('display', 'none');
        $('.islogin').css('display', 'table-cell');
      } else {
        $('.islogin').css('display', 'none');
        $('.nologin').css('display', 'table-cell');
      }
      //alert( "Data Loaded: " + data );
    });
    $('.spiner').html('<i class="fa ' + icon_back + '"></i>');
    $(window).scrollTop(0); 
  });
//   $('#' + fid).unload(function(){
//      $('.spiner').html('<i class="fa ' + spiner + ' fa-spin"></i>');
//   });
});
 
