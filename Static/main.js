// Minimal JS to populate documents and officers and handle simple routing + palette switching
(function(){
  const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  const PDF_ZOOM_DEFAULT = 0.9;
  const PDF_ZOOM_STEP = 0.1;
  const PDF_ZOOM_MIN = 0.6;
  const PDF_ZOOM_MAX = 1.5;
  const CURRENT_TERM = 'A.Y. 2025 - 2026';
  const CURRENT_SEMESTER = '1st Semester';
  let _pdfZoom = PDF_ZOOM_DEFAULT;
  let _pdfSource = null;
  const _galleryLoops = [];
  const data = {
    resolutions: [
      {id: 'Resolution 1', title: 'Temporary Assumption of Financial Responsibilities', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 1 - Temporary Assumption of Financial Responsibilities.pdf'},
      {id: 'Resolution 2', title: 'Budget Allocation for SLTP', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 2 - Budget Allocation for SLTP.pdf'},
      {id: 'Resolution 3', title: 'Discount Payment for SLTP Shirt', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 3 - Discount Payment for SLTP Shirt.pdf'},
      {id: 'Resolution 4', title: 'Institutionalize of Uniform Donation', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 4 - Institutionalize of Uniform Donation.pdf'},
      {id: 'Resolution 5', title: 'Selecting of New CSG Adviser', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 5 - Selecting of New CSG Adviser.pdf'},
      {id: 'Resolution 6', title: 'Appointing of Treasurer General, SAP BA, and SAP OFAD', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 6 - Appointing of Treasurer General, SAP BA, and SAP OFAD.pdf'},
      {id: 'Resolution 7', title: 'Adjusting of SLTP Dates', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 7 - Adjusting of SLTP Dates.pdf'},
      {id: 'Resolution 8', title: 'Allocating Budget for Pande-Kape ni Kabsuy', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 8 - Allocating Budget for Pande-Kape ni Kabsuy.pdf'},
      {id: 'Resolution 9', title: 'Selecting of New Adviser', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 9 - Selecting of New Adviser.pdf'},
      {id: 'Resolution 10', title: 'Opening of COA to All Executives excluding Treasurers and Auditors', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 10 - Opening of COA to All Executives excluding Treasurers and Auditors.pdf'},
      {id: 'Resolution 11', title: 'Creating Ad Hoc Committee on Website Development', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 11 - Creating Ad Hoc Committee on Website Development.pdf'},
      {id: 'Resolution 12', title: 'PHASE 1 COMMENCEMENT FOR OITS', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 12 - PHASE 1 COMMENCEMENT FOR OITS.pdf'},
      {id: 'Resolution 13', title: 'Establishment of Committee of the CSG', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 13 - Establishment of Committee of the CSG.pdf'},
      {id: 'Resolution 14', title: 'Appointing of GAD Repre and Assistant Auditor', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 14 - Appointing of GAD Repre and Assistant Auditor.pdf'},
      {id: 'Resolution 16', title: 'Budget Allocation for Student Hours', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 16 - Budget Allocation for Student Hours.pdf'},
      {id: 'Resolution 17', title: 'Budget Allocation for Level-Up Paskuhan', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 17 - Budget Allocation for Level-Up Paskuhan.pdf'},
      {id: 'Resolution 18', title: 'Budget Allocation for Pelikulaya', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 18 - Budget Allocation for Pelikulaya.pdf'},
      {id: 'Resolution 20', title: "Student Hours' MASAsagot Mo Ba, The Game Show", term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: "files/A.Y. 2025 - 2026/1st Semester/Resolution/Resolution 20 - Student Hours' MASAsagot Mo Ba, The Game Show.pdf"}
    ],
    accomplishmentReports: [],
    financialStatements: [],
    officeMemorandums: [
      {id: 'Office Memorandum 1', title: '1st General Meeting', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Office Memorandum/Office Memorandum 1 - 1st General Meeting.pdf'},
      {id: 'Office Memorandum 2', title: '2nd General Meeting', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Office Memorandum/Office Memorandum 2 - 2nd General Meeting.pdf'},
      {id: 'Office Memorandum 3', title: 'Election of Commisioners for Commision on Audit', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Office Memorandum/Office Memorandum 3 - Election of Commisioners for Commision on Audit.pdf'},
      {id: 'Office Memorandum 4', title: '3rd General Meeting', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Office Memorandum/Office Memorandum 4 - 3rd General Meeting.pdf'},
      {id: 'Office Memorandum 6', title: 'Pledge of Commitment', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Office Memorandum/Office Memorandum 6 - Pledge of Commitment.pdf'},
      {id: 'Office Memorandum 8', title: '4th General Meeting', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Office Memorandum/Office Memorandum 8 - 4th General Meeting.pdf'},
      {id: 'Office Memorandum 9', title: '1st General Meeting (COC)', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Office Memorandum/Office Memorandum 9 - 1st General Meeting (COC).pdf'},
      {id: 'Office Memorandum 10', title: '5th General Meeting', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Office Memorandum/Office Memorandum 10 - 5th General Meeting.pdf'},
      {id: 'Office Memorandum 11', title: '2nd Special Meeting', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Office Memorandum/Office Memorandum 11 - 2nd Special Meeting.pdf'},
      {id: 'Office Memorandum 13', title: '6th General Meeting', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Office Memorandum/Office Memorandum 13 - 6th General Meeting.pdf'},
      {id: 'Office Memorandum 14', title: '3rd Special Meeting', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Office Memorandum/Office Memorandum 14 - 3rd Special Meeting.pdf'},
      {id: 'Office Memorandum 15', title: 'Paskuhan Preparation', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Office Memorandum/Office Memorandum 15 - Paskuhan Preparation.pdf'},
      {id: 'Office Memorandum 17', title: '7th General Meeting', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Office Memorandum/Office Memorandum 17 - 7th General Meeting.pdf'}
    ],
    activityProposals: [
      {id: 'Project Proposal - Student Hours', title: 'Student Hours', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Activity Proposal/Project Proposal - Student Hours.pdf'},
      {id: 'Project Proposal - MASAsagot Mo Ba', title: 'MASAsagot Mo Ba', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Activity Proposal/Project Proposal - MASAsagot Mo Ba.pdf'},
      {id: 'Project Proposal - Level-Up Paskuhan', title: 'Level-Up Paskuhan', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Activity Proposal/Project Proposal - Level-Up Paskuhan.pdf'},
      {id: 'Project Proposal - CSG Year-End Party', title: 'CSG Year-End Party', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Activity Proposal/Project Proposal - CSG Year-End Party.pdf'},
      {id: 'Project Proposal - PELIKULAYA', title: 'PELIKULAYA', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Activity Proposal/Project Proposal - PELIKULAYA.pdf'},
      {id: 'Activity Proposal - SLTP', title: 'SLTP', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Activity Proposal/Activity Proposal - SLTP.pdf'}
    ],
    projectProposals: [
      {id: 'Project Proposal - Chat.CSG', title: 'Chat.CSG', priority: 4, term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Project Proposal/Project Proposal - Chat.CSG.pdf'},
      {id: 'Project Proposal - Pande Kape Ni Kabsuy 1', title: 'Pande Kape Ni Kabsuy 1', priority: 3, term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Project Proposal/Project Proposal - Pande Kape Ni Kabsuy 1.pdf'},
      {id: 'Project Proposal - CSG Imus OITS - Phase 1', title: 'CSG Imus OITS - Phase 1', priority: 2, term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Project Proposal/Project Proposal - CSG Imus OITS - Phase 1.pdf'},
      {id: 'Project Proposal - Panamitang-Bayani', title: 'Panamitang-Bayani', priority: 1, term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Project Proposal/Project Proposal - Panamitang-Bayani.pdf'},
      {id: 'Project Proposal - SLTP Shirt', title: 'SLTP Shirt', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Project Proposal/Project Proposal - SLTP Shirt.pdf'}
    ],
    minutes: [
      {id: 'Minutes - September 17, 2025', title: 'SDS Office (F2F)', date: '2025-09-17', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Minutes of the Meeting/September 17, 2025 - SDS Office (F2F).pdf'},
      {id: 'Minutes - September 18, 2025', title: 'Google Meet', date: '2025-09-18', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Minutes of the Meeting/September 18, 2025 - Google Meet.pdf'},
      {id: 'Minutes - September 19, 2025', title: 'Google Meet', date: '2025-09-19', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Minutes of the Meeting/September 19, 2025 - Google Meet.pdf'},
      {id: 'Minutes - September 22, 2025', title: 'Google Meet', date: '2025-09-22', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Minutes of the Meeting/September 22, 2025 - Google Meet.pdf'},
      {id: 'Minutes - September 27, 2025', title: 'Google Meet', date: '2025-09-27', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Minutes of the Meeting/September 27, 2025 - Google Meet.pdf'},
      {id: 'Minutes - September 30, 2025', title: 'Google Meet', date: '2025-09-30', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Minutes of the Meeting/September 30, 2025 - Google Meet.pdf'},
      {id: 'Minutes - October 1, 2025', title: 'CSG Office (F2F)', date: '2025-10-01', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Minutes of the Meeting/October 1, 2025 - CSG Office (F2F).pdf'},
      {id: 'Minutes - October 11, 2025', title: 'Google Meet', date: '2025-10-11', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Minutes of the Meeting/October 11, 2025 - Google Meet.pdf'},
      {id: 'Minutes - October 16, 2025', title: 'Google Meet', date: '2025-10-16', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Minutes of the Meeting/October 16, 2025 - Google Meet.pdf'},
      {id: 'Minutes - November 8, 2025', title: 'Google Meet', date: '2025-11-08', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Minutes of the Meeting/November 8, 2025 - Google Meet.pdf'},
      {id: 'Minutes - November 13, 2025', title: 'Google Meet', date: '2025-11-13', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Minutes of the Meeting/November 13, 2025 - Google Meet.pdf'},
      {id: 'Minutes - November 20, 2025', title: 'SDS Office (F2F)', date: '2025-11-20', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Minutes of the Meeting/November 20, 2025 - SDS Office (F2F).pdf'},
      {id: 'Minutes - November 22, 2025 (Office)', title: 'CSG Office (F2F)', date: '2025-11-22', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Minutes of the Meeting/November 22, 2025 - CSG Office (F2F).pdf'},
      {id: 'Minutes - November 22, 2025 (Online)', title: 'Google Meet', date: '2025-11-22', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Minutes of the Meeting/November 22, 2025 - Google Meet.pdf'},
      {id: 'Minutes - November 29, 2025', title: 'Google Meet', date: '2025-11-29', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Minutes of the Meeting/November 29, 2025 - Google Meet.pdf'},
      {id: 'Minutes - December 6, 2025', title: 'CSG Office (F2F)', date: '2025-12-06', term: CURRENT_TERM, semester: CURRENT_SEMESTER, file: 'files/A.Y. 2025 - 2026/1st Semester/Minutes of the Meeting/December 06, 2025 - CSG Office (F2F).pdf'}
    ],
    officers: {
      executives: [
        {name: 'Zoe R. Gil', role: 'President', photo: 'officer-photos/current-term/pres.png', facebook: 'https://www.facebook.com/share/1BaEa8GUoE/'},
        {name: 'Ken B. Lentejas', role: 'Vice President for Internal Affairs', photo: 'officer-photos/current-term/vpi.png', facebook: 'https://www.facebook.com/keyihen.el'},
        {name: 'John Jefferson M. De Leon', role: 'Vice President for External Affairs', photo: 'officer-photos/current-term/vpe.png', facebook: 'https://www.facebook.com/jph.mtsdln'},
        {name: 'Daniel D. Camacláng', role: 'Secretary General', photo: 'officer-photos/current-term/sec.png', facebook: 'https://www.facebook.com/share/1A7XDawVVp/'},
        {name: 'Samantha Natalie Fattalo', role: 'Treasurer', photo: 'officer-photos/current-term/treasurer.png', facebook: 'https://www.facebook.com/share/1EzE9B7gPS/?mibextid=wwXIfr'},
        {name: 'Cristina V. Domingo', role: 'Auditor', photo: 'officer-photos/current-term/auditor.png', facebook: 'https://www.facebook.com/tin.cvd'},
        {name: 'Kenn Harvey F. Brocoy', role: 'Public Relations Officer', photo: 'officer-photos/current-term/pro.png', facebook: 'https://www.facebook.com/eli.chikenn'}
      ],
      boardMembers: [
        {name: 'Jimmuel D. Palma', role: 'GAD Representative', photo: 'officer-photos/current-term/gad.png', facebook: 'https://www.facebook.com/jimmuelpalma'},
        {name: 'Angela C. Regidor', role: 'SAP Business Administration', photo: 'officer-photos/current-term/ba.png', facebook: 'https://www.facebook.com/share/1BPRgFhHEU/'},
        {name: 'Charles Derrick A. Garcia', role: 'SAP Computer Science', photo: 'officer-photos/current-term/cs.png', facebook: 'https://www.facebook.com/share/1BnreUAh5A/?mibextid=wwXIfr'},
        {name: 'Juanita Anjela M. Rivas', role: 'SAP Education', photo: 'officer-photos/current-term/educ.png', facebook: 'https://www.facebook.com/share/16ySQteSWw/?mibextid=LQQJ4d'},
        {name: 'Mikaella Kathe Palileo', role: 'SAP Entrepreneurship', photo: 'officer-photos/current-term/entrep.png', facebook: 'https://www.facebook.com/share/1Cv4q431YZ/'},
        {name: 'Misael A. Ponferrada', role: 'SAP Hospitality Management', photo: 'officer-photos/current-term/hm.png', facebook: 'https://www.facebook.com/share/14Pcg263Z2i/'},
        {name: 'Ivan P. Duran', role: 'SAP Information Technology', photo: 'officer-photos/current-term/SAP.gif', facebook: 'https://www.facebook.com/infectious.ivan/'},
        {name: 'Chris John Labalan', role: 'SAP Journalism', photo: 'officer-photos/current-term/journ.png', facebook: 'https://www.facebook.com/share/1N69TcWjQk/'},
        {name: 'Lorie P. Salude', role: 'SAP Office Administration', photo: 'officer-photos/current-term/OFAD.png', facebook: 'https://www.facebook.com/share/17XB2CYAQp/'},
        {name: 'Mary Eunice D. Ramos', role: 'SAP Psychology', photo: 'officer-photos/current-term/Psych.png', facebook: 'https://www.facebook.com/merie.ramos.9'}
      ],
      advisers: [
        {name: 'Jenny Danica P. Abayari, MAEd', role: 'Adviser', photo: 'officer-photos/A.Y.2024-2025/adviser-jen.png'},
        {name: 'Alfe M. Solina, DBA', role: 'Adviser', photo: 'CSG.png'}
      ],
      last: {
        executives: [
          {name: 'Rica Babes B. Delos Reyes', role: 'President', photo: 'officer-photos/A.Y.2024-2025/pres.png'},
          {name: 'Neal Brian M. Martija', role: 'Vice President for Internal Affairs', photo: 'officer-photos/A.Y.2024-2025/internal.png'},
          {name: 'Vench Kyla C. Ababon', role: 'Vice President for External Affairs', photo: 'officer-photos/A.Y.2024-2025/external.png'},
          {name: 'Ednalyn Kaye B. Hamili', role: 'Secretary', photo: 'officer-photos/A.Y.2024-2025/sec.png'},
          {name: 'Justine Grace C. Aleman', role: 'Treasurer', photo: 'officer-photos/A.Y.2024-2025/Treas.png'},
          {name: 'Jasmine O. Ramos', role: 'Auditor', photo: 'officer-photos/A.Y.2024-2025/auditor.png'},
          {name: 'Marvin E. Apawan', role: 'P.R.O', photo: 'officer-photos/A.Y.2024-2025/pro.png'}
        ],
        boardMembers: [
          {name: 'Allen Malabanan', role: 'SAP Journalism', photo: 'officer-photos/A.Y.2024-2025/journ.png'},
          {name: 'Chloe O. Regalado', role: 'SAP Office Administration', photo: 'officer-photos/A.Y.2024-2025/ofad.png'},
          {name: 'Johnny S. De Asis Jr.', role: 'SAP Computer Science', photo: 'officer-photos/A.Y.2024-2025/CS.png'},
          {name: 'Sarah Bernalte', role: 'SAP Information Technology', photo: 'officer-photos/A.Y.2024-2025/it.png'},
          {name: 'Hannah Coleen M. Marteriz', role: 'SAP Education', photo: 'officer-photos/A.Y.2024-2025/educ.png'},
          {name: 'Ma. Nicole E. Valenzuela', role: 'SAP Business Administration', photo: 'officer-photos/A.Y.2024-2025/ba.png'},
          {name: 'Hans Christian O. Ancierto', role: 'SAP Psychology', photo: 'officer-photos/A.Y.2024-2025/psych.png'},
          {name: 'Mary Carmelemn H. Catoltol', role: 'SAP Hospitality Management', photo: 'officer-photos/A.Y.2024-2025/hm.png'},
          {name: 'Jhomari Kenshin P. Sarte', role: 'SAP Entrepreneurship', photo: 'officer-photos/A.Y.2024-2025/entrep.png'}
          ],
          advisers: [
            {name: 'Rhoel Joseph R. Sarino, MIT', role: 'Adviser', photo: 'officer-photos/A.Y.2024-2025/adviser-rhoel.png'},
            {name: 'Jenny Danica P. Abayari, MAEd', role: 'Adviser', photo: 'officer-photos/A.Y.2024-2025/adviser-jen.png'}
          ]
      }
    },
    committees: [
      {name: 'Committee on Creatives (COC)', members: [
        'Zhiro Francisco',
        'Princess Ugerio',
        'Abegail Dizon',
        'Shaine Apin',
        'Kristian Elmer Dela Torre',
        'Dominic Loreno',
        'Reniel Azores',
        'Samantha Eiriel Ocampo',
        'Reign Jairus Liwanag',
        'Sandara Torres',
        'Christine Joy Malabanan',
        'Isaac Yzrayelle Sarmiento',
        'Shaun Russelle Obsenares',
        'Liam Arrel Libid'
      ]},
      {name: 'Rules and Internal Affairs Committee (RIAC)', members: [
        'Rica Babes B. Delos Reyes',
        'Craven Mish Lorraine L. Norbe',
        'Chieko M. Lantajo',
        'Ivan Reniel H. Amangca',
        'Loubert L. Apin',
        'Carmella P. Cayetano',
        'Marvilyn G. Frias',
        'Kimverly S. Mina'
      ]},
      {name: 'Committee on External Affairs (COEXA)', members: [
        "Dean Levi's G. Aquino",
        'Allexzeus Marvel C. Padilla',
        'Juria Mae N. Dela Cerna',
        'Ryren Hagos',
        'Juvert V. Vista'
      ]},
      {name: 'Committee on Culture, Arts and Athletics (CCAA)', members: [
        'Vice Chairperson • Hans Christian O. Ancierto',
        'Secretary • Anjon-Lores E. Cañares',
        'Performing Arts Representative • Jay Ar V. Rondina',
        'Performing Arts Representative • Georgie May G. Tunay',
        'Athletics Representative • Keith Owen B. Silva'
      ]},
      {name: 'Social and Environmental Awareness Committee (SOCENVI)', members: [
        'Jennifer Nazareno',
        'Ralfh Dharren Molina'
      ]},
      {name: 'Committee on Finance (COF)', members: [
        'Arjeff Tejero',
        'Jasmine Ramos',
        'Vhilroi Allyza T. Pader',
        'Arriane Joy H. Alburo',
        'Krisha Lauren L. Genido',
        'Danica Mae C. Viray'
      ]},
      {name: 'Commission on Audit (COA)', members: [
        'Jason T. Pagal',
        'Raine Kristea Candiz Maxine M. Cerro',
        'Matt Froy Davis C. Parilla',
        'Jhomari Kenshin P. Sarte',
        'Ericka Ann P. Palatino'
      ]},
      {name: 'Committee on Student Affairs and Concern (CSAC)', members: [
        'Rhian Llaneza',
        'Angel Sais',
        'Warren Reyes',
        'Julia Consular',
        'Joshua Jaba'
      ]},
      {name: 'Secretariat Committee', members: [
        'Ishra Firreli B. Fernando',
        'Ma. Cristina Hernandez',
        'Minea Sabina M. Feliciano',
        'Jose Angelo Bitanga',
        'Gwen Marinie Paciente',
        'Ariane Nicole D. Comedia',
        'Zachariah Sydney U. Babon'
      ]},
      {name: 'Committee on Web Development (WebDev)', members: [
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

  function filterDocsByTerm(items, term){
    if(!term || term === 'all') return items || [];
    const normalized = term.toLowerCase();
    return (items || []).filter(it => (it.term || '').toLowerCase() === normalized);
  }

  function getAvailableTerms(){
    const terms = new Set();
    Object.values(documentDataMap).forEach(list => {
      (list || []).forEach(item => { if(item && item.term) terms.add(item.term); });
    });
    return Array.from(terms);
  }

  function el(id){return document.getElementById(id)}

  const MAX_DOCS_PER_CATEGORY = 3;

  const TYPE_PREFIXES = {
    'activity-proposals': 'Activity Proposal',
    'project-proposals': 'Project Proposal',
    'minutes': 'Minutes',
    'office-memorandums': 'Office Memorandum',
    'accomplishment-reports': 'Accomplishment Report',
    'financial-statements': 'Financial Statement'
  };

  const SEARCH_ALIASES = [
    {phrase: 'student leadership training program', aliases: ['sltp', "sltp '25", 'sltp25']},
    {phrase: 'pande kape ni kabsuy', aliases: ['pk', 'pk nk', 'pknk', 'kabsuy', 'pande kape']}
  ];

  function deriveAcronym(str){
    const parts = (str || '').match(/[A-Za-z0-9]+/g) || [];
    if(!parts.length) return '';
    const acronym = parts.map(p => p[0]).join('');
    return acronym.length >= 2 ? acronym.toLowerCase() : '';
  }

  function buildSearchText(...parts){
    const tokens = new Set();
    const normalizedParts = [];
    parts.forEach(part => {
      if(!part) return;
      const lower = String(part).toLowerCase();
      normalizedParts.push(lower);
      tokens.add(lower);
      const acronym = deriveAcronym(part);
      if(acronym) tokens.add(acronym);
    });
    const combined = normalizedParts.join(' ');
    SEARCH_ALIASES.forEach(entry => {
      if(!entry || !entry.phrase || !Array.isArray(entry.aliases)) return;
      if(combined.includes(entry.phrase)){
        entry.aliases.forEach(alias => { if(alias) tokens.add(alias.toLowerCase()); });
      }
    });
    return Array.from(tokens).filter(Boolean).join(' ');
  }

  function formatDatePretty(dateStr){
    if(!dateStr) return '';
    const parts = dateStr.split('-');
    if(parts.length === 3){
      const [y, m, d] = parts;
      const year = parseInt(y, 10);
      const monthIdx = parseInt(m, 10) - 1;
      const day = parseInt(d, 10);
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      if(!Number.isNaN(year) && monthIdx >= 0 && monthIdx < 12 && !Number.isNaN(day)){
        return `${months[monthIdx]} ${day}, ${year}`;
      }
    }
    return dateStr;
  }

  function formatDisplayId(id, type){
    if(!id) return '';
    // Keep full label for office memorandums so the prefix shows (e.g., "Office Memorandum 17").
    if(type === 'office-memorandums') return id;
    if(type === 'resolutions') return id;
    const prefix = TYPE_PREFIXES[type];
    if(!prefix) return id;
    const lower = id.toLowerCase();
    const lowerPrefix = prefix.toLowerCase();
    if(lower.startsWith(lowerPrefix)){
      let trimmed = id.slice(prefix.length).trim();
      if(trimmed.startsWith('-') || trimmed.startsWith('—') || trimmed.startsWith(':')) trimmed = trimmed.slice(1).trim();
      return trimmed || id;
    }
    return id;
  }

  function parseDocNumber(id){
    const matches = (id || '').match(/\d+/g);
    if(!matches || !matches.length) return Number.MIN_SAFE_INTEGER;
    const val = parseInt(matches[matches.length - 1], 10);
    return Number.isNaN(val) ? Number.MIN_SAFE_INTEGER : val;
  }

  function sortDocuments(items){
    return (items || []).slice().sort((a, b)=>{
      const aPriority = (a && typeof a.priority === 'number') ? a.priority : 0;
      const bPriority = (b && typeof b.priority === 'number') ? b.priority : 0;
      if(aPriority !== bPriority) return bPriority - aPriority;
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
      d.setAttribute('data-search', buildSearchText(it.title, it.id, it.term, it.semester, type));
      const a = document.createElement('a');
      a.textContent = it.title || 'Untitled';
      const file = it.file || '#';
      if(!file || file === '#'){
        a.href = 'javascript:void(0)';
        a.classList.add('disabled');
      } else {
        a.href = file; // allow right-click save/open
        a.setAttribute('role','button');
        a.addEventListener('click', (e)=>{
          // Left-click opens modal; right-click/context menu still points to the file href for download
          if(e && e.button === 0){
            e.preventDefault();
            try{ openModal(file, {id: it.id, title: it.title, date: it.date, type: type}); }catch(err){ /* fallback suppressed */ }
          }
        });
      }
      d.appendChild(a);
      const small = document.createElement('small');
      const detailLines = [];
      const displayId = formatDisplayId(it.id, type);
      const showDisplayId = type !== 'project-proposals' && type !== 'activity-proposals' && type !== 'minutes';
      if(showDisplayId && displayId) detailLines.push(displayId);
      // For minutes, avoid repeating the date both as id and as date; keep only term/date/semester.
      if(it.term) detailLines.push(it.term);
      const prettyDate = formatDatePretty(it.date);
      if(prettyDate) detailLines.push(prettyDate);
      if(it.semester) detailLines.push(it.semester);
      if(detailLines.length){
        small.innerHTML = '';
        detailLines.forEach(line => {
          const div = document.createElement('div');
          div.textContent = line;
          small.appendChild(div);
        });
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
    renderDocumentsByMode('recent', CURRENT_TERM);
  }

  function renderDocumentsByMode(mode, term){
    const applyTerm = (items)=> filterDocsByTerm(items, term);
    if(mode && mode !== 'recent'){
      const target = documentContainers[mode];
      if(target){
        const items = applyTerm(documentDataMap[mode] || []);
        renderList(target, items, mode, Infinity);
      }
      return;
    }
    Object.keys(documentContainers).forEach(type => {
      const container = documentContainers[type];
      const items = applyTerm(documentDataMap[type] || []);
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
        const corpus = d.getAttribute('data-search') || '';
        const terms = q ? q.split(/\s+/).filter(Boolean) : [];
        const matches = !terms.length || terms.every(term => corpus.includes(term));
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
    const typeSelect = document.getElementById('documents-filter');
    const termSelect = document.getElementById('documents-term');
    const columns = document.querySelectorAll('#documents .doc-col');
    const grid = document.querySelector('#documents .docs-grid');

    if(termSelect){
      const terms = getAvailableTerms();
      const frag = document.createDocumentFragment();
      const allOpt = document.createElement('option');
      allOpt.value = 'all'; allOpt.textContent = 'All terms';
      frag.appendChild(allOpt);
      terms.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t; opt.textContent = t; frag.appendChild(opt);
      });
      termSelect.innerHTML = '';
      termSelect.appendChild(frag);
      if(terms.includes(CURRENT_TERM)) termSelect.value = CURRENT_TERM;
    }

    function applyFilter(){
      const selectedType = (typeSelect && typeSelect.value) || 'recent';
      const selectedTerm = (termSelect && termSelect.value) || 'all';
      columns.forEach(col=>{
        const type = col.getAttribute('data-doc-type');
        const show = selectedType === 'recent' || type === selectedType;
        col.style.display = show ? '' : 'none';
      });
      renderDocumentsByMode(selectedType, selectedTerm);
      if(grid){
        grid.classList.toggle('documents-grid--single', selectedType !== 'recent');
        updateRecentEmptyState(selectedType, grid);
      }
    }

    if(typeSelect) typeSelect.addEventListener('change', applyFilter);
    if(termSelect) termSelect.addEventListener('change', applyFilter);
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
    const items = Array.isArray(list) ? list : [];
    if(!items.length){
      const empty = document.createElement('div');
      empty.className = 'officer officer--placeholder';
      empty.textContent = 'No officers listed yet.';
      container.appendChild(empty);
      return;
    }
    items.forEach(o=>{
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
    renderOfficers(el('advisers'), data.officers.advisers);
    // render committees as dropdown cards (placed under Board Members on the Officers page)
    renderCommittees(el('committees-list-officers'), data.committees);
    // also render on the standalone Committees page (if present)
    renderCommittees(el('committees-list-page'), data.committees);
    // Render last term executives and board members separately
    renderOfficers(el('last-executives'), data.officers.last && data.officers.last.executives);
    renderOfficers(el('last-board-members'), data.officers.last && data.officers.last.boardMembers);
    renderOfficers(el('last-advisers'), data.officers.last && data.officers.last.advisers);

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
    const eventTypeFilter = el('eventGalleryType');
    populateEventTypeFilter(eventTypeFilter, eventGallerySets);
    setupEventGalleryFilters(el('eventGallerySearch'), eventTypeFilter, eventGalleryContainer);
    // Populate About page galleries (current officers + events) using simple sliders
    try{
      const taglineImg = document.querySelector('.about-tagline img');
      if(taglineImg){ taglineImg.src = 'tagline.png'; }
    }catch(e){/* ignore if about page not present */}

    const photoLightboxClose = el('photoLightboxClose');
    const photoLightboxBackdrop = el('photoLightboxBackdrop');
    if(photoLightboxClose) photoLightboxClose.addEventListener('click', closePhotoLightbox);
    if(photoLightboxBackdrop) photoLightboxBackdrop.addEventListener('click', closePhotoLightbox);
  });

  const dashboardPhotos = [ 'Dashboard-Photos/IMG_1195.png', 'Dashboard-Photos/IMG_1462.png', 'Dashboard-Photos/IMG_1498.png' ];
  const eventGallerySets = [
    {
      title: "Oathtaking '25",
      folder: "Event Gallery Materials/Main Event/Oathtaking '25",
      photos: [],
      type: 'Main Event'
    },
    {
      title: "Flag Ceremony '25",
      folder: "Event Gallery Materials/Main Event/Flag Ceremony '25",
      photos: [],
      type: 'Main Event'
    },
    {
      title: "Student Leadership Training Program (SLTP) '25",
      folder: 'Event Gallery Materials/Main Event/SLTP',
      photos: ['IMG_1195.png','IMG_1462.png','IMG_1498.png'],
      type: 'Main Event'
    },
    {
      title: 'Pande Kape ni Kabusy - Midterms',
      folder: 'Event Gallery Materials/Main Event/Pande Kape ni Kabusy - Midterms',
      photos: [],
      type: 'Main Project'
    },
    {
      title: "Paskuhan '25",
      folder: "Event Gallery Materials/Main Event/Paskuhan '25",
      photos: [],
      type: 'Main Project'
    },
    {
      title: "Student Hours '25",
      folder: "Event Gallery Materials/Sub Event/Student Hours '25",
      photos: [],
      type: 'Main Project'
    },
    {
      title: "Pelikulaya '25",
      folder: "Event Gallery Materials/Sub Event/Pelikulaya '25",
      photos: [],
      type: 'Main Project'
    },
    {
      title: 'Pande Kape ni Kabsuy - Finals',
      folder: 'Event Gallery Materials/Sub Event/Pande Kape ni Kabsuy - Finals',
      photos: [],
      type: 'Main Project'
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
    const baseLoop = [];
    for(let i=0;i<repeats;i++){ baseLoop.push(...imgs); }
    const duplicateFactor = 2;
    for(let dup=0; dup<duplicateFactor; dup++){
      baseLoop.forEach(src => {
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
    }
    container.appendChild(track);
    startGalleryLoop(container, track, duplicateFactor);
  }

  function startGalleryLoop(container, track, duplicateFactor = 2){
    if(!track || !container) return;
    let offset = 0;
    const speed = 0.35;
    let loopWidth = track.scrollWidth / (duplicateFactor || 2);
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
    window.addEventListener('resize', ()=>{ loopWidth = track.scrollWidth / (duplicateFactor || 2); });
    const controls = {start, stop};
    _galleryLoops.push(controls);
    return controls;
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
      card.dataset.eventType = (event && event.type ? event.type : '').toLowerCase();

      const header = document.createElement('div');
      header.className = 'event-gallery__header';
      const title = document.createElement('h3');
      title.className = 'event-gallery__title';
      const label = event && event.title ? event.title : `Event ${idx + 1}`;
      title.textContent = label;
      card.dataset.eventTitle = label.toLowerCase();
      header.appendChild(title);

      if(event && event.type){
        const badge = document.createElement('span');
        badge.className = 'event-type-badge';
        badge.textContent = event.type;
        header.appendChild(badge);
      }
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
    empty.textContent = 'No events match your filters.';
    empty.hidden = true;
    container.appendChild(empty);
    container._eventCards = cards;
    container._eventEmptyState = empty;
  }

  function populateEventTypeFilter(select, events){
    if(!select) return;
    const types = Array.from(new Set((events || []).map(ev => (ev && ev.type ? ev.type.trim() : '')).filter(Boolean)));
    select.innerHTML = '';
    const allOpt = document.createElement('option');
    allOpt.value = 'all';
    allOpt.textContent = 'All types';
    select.appendChild(allOpt);
    types.forEach(type => {
      const opt = document.createElement('option');
      opt.value = type.toLowerCase();
      opt.textContent = type;
      select.appendChild(opt);
    });
  }

  function setupEventGalleryFilters(input, select, container){
    if(!container) return;
    const applyFilter = ()=>{
      const term = (input && input.value || '').trim().toLowerCase();
      const type = (select && select.value) ? select.value.toLowerCase() : 'all';
      let visibleCount = 0;
      (container._eventCards || []).forEach(card => {
        const title = card.dataset.eventTitle || '';
        const eventType = card.dataset.eventType || '';
        const matchesTerm = !term || title.includes(term);
        const matchesType = type === 'all' || eventType === type;
        const matches = matchesTerm && matchesType;
        card.style.display = matches ? '' : 'none';
        if(matches) visibleCount++;
      });
      if(container._eventEmptyState){
        container._eventEmptyState.hidden = visibleCount !== 0;
      }
    };
    if(input) input.addEventListener('input', applyFilter);
    if(select) select.addEventListener('change', applyFilter);
    applyFilter();
  }

  function openPhotoLightbox(src){
    const modal = document.getElementById('photoLightbox');
    const img = document.getElementById('photoLightboxImage');
    if(!modal || !img) return;
    img.src = src || 'CSG.png';
    modal.hidden = false;
    _galleryLoops.forEach(ctrl => { try{ ctrl.stop(); }catch(e){} });
  }

  function closePhotoLightbox(){
    const modal = document.getElementById('photoLightbox');
    if(!modal) return;
    const img = document.getElementById('photoLightboxImage');
    if(img) img.src = '';
    modal.hidden = true;
    _galleryLoops.forEach(ctrl => { try{ ctrl.start(); }catch(e){} });
  }
})();
