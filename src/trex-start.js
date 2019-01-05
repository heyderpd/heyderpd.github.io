(()=>{
  const Replacer = ({
    'aquidauana.bundle.js': str => str.replace(',window.aquidauana=u;', ',u.touch=a,window.aquidauana=u;')
  })
  const load = () => setTimeout(
    () => {
      window.DocumentInjectionWithFetch(
        'https://raw.githubusercontent.com/heyderpd/TRexRunner/master/',
        // 'http://127.0.0.1:8080/',
        ['aquidauana.bundle.js', 'robot.js', 'index.html'],
        Replacer)
    },
    200)

  document.readyState !== 'complete'
    ? document.addEventListener('DOMContentLoaded', load)
    : load()
})()