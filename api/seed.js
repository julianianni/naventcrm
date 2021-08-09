const { ErrorBar } = require('recharts')
const {
  Recruiters,
  Companies,
  Areas,
  States,
  Seniority,
  TypeEmployed,
  Jobs,
  Modality,
  Roles,
  Users,
} = require('./db/models/index')

const { firebase, admin } = require('./firebase')

const users = [
  {
    img: 'https://firebasestorage.googleapis.com/v0/b/naventp5.appspot.com/o/images%2Fa69a8746-be59-4718-bfe6-95a239687b4a.jpg?alt=media&token=e9253650-70b7-44ca-b20d-25641215435',
    name: 'Juan',
    surname: 'Usuario',
    email: 'juanusuario@gmail.com',
    password: 'juanusuario',
    role: 'usuario',
  },
  {
    name: 'Admin',
    surname: 'Navent',
    img: 'https://firebasestorage.googleapis.com/v0/b/naventp5.appspot.com/o/images%2Fa69a8746-be59-4718-bfe6-95a239687b4a.jpg?alt=media&token=e9253650-70b7-44ca-b20d-25641215435e',
    email: 'plataforma5navent@gmail.com',
    password: 'P5Navent5',
    role: 'admin',
  },
  {
    name: 'Pablo',
    surname: 'Auditor',
    img: 'https://firebasestorage.googleapis.com/v0/b/naventp5.appspot.com/o/images%2Fa69a8746-be59-4718-bfe6-95a239687b4a.jpg?alt=media&token=e9253650-70b7-44ca-b20d-25641215435e',
    email: 'pabloauditor@gmail.com',
    password: 'pabloauditor',
    role: 'auditor',
  },
  {
    name: 'Antonio',
    surname: 'Operador',
    img: 'https://firebasestorage.googleapis.com/v0/b/naventp5.appspot.com/o/images%2Fa69a8746-be59-4718-bfe6-95a239687b4a.jpg?alt=media&token=e9253650-70b7-44ca-b20d-25641215435e',
    email: 'antoniooperador@gmail.com',
    password: 'antoniooperador',
    role: 'operador',
  },
]
const roles = ['operador', 'usuario', 'admin', 'auditor']

const seniorities = ['Trainee', 'Junior', 'Semi-Senior', 'Senior', 'Manager']
const states = [
  { name: 'CABA' },
  { name: 'Buenos Aires' },
  { name: 'Catamarca' },
  { name: 'Chaco' },
  { name: 'Chubut' },
  { name: 'Córdoba' },
  { name: 'Corrientes' },
  { name: 'Entre Ríos' },
  { name: 'Formosa' },
  { name: 'Jujuy' },
  { name: 'La Pampa' },
  { name: 'La Rioja' },
  { name: 'Mendoza' },
  { name: 'Misiones' },
  { name: 'Neuquén' },
  { name: 'Rio Negro' },
  { name: 'Salta' },
  { name: 'San Juan' },
  { name: 'San Luis' },
  { name: 'Santa Cruz' },
  { name: 'Santa Fe' },
  { name: 'Santiago del Estero' },
  { name: 'Tierra del Fuego' },
  { name: 'Tucumán' },
]
const senioritysToMap = [
  { name: 'Trainee' },
  { name: 'Junior' },
  { name: 'Semi-Senior' },
  { name: 'Senior' },
  { name: 'Manager' },
]

const areas = [
  { name: 'Ingenierías' },
  { name: 'Comercial, Ventas y Negocios' },
  { name: 'Gerencia y Dirección General' },
  { name: 'Administración, Contabilidad y Finanzas' },
  { name: 'Recursos Humanos y Capacitación' },
  { name: 'Minería, Petróleo y Gas' },
  { name: 'Seguros' },
  { name: 'Tecnología, Sistemas y Telecomunicaciones' },
  { name: 'Salud, Medicina, Enfermería y Farmacia' },
  { name: 'Marketing y Publicidad' },
  { name: 'Atención al Cliente, Call Center y Telemarketing' },
  { name: 'Legales' },
  { name: 'Secretaría y recepción' },
  { name: 'Ingeniería Civil y Construcción' },
  { name: 'Comunicación, Relaciones Institucionales y Públicas' },
  { name: 'Gastronomía y Turismo' },
  { name: 'Producción y Manufactura' },
  { name: 'Aduana y Comercio Exterior' },
]

