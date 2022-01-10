import { mdiAccountDetailsOutline, mdiPercent } from '@mdi/js'

export default [
  {
    title: 'Guruhlar',
    to: 'groups',
    icon: mdiPercent,
    resource: 'Group',
    action: 'read',
  },
  {
    title: 'Talabalar',
    icon: mdiAccountDetailsOutline,
    to: 'students',
    resource: 'Student',
    action: 'read',
  },
  {
    subheader: '#',
    badge: 'New',
    bageColor: 'success',
    resource: 'Public',
    action: 'read',
  },
  {
    title: 'Davomat',
    icon: mdiAccountDetailsOutline,
    to: '',
    resource: 'Public',
    action: 'read',
  },
  {
    subheader: '##',
    badge: 'New',
    bageColor: 'success',
    resource: 'Public',
    action: 'read',
  },
  {
    title: 'Qarzdor talabalar',
    icon: mdiAccountDetailsOutline,
    to: '',
    resource: 'Public',
    action: 'read',
  },
  {
    title: 'Daromad',
    icon: mdiAccountDetailsOutline,
    to: '',
    resource: 'Public',
    action: 'read',
  },
]
