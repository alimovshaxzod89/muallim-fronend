import { mdiAccountDetailsOutline, mdiPercent } from '@mdi/js'

export default [
  {
    title: 'Guruhlar',
    to: 'groups',
    icon: mdiPercent,

    resource: 'Group',
    action: 'read',
    // action: ['manage', 'create', 'list', 'update', 'delete'],
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
    title: 'Darslar va xonalar',
    icon: mdiAccountDetailsOutline,
    to: '',
    resource: 'Public',
    action: 'read',
  },
  {
    title: 'Lidlar',
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
    title: "To'lovlar",
    icon: mdiAccountDetailsOutline,
    to: '',
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
]