const recruiters = [
  {
    name: 'Guillermo Martin',
    surname: 'Otamendi',
    email: 'GuillermoMartin@Otamendi.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/men/18.jpg',
    favoriteArea1: areas[0].name, //
    favoriteArea2: areas[1].name,
    favoriteArea3: areas[4].name,
    seniority1: seniorities[1],
    seniority2: seniorities[3],
    seniority3: seniorities[2],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Eva',
    surname: 'Camacho',
    email: 'Eva@Camacho.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/84.jpg',
    favoriteArea1: areas[1].name,
    favoriteArea2: areas[9].name,
    favoriteArea3: areas[6].name,
    seniority1: seniorities[1],
    seniority2: seniorities[2],
    seniority3: seniorities[3],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Alejandra',
    surname: 'Castillo',
    email: 'Alejandra@Castillo.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/79.jpg',
    favoriteArea1: areas[2].name,
    favoriteArea2: areas[4].name,
    favoriteArea3: areas[3].name,
    seniority1: seniorities[4],
    seniority2: seniorities[1],
    seniority3: seniorities[0],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Mario',
    surname: 'Juarez',
    email: 'Mario@Juarez.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/men/62.jpg',
    favoriteArea1: areas[3].name,
    favoriteArea2: areas[9].name,
    favoriteArea3: areas[7].name,
    seniority1: seniorities[0],
    seniority2: seniorities[3],
    seniority3: seniorities[2],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Marisa',
    surname: 'Lembergier',
    email: 'Marisa@Lembergier.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/37.jpg',
    favoriteArea1: areas[4].name,
    favoriteArea2: areas[5].name,
    favoriteArea3: areas[3].name,
    seniority1: seniorities[4],
    seniority2: seniorities[1],
    seniority3: seniorities[0],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Asencio',
    surname: 'Sebastian',
    email: 'Asencio@Sebastian.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/men/0.jpg',
    favoriteArea1: areas[5].name,
    favoriteArea2: areas[0].name,
    favoriteArea3: areas[4].name,
    seniority1: seniorities[4],
    seniority2: seniorities[3],
    seniority3: seniorities[0],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Estefania',
    surname: 'Audia',
    email: 'Estefania@Audia.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/78.jpg',
    favoriteArea1: areas[3].name,
    favoriteArea2: areas[1].name,
    favoriteArea3: areas[9].name,
    seniority1: seniorities[2],
    seniority2: seniorities[1],
    seniority3: seniorities[3],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Verónica Ana',
    surname: 'Rozzi',
    email: 'VerónicaAna@Rozzi.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/56.jpg',
    favoriteArea1: areas[3].name,
    favoriteArea2: areas[1].name,
    favoriteArea3: areas[8].name,
    seniority1: seniorities[0],
    seniority2: seniorities[1],
    seniority3: seniorities[2],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Braian',
    surname: 'Netto',
    email: 'Braian@Netto.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/31.jpg',
    favoriteArea1: areas[3].name,
    favoriteArea2: areas[1].name,
    favoriteArea3: areas[5].name,
    seniority1: seniorities[0],
    seniority2: seniorities[1],
    seniority3: seniorities[2],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Florencia',
    surname: 'Podestá',
    email: 'Florencia@Podestá.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/54.jpg',
    favoriteArea1: areas[3].name,
    favoriteArea2: areas[4].name,
    favoriteArea3: areas[0].name,
    seniority1: seniorities[0],
    seniority2: seniorities[1],
    seniority3: seniorities[2],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Mariana',
    surname: 'Jenichen',
    email: 'Mariana@Jenichen.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/87.jpg',
    favoriteArea1: areas[6].name,
    favoriteArea2: areas[1].name,
    favoriteArea3: areas[9].name,
    seniority1: seniorities[3],
    seniority2: seniorities[4],
    seniority3: seniorities[1],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Analía',
    surname: 'Nuñez',
    email: 'Analía@Nuñez.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/23.jpg',
    favoriteArea1: areas[1].name,
    favoriteArea2: areas[2].name,
    favoriteArea3: areas[3].name,
    seniority1: seniorities[3],
    seniority2: seniorities[4],
    seniority3: seniorities[1],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Alejandro',
    surname: 'Comegna',
    email: 'Alejandro@Comegna.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/men/74.jpg',
    favoriteArea1: areas[3].name,
    favoriteArea2: areas[4].name,
    favoriteArea3: areas[4].name,
    seniority1: seniorities[3],
    seniority2: seniorities[4],
    seniority3: seniorities[1],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'CL',
    surname: 'select',
    email: 'CL@select.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/men/14.jpg',
    favoriteArea1: areas[1].name,
    favoriteArea2: areas[3].name,
    favoriteArea3: areas[6].name,
    seniority1: seniorities[3],
    seniority2: seniorities[4],
    seniority3: seniorities[1],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Monica',
    surname: 'Puppi',
    email: 'Monica@Puppi.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/4.jpg',
    favoriteArea1: areas[2].name,
    favoriteArea2: areas[8].name,
    favoriteArea3: areas[0].name,
    seniority1: seniorities[3],
    seniority2: seniorities[4],
    seniority3: seniorities[1],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Christian',
    surname: 'Lopez',
    email: 'Christian@Lopez.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    favoriteArea1: areas[3].name,
    favoriteArea2: areas[4].name,
    favoriteArea3: areas[0].name,
    seniority1: seniorities[3],
    seniority2: seniorities[4],
    seniority3: seniorities[1],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Nadia',
    surname: 'Gonzalez',
    email: 'Nadia@Gonzalez.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/83.jpg',
    favoriteArea1: areas[7].name,
    favoriteArea2: areas[4].name,
    favoriteArea3: areas[3].name,
    seniority1: seniorities[3],
    seniority2: seniorities[2],
    seniority3: seniorities[1],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Verónica',
    surname: 'Guglielmotti',
    email: 'Verónica@Guglielmotti.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/83.jpg',
    favoriteArea1: areas[8].name,
    favoriteArea2: areas[1].name,
    favoriteArea3: areas[7].name,
    seniority1: seniorities[3],
    seniority2: seniorities[2],
    seniority3: seniorities[1],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
  {
    name: 'Vanesa',
    surname: 'Goldmann',
    email: 'Vanesa@Goldmann.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    favoriteArea1: areas[3].name,
    favoriteArea2: areas[4].name,
    favoriteArea3: areas[2].name,
    seniority1: seniorities[1],
    seniority2: seniorities[3],
    seniority3: seniorities[2],
  },
  {
    name: 'Claudio',
    surname: 'Amitrano',
    email: 'Claudio@Amitrano.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/men/29.jpg',
    favoriteArea1: areas[3].name,
    favoriteArea2: areas[1].name,
    favoriteArea3: areas[4].name,
    seniority1: seniorities[4],
    seniority2: seniorities[1],
    seniority3: seniorities[0],
  },
  {
    name: 'Vanesa',
    surname: 'Goldmann',
    email: 'Vanesa@Goldmann.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/78.jpg',
    favoriteArea1: areas[1].name,
    favoriteArea2: areas[2].name,
    favoriteArea3: areas[0].name,
    seniority1: seniorities[4],
    seniority2: seniorities[1],
    seniority3: seniorities[3],
  },
  {
    name: 'Ileana',
    surname: 'Piccioni',
    email: 'Ileana@Piccioni.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/1.jpg',
    favoriteArea1: areas[7].name,
    favoriteArea2: areas[3].name,
    favoriteArea3: areas[1].name,
    seniority1: seniorities[0],
    seniority2: seniorities[4],
    seniority3: seniorities[2],
  },
  {
    name: 'Josefina',
    surname: 'Rodriguez',
    email: 'Josefina@Rodriguez.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/17.jpg',
    favoriteArea1: areas[9].name,
    favoriteArea2: areas[4].name,
    favoriteArea3: areas[2].name,
    seniority1: seniorities[3],
    seniority2: seniorities[2],
    seniority3: seniorities[1],
  },
  {
    name: 'Maida',
    surname: 'Garcia',
    email: 'Maida@Garcia.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/77.jpg',
    favoriteArea1: areas[7].name,
    favoriteArea2: areas[4].name,
    favoriteArea3: areas[4].name,
    seniority1: seniorities[4],
    seniority2: seniorities[0],
    seniority3: seniorities[2],
  },
  {
    name: 'Inés',
    surname: 'Schenone',
    email: 'Inés@Schenone.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    img: 'https://randomuser.me/api/portraits/women/43.jpg',
    favoriteArea1: areas[3].name,
    favoriteArea2: areas[1].name,
    favoriteArea3: areas[6].name,
    seniority1: seniorities[4],
    seniority2: seniorities[3],
    seniority3: seniorities[2],
  },
  {
    name: 'Anabella',
    img: 'https://randomuser.me/api/portraits/women/63.jpg',
    surname: 'Albornoz',
    email: 'Anabella@Albornoz.com',
    country: 'Argentina',
    stateId: Math.ceil(Math.random() * states.length),
    bio: 'Soy una descripcion de ejemplo',
    favoriteArea1: areas[4].name,
    favoriteArea2: areas[3].name,
    favoriteArea3: areas[7].name,
    seniority1: seniorities[1],
    seniority2: seniorities[4],
    seniority3: seniorities[3],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    // activeSearch: Math.floor(Math.random() * 5),
  },
]

const companies = [
  {
    name: 'DSNTEC',
    stateId: '1',
    areaId: '1',
    email: 'dsntec@dsntec.com',
    contactName: 'Adam Smith',
    img: 'https://media-exp1.licdn.com/dms/image/C4D0BAQG7z3D-htOC7A/company-logo_200_200/0/1518870857507?e=2159024400&v=beta&t=Kd7mQszqqmrQO3_LQxqCXpQY7qRvFW7ODQ0XfreeJSM',
    description:
      'Our company combines know-how and a deep domain understanding of technology to provide a range of IT outsourcing services from Product Development, custom application programming, to IT consulting services to enterprises all over the world.',
  },
  {
    name: 'Swiss Medical Group',
    stateId: '2',
    areaId: '2',
    email: 'swissmedicalgroup@swissmedicalgroup.com',
    contactName: 'Lautaro Rodriguez',
    img: 'https://prepagas-precios.com.ar/wp-content/uploads/2020/06/swissmedical-precios-1038x572.jpg',
    description:
      'Swiss Medical Group es uno de los principales grupos empresarios de Argentina que se dedica a la protección de personas y es líder en el mercado de la salud.',
  },
  {
    name: 'Camuzzi Gas',
    stateId: '3',
    areaId: '3',
    email: 'camuzzigas@camuzzigas.com',
    contactName: 'Carlos Villarosa',
    img: 'https://www.camuzzigas.com/wp-content/uploads/2019/06/generica-logo-camuzzi-gas-2019.jpg',
    description:
      'Somos la mayor distribuidora de gas natural de la Argentina en términos de volumen, cubriendo el 45% del paísen dos regiones contiguas a través de Camuzzi Gas Pampeana y Camuzzi Gas del Sur.',
  },
  {
    name: 'Accusys Technology',
    stateId: '4',
    areaId: '4',
    email: 'accusystechnology@accusystechnology.com',
    contactName: 'Matias Viña',
    img: 'https://media-exp3.licdn.com/dms/image/C4D0BAQGYiIk7JYRxLg/company-logo_200_200/0/1519928788078?e=2159024400&v=beta&t=KSSqWoV1IGQdMyOd8mp8ns-DdDED57nqHceS7989C0o',
    description:
      'Accusys Technology, Compañía Líder regional en desarrollo y mantenimiento de soluciones informáticas ',
  },
]

const modalities = [{ name: 'Presencial' }, { name: 'Remota' }]

const typesEmployed = [{ name: 'Fulltime' }, { name: 'Part-time' }]

const jobs = [
  {
    title: 'Fullstack',
    areaId: `${Math.ceil(Math.random() * areas.length)}`,
    seniorityId: `${Math.ceil(Math.random() * seniorities.length)}`,
    description: 'Soy una descripcion de ejemplo',
    country: 'Argentina',
    stateId: '2',
    typeemloyedId: '1',
    salary: 10000,
    modalityId: '2',
    companyId: '2',
    date: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 7))
    ),
  },
  {
    title: 'Back test',
    areaId: `${Math.ceil(Math.random() * areas.length)}`,
    seniorityId: `${Math.ceil(Math.random() * seniorities.length)}`,
    description: 'Soy una descripcion de ejemplo',
    country: 'Argentina',
    stateId: '1',
    typeemloyedId: '1',
    salary: 10000,
    modalityId: '1',
    companyId: '1',
    date: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 7))
    ),
  },
  {
    title: 'Fullstack',
    areaId: `${Math.ceil(Math.random() * areas.length)}`,
    seniorityId: `${Math.ceil(Math.random() * seniorities.length)}`,
    description: 'Soy una descripcion de ejemplo',
    country: 'Argentina',
    stateId: '1',
    typeemloyedId: '1',
    salary: 10000,
    modalityId: '1',
    companyId: '3',
    date: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 7))
    ),
  },
  {
    title: 'Fullstack',
    areaId: `${Math.ceil(Math.random() * areas.length)}`,
    seniorityId: `${Math.ceil(Math.random() * seniorities.length)}`,
    description: 'Soy una descripcion de ejemplo',
    country: 'Argentina',
    stateId: '3',
    typeemloyedId: '1',
    salary: 10000,
    modalityId: '1',
    companyId: '4',
    date: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 7))
    ),
  },
  {
    title: 'Front',
    areaId: `${Math.ceil(Math.random() * areas.length)}`,
    seniorityId: `${Math.ceil(Math.random() * seniorities.length)}`,
    description: 'Soy una descripcion de ejemplo',
    country: 'Argentina',
    stateId: '6',
    typeemloyedId: '1',
    salary: 80000,
    modalityId: '2',
    companyId: '1',
    date: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 7))
    ),
  },
  {
    title: 'Gerente de planta',
    areaId: `${Math.ceil(Math.random() * areas.length)}`,
    seniorityId: `${Math.ceil(Math.random() * seniorities.length)}`,
    description: 'Soy una descripcion de ejemplo',
    country: 'Argentina',
    stateId: '9',
    typeemloyedId: '2',
    salary: 50000,
    modalityId: '1',
    companyId: '2',
    date: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 7))
    ),
  },
  {
    title: 'Asistente',
    areaId: `${Math.ceil(Math.random() * areas.length)}`,
    seniorityId: `${Math.ceil(Math.random() * seniorities.length)}`,
    description: 'Soy una descripcion de ejemplo',
    country: 'Argentina',
    stateId: '1',
    typeemloyedId: '1',
    salary: 180000,
    modalityId: '2',
    companyId: '3',
    date: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 7))
    ),
  },
  {
    title: 'Asistente 4',
    areaId: `${Math.ceil(Math.random() * areas.length)}`,
    seniorityId: `${Math.ceil(Math.random() * seniorities.length)}`,
    description: 'Soy una descripcion de ejemplo',
    country: 'Argentina',
    stateId: '1',
    typeemloyedId: '1',
    salary: 180000,
    modalityId: '2',
    companyId: '2',
    date: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 7))
    ),
  },
  {
    title: 'Asistente 3',
    areaId: `${Math.ceil(Math.random() * areas.length)}`,
    seniorityId: `${Math.ceil(Math.random() * seniorities.length)}`,
    description: 'Soy una descripcion de ejemplo',
    country: 'Argentina',
    stateId: '1',
    typeemloyedId: '1',
    salary: 180000,
    modalityId: '1',
    companyId: '2',
    date: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 7))
    ),
  },
  {
    title: 'Asistente 2',
    areaId: `${Math.ceil(Math.random() * areas.length)}`,
    seniorityId: `${Math.ceil(Math.random() * seniorities.length)}`,
    description: 'Soy una descripcion de ejemplo',
    country: 'Argentina',
    stateId: '1',
    typeemloyedId: '1',
    salary: 180000,
    modalityId: '2',
    companyId: '3',
    date: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 7))
    ),
  },
  {
    title: 'Asistente 1',
    areaId: `${Math.ceil(Math.random() * areas.length)}`,
    seniorityId: `${Math.ceil(Math.random() * seniorities.length)}`,
    description: 'Soy una descripcion de ejemplo',
    country: 'Argentina',
    stateId: '1',
    typeemloyedId: '1',
    salary: 180000,
    modalityId: '2',
    companyId: '3',
    date: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 7))
    ),
  },
  {
    title: 'Manager 4',
    areaId: `${Math.ceil(Math.random() * areas.length)}`,
    seniorityId: `${Math.ceil(Math.random() * seniorities.length)}`,
    description: 'Soy una descripcion de ejemplo',
    country: 'Argentina',
    stateId: '1',
    typeemloyedId: '1',
    salary: 180000,
    modalityId: '2',
    companyId: '3',
    date: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 7))
    ),
  },
  {
    title: 'Manager 3',
    areaId: `${Math.ceil(Math.random() * areas.length)}`,
    seniorityId: `${Math.ceil(Math.random() * seniorities.length)}`,
    description: 'Soy una descripcion de ejemplo',
    country: 'Argentina',
    stateId: '1',
    typeemloyedId: '1',
    salary: 20000,
    modalityId: '2',
    companyId: '4',
    date: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 7))
    ),
  },
  {
    title: 'Manager 2',
    areaId: `${Math.ceil(Math.random() * areas.length)}`,
    seniorityId: `${Math.ceil(Math.random() * seniorities.length)}`,
    description: 'Soy una descripcion de ejemplo',
    country: 'Argentina',
    stateId: '1',
    typeemloyedId: '1',
    salary: 20000,
    modalityId: '2',
    companyId: '4',
    date: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 7))
    ),
  },
  {
    title: 'Manager 1',
    areaId: `${Math.ceil(Math.random() * areas.length)}`,
    seniorityId: `${Math.ceil(Math.random() * seniorities.length)}`,
    description: 'Soy una descripcion de ejemplo',
    country: 'Argentina',
    stateId: '1',
    typeemloyedId: '1',
    salary: 180000,
    modalityId: '2',
    companyId: '3',
    date: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 7))
    ),
  },
]

