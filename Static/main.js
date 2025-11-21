// Minimal JS to populate documents and officers and handle simple routing + palette switching
(function(){
  const data = {
    resolutions: [
      {id: 'R-2025-001', title: 'Adoption of Campus Health Protocols', date: '2025-03-10', file: 'files/sample.pdf'},
      {id: 'R-2025-002', title: 'Funding for Student Outreach', date: '2025-05-02', file: '#'}
    ],
    activityProposals: [
      {id: 'A-2025-001', title: 'Orientation Week Program', date: '2025-07-10', file: '#'}
    ],
    projectProposals: [
      {id: 'P-2025-001', title: 'Campus Garden Project', date: '2025-04-01', file: '#'}
    ],
    minutes: [
      {id: 'M-2025-01', title: 'Regular Meeting — March', date: '2025-03-15', file: '#'}
    ],
    officers: {
      executives: [
        {name: 'Nathaniel R. Gil', role: 'President'},
        {name: 'Ken B. Lentejas', role: 'Vice President for Internal Affairs'},
        {name: 'John Jefferson M. De Leon', role: 'Vice President for External Affairs'},
        {name: 'Daniel D. Camacláng', role: 'Secretary General'},
        {name: 'Samantha Natalie Fattalo', role: 'Treasurer'},
        {name: 'Cristina V. Domingo', role: 'Auditor'},
        {name: 'Kenn Harvey F. Brocoy', role: 'Public Relations Officer'}
      ],
      boardMembers: [
        {name: 'Name', role: 'SAP IT'},
        {name: 'Name', role: 'SAP EDUC'},
        {name: 'Name', role: 'SAP ENTREP'},
        {name: 'Name', role: 'SAP HM'},
        {name: 'Name', role: 'SAP CS'},
        {name: 'Name', role: 'SAP PSYCH'},
        {name: 'Name', role: 'SAP OFAD'},
        {name: 'Name', role: 'SAP BA'}
      ],
      last: [
        {name: 'Liza Perez', role: 'President'},
        {name: 'Ramon Reyes', role: 'Vice President'}
      ]
    }
  };

  function el(id){return document.getElementById(id)}

  function renderList(container, items, type = 'Document', useModal = true){
    if(!container) return;
    container.innerHTML = '';
    items.forEach(it=>{
      const d = document.createElement('div');
      d.className = 'doc';
      d.setAttribute('data-title', (it.title || '').toLowerCase());
      d.setAttribute('data-id', (it.id || '').toLowerCase());
      // anchor
      const a = document.createElement('a');
      a.textContent = it.title || 'Untitled';
      const file = it.file || '#';
      // Always attach a click handler that opens the file in the modal when possible.
      if(!file || file === '#'){
        a.href = 'javascript:void(0)';
        a.classList.add('disabled');
      } else {
        // keep a real href for accessibility, but prevent default navigation and open modal
        a.href = file;
        a.addEventListener('click', (e)=>{
          e.preventDefault();
          try{ openModal(file, {id: it.id, title: it.title, date: it.date, type: type}); }catch(err){
            // fallback: if modal fails, navigate to file
            window.location.href = file;
          }
        });
      }

      d.appendChild(a);
      const small = document.createElement('small');
      small.textContent = `${it.id || ''} • ${it.date || ''}`;
      d.appendChild(small);
      container.appendChild(d);
    });
  }

  // Document search setup: filters .doc elements inside #documents
  function setupDocumentSearch(){
    const input = document.getElementById('documents-search');
    if(!input) return;
    input.addEventListener('input', ()=>{
      const q = (input.value || '').trim().toLowerCase();
      // all docs inside the documents page
      const docs = document.querySelectorAll('#documents .doc');
      let anyVisible = false;
      docs.forEach(d=>{
        const title = d.getAttribute('data-title') || '';
        const id = d.getAttribute('data-id') || '';
        const matches = !q || title.includes(q) || id.includes(q);
        d.style.display = matches ? '' : 'none';
        if(matches) anyVisible = true;
      });
      // (optional) show no-results indicator
      let noEl = document.getElementById('documents-no-results');
      if(!noEl){
        noEl = document.createElement('div');
        noEl.id = 'documents-no-results';
        noEl.style.display = 'none';
        noEl.style.marginTop = '8px';
        noEl.style.color = 'rgba(11,18,32,.6)';
        document.querySelector('#documents .docs-grid').after(noEl);
      }
      noEl.textContent = anyVisible ? '' : 'No documents match your search.';
      noEl.style.display = anyVisible ? 'none' : 'block';
    });
  }

  function renderOfficers(container, list){
    container.innerHTML = '';
    list.forEach(o=>{
      const d = document.createElement('div');
      d.className = 'officer';
      d.innerHTML = `
        <img src="CSG.png" alt="Officer Photo" class="officer-img">
        <div class="officer-info">
          <div class="name">${o.name}</div>
          ${o.role ? `<div class="role">${o.role}</div>` : ''}
        </div>
      `;
      container.appendChild(d);
    });
  }

  function renderLatestUpdates(container, data, limit = 5){
    if(!container) return;
    // aggregate all documents into one list
    const all = []
      .concat(data.resolutions || [])
      .concat(data.projectProposals || [])
      .concat(data.activityProposals || [])
      .concat(data.minutes || []);

    // sort by date desc (dates are YYYY-MM-DD)
    all.sort((a,b)=> (b.date || '').localeCompare(a.date || ''));

    container.innerHTML = '';
    all.slice(0, limit).forEach(it=>{
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = `${it.id} — ${it.title}`;
      const file = it.file || '#';
      // Open files in the in-page modal preview (fallback to iframe if PDF.js not present).
      if(!file || file === '#'){
        a.href = 'javascript:void(0)';
        a.classList.add('disabled');
      } else {
        a.href = 'javascript:void(0)';
        a.addEventListener('click', (e)=>{
          e.preventDefault();
          openModal(file);
        });
      }
      li.appendChild(a);
      container.appendChild(li);
    });
  }

  // open/close modal for file preview
  function openModal(file, meta){
    const modal = document.getElementById('fileModal');
    const viewer = document.getElementById('viewer');
    const loader = document.getElementById('fileModalLoader');
    const error = document.getElementById('fileModalError');
    const canvas = document.getElementById('pdf-canvas');
    const metaBox = document.getElementById('fileModalMeta');
    if(!modal || (!viewer && !canvas)) return;

    // reset UI
    if(loader) loader.style.display = 'flex';
    if(error) error.style.display = 'none';
    if(viewer) viewer.style.display = 'block';
    if(canvas) canvas.style.display = 'none';

    modal.classList.add('show');
    modal.style.display = 'block';

    // render metadata if provided
    if(metaBox){
      if(meta && (meta.title)){
        metaBox.style.display = 'block';
        // Render only the title pill (no subtitle)
        metaBox.innerHTML = `<div class="meta-title">${meta.title || ''}</div>`;
      } else {
        metaBox.style.display = 'none';
        metaBox.innerHTML = '';
      }
    }

    // Always use the iframe/browser viewer inside the modal to show the file.
    // This avoids the "Preparing preview..." canvas placeholder and shows the
    // browser's built-in PDF UI when the file is a PDF.
    viewer.src = file;
    // attach handlers and timeout for iframe preview
    let loaded = false;
    const onLoad = ()=>{
      loaded = true;
      if(loader) loader.style.display = 'none';
      if(error) error.style.display = 'none';
      cleanup();
    };
    const onError = ()=>{
      loaded = false;
      if(loader) loader.style.display = 'none';
      if(error) error.style.display = 'flex';
      cleanup();
    };
    const timeoutId = setTimeout(()=>{
      if(!loaded){
        if(loader) loader.style.display = 'none';
        if(error) error.style.display = 'flex';
      }
    }, 3000);

    function cleanup(){
      viewer.removeEventListener('load', onLoad);
      viewer.removeEventListener('error', onError);
      clearTimeout(timeoutId);
    }

    viewer.addEventListener('load', onLoad);
    viewer.addEventListener('error', onError);
  }

  // PDF rendering state
  let _pdfDoc = null;
  let _renderTask = null;

  function renderPdfToCanvas(url, canvas, loader, error){
    if(!canvas) return;
    // configure worker (use same CDN as the library)
    try{
      if(!(window.pdfjsLib && window.pdfjsLib.getDocument)){
        throw new Error('pdfjsLib not found');
      }
      if(window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions){
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'Static/vendor/pdfjs/pdf.worker.min.js';
      }
    }catch(e){
      console.error('PDF.js not available:', e);
      if(loader) loader.style.display = 'none';
      if(error){ error.style.display = 'flex'; error.textContent = 'Preview unavailable (PDF renderer not loaded).'; }
      return;
    }

    // clear previous
    if(_renderTask){ try{ _renderTask.cancel(); }catch(e){} _renderTask = null; }
    if(_pdfDoc){ try{ _pdfDoc.destroy(); }catch(e){} _pdfDoc = null; }

    // show canvas and hide iframe
    const viewer = document.getElementById('viewer');
    if(viewer) viewer.style.display = 'none';
    canvas.style.display = 'block';

    const ctx = canvas.getContext('2d');
    // load document
    let loadingTask;
    try{
      loadingTask = window.pdfjsLib.getDocument(url);
    }catch(err){
      console.error('getDocument failed:', err);
      if(loader) loader.style.display = 'none';
      if(error){ error.style.display = 'flex'; error.textContent = 'Preview unavailable (failed to load document).'; }
      return;
    }

    loadingTask.promise.then(function(pdf){
      _pdfDoc = pdf;
      // render first page only
      return pdf.getPage(1).then(function(page){
        // measure the modal box width to size the canvas correctly
        const modalBox = document.querySelector('.file-modal__box');
        const containerWidth = (modalBox && modalBox.clientWidth) || 800;

        // compute scale to fit width
        const unscaledViewport = page.getViewport({scale: 1});
        let scale = containerWidth / unscaledViewport.width;
        const outputScale = window.devicePixelRatio || 1;

        // Use a high-res render by multiplying scale with devicePixelRatio
        const renderViewport = page.getViewport({scale: scale * outputScale});

        // Set canvas size to the render viewport (device pixels)
        canvas.width = Math.floor(renderViewport.width);
        canvas.height = Math.floor(renderViewport.height);

        // CSS size should be in CSS pixels (divide by outputScale)
        canvas.style.width = Math.floor(renderViewport.width / outputScale) + 'px';
        canvas.style.height = Math.floor(renderViewport.height / outputScale) + 'px';

        // clear and render
        ctx.clearRect(0,0,canvas.width,canvas.height);
        const renderContext = {
          canvasContext: ctx,
          viewport: renderViewport
        };
        _renderTask = page.render(renderContext);
        return _renderTask.promise.then(function(){
          if(loader) loader.style.display = 'none';
        });
      });
    }).then(()=>{
      // nothing
    }).catch(function(err){
      console.error('PDF render error:', err);
      if(loader) loader.style.display = 'none';
      if(error){ error.style.display = 'flex'; error.textContent = 'Preview unavailable (error rendering PDF).'; }
    });
  }

  function closeModal(){
    const modal = document.getElementById('fileModal');
    const viewer = document.getElementById('viewer');
    if(!modal || !viewer) return;
    viewer.src = '';
    // hide loader and error too
    const loader = document.getElementById('fileModalLoader');
    const error = document.getElementById('fileModalError');
    if(loader) loader.style.display = 'none';
    if(error) error.style.display = 'none';
    // if pdf rendering in progress, cancel and destroy
    if(_renderTask){ try{ _renderTask.cancel(); }catch(e){} _renderTask = null; }
    if(_pdfDoc){ try{ _pdfDoc.destroy(); }catch(e){} _pdfDoc = null; }
    const canvas = document.getElementById('pdf-canvas');
    if(canvas){
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      canvas.style.display = 'none';
    }
    modal.classList.remove('show');
    modal.style.display = 'none';
  }

  // mount
  document.addEventListener('DOMContentLoaded', ()=>{
    renderList(el('resolutions'), data.resolutions);
    renderList(el('activity-proposals'), data.activityProposals);
    renderList(el('project-proposals'), data.projectProposals);
    renderList(el('minutes'), data.minutes);

    renderOfficers(el('executives'), data.officers.executives);
    renderOfficers(el('board-members'), data.officers.boardMembers);
    renderOfficers(el('last-officers'), data.officers.last);

    // populate latest updates with clickable links to files
    renderLatestUpdates(el('latest-updates'), data, 5);



    // simple hash routing
    const navToggle = el('nav-toggle');
    const mainNav = document.querySelector('.sidebar .main-nav');

    function closeMobileNav(){
      if(mainNav){
        mainNav.classList.remove('open');
      }
      if(navToggle){
        navToggle.setAttribute('aria-expanded','false');
      }
    }

    function showRoute(route){
      document.querySelectorAll('.page').forEach(p=>p.hidden=true);
      const elRoute = document.getElementById(route) || document.getElementById('home');
      elRoute.hidden = false;
      document.querySelectorAll('.main-nav a').forEach(a=>a.classList.toggle('active', a.getAttribute('data-route')===route));
      closeMobileNav();
    }

    function showRouteWithLoading(route){
      document.getElementById('loading').style.display = 'flex';
      document.querySelectorAll('.page').forEach(p=>p.hidden=true);
      setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
        const elRoute = document.getElementById(route) || document.getElementById('home');
        elRoute.hidden = false;
        document.querySelectorAll('.main-nav a').forEach(a=>a.classList.toggle('active', a.getAttribute('data-route')===route));
        closeMobileNav();
      }, 1500);
    }

    function handleHash(){
      const r = location.hash.replace('#','') || 'home';
      showRoute(r);
    }

    function handleHashWithLoading(){
      const r = location.hash.replace('#','') || 'home';
      showRouteWithLoading(r);
    }

    if(navToggle){
      navToggle.addEventListener('click', ()=>{
        if(!mainNav) return;
        const opened = mainNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
      });
    }

    // wire modal close buttons and backdrop
    const modalClose = el('fileModalClose');
    const modal = el('fileModal');
    const modalBackdrop = el('fileModalBackdrop');
    if(modalClose) modalClose.addEventListener('click', closeModal);
    if(modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Close mobile nav when clicking/tapping outside
    document.addEventListener('click', (e)=>{
      if(!mainNav || !navToggle) return;
      if(!mainNav.classList.contains('open')) return;
      const target = e.target;
      if(target === navToggle || navToggle.contains(target)) return;
      if(mainNav.contains(target)) return;
      // clicked outside
      closeMobileNav();
    });

    // also close on Escape key
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape') closeMobileNav();
    });

    window.addEventListener('hashchange', handleHashWithLoading);
    handleHash();

    // Hide loading screen immediately for initial load
    const ld = document.getElementById('loading');
    if(ld) ld.style.display = 'none';

    // Initialize About page rotating photo card
    initAboutPhotoCard();
    // Initialize documents search
    setupDocumentSearch();
    // Initialize home hero slider
    initHomeSlider();
  });

  // Rotating photo card implementation
  // Use PNG images in Dashboard-Photos (HEIC removed). Explicit list of PNGs.
  const dashboardPhotos = [
    'Dashboard-Photos/IMG_1195.png',
    'Dashboard-Photos/IMG_1462.png',
    'Dashboard-Photos/IMG_1498.png'
  ];

  function initAboutPhotoCard(){
    const img = document.getElementById('about-photo-img');
    if(!img) return;
    let idx = 0;
    // Preload helper
    function preload(src){
      return new Promise((resolve, reject)=>{
        const i = new Image();
        i.onload = ()=>resolve(src);
        i.onerror = ()=>reject(src);
        i.src = src;
      });
    }

    // Advance to next image with fade transition
    async function nextPhoto(){
      if(!img) return;
      const nextIdx = (idx + 1) % dashboardPhotos.length;
      const nextSrc = dashboardPhotos[nextIdx];
      // try preload (may fail for HEIC on some browsers)
      try{
        await preload(nextSrc);
      }catch(e){
        // fallback: still set src — browser may handle or show fallback
      }
      // fade out
      img.classList.add('fading');
      setTimeout(()=>{
        img.src = nextSrc;
        // ensure visible after image loads; remove fading after brief delay
        img.classList.remove('fading');
      }, 300);
      idx = nextIdx;
    }

    // If user navigates to about, ensure card shows first image
    // Set the initial image to the first available PNG (preload to ensure it's valid)
    (async function start(){
      for(const src of dashboardPhotos){
        try{ await preload(src); img.src = src; break; }catch(e){ /* try next */ }
      }
      // if none preloaded (very unlikely since files exist), accept first as fallback
      if(!img.src && dashboardPhotos.length) img.src = dashboardPhotos[0];
    })();

    // Cycle every 4 seconds
    const intervalId = setInterval(nextPhoto, 4000);
    // Stop cycling if image element removed
    const observer = new MutationObserver(()=>{
      if(!document.getElementById('about-photo-img')){
        clearInterval(intervalId);
        observer.disconnect();
      }
    });
    observer.observe(document.body, {childList:true, subtree:true});
  }

  // Hero slider: cycles images and displays lead + buttons overlay
  function initHomeSlider(){
    const img = document.getElementById('hero-slide-img');
    if(!img) return;
    let idx = 0;
    function preload(src){
      return new Promise((resolve,reject)=>{
        const i = new Image();
        i.onload = ()=>resolve(src);
        i.onerror = ()=>reject(src);
        i.src = src;
      });
    }

    async function showNext(){
      if(!img) return;
      const nextIdx = (idx + 1) % dashboardPhotos.length;
      const nextSrc = dashboardPhotos[nextIdx];
      try{ await preload(nextSrc); }catch(e){}
      img.classList.add('fading');
      setTimeout(()=>{ img.src = nextSrc; img.classList.remove('fading'); }, 300);
      idx = nextIdx;
    }

    // set initial image
    (async function start(){
      for(const s of dashboardPhotos){
        try{ await preload(s); img.src = s; break; }catch(e){}
      }
      if(!img.src && dashboardPhotos.length) img.src = dashboardPhotos[0];
    })();

    const intervalId = setInterval(showNext, 4000);
    // stop if element removed
    const observer = new MutationObserver(()=>{ if(!document.getElementById('hero-slide-img')){ clearInterval(intervalId); observer.disconnect(); }});
    observer.observe(document.body, {childList:true, subtree:true});
  }
})();
