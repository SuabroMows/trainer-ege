import { INavData } from '@coreui/angular';

export const navItemsTeacher: INavData[] = [
  {
    name: 'Курсы',
    url: '/theme',
    icon: 'icon-puzzle'
   },
  {
    name: 'Ученики',
    url: '/theme/pupil',
    icon: 'icon-pencil'
  }
];


export const navItemsPupil: INavData[] = [
  {
    name: 'Задачи',
    url: '/charts',
    icon: 'icon-pencil'
  }
];
