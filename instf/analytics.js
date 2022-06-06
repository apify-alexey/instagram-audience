var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-205517327-2']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


// 自定义维度，去除自己的流量
chrome.storage.local.get('email', ({email}) => {
  _gaq.push(['_setCustomVar',1,'gaUserId',email,1]);
  _gaq.push(['_trackEvent', 'Custom Variables', 'Set UserId','',0,true]);
})

// 给按钮加监测
function trackButtonClick(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
}
window.addEventListener('load', function () {
// document.addEventListener('DOMContentLoaded', function () {
// 这个elment没加载完，add不上
  var buttons = document.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', trackButtonClick);
  };
  var tabs = document.querySelectorAll('div.el-tabs__item');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', trackButtonClick);
  };
});


// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'UA-205517327-2');
//
// (function() {
//   var ga = document.createElement('script');
//   ga.type = 'text/javascript';
//   ga.async = true;
//   ga.src = 'https://www.googletagmanager.com/gtag/js?id=UA-205517327-2';
//   var s = document.getElementsByTagName('script')[0];
//   s.parentNode.insertBefore(ga, s);
// })();

// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'G-QE67ZC3ESQ');
//
// (function() {
//   var ga = document.createElement('script');
//   ga.type = 'text/javascript';
//   ga.async = true;
//   ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-QE67ZC3ESQ';
//   var s = document.getElementsByTagName('script')[0];
//   s.parentNode.insertBefore(ga, s);
// })();
