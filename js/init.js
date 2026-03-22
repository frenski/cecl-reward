document.addEventListener("DOMContentLoaded", function() {

  if (LMSVARS.isRtl) {
    document.getElementsByTagName('body')[0].classList.add('rtl');
    document.getElementsByClassName('nav-pages-left')[0].innerHTML = '&gt;';
    document.getElementsByClassName('nav-pages-right')[0].innerHTML = '&lt;';
    // console.log(document.getElementById('tmpl-wrapper').contentWindow.document);
    // document.getElementById('tmpl-wrapper').contentWindow.document.body.classList.add('rtl');
    // console.log(document.getElementById('tmpl-wrapper').contentWindow.document.body);
  }

});
