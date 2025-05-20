(function(){
  const bar = document.createElement('div');
  Object.assign(bar.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '4px',
    width: '0%',
    backgroundColor: '#0D1C40',
    zIndex: '9999',
    transition: 'width 0.3s ease',
  });
  document.body.appendChild(bar);

  let progress = 0;
  const intervalId = setInterval(() => {
    if (progress < 90) {
      progress += Math.random() * 5;
      bar.style.width = progress + '%';
    }
  }, 200);

  window.addEventListener('load', () => {
    progress = 100;
    bar.style.width = '100%';
    clearInterval(intervalId);

    setTimeout(() => {
      bar.style.opacity = '0';
      setTimeout(() => {
        if(bar.parentNode) bar.parentNode.removeChild(bar);
      }, 400);
    }, 400);
  });
})();