roles.map((role) =>
  Roles.create({ name: role }).then(() => console.log('roles creado'))
)

states.map((State) =>
  States.create(State).then((state) => {
    console.log('State creado: ')
  })
)

areas.map((Area) => {
  Areas.create(Area).then((area) => {
    console.log('Area creada: ')
  })
})

senioritysToMap.map((seniority) => {
  Seniority.create(seniority).then((data) => {
    console.log('Seniority creado: ')
  })
})

modalities.map((Modalities) => {
  Modality.create(Modalities).then((modalities) => {
    console.log('Modality creado: ')
  })
})

typesEmployed.map((types) => {
  TypeEmployed.create(types).then((type) => {
    console.log('Type of Employed creado: ')
  })
})

recruiters.map((recruiter) => {
  Recruiters.create(recruiter).then((user) => console.log('usuario creado: '))
})

companies.map((Company) => {
  Companies.create(Company).then((Company) => console.log('Company creada: '))
})

setTimeout(() => {
  jobs.map((job, index) => {
    Jobs.create(job)
      .then((jobCreated) => {
        let random = Math.random() * recruiters.length;
        if (index > 2 && index <= 5) {
          Recruiters.findByPk(Math.ceil(random)).then((user) => {
            user.addJob(jobCreated);
            jobCreated.isOpen = "cerrada";
            jobCreated.ratingRecruiter = Math.ceil(Math.random() * 5);
            jobCreated.save();
          });
        }
        if (index > 5) {
          let random = Math.random() * recruiters.length;
          Recruiters.findByPk(Math.ceil(random)).then((user) => {
            user.addJob(jobCreated);
            jobCreated.isOpen = "asignada";
            jobCreated.save();
          });
        }
      })
      .then(() => {
        console.log("job creado");
      });
  });
}, 500);



//loguear admin

users.map((user) => {
  admin
    .auth()
    .getUserByEmail(user.email)
    .then((userCredentials) => {
      return Users.create({
        ...userCredentials,
        name: user.name,
        surname: user.surname,
        img: user.img,
      })
        .then((userCreated) => {
          return Roles.findOne({ where: { name: user.role } }).then((roles) => {
            roles.addUser(userCreated)
          })
        })
        .then(() => console.log('usuario creado'))
    })
    .catch((error) => console.log('error', error))
})
