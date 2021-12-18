import store from '@/state/store'

export default [
  {
    path: '/',
    name: 'default',
    component: () => import('./views/Index')
  },
  { 
    path: '/networks/:chainId', 
    name:'walletNetwork',
    component: () => import('./views/wallet/Networks.vue'),
  },

  {
    path: '/login',
    name: 'login',
    meta:{isPublic:true},
    component: () => import('./views/auth/Login.vue')
  },
  {
    path: '/CreateAccount',
    name: 'CreateAccount',
    meta:{isPublic:true},
    component: () => import('./views/auth/CreateAccount.vue')
  },
  {
    path: '/LoginWithFile',
    name: 'loginwithfile',
    meta:{isPublic:true},
    component: () => import('./views/auth/LoginWithFile.vue')
  },
  {
    path: '/LocalLogin',
    name: 'LocalLogin',
    meta:{isPublic:true},
    component: () => import('./views/auth/LocalLogin.vue')
  },
  {
    path: '/Signature',
    name: 'Signature',
    component: () => import('./views/wallet/Signature.vue')
  },
  {
    path: '/NFT',
    name: 'NFT',
    component: () => import('./views/NFTs/NFT.vue')
  },
  {
    path: '/contacts/profile',
    name: 'Profile',
    component: () => import('./views/contacts/contacts-profile')
  },
  
  {
    path: '/ReLink',
    name: 'relink',
    component: () => import('./views/auth/ReLink.vue')
  },
  // {
  //   path: '/TransactionSign',
  //   name: 'TransactionSign',
  //   component: () => import('./views/transaction/TransactionSign.vue')
  // },
  
]
