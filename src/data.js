// ─── Edit all site content here ───────────────────────────────────────────
export const SITE = {
  name: 'Sri Vidya',
  tagline: 'Tuition Centre',
  founder: 'Mrs. Lakshmi Priya',
  founderTitle: 'Founder & Director',
  founderQual: 'M.Sc (Mathematics), B.Ed · 15+ years of teaching',
  phone: '+91 98765 43210',
  phoneRaw: '919876543210',
  email: 'info@srividyatuition.in',
  address: 'Vibhav Complex, 1st Floor, Sathipuram – 517423',
  mapQuery: 'Vibhav Complex, Sathipuram, 517423',
  timings: ['Mon–Sat: 6:30–9:00 AM & 4:00–8:30 PM', 'Sunday: Doubt-clearing sessions'],
};

export const waLink = (text = 'Hello Ma\'am, I would like to know about admissions.') =>
  `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(text)}`;

// One chapter per scene of public/videos/story.mp4; `from`/`to` are that scene's start and end in seconds.
export const STORY = [
  { title: 'Parents meet Ma\'am', text: 'Every journey starts with a conversation. Ma\'am listens to each family and understands what their child needs.', icon: 'ri-chat-smile-2-line', from: 0, to: 2.0 },
  { title: 'Ma\'am teaches', text: 'Concepts come alive on the board. In small batches, every child is seen, heard and helped.', icon: 'ri-presentation-line', from: 2.0, to: 4.0 },
  { title: 'Top marks!', text: 'Hard work pays off: an A+ to show, with proud parents and a proud teacher to share it with.', icon: 'ri-trophy-line', from: 4.0, to: 7.9 },
];

export const COURSE_CATEGORIES = {
  'School Tuitions': { icon: 'ri-school-line', blurb: 'Daily tuition for State Board, CBSE and ICSE students, aligned to the school syllabus.' },
  Intermediate: { icon: 'ri-graduation-cap-line', blurb: 'Focused coaching for Intermediate board exams with chapter-wise tests.' },
  Competitive: { icon: 'ri-trophy-line', blurb: 'Early foundation for IIT, NEET, Olympiads and scholarship exams.' },
  Computers: { icon: 'ri-computer-line', blurb: 'Hands-on lab courses, one student per computer, from basics to coding.' },
  'Skill Courses': { icon: 'ri-sparkling-2-line', blurb: 'Short courses that build confidence, speed and communication.' },
};

export const COURSES = {
  'School Tuitions': [
    { title: 'Primary', level: 'Class 1 – 5', desc: 'Strong basics in reading, writing and numbers, with homework support every day.', subjects: ['Maths', 'English', 'Science', 'Telugu', 'Hindi'], time: '4:30 – 6:30 PM', batch: '12 students' },
    { title: 'High School', level: 'Class 6 – 10', desc: 'Concept-first teaching, weekly tests and full board-exam preparation for Class 10.', subjects: ['Maths', 'Physics', 'Chemistry', 'Biology', 'Social', 'English'], time: '6:30 – 8:30 AM / 5:30 – 8:30 PM', batch: '15 students' },
  ],
  Intermediate: [
    { title: 'MPC', level: 'Class 11 – 12', desc: 'Board exam coaching with problem-solving practice for engineering aspirants.', subjects: ['Maths 1A/1B', 'Physics', 'Chemistry'], time: '6:00 – 8:30 AM', batch: '15 students' },
    { title: 'BiPC', level: 'Class 11 – 12', desc: 'Board exam coaching with diagram and theory practice for medical aspirants.', subjects: ['Botany', 'Zoology', 'Physics', 'Chemistry'], time: '6:00 – 8:30 AM', batch: '15 students' },
    { title: 'CEC / MEC', level: 'Class 11 – 12', desc: 'Commerce subjects taught with real-world examples and solved papers.', subjects: ['Accounts', 'Economics', 'Commerce'], time: '5:30 – 7:30 PM', batch: '15 students' },
  ],
  Competitive: [
    { title: 'IIT Foundation', level: 'Class 6 – 10', desc: 'Builds the logic and problem-solving depth needed for JEE in later years.', subjects: ['Maths', 'Physics', 'Chemistry', 'Reasoning'], time: 'Weekends · 9 AM – 1 PM', batch: '20 students' },
    { title: 'NEET Foundation', level: 'Class 8 – 10', desc: 'Early grounding in biology and science concepts tested in NEET.', subjects: ['Biology', 'Physics', 'Chemistry'], time: 'Weekends · 2 – 5 PM', batch: '20 students' },
    { title: 'Olympiad & NTSE', level: 'Class 3 – 10', desc: 'Practice with previous papers and timed mock tests for scholarship exams.', subjects: ['Maths', 'Science', 'Mental Ability'], time: 'Sundays · 10 AM – 12 PM', batch: '15 students' },
  ],
  Computers: [
    { title: 'Computer Basics', level: 'Age 7+', desc: 'A first, safe introduction to computers, typing and the internet.', subjects: ['Typing', 'Paint', 'Internet Safety', 'MS Word'], time: '3 months · Mon / Wed / Fri', batch: '1 student : 1 PC' },
    { title: 'Coding for Kids', level: 'Age 9+', desc: 'Children build their own games and animations while learning logic.', subjects: ['Scratch', 'Python', 'Mini Games', 'Logic'], time: '4 months · Weekends', batch: '1 student : 1 PC' },
    { title: 'Office & Tally', level: 'Class 9+', desc: 'Job-ready skills in spreadsheets, presentations and accounting software.', subjects: ['Excel', 'PowerPoint', 'Tally Prime', 'GST basics'], time: '3 months · Evenings', batch: '1 student : 1 PC' },
  ],
  'Skill Courses': [
    { title: 'Spoken English', level: 'All ages', desc: 'Speak fluently and confidently through daily speaking practice.', subjects: ['Grammar', 'Speaking', 'Confidence', 'Interviews'], time: '2 months · Evenings', batch: '12 students' },
    { title: 'Handwriting', level: 'Class 1 – 7', desc: 'Neat, fast handwriting that helps in every exam.', subjects: ['Cursive', 'Speed', 'Neatness'], time: '1 month · Weekends', batch: '10 students' },
    { title: 'Abacus & Vedic Maths', level: 'Age 6 – 14', desc: 'Faster mental calculation, better memory and concentration.', subjects: ['Mental maths', 'Speed', 'Memory'], time: '3 months · Weekends', batch: '12 students' },
  ],
};

