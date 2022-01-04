import {
  mdiHomeOutline,
  mdiClipboardEditOutline,
  mdiClipboardOutline,
  mdiFactory,
  mdiFileDocumentEdit,
  mdiStoreOutline,
  mdiDatabaseArrowLeftOutline,
  mdiCurrencyUsd,
  mdiAccountArrowLeftOutline,
  mdiRecycle,
  mdiBookmarkCheck,
  mdiScaleBalance,
  mdiShieldAccount,
  mdiUndoVariant,
  mdiCartVariant,
  mdiViewHeadline,
  mdiAccountReactivateOutline,
  mdiAccountCheckOutline,
  mdiAccountMultiple
} from '@mdi/js'

export default [
  {
    title: 'Asosiy panel',
    icon: mdiHomeOutline,
    to: 'dashboard-eCommerce',
  },
  {
    title: 'Ro\'yxatlar',
    icon: mdiViewHeadline,
    children: [
      {
        title: 'Tovar turlari',
        icon: mdiClipboardOutline,
        to: 'product-type',
      },
      {
        title: 'Tovar brendlari',
        icon: mdiFactory,
        to: 'manufacturer',
      },
      {
        title: 'O\'lchov birliklari',
        icon: mdiScaleBalance,
        to: 'units',
      },
      {
        title: 'Yetkazib beruvchilar',
        icon: mdiAccountCheckOutline,
        to: 'suppliers',
      },
      {
        title: 'Mijozlar',
        icon: mdiAccountMultiple,
        to: 'clients',
      },
    ]
  },
  {
    title: 'Markaz ulushi',
    to: 'center-profit',
    icon: mdiFileDocumentEdit,
  },
  {
    title: 'Kurs',
    icon: mdiFileDocumentEdit,
    to: 'rate',
  },
  {
    subheader: '#',
    badge: 'New',
    bageColor: 'success'
  },
  {
    title: 'Admin',
    icon: mdiShieldAccount,
    to: 'link',
  },
]
