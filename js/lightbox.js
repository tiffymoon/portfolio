/* Click to enlarge: opens screenshots and project images in a full-screen overlay. */
(function () {
  var SELECTOR = '.cs-content img, .design-carousel img, .cs-img-block img, .img-grid-item img, .project-img-full img, .project-img-side img, .project-img-constrained img';
  var images = document.querySelectorAll(SELECTOR);
  if (!images.length) return;

  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Enlarged image');

  var big = document.createElement('img');
  var closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close enlarged image');
  closeBtn.innerHTML = '&times;';

  overlay.appendChild(big);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  var lastFocus = null;

  function open(img) {
    lastFocus = img;
    big.src = img.currentSrc || img.src;
    big.alt = img.alt || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  overlay.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); }
  });

  Array.prototype.forEach.call(images, function (img) {
    img.classList.add('zoomable');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Enlarge image' + (img.alt ? ': ' + img.alt : ''));
    img.addEventListener('click', function () { open(img); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
    });
  });
})();
