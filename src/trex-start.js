var outScritps = [ {name: 'robot.js', javascrip:true},
                   {name: 'index.html'} ]
  .map(file => {
    return new Promise(function(resolve, reject){
      DocumentInjectionWithFetch(
        'https://raw.githubusercontent.com/heyderpd/TRexRunner/master/' + file.name,
        // 'http://127.0.0.1:8080/' + file.name,
        file.name,
        file.javascrip,
        resolve)
    });
  });

Promise
  .all(outScritps)
  .then(function() {
    for (var i = 0; i < document.scripts.length; i++) {
      var script = document.scripts[i];
      if (script.getAttribute('force') !== 'no') {
        var innerHTML = new String(script.innerHTML);
        var elm = document.createElement('script');
        elm.type = 'text/javascript';
        elm.innerHTML = innerHTML;
        script.parentNode.replaceChild(elm, script);
      }
    };
    document.onreadystatechange();
  });
