var DocumentInjectionWithFetch = (url, refId, isJavascript, resolvePromise, hidden) => {
  var ref = document.getElementById(refId);
  if (ref === null) {
    ref = document.body.childNodes[0];
  }
  console.log('try inject url:', url);
  fetch(url) //, {mode: 'no-cors'})
  .then(response => {
    return response.status === 200 || response.type === 'opaque'
      ? response.text()
      : undefined;
  })
  .then(response => {
    if (response) {
      var elm;
      if (isJavascript) {
        elm = document.createElement('script');
        elm.type = 'text/javascript';
        elm.force = 'no';
      } else {
        elm = document.createElement('div');
      }
      if (hidden) {
        elm.style.display = 'none !important';
      }
      elm.innerHTML = response;
      ref.parentNode.replaceChild(elm, ref);
    }    
  })
  .then(() => {
    if (typeof(resolvePromise) === 'function') {
      resolvePromise();
    }
  })
  .catch((error) => {
    console.error('AjaxDocumentInjection cannot load.', error);
  });
};
window.DocumentInjectionWithFetch = DocumentInjectionWithFetch;