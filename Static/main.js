// Minimal JS to populate documents and officers and handle simple routing + palette switching
(function(){
  const data = {
    resolutions: [
      {id: 'R-2025-001', title: 'Adoption of Campus Health Protocols', date: '2025-03-10', file: '#'},
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
      current: [
        {name: 'Alex Cruz', role: 'President'},
        {name: 'Maria Santos', role: 'Vice President'},
        {name: 'Jun Dizon', role: 'Secretary'}
      ],
      last: [
        {name: 'Liza Perez', role: 'President'},
        {name: 'Ramon Reyes', role: 'Vice President'}
      ]
    }
  };

  function el(id){return document.getElementById(id)}

  function renderList(container, items, type){
    container.innerHTML = '';
    items.forEach(it=>{
      const d = document.createElement('div');
      d.className = 'doc';
      d.innerHTML = `<a href="${it.file}" target="_blank" rel="noopener">${it.title}</a><small>${it.id} • ${it.date}</small>`;
      container.appendChild(d);
    });
  }

  function renderOfficers(container, list){
    container.innerHTML = '';
    list.forEach(o=>{
      const d = document.createElement('div');
      d.className = 'officer';
      d.innerHTML = `<div class="name">${o.name}</div><div class="role">${o.role}</div>`;
      container.appendChild(d);
    });
  }

  // mount
  document.addEventListener('DOMContentLoaded', ()=>{
    renderList(el('resolutions'), data.resolutions);
    renderList(el('activity-proposals'), data.activityProposals);
    renderList(el('project-proposals'), data.projectProposals);
    renderList(el('minutes'), data.minutes);

    renderOfficers(el('current-officers'), data.officers.current);
    renderOfficers(el('last-officers'), data.officers.last);

    // palette switching
    const palette = el('palette');
    palette.addEventListener('change', (e)=>{
      document.documentElement.classList.remove('term-blue','term-green','term-gold');
      if(e.target.value !== 'default') document.documentElement.classList.add(e.target.value);
    });

    // simple hash routing
    function showRoute(route){
      document.querySelectorAll('.page').forEach(p=>p.hidden=true);
      const elRoute = document.getElementById(route) || document.getElementById('home');
      elRoute.hidden = false;
      document.querySelectorAll('.main-nav a').forEach(a=>a.classList.toggle('active', a.getAttribute('data-route')===route));
    }

    function handleHash(){
      const r = location.hash.replace('#','') || 'home';
      showRoute(r);
    }

    window.addEventListener('hashchange', handleHash);
    handleHash();
  });
})();
