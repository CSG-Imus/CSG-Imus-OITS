// Minimal JS to populate documents and officers and handle simple routing + palette switching
(function(){
  const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  const PDF_ZOOM_DEFAULT = 0.9;
  const PDF_ZOOM_STEP = 0.1;
  const PDF_ZOOM_MIN = 0.6;
  const PDF_ZOOM_MAX = 1.5;
  let _pdfZoom = PDF_ZOOM_DEFAULT;
  let _pdfSource = null;
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
    accomplishmentReports: [],
    financialStatements: [],
    officeMemorandums: [],
    activityProposals: [],
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
        {name: 'Zoe R. Gil', role: 'President', photo: 'Officer-Photos/pres.png', facebook: 'https://www.facebook.com/share/1BaEa8GUoE/'},
        {name: 'Ken B. Lentejas', role: 'Vice President for Internal Affairs', photo: 'Officer-Photos/vpi.png', facebook: 'https://www.facebook.com/keyihen.el'},
        {name: 'John Jefferson M. De Leon', role: 'Vice President for External Affairs', photo: 'Officer-Photos/vpe.png', facebook: 'https://www.facebook.com/jph.mtsdln'},
        {name: 'Daniel D. Camacláng', role: 'Secretary General', photo: 'Officer-Photos/sec.png', facebook: 'https://www.facebook.com/share/1A7XDawVVp/'},
        {name: 'Samantha Natalie Fattalo', role: 'Treasurer', photo: 'Officer-Photos/treasurer.png', facebook: 'https://www.facebook.com/share/1EzE9B7gPS/?mibextid=wwXIfr'},
        {name: 'Cristina V. Domingo', role: 'Auditor', photo: 'Officer-Photos/auditor.png', facebook: 'https://www.facebook.com/tin.cvd'},
        {name: 'Kenn Harvey F. Brocoy', role: 'Public Relations Officer', photo: 'Officer-Photos/pro.png', facebook: 'https://www.facebook.com/eli.chikenn'}
      ],
      boardMembers: [
        {name: 'jimmuel D. Palma', role: 'GAD Representative', photo: 'Officer-Photos/gad.png', facebook: 'https://www.facebook.com/jimmuelpalma'},
        {name: 'Angela C. Regidor', role: 'SAP Business Administration', photo: 'Officer-Photos/ba.png', facebook: 'https://www.facebook.com/share/1BPRgFhHEU/'},
        {name: 'Charles Derrick A. Garcia', role: 'SAP Computer Science', photo: 'Officer-Photos/cs.png', facebook: 'https://www.facebook.com/share/1BnreUAh5A/?mibextid=wwXIfr'},
        {name: 'Juanita Anjela M. Rivas', role: 'SAP Education', photo: 'Officer-Photos/educ.png', facebook: 'https://www.facebook.com/share/16ySQteSWw/?mibextid=LQQJ4d'},
        {name: 'Mikaella Kathe Palileo', role: 'SAP Entrepreneurship', photo: 'Officer-Photos/entrep.png', facebook: 'https://www.facebook.com/share/1Cv4q431YZ/'},
        {name: 'Misael A. Ponferrada', role: 'SAP Hospitality Management', photo: 'Officer-Photos/hm.png', facebook: 'https://www.facebook.com/share/14Pcg263Z2i/'},
        {name: 'Ivan P. Duran', role: 'SAP Information Technology', photo: 'Officer-Photos/SAP.gif', facebook: 'https://www.facebook.com/infectious.ivan/'},
        {name: 'Chris John Labalan', role: 'SAP Journalism', photo: 'Officer-Photos/journ.png', facebook: 'https://www.facebook.com/share/1N69TcWjQk/'},
        {name: 'Lorie P. Salude', role: 'SAP Office Administration', photo: 'Officer-Photos/OFAD.png', facebook: 'https://www.facebook.com/share/17XB2CYAQp/'},
        {name: 'Mary Eunice D. Ramos', role: 'SAP Psychology', photo: 'Officer-Photos/Psych.png', facebook: 'https://www.facebook.com/merie.ramos.9'}
      ],
      last: {
        executives: [
          {name: 'Rica Babes B. Delos Reyes', role: 'President', photo: 'CSG.png'},
          {name: 'Neal Brian M. Martija', role: 'Vice President for Internal Affairs', photo: 'CSG.png'},
          {name: 'Vench Kyla C. Ababon', role: 'Vice President for External Affairs', photo: 'CSG.png'},
          {name: 'Ednalyn Kaye B. Hamili', role: 'Secretary', photo: 'CSG.png'},
          {name: 'Justine Grace C. Aleman', role: 'Treasurer', photo: 'CSG.png'},
          {name: 'Jasmine O. Ramos', role: 'Auditor', photo: 'CSG.png'},
          {name: 'Marvin E. Apawan', role: 'P.R.O', photo: 'CSG.png'}
        ],
        boardMembers: [
          {name: 'Allen Malabanan', role: 'SAP Journalism', photo: 'CSG.png'},
          {name: 'Chloe O. Regalado', role: 'SAP BSOA', photo: 'CSG.png'},
          {name: 'Johnny S. De Asis Jr.', role: 'SAP Computer Science', photo: 'CSG.png'},
          {name: 'Sarah Bernalte', role: 'SAP Information Technology', photo: 'CSG.png'},
          {name: 'Hannah Coleen M. Marteriz', role: 'SAP Education', photo: 'CSG.png'},
          {name: 'Ma. Nicole E. Valenzuela', role: 'SAP Business Administration', photo: 'CSG.png'},
          {name: 'Hans Christian O. Ancierto', role: 'SAP Psychology', photo: 'CSG.png'},
          {name: 'Mary Carmelemn H. Catoltol', role: 'SAP Hospitality Management', photo: 'CSG.png'},
          {name: 'Jhomari Kenshin P. Sarte', role: 'SAP Entrepreneurship', photo: 'CSG.png'}
        ]
      }
    },
    committees: [
      {name: 'Rules and Internal Affairs Committee', members: [
        'Rica Babes B. Delos Reyes',
        'Craven Mish Lorraine L. Norbe',
        'Chieko M. Lantajo',
        'Ivan Reniel H. Amangca',
        'Loubert L. Apin',
        'Carmella P. Cayetano',
        'Marvilyn G. Frias',
        'Kimverly S. Mina'
      ]},
      {name: 'Committee on External Affairs', members: [
        "Dean Levi's G. Aquino",
        'Allexzeus Marvel C. Padilla',
        'Juria Mae N. Dela Cerna',
        'Ryren Hagos',
        'Juvert V. Vista'
      ]},
      {name: 'Committee on Culture, Arts and Athletics', members: [
        'Vice Chairperson • Hans Christian O. Ancierto',
        'Secretary • Anjon-Lores E. Cañares',
        'Performing Arts Representative • Jay Ar V. Rondina',
        'Performing Arts Representative • Georgie May G. Tunay',
        'Athletics Representative • Keith Owen B. Silva'
      ]},
      {name: 'Social and Environmental Awareness Committee', members: [
        'Jennifer Nazareno',
        'Ralfh Dharren Molina'
      ]},
      {name: 'Committee on Creatives', members: []},
      {name: 'Committee on Student Affairs and Concern', members: []},
      {name: 'Secretariat Committee', members: [
        'Ishra Firreli B. Fernando',
        'Ma. Cristina Hernandez',
        'Minea Sabina M. Feliciano',
        'Jose Angelo Bitanga',
        'Gwen Marinie Paciente',
        'Ariane Nicole D. Comedia',
        'Zachariah Sydney U. Babon'
      ]},
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

  const documentDataMap = {
    'resolutions': data.resolutions,
    'activity-proposals': data.activityProposals,
    'project-proposals': data.projectProposals,
    'minutes': data.minutes,
    'office-memorandums': data.officeMemorandums,
    'accomplishment-reports': data.accomplishmentReports,
    'financial-statements': data.financialStatements
  };

  const documentContainers = {};

  function el(id){return document.getElementById(id)}

  const MAX_DOCS_PER_CATEGORY = 3;

  function parseDocNumber(id){
    const matches = (id || '').match(/\d+/g);
    if(!matches || !matches.length) return Number.MIN_SAFE_INTEGER;
    const val = parseInt(matches[matches.length - 1], 10);
    return Number.isNaN(val) ? Number.MIN_SAFE_INTEGER : val;
  }

  function sortDocuments(items){
    return (items || []).slice().sort((a, b)=>{
      const aNum = parseDocNumber(a && a.id);
      const bNum = parseDocNumber(b && b.id);
      if(aNum !== bNum) return bNum - aNum;
      return (b.date || '').localeCompare(a.date || '');
    });
  }

  function renderList(container, items, type = 'Document', limit = MAX_DOCS_PER_CATEGORY){
    if(!container) return;
    container.innerHTML = '';
    const sorted = sortDocuments(items);
    const sliceCount = (typeof limit === 'number' && limit > 0) ? limit : sorted.length;
    const limited = sorted.slice(0, sliceCount);
    if(!limited.length){
      const empty = document.createElement('div');
      empty.className = 'doc doc--placeholder';
      empty.textContent = 'No recent file.';
      container.appendChild(empty);
      return;
    }
    limited.forEach(it=>{
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
      const details = [];
      if(it.id) details.push(it.id);
      if(it.date) details.push(it.date);
      if(details.length){
        small.textContent = details.join(' ');
        d.appendChild(small);
      }
      container.appendChild(d);
    });
  }

  function initializeDocumentSections(){
    Object.keys(documentDataMap).forEach(type => {
      const container = document.getElementById(type);
      if(container) documentContainers[type] = container;
    });
    renderDocumentsByMode('recent');
  }

  function renderDocumentsByMode(mode){
    if(mode && mode !== 'recent'){
      const target = documentContainers[mode];
      if(target){
        const items = documentDataMap[mode] || [];
        renderList(target, items, mode, Infinity);
      }
      return;
    }
    Object.keys(documentContainers).forEach(type => {
      const container = documentContainers[type];
      const items = documentDataMap[type] || [];
      renderList(container, items, type, MAX_DOCS_PER_CATEGORY);
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

  function setupDocumentFilter(){
    const select = document.getElementById('documents-filter');
    const columns = document.querySelectorAll('#documents .doc-col');
    const grid = document.querySelector('#documents .docs-grid');
    if(!select || !columns.length || !grid) return;
    function applyFilter(){
      const value = select.value || 'recent';
      columns.forEach(col=>{
        const type = col.getAttribute('data-doc-type');
        const show = value === 'recent' || type === value;
        col.style.display = show ? '' : 'none';
      });
      renderDocumentsByMode(value);
      grid.classList.toggle('documents-grid--single', value !== 'recent');
      updateRecentEmptyState(value, grid);
    }
    select.addEventListener('change', applyFilter);
    applyFilter();
  }

  function updateRecentEmptyState(currentFilter, grid){
    if(!grid) return;
    let emptyEl = document.getElementById('documents-recent-empty');
    if(!emptyEl){
      emptyEl = document.createElement('div');
      emptyEl.id = 'documents-recent-empty';
      emptyEl.className = 'documents-empty-state';
      emptyEl.textContent = 'No recent file.';
      grid.after(emptyEl);
    }
    const hasDocs = grid.querySelectorAll('.doc').length > 0;
    const show = currentFilter === 'recent' && !hasDocs;
    emptyEl.style.display = show ? 'block' : 'none';
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
        try{ e && e.preventDefault && e.preventDefault(); }catch(err){}
        try{ e && e.stopPropagation && e.stopPropagation(); }catch(err){}
        // Toggle only this committee card; do NOT auto-close other cards.
        const is = card.classList.toggle('show');
        btn.setAttribute('aria-expanded', is ? 'true' : 'false');
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

  function setPdfControlsVisible(show){
    const controls = document.getElementById('pdfControls');
    if(!controls) return;
    controls.hidden = !show;
  }

  function updatePdfZoomLabel(){
    const label = document.getElementById('pdfZoomValue');
    if(label) label.textContent = Math.round(_pdfZoom * 100) + '%';
  }

  function changePdfZoom(direction){
    const delta = direction === 'in' ? PDF_ZOOM_STEP : -PDF_ZOOM_STEP;
    const next = Math.max(PDF_ZOOM_MIN, Math.min(PDF_ZOOM_MAX, parseFloat((_pdfZoom + delta).toFixed(2))));
    if(Math.abs(next - _pdfZoom) < 0.001 || !_pdfSource) return;
    _pdfZoom = next;
    updatePdfZoomLabel();
    const container = document.getElementById('pdf-container');
    const loader = document.getElementById('fileModalLoader');
    const error = document.getElementById('fileModalError');
    renderPdfDocument(_pdfSource, container, loader, error, _pdfZoom);
  }

  function initPdfZoomControls(){
    const controls = document.getElementById('pdfControls');
    if(!controls) return;
    controls.addEventListener('click', (e)=>{
      const btn = e.target.closest('.pdf-zoom-btn');
      if(!btn) return;
      const dir = btn.getAttribute('data-zoom');
      if(dir === 'in' || dir === 'out') changePdfZoom(dir);
    });
  }

  function openModal(file, meta){
    const modal = document.getElementById('fileModal');
    const viewer = document.getElementById('viewer');
    const loader = document.getElementById('fileModalLoader');
    const error = document.getElementById('fileModalError');
    const pdfContainer = document.getElementById('pdf-container');
    const metaBox = document.getElementById('fileModalMeta');
    if(!modal || (!viewer && !pdfContainer)) return;
    if(error) error.style.display = 'none';
    if(pdfContainer){
      pdfContainer.style.display = 'none';
      pdfContainer.innerHTML = '';
    }
    modal.classList.add('show'); modal.style.display = 'block';
    if(metaBox){
      metaBox.style.display = 'none';
      metaBox.innerHTML = '';
    }
    const isPdf = typeof file === 'string' && file.trim().toLowerCase().includes('.pdf');
    if(isPdf && pdfContainer){
      _pdfSource = file;
      _pdfZoom = PDF_ZOOM_DEFAULT;
      updatePdfZoomLabel();
      setPdfControlsVisible(true);
      if(viewer){ viewer.style.display = 'none'; viewer.removeAttribute('src'); }
      renderPdfDocument(file, pdfContainer, loader, error, _pdfZoom);
    } else if(viewer){
      _pdfSource = null;
      setPdfControlsVisible(false);
      if(pdfContainer){ pdfContainer.style.display = 'none'; }
      viewer.style.display = 'block';
      viewer.src = file;
      let loaded = false;
      const onLoad = ()=>{ loaded = true; if(loader) loader.style.display = 'none'; if(error) error.style.display = 'none'; cleanup(); };
      const onError = ()=>{ loaded = false; if(loader) loader.style.display = 'none'; if(error) error.style.display = 'flex'; cleanup(); };
      const timeoutId = setTimeout(()=>{ if(!loaded){ if(loader) loader.style.display = 'none'; if(error) error.style.display = 'flex'; } }, 3000);
      function cleanup(){ viewer.removeEventListener('load', onLoad); viewer.removeEventListener('error', onError); clearTimeout(timeoutId); }
      viewer.addEventListener('load', onLoad); viewer.addEventListener('error', onError);
    } else {
      _pdfSource = null;
      setPdfControlsVisible(false);
      if(loader) loader.style.display = 'none';
      if(error){ error.style.display = 'flex'; error.textContent = 'Preview unavailable.'; }
    }
  }

  // Note: modal-based profile embedding removed; officer clicks now open Facebook directly.

  let _pdfDoc = null;
  let _renderTasks = [];

  function clearPdfRendering(){
    _renderTasks.forEach(task=>{ try{ task.cancel(); }catch(e){} });
    _renderTasks = [];
    if(_pdfDoc){ try{ _pdfDoc.destroy(); }catch(e){} _pdfDoc = null; }
  }

  function renderPdfDocument(url, container, loader, error, zoomMultiplier = PDF_ZOOM_DEFAULT){
    if(!container || !url) return;
    try{
      if(!(window.pdfjsLib && window.pdfjsLib.getDocument)) throw new Error('pdfjsLib not found');
      if(window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions) window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
    }catch(e){ console.error('PDF.js not available:', e); if(loader) loader.style.display = 'none'; if(error){ error.style.display = 'flex'; error.textContent = 'Preview unavailable (PDF renderer not loaded).'; } return; }
    clearPdfRendering();
    container.innerHTML = '';
    container.style.display = 'block';
    container.scrollTop = 0;
    if(error) error.style.display = 'none';
    const zoom = typeof zoomMultiplier === 'number' ? zoomMultiplier : PDF_ZOOM_DEFAULT;
    let loadingTask;
    try{ loadingTask = window.pdfjsLib.getDocument(url); }catch(err){ console.error('getDocument failed:', err); if(loader) loader.style.display = 'none'; if(error){ error.style.display = 'flex'; error.textContent = 'Preview unavailable (failed to load document).'; } container.style.display = 'none'; return; }
    loadingTask.promise.then(function(pdf){
      _pdfDoc = pdf;
      const renderSequentially = async ()=>{
        for(let pageNum = 1; pageNum <= pdf.numPages; pageNum++){
          const page = await pdf.getPage(pageNum);
          const canvas = document.createElement('canvas');
          canvas.className = 'pdf-page';
          container.appendChild(canvas);
          const ctx = canvas.getContext('2d');
          const modalBox = document.querySelector('.file-modal__box');
          const availableWidth = Math.max(((modalBox && modalBox.clientWidth) || 800) - 60, 320);
          const unscaledViewport = page.getViewport({scale: 1});
          const baseScale = availableWidth / unscaledViewport.width;
          const scale = baseScale * zoom;
          const displayViewport = page.getViewport({scale});
          const outputScale = window.devicePixelRatio || 1;
          const renderViewport = page.getViewport({scale: scale * outputScale});
          canvas.width = Math.floor(renderViewport.width);
          canvas.height = Math.floor(renderViewport.height);
          canvas.style.width = Math.floor(displayViewport.width) + 'px';
          canvas.style.height = Math.floor(displayViewport.height) + 'px';
          const renderContext = {
            canvasContext: ctx,
            viewport: renderViewport
          };
          const task = page.render(renderContext);
          _renderTasks.push(task);
          await task.promise;
        }
      };
      return renderSequentially().then(()=>{ if(loader) loader.style.display = 'none'; });
    }).catch(function(err){
      if(err && err.name === 'RenderingCancelledException'){
        return; // user initiated re-render; ignore
      }
      console.error('PDF render error:', err);
      clearPdfRendering();
      container.style.display = 'none';
      if(loader) loader.style.display = 'none';
      if(error){ error.style.display = 'flex'; error.textContent = 'Preview unavailable (error rendering PDF).'; }
    });
  }

  function closeModal(){
    const modal = document.getElementById('fileModal');
    const viewer = document.getElementById('viewer');
    if(!modal) return;
    const loader = document.getElementById('fileModalLoader');
    const error = document.getElementById('fileModalError');
    const pdfContainer = document.getElementById('pdf-container');
    if(viewer){ viewer.src = ''; viewer.style.display = 'none'; }
    if(pdfContainer){ pdfContainer.innerHTML = ''; pdfContainer.style.display = 'none'; }
    if(loader) loader.style.display = 'none';
    if(error) error.style.display = 'none';
    clearPdfRendering();
    _pdfSource = null;
    _pdfZoom = PDF_ZOOM_DEFAULT;
    updatePdfZoomLabel();
    setPdfControlsVisible(false);
    modal.classList.remove('show');
    modal.style.display = 'none';
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    initializeDocumentSections();
    renderOfficers(el('executives'), data.officers.executives);
    renderOfficers(el('board-members'), data.officers.boardMembers);
    // render committees as dropdown cards (placed under Board Members on the Officers page)
    renderCommittees(el('committees-list-officers'), data.committees);
    // also render on the standalone Committees page (if present)
    renderCommittees(el('committees-list-page'), data.committees);
    // Render last term executives and board members separately
    renderOfficers(el('last-executives'), data.officers.last && data.officers.last.executives);
    renderOfficers(el('last-board-members'), data.officers.last && data.officers.last.boardMembers);

    const navToggle = el('nav-toggle');
    const mainNav = document.querySelector('.sidebar .main-nav');
    const headerBrand = document.getElementById('header-brand');

    function toggleHeaderBrand(route){ if(!headerBrand) return; headerBrand.hidden = (route === 'home'); }

    function closeMobileNav(){ if(mainNav){ mainNav.classList.remove('open'); } if(navToggle){ navToggle.setAttribute('aria-expanded','false'); } }
    function resolveRoute(route){ return (route && document.getElementById(route)) ? route : 'home'; }
    function showRoute(route){ const resolved = resolveRoute(route); document.querySelectorAll('.page').forEach(p=>p.hidden=true); const elRoute = document.getElementById(resolved); if(elRoute) elRoute.hidden = false; document.querySelectorAll('.main-nav a').forEach(a=>a.classList.toggle('active', a.getAttribute('data-route')===resolved)); toggleHeaderBrand(resolved); closeMobileNav(); }
    function showRouteWithLoading(route){ const resolved = resolveRoute(route); document.getElementById('loading').style.display = 'flex'; document.querySelectorAll('.page').forEach(p=>p.hidden=true); setTimeout(() => { document.getElementById('loading').style.display = 'none'; const elRoute = document.getElementById(resolved) || document.getElementById('home'); if(elRoute) elRoute.hidden = false; document.querySelectorAll('.main-nav a').forEach(a=>a.classList.toggle('active', a.getAttribute('data-route')===resolved)); toggleHeaderBrand(resolved); closeMobileNav(); }, 1500); }
    function handleHash(){ const r = location.hash.replace('#','') || 'home'; showRoute(r); }
    function handleHashWithLoading(){ const r = location.hash.replace('#','') || 'home'; showRouteWithLoading(r); }

    if(navToggle){ navToggle.addEventListener('click', ()=>{ if(!mainNav) return; const opened = mainNav.classList.toggle('open'); navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false'); }); }

    const modalClose = el('fileModalClose'); const modal = el('fileModal'); const modalBackdrop = el('fileModalBackdrop'); if(modalClose) modalClose.addEventListener('click', closeModal); if(modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('click', (e)=>{ if(!mainNav || !navToggle) return; if(!mainNav.classList.contains('open')) return; const target = e.target; if(target === navToggle || navToggle.contains(target)) return; if(mainNav.contains(target)) return; closeMobileNav(); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){ closeMobileNav(); closePhotoLightbox(); } });
    window.addEventListener('hashchange', handleHashWithLoading); handleHash();

    const ld = document.getElementById('loading'); if(ld) ld.style.display = 'none';
    initAboutPhotoCard(); setupDocumentSearch(); setupDocumentFilter(); initPdfZoomControls();
    const eventGalleryContainer = el('events-gallery-list');
    renderEventGalleries(eventGalleryContainer, eventGallerySets);
    setupEventGallerySearch(el('eventGallerySearch'), eventGalleryContainer);
    // Populate About page galleries (current officers + events) using simple sliders
    try{
      const aboutOfficersEl = el('about-current-officers');
      const aboutEventsEl = el('about-events-gallery');
      // Use the term tagline image (pics/tagline.png) for the Term Tagline slider.
      // Fallback to officer photos if the tagline image is missing.
      const taglinePath = 'pics/tagline.png';
      const currentOfficers = [].concat(data.officers.executives || []).concat(data.officers.boardMembers || []);
      const officerPhotos = currentOfficers.map(o=> o && o.photo ? o.photo : 'CSG.png');
      // Use the tagline image only for the Term Tagline slider (do not cycle officer photos)
      initAboutSlider(aboutOfficersEl, [taglinePath], { interval: 3800, caption: 'Term Tagline' });
      initAboutSlider(aboutEventsEl, dashboardPhotos, { interval: 3000, caption: 'Events & Activities' });
    }catch(e){/* ignore if about page not present */}

    const photoLightboxClose = el('photoLightboxClose');
    const photoLightboxBackdrop = el('photoLightboxBackdrop');
    if(photoLightboxClose) photoLightboxClose.addEventListener('click', closePhotoLightbox);
    if(photoLightboxBackdrop) photoLightboxBackdrop.addEventListener('click', closePhotoLightbox);
  });

  const dashboardPhotos = [ 'Dashboard-Photos/IMG_1195.png', 'Dashboard-Photos/IMG_1462.png', 'Dashboard-Photos/IMG_1498.png' ];
  const eventGallerySets = [
    {
      title: "Foundation Week '25",
      folder: "Event Gallery Materials/Foundation Week '25",
      photos: []
    },
    {
      title: 'Pande Kape ni Kabsuy - 1st Semester',
      folder: 'Event Gallery Materials/Pande Kape ni Kabsuy - 1st Semester',
      photos: []
    },
    {
      title: "Paskuhan '25",
      folder: "Event Gallery Materials/Paskuhan '25",
      photos: []
    },
    {
      title: "Student Leadership Training Program '25",
      folder: 'Event Gallery Materials/SLTP',
      photos: ['IMG_1195.png','IMG_1462.png','IMG_1498.png']
    }
  ];

  function initAboutPhotoCard(){
    const img = document.getElementById('about-photo-img'); if(!img) return; let idx = 0;
    function preload(src){ return new Promise((resolve, reject)=>{ const i = new Image(); i.onload = ()=>resolve(src); i.onerror = ()=>reject(src); i.src = src; }); }
    async function nextPhoto(){ if(!img) return; const nextIdx = (idx + 1) % dashboardPhotos.length; const nextSrc = dashboardPhotos[nextIdx]; try{ await preload(nextSrc); }catch(e){} img.classList.add('fading'); setTimeout(()=>{ img.src = nextSrc; img.classList.remove('fading'); }, 300); idx = nextIdx; }
    (async function start(){ for(const src of dashboardPhotos){ try{ await preload(src); img.src = src; break; }catch(e){} } if(!img.src && dashboardPhotos.length) img.src = dashboardPhotos[0]; })();
    const intervalId = setInterval(nextPhoto, 4000);
    const observer = new MutationObserver(()=>{ if(!document.getElementById('about-photo-img')){ clearInterval(intervalId); observer.disconnect(); } });
    observer.observe(document.body, {childList:true, subtree:true});
  }

  // Render small image galleries on the About page
  function renderAboutOfficersGallery(container, officers){
    // kept for potential non-slider fallback; currently not used
    if(!container) return;
    container.innerHTML = '';
    const list = [].concat(officers || []);
    list.forEach(o=>{
      const item = document.createElement('div');
      item.className = 'gallery-item';
      const img = document.createElement('img');
      img.src = o.photo || 'CSG.png';
      img.alt = o.name || '';
      const cap = document.createElement('div');
      cap.className = 'gallery-caption';
      cap.textContent = o.name || '';
      item.appendChild(img);
      item.appendChild(cap);
      container.appendChild(item);
    });
  }

  function renderEventsGallery(container, photos){
    // kept for potential non-slider fallback; currently not used
    if(!container) return;
    container.innerHTML = '';
    (photos || []).forEach(src=>{
      const item = document.createElement('div');
      item.className = 'gallery-item';
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'CSG event photo';
      item.appendChild(img);
      container.appendChild(item);
    });
  }

  // Generic simple auto-rotating slider for About galleries
  function initAboutSlider(container, images, opts = {}){
    if(!container) return;
    const imgs = (images && images.length) ? images.slice() : ['CSG.png'];
    // ensure absolute paths or fallbacks
    const slides = imgs.map(s => s || 'CSG.png');
    container.innerHTML = '';
    container.classList.add('about-slider');
    const imgEl = document.createElement('img');
    imgEl.className = 'about-slider-img';
    imgEl.src = slides[0];
    imgEl.alt = opts.alt || 'slide';
    container.appendChild(imgEl);
    if(opts.caption){
      const cap = document.createElement('div'); cap.className = 'slider-caption'; cap.textContent = opts.caption; container.appendChild(cap);
    }
    let idx = 0; let fading = false; const interval = opts.interval || 3500;
    function preload(src){ return new Promise((resolve)=>{ const i=new Image(); i.onload=()=>resolve(src); i.onerror=()=>resolve(src); i.src=src; }); }
    async function next(){
      const nextIdx = (idx + 1) % slides.length; const nextSrc = slides[nextIdx];
      try{ await preload(nextSrc); }catch(e){}
      imgEl.classList.add('fading');
      setTimeout(()=>{ imgEl.src = nextSrc; imgEl.classList.remove('fading'); idx = nextIdx; }, 300);
    }
    const id = setInterval(next, interval);
    // store timer reference so it can be cleared if element removed
    container._sliderInterval = id;
  }

  function initScrollingGallery(container, images){
    if(!container) return;
    const validImages = (images || []).map(src => (typeof src === 'string' ? src.trim() : '')).filter(Boolean);
    container.classList.remove('gallery');
    container.classList.add('scroll-gallery');
    container.innerHTML = '';

    if(!validImages.length){
      const placeholderWrap = document.createElement('div');
      placeholderWrap.className = 'scroll-gallery__placeholders';
      const placeholderCount = 4;
      for(let i=0;i<placeholderCount;i++){
        const placeholder = document.createElement('div');
        placeholder.className = 'scroll-gallery__item scroll-gallery__item--placeholder';
        placeholder.textContent = 'For Uploading';
        placeholderWrap.appendChild(placeholder);
      }
      container.appendChild(placeholderWrap);
      return;
    }

    const imgs = validImages.map(src => src || 'CSG.png');
    const track = document.createElement('div');
    track.className = 'scroll-gallery-track';
    const minItems = 8;
    const repeats = Math.max(2, Math.ceil(minItems / imgs.length));
    const loop = [];
    for(let i=0;i<repeats;i++){ loop.push(...imgs); }
    loop.forEach(src => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'scroll-gallery__item';
      const img = document.createElement('img');
      img.src = src;
      img.alt = "Student Leadership Training Program '25";
      btn.appendChild(img);
      btn.addEventListener('click', ()=> openPhotoLightbox(src));
      track.appendChild(btn);
    });
    container.appendChild(track);
    startGalleryLoop(container, track, loop.length);
  }

  function startGalleryLoop(container, track, totalItems){
    if(!track || !container) return;
    let offset = 0;
    const speed = 0.35;
    let loopWidth = track.scrollWidth * (0.5); // half of the duplicated track
    let rafId = null;

    function step(){
      offset -= speed;
      if(-offset >= loopWidth){ offset += loopWidth; }
      track.style.transform = `translateX(${offset}px)`;
      rafId = requestAnimationFrame(step);
    }

    function start(){ if(rafId === null){ rafId = requestAnimationFrame(step); } }
    function stop(){ if(rafId !== null){ cancelAnimationFrame(rafId); rafId = null; } }

    start();
    container.addEventListener('mouseenter', stop);
    container.addEventListener('mouseleave', start);
    window.addEventListener('resize', ()=>{ loopWidth = track.scrollWidth * 0.5; });
  }

  function buildGallerySrc(folder, entry){
    const sanitize = (value)=> (value || '').replace(/\\/g,'/').split('/').filter(Boolean);
    let segments = [];
    if(entry && entry.includes('/')){
      segments = sanitize(entry);
    } else {
      segments = sanitize(folder).concat(entry ? [entry] : []);
    }
    if(!segments.length) return '';
    return segments.map(seg => encodeURIComponent(seg)).join('/');
  }

  function renderEventGalleries(container, events){
    if(!container || !events) return;
    container.innerHTML = '';
    const cards = [];
    events.forEach((event, idx)=>{
      const card = document.createElement('div');
      card.className = 'event-gallery-card';

      const header = document.createElement('div');
      header.className = 'event-gallery__header';
      const title = document.createElement('h3');
      title.className = 'event-gallery__title';
      const label = event && event.title ? event.title : `Event ${idx + 1}`;
      title.textContent = label;
      card.dataset.eventTitle = label.toLowerCase();
      header.appendChild(title);
      card.appendChild(header);

      const galleryEl = document.createElement('div');
      galleryEl.className = 'scroll-gallery';
      card.appendChild(galleryEl);
      container.appendChild(card);
      cards.push(card);

      const sources = ((event && event.photos) || []).map(photo => buildGallerySrc(event.folder, photo)).filter(Boolean);
      initScrollingGallery(galleryEl, sources);
    });
    const empty = document.createElement('div');
    empty.className = 'event-gallery__empty';
    empty.textContent = 'No events match your search.';
    empty.hidden = true;
    container.appendChild(empty);
    container._eventCards = cards;
    container._eventEmptyState = empty;
  }

  function setupEventGallerySearch(input, container){
    if(!input || !container) return;
    const applyFilter = ()=>{
      const term = (input.value || '').trim().toLowerCase();
      let visibleCount = 0;
      (container._eventCards || []).forEach(card => {
        const title = card.dataset.eventTitle || '';
        const matches = !term || title.includes(term);
        card.style.display = matches ? '' : 'none';
        if(matches) visibleCount++;
      });
      if(container._eventEmptyState){
        container._eventEmptyState.hidden = visibleCount !== 0;
      }
    };
    input.addEventListener('input', applyFilter);
    applyFilter();
  }

  function openPhotoLightbox(src){
    const modal = document.getElementById('photoLightbox');
    const img = document.getElementById('photoLightboxImage');
    if(!modal || !img) return;
    img.src = src || 'CSG.png';
    modal.hidden = false;
  }

  function closePhotoLightbox(){
    const modal = document.getElementById('photoLightbox');
    if(!modal) return;
    const img = document.getElementById('photoLightboxImage');
    if(img) img.src = '';
    modal.hidden = true;
  }
})();
