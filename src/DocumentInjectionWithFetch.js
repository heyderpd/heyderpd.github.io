(()=>{
  const appendOrReplaceIfExist = (refId, elm) => {
    const ref = document.getElementById(refId)
    if (ref === null) {
      ref.parentNode.replaceChild(elm, ref)
    } else {
      document.body.appendChild(elm)
    }
  }

  const reCreateScritp = script => {
    const innerHTML = new String(script.innerHTML)
    var elm = document.createElement('script')
    elm.type = 'text/javascript'
    elm.innerHTML = innerHTML
    script.parentNode.replaceChild(elm, script)
  }

  const reCreateIfIsForce = script => script => script.getAttribute('force') !== 'no'
    ? reCreateScritp(script)
    : null

  const DocumentInjectionWithFetch = (url, refId, _promise, hidden) => {
    const isJavascript = /\.js$/.test(refId)
    const { resolve, reject } = _promise
    console.log('try inject url:', url)

    fetch(url) //, {mode: 'no-cors'})
    .then(response => {
      return response.status === 200 || response.type === 'opaque'
        ? response.text()
        : undefined
    })
    .then(response => {
      if (response) {
        let elm
        if (isJavascript) {
          elm = document.createElement('script')
          elm.type = 'text/javascript'
          elm.force = 'no'
        } else {
          elm = document.createElement('div')
        }
        if (hidden) {
          elm.style.display = 'none !important'
        }
        elm.innerHTML = response

        appendOrReplaceIfExist(refId, elm)
      }
      resolvePromise()
    })
    .catch(error => console.error('AjaxDocumentInjection: "cannot load" - ', error))
  }

  const InjectionFromList = (origin, outScritps) => {
    try {
      outScritps
        .map(name => new Promise((resolve, reject) => DocumentInjectionWithFetch(
          `${origin}${name}`,
          name,
          { resolve, reject })))
      Promise
        .all(outScritps)
        .then(() => {
          document
            .scripts
            .map(script => reCreateIfIsForce(script))
          document.onreadystatechange()
        })
    } catch (error) {
      console.error('AjaxDocumentInjection:', error)
    }
  }

  window.DocumentInjectionWithFetch = InjectionFromList
})()