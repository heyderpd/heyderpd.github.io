(()=>{
  const load = () => setTimeout(
    () => {
      window.DocumentInjectionWithFetch(
        'https://raw.githubusercontent.com/heyderpd/TRexRunner/master/',
        // http://127.0.0.1:8080/,
        ['robot.js', 'index.html'])
    },
    200)

  document.readyState !== 'complete'
    ? document.addEventListener('DOMContentLoaded', load)
    : load()
})()