import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    groupTitle: 'Firma Yönetimi',
    items: [
      {
        title: 'Firma Listesi',
        path: '/firma-listesi',
        icon: icon('ic_user'),
      },
      {
        title: 'Nace Kodları',
        path: '/nace-kodlari',
        icon: icon('ic_user'),
      },
      {
        title: 'Lokasyonlar',
        path: '/lokasyonlar',
        icon: icon('ic_user'),
      },
    ],
  },
  {
    groupTitle: 'Tanımlamalar',
    items: [
      {
        title: 'Belge Tipleri',
        path: '/belge-tipleri',
        icon: icon('ic_user'),
      },
    ],
  },
];

export default navConfig;
