// Minimal JS to populate documents and officers and handle simple routing + palette switching
(function(){
  const data = {
    resolutions: [
      {id: 'RESO 1', title: 'TEMPORARY ASSUMPTION OF FINANCIAL RESPONSIBILITIES', date: '', file: 'files/Resolution/RESO 1 - TEMPORARY ASSUMPTION OF FINANCIAL RESPONSIBILITIES.pdf'},
      {id: 'RESO 2', title: 'BUDGET ALLOCATION FOR SLTP', date: '', file: 'files/Resolution/RESO 2 - BUDGET ALLOCATION FOR SLTP.pdf'},
      {id: 'RESO 3', title: 'DISCOUNT PAYMENT FOR SLTP SHIRT', date: '', file: 'files/Resolution/RESO 3 - DISCOUNT PAYMENT FOR SLTP SHIRT.pdf'},
      {id: 'RESO 4', title: 'INSTITUTIONALIZE OF UNIFORM DONATION', date: '', file: 'files/Resolution/RESO 4 - INSTITUTIONALIZE OF UNIFORM DONATION.pdf'},
      {id: 'RESO 5', title: 'SELECTING OF NEW CSG ADVISER', date: '', file: 'files/Resolution/RESO 5 - SELECTING OF NEW CSG ADVISER.pdf'},
      {id: 'RESO 6', title: 'APPOINTING OF TREASURER GENERAL AND SAP BA AND SAPOFAD', date: '', file: 'files/Resolution/RESO 6 - APPOINTING OF TREASURER GENERAL AND SAP BA AND SAPOFAD.pdf'},
      {id: 'RESO 7', title: 'ADJUSTING DATES FOR SLTP', date: '', file: 'files/Resolution/RESO 7 - ADJUSTING DATES FOR SLTP.pdf'},
      {id: 'RESO 8', title: 'ALLOCATING BUDGET FOR PANDE-KAPE', date: '', file: 'files/Resolution/RESO 8 - ALLOCATING BUDGET FOR PANDE-KAPE.pdf'},
      {id: 'RESO 9', title: 'SELECTING NEW CSG ADVISER', date: '', file: 'files/Resolution/RESO 9 - SELECTING NEW CSG ADVISER.pdf'},
      {id: 'RESO 10', title: 'OPENING OF COA TO ALL EXECUTIVES WITH GUIDELINES', date: '', file: 'files/Resolution/RESO 10 - OPENING OF COA TO ALL EXECUTIVES WITH GUIDELINES.pdf'}
    ],
    activityProposals: [
      {id: 'OFFICE MEMO 1', title: '3RD GENERAL MEETING (OFFICE MEMO)', date: '', file: 'files/Office Memorandum/OFFICE MEMO 1 - 3RD GENERAL MEETING.pdf'}
    ],
    projectProposals: [
      {id: 'PP - Panamitang-Bayani', title: 'Panamitang-Bayani', date: '', file: 'files/Project Proposal/Project Proposal - Panamitang-Bayani.pdf'},
      {id: 'PP - Pande Kape Ni Kabsuy 1', title: 'Pande Kape Ni Kabsuy 1', date: '', file: 'files/Project Proposal/Project Proposal - Pande Kape Ni Kabsuy 1.pdf'},
      {id: 'PP - SLTP Shirt', title: 'SLTP Shirt', date: '', file: 'files/Project Proposal/Project Proposal - SLTP Shirt.pdf'},
      {id: 'PP - SLTP', title: 'SLTP', date: '', file: 'files/Project Proposal/Project Proposal - SLTP.pdf'}
    ],
    minutes: [
      {id: 'MINUTES - OCT 16 2023', title: 'OCT 16 2023 - 1 PM', date: '2023-10-16', file: 'files/Minutes of the Meeting/OCT 16 2023 - 1 PM.pdf'}
    ],
    officers: {
      executives: [
        {name: 'Zoe R. Gil', role: 'President', photo: 'officer-photos/pres.png', facebook: 'https://www.facebook.com/share/1BaEa8GUoE/'},
        {name: 'Ken B. Lentejas', role: 'Vice President for Internal Affairs', photo: 'officer-photos/vpi.png', facebook: 'https://www.facebook.com/keyihen.el'},
        {name: 'John Jefferson M. De Leon', role: 'Vice President for External Affairs', photo: 'officer-photos/vpe.png', facebook: 'https://www.facebook.com/jph.mtsdln'},
        {name: 'Daniel D. Camacláng', role: 'Secretary General', photo: 'officer-photos/sec.png', facebook: 'https://www.facebook.com/share/1A7XDawVVp/'},
        {name: 'Samantha Natalie Fattalo', role: 'Treasurer', photo: 'officer-photos/treasurer.png', facebook: 'https://www.facebook.com/share/1EzE9B7gPS/?mibextid=wwXIfr'},
        {name: 'Cristina V. Domingo', role: 'Auditor', photo: 'officer-photos/auditor.png', facebook: 'https://www.facebook.com/tin.cvd'},
        {name: 'Kenn Harvey F. Brocoy', role: 'Public Relations Officer', photo: 'officer-photos/pro.png', facebook: 'https://www.facebook.com/eli.chikenn'}
      ],
      boardMembers: [
        {name: 'jimmuel D. Palma', role: 'GAD Representative', photo: 'officer-photos/gad.png', facebook: 'https://www.facebook.com/jimmuelpalma'},
        {name: 'Angela C. Regidor', role: 'SAP BA', photo: 'officer-photos/ba.png', facebook: 'https://www.facebook.com/share/1BPRgFhHEU/'},
        {name: 'Charles Derrick A. Garcia', role: 'SAP CS', photo: 'officer-photos/cs.png', facebook: 'https://www.facebook.com/share/1BnreUAh5A/?mibextid=wwXIfr'},
        {name: 'Juanita Anjela M. Rivas', role: 'SAP EDUC', photo: 'officer-photos/educ.png', facebook: 'https://www.facebook.com/share/16ySQteSWw/?mibextid=LQQJ4d'},
        {name: 'Mikaella Kathe Palileo', role: 'SAP ENTREP', photo: 'officer-photos/entrep.png', facebook: 'https://www.facebook.com/share/1Cv4q431YZ/'},
        {name: 'Misael A. Ponferrada', role: 'SAP HM', photo: 'officer-photos/hm.png', facebook: 'https://www.facebook.com/share/14Pcg263Z2i/'},
        {name: 'Ivan P. Duran', role: 'SAP IT', photo: 'officer-photos/IT.png', facebook: 'https://www.facebook.com/infectious.ivan/'},
        {name: 'Chris John Labalan', role: 'SAP JOURN', photo: 'officer-photos/journ.png', facebook: 'https://www.facebook.com/share/1N69TcWjQk/'},
        {name: 'Lorie P. Salude', role: 'SAP OFAD', photo: 'officer-photos/OFAD.png', facebook: 'https://www.facebook.com/share/17XB2CYAQp/'},
        {name: 'Mary Eunice D. Ramos', role: 'SAP PSYCH', photo: 'officer-photos/Psych.png', facebook: 'https://www.facebook.com/merie.ramos.9'}
      ],
      last: [
        {name: 'Liza Perez', role: 'President', photo: 'CSG.png'},
        {name: 'Ramon Reyes', role: 'Vice President', photo: 'CSG.png'}
      ]
    },
    committees: [
      {name: 'Rules and Internal Affairs Committee', members: []},
      {name: 'Committee on External Affairs', members: []},
      {name: 'Committee on Culture, Arts and Athletics', members: []},
      {name: 'Social and Environmental Awareness Committee', members: []},
      {name: 'Committee on Creatives', members: []},
      {name: 'Committee on Student Affairs and Concern', members: []},
      {name: 'Secretariat Committee', members: []},
      {name: 'Committee on Web Development', members: [
        'Ralph Kenneth B. Perez',
        'Jerald D. Estrella',
        'Taisei Domingo',
        'Lorenz E. Tuboro',
        'John Harold R. Magma',
        'Gerald D. Alansalon'
      ]}
    ]
  };

  function el(id){return document.getElementById(id)}

  function renderList(container, items, type = 'Document'){
    if(!container) return;
    container.innerHTML = '';
    items.forEach(it=>{
      const d = document.createElement('div');
      d.className = 'doc';
      d.setAttribute('data-title', (it.title || '').toLowerCase());
      d.setAttribute('data-id', (it.id || '').toLowerCase());
      const a = document.createElement('a');
      a.textContent = it.title || 'Untitled';
      const file = it.file || '#';
      if(!file || file === '#'){
        a.href = 'javascript:void(0)';
        a.classList.add('disabled');
      } else {
        a.href = file;
        a.addEventListener('click', (e)=>{
          e.preventDefault();
          try{ openModal(file, {id: it.id, title: it.title, date: it.date, type: type}); }catch(err){ window.location.href = file; }
        });
      }
      d.appendChild(a);
      const small = document.createElement('small');
      small.textContent = `${it.id || ''} • ${it.date || ''}`;
      d.appendChild(small);
      container.appendChild(d);
    });
  }

  function setupDocumentSearch(){
    const input = document.getElementById('documents-search');
    if(!input) return;
    input.addEventListener('input', ()=>{
      const q = (input.value || '').trim().toLowerCase();
      const docs = document.querySelectorAll('#documents .doc');
      let anyVisible = false;
      docs.forEach(d=>{
        const title = d.getAttribute('data-title') || '';
        const id = d.getAttribute('data-id') || '';
        const matches = !q || title.includes(q) || id.includes(q);
        d.style.display = matches ? '' : 'none';
        if(matches) anyVisible = true;
      });
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
    if(!container) return;
    container.innerHTML = '';
    list.forEach(o=>{
      const d = document.createElement('div');
      d.className = 'officer';
      const photo = o.photo || 'CSG.png';
      d.innerHTML = `\
        <img src="${photo}" alt="${o.name}" class="officer-img">\
        <div class="officer-info">\
          <div class="name">${o.name}</div>\
          ${o.role ? `<div class="role">${o.role}</div>` : ''}\
        </div>`;
      // Make officer card clickable to open their Facebook profile in the modal when available
      if(o.facebook){
        d.style.cursor = 'pointer';
        d.setAttribute('role','button');
        d.setAttribute('tabindex','0');
        d.title = 'Open Facebook profile';
        const openHandler = (e)=>{ e && e.preventDefault && e.preventDefault(); try{ window.open(o.facebook, '_blank','noopener'); }catch(err){ window.location.href = o.facebook; } };
        d.addEventListener('click', openHandler);
        d.addEventListener('keydown', (ev)=>{ if(ev.key === 'Enter' || ev.key === ' ') openHandler(ev); });
      }
      container.appendChild(d);
    });
  }

  function renderCommittees(container, list){
    if(!container) return;
    container.innerHTML = '';
    list.forEach((c, idx)=>{
      const card = document.createElement('div');
      card.className = 'committee';
      const header = document.createElement('div');
      header.className = 'committee-header';
      const h = document.createElement('h4'); h.textContent = c.name;
      const btn = document.createElement('button');
      btn.className = 'committee-toggle';
      btn.setAttribute('aria-expanded','false');
      btn.textContent = 'Show members';
      btn.addEventListener('click', ()=>{
        const is = card.classList.toggle('show');
        btn.setAttribute('aria-expanded', is ? 'true' : 'false');
        btn.textContent = is ? 'Hide members' : 'Show members';
      });
      header.appendChild(h);
      header.appendChild(btn);
      card.appendChild(header);
      const ul = document.createElement('ul');
      ul.className = 'committee-members';
      (c.members || []).forEach(m=>{
        const li = document.createElement('li'); li.textContent = m; ul.appendChild(li);
      });
      card.appendChild(ul);
      container.appendChild(card);
    });
  }

  // Helper: extract a simple name from member strings like "Treasurer • S. Fattalo" -> "S. Fattalo"
  function _extractSimpleName(member){
    if(!member) return '';
    if(typeof member !== 'string') return String(member);
    // common separators used in data: •, —, -
    const seps = ['•','—','-'];
    for(const s of seps){
      if(member.includes(s)){
        const parts = member.split(s).map(p=>p.trim()).filter(Boolean);
        if(parts.length) return parts[parts.length-1];
      }
    }
    return member.trim();
  }

  // Revised renderCommittees: show only simple names inside collapsible dropdowns
  function renderCommittees(container, list){
    if(!container) return;
    container.innerHTML = '';
    (list || []).forEach((c, idx)=>{
      const card = document.createElement('div');
      card.className = 'committee';

      const header = document.createElement('div');
      header.className = 'committee-header';
      const h = document.createElement('h4'); h.textContent = c.name || ('Committee ' + (idx+1));

      const btn = document.createElement('button');
      btn.className = 'committee-toggle';
      btn.setAttribute('aria-expanded','false');
      btn.setAttribute('aria-label','Toggle members');
      // chevron right SVG (rotates when open)
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      btn.addEventListener('click', (e)=>{
        // Prevent clicks from bubbling to other handlers which might cause
        // unexpected UI changes in older browsers or duplicate listeners.
        try{ e && e.preventDefault && e.preventDefault(); }catch(err){}
        try{ e && e.stopPropagation && e.stopPropagation(); }catch(err){}

        // Toggle only this committee card. When opening, ensure other open cards close.
        const is = card.classList.toggle('show');
        btn.setAttribute('aria-expanded', is ? 'true' : 'false');
        // If container is available, scope the search to it to avoid touching
        // unrelated committees elsewhere in the document (duplicate ids/pages).
        const scope = container && container.querySelectorAll ? container : document;
        if(is){
          try{
            const others = Array.from(scope.querySelectorAll('.committee.show'));
            others.forEach(o=>{
              if(o === card) return;
              o.classList.remove('show');
              const tb = o.querySelector('.committee-toggle');
              if(tb) tb.setAttribute('aria-expanded','false');
            });
          }catch(e){/* ignore */}
        }
      });

      header.appendChild(h);
      header.appendChild(btn);
      card.appendChild(header);

      const ul = document.createElement('ul');
      ul.className = 'committee-members';
      (c.members || []).forEach(m=>{
        const li = document.createElement('li');
        li.textContent = _extractSimpleName(m);
        ul.appendChild(li);
      });

      card.appendChild(ul);
      container.appendChild(card);
    });
  }

  // Render a simple list of committee names (used on the Officers page)
  function renderCommitteeNames(container, list){
    if(!container) return;
    container.innerHTML = '';
    const ul = document.createElement('ul');
    ul.className = 'committee-names';
    (list || []).forEach(c=>{
      const li = document.createElement('li');
      li.textContent = c.name || c;
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  function renderLatestUpdates(container, data, limit = 5){
    if(!container) return;
    const all = [].concat(data.resolutions||[]).concat(data.projectProposals||[]).concat(data.activityProposals||[]).concat(data.minutes||[]);
    all.sort((a,b)=> (b.date||'').localeCompare(a.date||''));
    container.innerHTML = '';
    all.slice(0,limit).forEach(it=>{
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = `${it.id} — ${it.title}`;
      const file = it.file || '#';
      if(!file || file === '#'){
        a.href = 'javascript:void(0)'; a.classList.add('disabled');
      } else {
        a.href = 'javascript:void(0)';
        a.addEventListener('click', (e)=>{ e.preventDefault(); openModal(file); });
      }
      li.appendChild(a); container.appendChild(li);
    });
  }

  function openModal(file, meta){
    const modal = document.getElementById('fileModal');
    const viewer = document.getElementById('viewer');
    const loader = document.getElementById('fileModalLoader');
    const error = document.getElementById('fileModalError');
    const canvas = document.getElementById('pdf-canvas');
    const metaBox = document.getElementById('fileModalMeta');
    if(!modal || (!viewer && !canvas)) return;
    if(loader) loader.style.display = 'flex';
    if(error) error.style.display = 'none';
    if(viewer) viewer.style.display = 'block';
    if(canvas) canvas.style.display = 'none';
    modal.classList.add('show'); modal.style.display = 'block';
    if(metaBox){
      if(meta && meta.title){ metaBox.style.display = 'block'; metaBox.innerHTML = `<div class="meta-title">${meta.title}</div>`; }
      else { metaBox.style.display = 'none'; metaBox.innerHTML = ''; }
    }
    viewer.src = file;
    let loaded = false;
    const onLoad = ()=>{ loaded = true; if(loader) loader.style.display = 'none'; if(error) error.style.display = 'none'; cleanup(); };
    const onError = ()=>{ loaded = false; if(loader) loader.style.display = 'none'; if(error) error.style.display = 'flex'; cleanup(); };
    const timeoutId = setTimeout(()=>{ if(!loaded){ if(loader) loader.style.display = 'none'; if(error) error.style.display = 'flex'; } }, 3000);
    function cleanup(){ viewer.removeEventListener('load', onLoad); viewer.removeEventListener('error', onError); clearTimeout(timeoutId); }
    viewer.addEventListener('load', onLoad); viewer.addEventListener('error', onError);
  }

  // Note: modal-based profile embedding removed; officer clicks now open Facebook directly.

  let _pdfDoc = null; let _renderTask = null;
  function renderPdfToCanvas(url, canvas, loader, error){
    if(!canvas) return;
    try{
      if(!(window.pdfjsLib && window.pdfjsLib.getDocument)) throw new Error('pdfjsLib not found');
      if(window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions) window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'Static/vendor/pdfjs/pdf.worker.min.js';
    }catch(e){ console.error('PDF.js not available:', e); if(loader) loader.style.display = 'none'; if(error){ error.style.display = 'flex'; error.textContent = 'Preview unavailable (PDF renderer not loaded).'; } return; }
    if(_renderTask){ try{ _renderTask.cancel(); }catch(e){} _renderTask = null; }
    if(_pdfDoc){ try{ _pdfDoc.destroy(); }catch(e){} _pdfDoc = null; }
    const viewer = document.getElementById('viewer'); if(viewer) viewer.style.display = 'none'; canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    let loadingTask;
    try{ loadingTask = window.pdfjsLib.getDocument(url); }catch(err){ console.error('getDocument failed:', err); if(loader) loader.style.display = 'none'; if(error){ error.style.display = 'flex'; error.textContent = 'Preview unavailable (failed to load document).'; } return; }
    loadingTask.promise.then(function(pdf){ _pdfDoc = pdf; return pdf.getPage(1).then(function(page){ const modalBox = document.querySelector('.file-modal__box'); const containerWidth = (modalBox && modalBox.clientWidth) || 800; const unscaledViewport = page.getViewport({scale: 1}); let scale = containerWidth / unscaledViewport.width; const outputScale = window.devicePixelRatio || 1; const renderViewport = page.getViewport({scale: scale * outputScale}); canvas.width = Math.floor(renderViewport.width); canvas.height = Math.floor(renderViewport.height); canvas.style.width = Math.floor(renderViewport.width / outputScale) + 'px'; canvas.style.height = Math.floor(renderViewport.height / outputScale) + 'px'; ctx.clearRect(0,0,canvas.width,canvas.height); const renderContext = { canvasContext: ctx, viewport: renderViewport }; _renderTask = page.render(renderContext); return _renderTask.promise.then(function(){ if(loader) loader.style.display = 'none'; }); }); }).catch(function(err){ console.error('PDF render error:', err); if(loader) loader.style.display = 'none'; if(error){ error.style.display = 'flex'; error.textContent = 'Preview unavailable (error rendering PDF).'; } });
  }

  function closeModal(){
    const modal = document.getElementById('fileModal'); const viewer = document.getElementById('viewer'); if(!modal || !viewer) return; viewer.src = ''; const loader = document.getElementById('fileModalLoader'); const error = document.getElementById('fileModalError'); if(loader) loader.style.display = 'none'; if(error) error.style.display = 'none'; if(_renderTask){ try{ _renderTask.cancel(); }catch(e){} _renderTask = null; } if(_pdfDoc){ try{ _pdfDoc.destroy(); }catch(e){} _pdfDoc = null; } const canvas = document.getElementById('pdf-canvas'); if(canvas){ const ctx = canvas.getContext('2d'); ctx.clearRect(0,0,canvas.width,canvas.height); canvas.style.display = 'none'; } modal.classList.remove('show'); modal.style.display = 'none';
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    renderList(el('resolutions'), data.resolutions);
    renderList(el('activity-proposals'), data.activityProposals);
    renderList(el('project-proposals'), data.projectProposals);
    renderList(el('minutes'), data.minutes);
    renderOfficers(el('executives'), data.officers.executives);
    renderOfficers(el('board-members'), data.officers.boardMembers);
    // render committees as dropdown cards (placed under Board Members on the Officers page)
    renderCommittees(el('committees-list-officers'), data.committees);
    // also render on the standalone Committees page (if present)
    renderCommittees(el('committees-list-page'), data.committees);
    renderOfficers(el('last-officers'), data.officers.last);
    renderLatestUpdates(el('latest-updates'), data, 5);

    const navToggle = el('nav-toggle');
    const mainNav = document.querySelector('.sidebar .main-nav');

    function closeMobileNav(){ if(mainNav){ mainNav.classList.remove('open'); } if(navToggle){ navToggle.setAttribute('aria-expanded','false'); } }
    function showRoute(route){ document.querySelectorAll('.page').forEach(p=>p.hidden=true); const elRoute = document.getElementById(route) || document.getElementById('home'); elRoute.hidden = false; document.querySelectorAll('.main-nav a').forEach(a=>a.classList.toggle('active', a.getAttribute('data-route')===route)); closeMobileNav(); }
    function showRouteWithLoading(route){ document.getElementById('loading').style.display = 'flex'; document.querySelectorAll('.page').forEach(p=>p.hidden=true); setTimeout(() => { document.getElementById('loading').style.display = 'none'; const elRoute = document.getElementById(route) || document.getElementById('home'); elRoute.hidden = false; document.querySelectorAll('.main-nav a').forEach(a=>a.classList.toggle('active', a.getAttribute('data-route')===route)); closeMobileNav(); }, 1500); }
    function handleHash(){ const r = location.hash.replace('#','') || 'home'; showRoute(r); }
    function handleHashWithLoading(){ const r = location.hash.replace('#','') || 'home'; showRouteWithLoading(r); }

    if(navToggle){ navToggle.addEventListener('click', ()=>{ if(!mainNav) return; const opened = mainNav.classList.toggle('open'); navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false'); }); }

    const modalClose = el('fileModalClose'); const modal = el('fileModal'); const modalBackdrop = el('fileModalBackdrop'); if(modalClose) modalClose.addEventListener('click', closeModal); if(modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('click', (e)=>{ if(!mainNav || !navToggle) return; if(!mainNav.classList.contains('open')) return; const target = e.target; if(target === navToggle || navToggle.contains(target)) return; if(mainNav.contains(target)) return; closeMobileNav(); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeMobileNav(); });
    window.addEventListener('hashchange', handleHashWithLoading); handleHash();

    const ld = document.getElementById('loading'); if(ld) ld.style.display = 'none';
    initAboutPhotoCard(); setupDocumentSearch(); initHomeSlider();
  });

  const dashboardPhotos = [ 'Dashboard-Photos/IMG_1195.png', 'Dashboard-Photos/IMG_1462.png', 'Dashboard-Photos/IMG_1498.png' ];

  function initAboutPhotoCard(){
    const img = document.getElementById('about-photo-img'); if(!img) return; let idx = 0;
    function preload(src){ return new Promise((resolve, reject)=>{ const i = new Image(); i.onload = ()=>resolve(src); i.onerror = ()=>reject(src); i.src = src; }); }
    async function nextPhoto(){ if(!img) return; const nextIdx = (idx + 1) % dashboardPhotos.length; const nextSrc = dashboardPhotos[nextIdx]; try{ await preload(nextSrc); }catch(e){} img.classList.add('fading'); setTimeout(()=>{ img.src = nextSrc; img.classList.remove('fading'); }, 300); idx = nextIdx; }
    (async function start(){ for(const src of dashboardPhotos){ try{ await preload(src); img.src = src; break; }catch(e){} } if(!img.src && dashboardPhotos.length) img.src = dashboardPhotos[0]; })();
    const intervalId = setInterval(nextPhoto, 4000);
    const observer = new MutationObserver(()=>{ if(!document.getElementById('about-photo-img')){ clearInterval(intervalId); observer.disconnect(); } });
    observer.observe(document.body, {childList:true, subtree:true});
  }

  function initHomeSlider(){
    const img = document.getElementById('hero-slide-img'); if(!img) return; let idx = 0; function preload(src){ return new Promise((resolve,reject)=>{ const i = new Image(); i.onload = ()=>resolve(src); i.onerror = ()=>reject(src); i.src = src; }); }
    async function showNext(){ if(!img) return; const nextIdx = (idx + 1) % dashboardPhotos.length; const nextSrc = dashboardPhotos[nextIdx]; try{ await preload(nextSrc); }catch(e){} img.classList.add('fading'); setTimeout(()=>{ img.src = nextSrc; img.classList.remove('fading'); }, 300); idx = nextIdx; }
    (async function start(){ for(const s of dashboardPhotos){ try{ await preload(s); img.src = s; break; }catch(e){} } if(!img.src && dashboardPhotos.length) img.src = dashboardPhotos[0]; })();
    const intervalId = setInterval(showNext, 4000);
    const observer = new MutationObserver(()=>{ if(!document.getElementById('hero-slide-img')){ clearInterval(intervalId); observer.disconnect(); }});
    observer.observe(document.body, {childList:true, subtree:true});
  }
})();
