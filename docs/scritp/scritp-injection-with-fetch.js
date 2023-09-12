/* https://github.com/heyderpd/scritp-injection-with-fetch */
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

  const reCreateIfIsForce = script => script.getAttribute('force') !== 'no'
    ? reCreateScritp(script)
    : null

  const DocumentInjectionWithFetch = (url, refId, _promise, hidden, Replacer) => {
    const isJavascript = /\.js$/.test(refId)
    const { resolve, reject } = _promise
    console.info('try inject url:', url)

    fetch(url)
    .then(response => {
      return response.status === 200 || response.type === 'opaque'
        ? response.text()
        : undefined
    })
    .then(response => {
      const replace = Replacer[refId]
      return replace ? replace(response) : response
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
      resolve()
    })
    .catch(error => {
      console.error('AjaxDocumentInjection: "cannot load" - ', error)
      reject()
    })
  }

  const InjectionFromList = async (origin, outScritps, Replacer) => {
    try {
      for (const fileName of outScritps) {
        await new Promise((resolve, reject) => DocumentInjectionWithFetch(
          `${origin}${fileName}`,
          fileName,
          { resolve, reject },
          false,
          Replacer,
        ))
      }
      setTimeout(() => {
        Array
          .from(document.scripts)
          .map(script => reCreateIfIsForce(script))
      }, 1000)
    } catch (error) {
      console.error('AjaxDocumentInjection:', error)
    }
  }

  const load = () => setTimeout(
    () => window.DocumentInjectionWithFetch = InjectionFromList,
    100)

  document.readyState !== 'complete'
    ? document.addEventListener('DOMContentLoaded', load)
    : load()
})()
/* https://github.com/heyderpd/scritp-injection-with-fetch */