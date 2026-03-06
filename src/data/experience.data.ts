export interface Job {
  date: string
  company: string
  role: string
  description: string
  tags: string[]
  legacy?: boolean
}

export const jobs: Job[] = [
  {
    date: 'XI.2022 — XII.2023',
    company: 'Confidential · B2B Contract',
    role: 'Front-End Engineer',
    description: 'Developing Front-End microservices, refactoring code across multiple projects.',
    tags: ['React', 'TypeScript', 'MaterialUI', 'Docker'],
  },
  {
    date: 'III.2021 — VII.2022',
    company: 'Studio tańca NF',
    role: 'Front-End Developer',
    description: 'Client service, evidence management, web research, website maintenance, advertisement campaigns via Google Ads.',
    tags: ['React', 'Google Ads'],
  },
  {
    date: 'I.2020 — II.2021',
    company: 'Confidential',
    role: 'Software Engineer',
    description: 'Development of Consent (RODO) panel in Preact.js and TypeScript. Maintenance of Python backend microservices. Continuous integration of middleware advertisement service in Vanilla JS.',
    tags: ['Preact', 'TypeScript', 'Python', 'CI/CD', 'Vanilla JS'],
  },
  {
    date: 'X.2018 — XII.2019',
    company: 'Self-directed',
    role: 'Development & Study',
    description: 'Self-education and practice: Java and Python fundamentals. Support for a family business — site design, maintenance, advertisement campaigns.',
    tags: ['Java', 'Python'],
  },
  {
    date: 'IV.2016 — X.2018',
    company: 'Confidential',
    role: 'Developer',
    description: 'Video Player front-end, WebCKM Video CMS (React + Python), LivePanel live video service (Angular + Python). REST API development, VPAID JS interactive ad templates, HIVE data analysis, unit tests + CI.',
    tags: ['React', 'Angular', 'Python', 'REST', 'VPAID', 'HIVE'],
  },
  {
    date: 'I.2016 — IV.2016',
    company: 'Confidential · Contract',
    role: 'Senior Flash Developer',
    description: 'Integration of IMA SDK with company player. Refactoring and debugging the player. Integrating Flash layer with JavaScript. Attending Scrum meetings.',
    tags: ['Flash', 'ActionScript 3', 'JavaScript', 'Scrum'],
  },
  {
    date: 'VI.2014 — X.2015',
    company: 'Confidential',
    role: 'Senior Flash Developer',
    description: 'Game deployment and testing on iPad, Android, and Web. Contributing bug fixes in root client SDK. Managing and taking part in everyday groomings.',
    tags: ['Flash', 'ActionScript 3', 'Mobile'],
    legacy: true,
  },
  {
    date: 'III.2013 — IX.2013',
    company: 'Confidential',
    role: 'Senior Flash Developer',
    description: 'Development of online pre-paid games. Creating video trailers for the games.',
    tags: ['Flash', 'ActionScript 3', 'Video'],
    legacy: true,
  },
  {
    date: 'II.2012 — XI.2012',
    company: 'Confidential',
    role: 'TeamLeader · Senior Flash Developer',
    description: 'Social network games development. Managing company satellite office and projects.',
    tags: ['Flash', 'ActionScript 3', 'Team Lead'],
    legacy: true,
  },
  {
    date: 'XI.2009 — XII.2011',
    company: 'Confidential',
    role: 'Senior Flash Developer',
    description: 'Creation of 12 standing info-spot multimedia presentations for the History Museum of Kraków. Development of web pages, games and presentations.',
    tags: ['Flash', 'ActionScript 3', 'Multimedia'],
    legacy: true,
  },
  {
    date: 'VIII.2008 — VI.2014',
    company: 'Self Employed',
    role: 'Freelance · Micro-company B2B',
    description: 'Managing own micro-company. Creating multimedia applications and developing web pages for various clients.',
    tags: ['Flash', 'ActionScript 3', 'AmfPHP', 'Web'],
    legacy: true,
  },
  {
    date: 'XII.2007 — V.2008',
    company: 'Confidential',
    role: 'Multimedia Specialist',
    description: 'Creating multimedia presentations. Programming educational games.',
    tags: ['Flash', 'ActionScript 3', 'Multimedia'],
    legacy: true,
  },
]
