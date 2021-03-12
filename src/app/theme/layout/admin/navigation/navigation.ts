import {Injectable} from '@angular/core';
export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'other',
    title: 'Admin',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'menu-level',
        title: 'Menu Levels',
        type: 'collapse',
        icon: 'feather icon-menu',
        children: [
          {
            id: 'menu-level-2.1',
            title: 'Menu Level 2.1',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'menu-level-2.2',
            title: 'Menu Level 2.2',
            type: 'collapse',
            children: [
              {
                id: 'menu-level-2.2.1',
                title: 'Menu Level 2.2.1',
                type: 'item',
                url: 'javascript:',
                external: true
              },
              {
                id: 'menu-level-2.2.2',
                title: 'Menu Level 2.2.2',
                type: 'item',
                url: 'javascript:',
                external: true
              }
            ]
          }
        ]
      },
      {
        id: 'disabled-menu',
        title: 'Disabled Menu',
        type: 'item',
        url: 'javascript:',
        classes: 'nav-item disabled',
        icon: 'feather icon-power',
        external: true
      }
    ]
  }
];
const superadmin = [
  {
    id: 'other',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      // {
      //   id: 'sample-page',
      //   title: 'Dashboard',
      //   type: 'item',
      //   url: '/dashboard',
      //   classes: 'nav-item',
      //   icon: 'feather icon-bar-chart-2'
      // },
      // {
      //   id: 'sample-page',
      //   title: 'Dashboard',
      //   type: 'item',
      //   url: '/dashboard',
      //   classes: 'nav-item',
      //   icon: 'feather icon-layout'
      // }, {
      //   id: 'sample-page',
      //   title: 'Leads',
      //   type: 'item',
      //   url: '/leads',
      //   classes: 'nav-item',
      //   icon: 'feather icon-filter'
      // },
      
      {
        id: 'menu-level',
        title: 'Products',
        type: 'collapse',
        icon: 'feather icon-server',
        children: [ 
          // {
          //   id: 'menu-level-2.1',
          //   title: 'Category',
          //   type: 'item',
          //   url: '/category',
          //   external: false
          // }, 
            {
            id: 'menu-level-2.1',
            title: 'Add products',
            type: 'item',
            url: '/additems',
            external: false
          }, 
          //  {
          //   id: 'menu-level-2.1',
          //   title: 'Add produtcss',
          //   type: 'item',
          //   url: '/addproducts',
          //   external: false
          // }, 
          {
            id: 'menu-level-2.1',
            title: 'Products list',
            type: 'item',
            url: '/products',
            external: false
          },
        ]
      }, 
  //     {
  //       id: 'menu-level',
  //       title: 'Orders',
  //       type: 'collapse',
  //       icon: 'feather icon-shopping-cart',
  //       children: [
  //         {
  //           id: 'menu-level-2.1',
  //           title: 'Pending orders',
  //           type: 'item',
  //           url: '/nill',
  //           external: false
  //         },
  //          {
  //           id: 'menu-level-2.1',
  //           title: 'Completed Orders',
  //           type: 'item',
  //           url: '/nill',
  //           external: false
  //         },
  //       ]
  //     },
  //  {
  //       id: 'menu-level',
  //       title: 'Partners',
  //       type: 'collapse',
  //       icon: 'feather icon-users',
  //       children: [
  //         {
  //           id: 'menu-level-2.1',
  //           title: 'Add partners',
  //           type: 'item',
  //           url: '/nill',
  //           external: false
  //         }, {
  //           id: 'menu-level-2.1',
  //           title: 'List  Partners',
  //           type: 'item',
  //           url: '/nill',
  //           external: false
  //         },
  //       ]
  //     },

      //  {
      //   id: 'sample-page',
      //   title: 'Products',
      //   type: 'item',
      //   url: '/products',
      //   classes: 'nav-item',
      //   icon: 'feather icon-users'
      // },
      //  {
      //   id: 'sample-page',
      //   title: 'Agents',
      //   type: 'item',
      //   url: '/agents',
      //   classes: 'nav-item',
      //   icon: 'feather icon-users'
      // },
      //  {
      //   id: 'sample-page',
      //   title: 'Banners',
      //   type: 'item',
      //   url: '/banners',
      //   classes: 'nav-item',
      //   icon: 'feather icon-image'
      // },
      //  {
      //   id: 'sample-page',
      //   title: 'lenders',
      //   type: 'item',
      //   url: '/lenders',
      //   classes: 'nav-item',
      //   icon: 'feather icon-flag'
      // },
      {
        id: 'sample-page',
        title: 'settings',
        type: 'item',
        url: '/nill',
        classes: 'nav-item',
        icon: 'feather icon-settings'
      },
      // {
      //   id: 'menu-level',
      //   title: 'Menus',
      //   type: 'collapse',
      //   icon: 'feather icon-menu',
      //   children: [
      //     {
      //       id: 'menu-level-2.1',
      //       title: 'Menu Level 2.1',
      //       type: 'item',
      //       url: 'javascript:',
      //       external: true
      //     },
      //     {
      //       id: 'menu-level-2.2',
      //       title: 'Menu Level 2.2',
      //       type: 'collapse',
      //       children: [
      //         {
      //           id: 'menu-level-2.2.1',
      //           title: 'Menu Level 2.2.1',
      //           type: 'item',
      //           url: 'javascript:',
      //           external: true
      //         },
      //         {
      //           id: 'menu-level-2.2.2',
      //           title: 'Menu Level 2.2.2',
      //           type: 'item',
      //           url: 'javascript:',
      //           external: true
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   id: 'disabled-menu',
      //   title: 'Disabled Menu',
      //   type: 'item',
      //   url: 'javascript:',
      //   classes: 'nav-item disabled',
      //   icon: 'feather icon-power',
      //   external: true
      // }
    ]
  }
];
const admin = [
  {
    id: 'other',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      // {
      //   id: 'sample-page',
      //   title: 'Dashboard',
      //   type: 'item',
      //   url: '/dashboard',
      //   classes: 'nav-item',
      //   icon: 'feather icon-layout'
      // }, {
      //   id: 'sample-page',
      //   title: 'Leads',
      //   type: 'item',
      //   url: '/leads',
      //   classes: 'nav-item',
      //   icon: 'feather icon-filter'
      // },
       {
        id: 'sample-page',
        title: 'Instruments',
        type: 'item',
        url: '/products',
        classes: 'nav-item',
        icon: 'feather icon-grid'
      },
      {
        id: 'sample-page',
        title: 'Category',
        type: 'item',
        url: '/category',
        classes: 'nav-item',
        icon: 'feather icon-package'
      },
      {
        id: 'sample-page',
        title: 'Offers',
        type: 'item',
        url: '/offers',
        classes: 'nav-item',
        icon: 'feather icon-calendar'
      },
     /*  {
        id: 'sample-page',
        title: 'Users',
        type: 'item',
        url: '/users',
        classes: 'nav-item',
        icon: 'feather icon-users'
      },
      {
        id: 'sample-page',
        title: 'Orders',
        type: 'item',
        url: '/orders',
        classes: 'nav-item',
        icon: 'feather icon-shopping-cart'
      },
      {
        id: 'sample-page',
        title: 'Banners',
        type: 'item',
        url: '/banners',
        classes: 'nav-item',
        icon: 'feather icon-image'
      },
      {
        id: 'sample-page',
        title: 'Offers',
        type: 'item',
        url: '/offers',
        classes: 'nav-item',
        icon: 'feather icon-calendar'
      },
      {
        id: 'sample-page',
        title: 'Notifications',
        type: 'item',
        url: '/notifications',
        classes: 'nav-item',
        icon: 'feather icon-mail'
      },
     */
    ]
  }
];
const agent = [
  {
    id: 'other',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'sample-page',
        title: 'Leads',
        type: 'item',
        url: '/leads',
        classes: 'nav-item',
        icon: 'feather icon-filter'
      },
    
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get(usertype) {
    // alert(usertype);
    if (usertype == 'superadmin') {
      return superadmin;

    }

    if (usertype == 'admin') {
      return admin;

    }
    if (usertype == 'agent') {
      return agent;

    }
  }
}