export const METHOD = [
  { no: '01', title: 'Understand', text: 'Every new topic starts with the "why", using real-life examples, models and visuals.', icon: 'ri-brain-line' },
  { no: '02', title: 'Practise', text: 'Graded worksheets from easy to exam-level, solved under Ma\'am\'s eye in class.', icon: 'ri-pencil-ruler-2-line' },
  { no: '03', title: 'Test', text: 'Weekly tests and monthly mock exams in a real exam setting.', icon: 'ri-file-list-3-line' },
  { no: '04', title: 'Review', text: 'Mistakes analysed one by one. Progress is shared with parents on WhatsApp.', icon: 'ri-line-chart-line' },
];

export const FACULTY = [
  { name: 'Mr. Ravi Kumar', subject: 'Physics & Maths', qual: 'M.Sc, B.Ed', exp: '12 yrs', initials: 'RK' },
  { name: 'Mrs. Anitha Reddy', subject: 'English & Social', qual: 'M.A, B.Ed', exp: '10 yrs', initials: 'AR' },
  { name: 'Mr. Srinivas Rao', subject: 'Chemistry & Biology', qual: 'M.Sc, B.Ed', exp: '9 yrs', initials: 'SR' },
  { name: 'Ms. Divya Sri', subject: 'Computers & Coding', qual: 'B.Tech (CSE)', exp: '6 yrs', initials: 'DS' },
];

export const FACILITIES = [
  { icon: 'ri-computer-fill', title: 'Computer Lab', text: '25 modern PCs, 1:1 practice' },
  { icon: 'ri-slideshow-3-fill', title: 'Smart Classrooms', text: 'Digital boards & projectors' },
  { icon: 'ri-temp-cold-fill', title: 'AC Classrooms', text: 'Comfortable, well-lit rooms' },
  { icon: 'ri-book-shelf-fill', title: 'Library', text: '2,000+ books & guides' },
  { icon: 'ri-webcam-fill', title: 'CCTV Security', text: 'Safe campus, monitored 24/7' },
  { icon: 'ri-drop-fill', title: 'RO Drinking Water', text: 'Clean & hygienic' },
  { icon: 'ri-battery-charge-fill', title: 'Power Backup', text: 'No class ever interrupted' },
  { icon: 'ri-parking-box-fill', title: 'Parking', text: 'Safe drop-off & pick-up' },
  { icon: 'ri-file-list-3-fill', title: 'Test Hall', text: 'Real exam-like environment' },
  { icon: 'ri-first-aid-kit-fill', title: 'First Aid', text: 'Medical kit always ready' },
  { icon: 'ri-wifi-fill', title: 'High-speed Wi-Fi', text: '100 Mbps fibre internet' },
  { icon: 'ri-whatsapp-fill', title: 'Parent Updates', text: 'Reports on WhatsApp' },
];

export const TOPPERS = [
  { name: 'Harshitha', cls: '10th Class', score: '595/600', hue: 'sun' },
  { name: 'Karthik', cls: 'Inter MPC', score: '987/1000', hue: 'leaf' },
  { name: 'Sravya', cls: '10th Class', score: '591/600', hue: 'coral' },
  { name: 'Mohammed Aamir', cls: 'Inter BiPC', score: '979/1000', hue: 'sun' },
];

export const STATS = [
  { value: 15, suffix: '+', label: 'Years of teaching' },
  { value: 1200, suffix: '+', label: 'Students taught' },
  { value: 98, suffix: '%', label: 'A-grade results' },
  { value: 45, suffix: '', label: 'State rankers' },
];

// Free stock media (Unsplash photos, Mixkit videos). Swap with the centre's real photos/videos later.
const img = (id, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;
const vid = (id) => ({ src: `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`, poster: `https://assets.mixkit.co/videos/${id}/${id}-thumb-720-0.jpg` });

export const GALLERY = [
  { type: 'video', title: 'A morning class in progress', cat: 'Classroom', ...vid(14956), size: 'wide' },
  { type: 'photo', title: 'Our happy learners', cat: 'Students', src: img('1497486751825-1233686d5d80'), size: 'tall' },
  { type: 'photo', title: 'Hands up, every doubt counts', cat: 'Classroom', src: img('1577896851231-70ef18881754') },
  { type: 'photo', title: 'Focused practice time', cat: 'Study', src: img('1588072432836-e10032774350') },
  { type: 'video', title: 'Off to tuition!', cat: 'Students', ...vid(15016) },
  { type: 'photo', title: 'Computer lab session', cat: 'Computer Lab', src: img('1610484826967-09c5720778c7'), size: 'tall' },
  { type: 'video', title: 'Solving it on the board', cat: 'Teaching', ...vid(4619), size: 'wide' },
  { type: 'photo', title: 'Maths made simple', cat: 'Teaching', src: img('1596495577886-d920f1fb7238') },
  { type: 'photo', title: 'Group study', cat: 'Classroom', src: img('1509062522246-3755977927d7') },
  { type: 'video', title: 'Homework, sorted', cat: 'Study', ...vid(4761) },
  { type: 'photo', title: 'Love to learn', cat: 'Campus', src: img('1546410531-bb4caa6b424d') },
  { type: 'video', title: 'Teacher explaining concepts', cat: 'Teaching', ...vid(48165), size: 'wide' },
  { type: 'photo', title: 'First lessons', cat: 'Primary', src: img('1503676260728-1c00da094a0b') },
  { type: 'photo', title: 'Our library corner', cat: 'Campus', src: img('1456513080510-7bf3a84b82f8') },
  { type: 'video', title: 'Study desk essentials', cat: 'Study', ...vid(50111) },
];

// Photos used in the scrolling photo band
export const BAND = [
  '1577896851231-70ef18881754', '1497486751825-1233686d5d80', '1588072432836-e10032774350', '1509062522246-3755977927d7',
  '1503676260728-1c00da094a0b', '1610484826967-09c5720778c7', '1596495577886-d920f1fb7238', '1546410531-bb4caa6b424d',
  '1456513080510-7bf3a84b82f8', '1516534775068-ba3e7458af70', '1580582932707-520aed937b7b', '1434030216411-0b793f4b4173',
].map((id) => img(id, 600));

export const CTA_VIDEO = vid(35954);

export const TESTIMONIALS = [
  { quote: 'My son was scared of Maths. In one year with Ma\'am he scored 98 in the board exam. She doesn\'t just teach, she builds confidence.', name: 'Suresh Kumar', role: 'Father of Karthik, Class 10' },
  { quote: 'The weekly WhatsApp reports are a blessing for working parents like us. We always know exactly where our daughter stands.', name: 'Padmavathi', role: 'Mother of Sravya, Class 8' },
  { quote: 'Small batches really make the difference. Every child gets attention, and the computer lab is a big bonus.', name: 'Rajesh Varma', role: 'Father of twins, Class 5' },
  { quote: 'Ma\'am treats every student like her own child. My daughter actually looks forward to tuition every evening!', name: 'Fathima Begum', role: 'Mother of Ayesha, Class 7' },
];

export const FAQS = [
  { q: 'What is the batch size?', a: 'A maximum of 15 students per batch, so every child gets personal attention from the teacher.' },
  { q: 'Do you offer a free demo class?', a: 'Yes! Your child can attend a free demo class before you decide. Book it through the enquiry form or WhatsApp.' },
  { q: 'Which syllabus do you follow?', a: 'We cover State Board, CBSE and ICSE syllabi with separate study material for each.' },
  { q: 'How will I know my child\'s progress?', a: 'Weekly test marks are shared on WhatsApp, and we hold a parent–teacher meeting every month.' },
  { q: 'What are the computer lab facilities?', a: '25 modern desktop PCs (one per student), 100 Mbps internet, a smart projector, full UPS backup and an air-conditioned lab.' },
  { q: 'Are there fee instalment options?', a: 'Yes, fees can be paid monthly, quarterly or yearly. Sibling discounts are also available.' },
];
