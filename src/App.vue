<template>
  <component
    :is="resolveLayoutVariant"
    :class="`skin-variant--${appSkinVariant}`"
  >
    <transition
      :name="appRouteTransition"
      mode="out-in"
      appear
    >
      <router-view></router-view>
    </transition>
  </component>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { computed } from '@vue/composition-api'
// eslint-disable-next-line import/no-unresolved
import useAppConfig from '@core/@app-config/useAppConfig'
import { useRouter } from '@core/utils'
import { useLayout } from '@core/layouts/composable/useLayout'

// Layouts
import LayoutContentVerticalNav from '@/layouts/variants/content/vertical-nav/LayoutContentVerticalNav.vue'
import LayoutContentHorizontalNav from '@/layouts/variants/content/horizontal-nav/LayoutContentHorizontalNav.vue'
import LayoutBlank from '@/layouts/variants/blank/LayoutBlank.vue'

// Dynamic vh
import useDynamicVh from '@core/utils/useDynamicVh'

export default {
  components: {
    LayoutContentVerticalNav,
    LayoutContentHorizontalNav,
    LayoutBlank,
  },
  setup() {
    const { route } = useRouter()
    const { appContentLayoutNav, appSkinVariant, appRouteTransition } = useAppConfig()

    const { handleBreakpointLayoutSwitch } = useLayout()
    handleBreakpointLayoutSwitch()

    const resolveLayoutVariant = computed(() => {
      if (route.value.meta.layout === 'blank') return 'layout-blank'
      if (route.value.meta.layout === 'content') return `layout-content-${appContentLayoutNav.value}-nav`

      return null
    })

    useDynamicVh()

    return {
      resolveLayoutVariant,
      appSkinVariant,
      appRouteTransition,
    }
  },
}
</script>

<style lang="scss">
.my-date-picker {
  height: 65px;
}
.my-date-picker .v-input__slot {
  min-height: 40px !important;
  margin-bottom: 4px;
}
.my-date-picker .v-input__control {
  display: grid !important;
  flex-direction: column !important;
  height: 40px !important;
}
.my-date-picker .v-input__append-inner {
  margin: auto;
}
.my-date-picker .v-label {
  top: 10px;
}
.my-date-picker .v-label--active {
  transform: translateY(-17px) scale(0.75);
}
.text-required {
  margin-bottom: 10px;
  position: relative;
  display: inline-block;
  span {
    position: absolute;
    top: 0;
    right: -10px;
    color: #ea5455 !important;
  }
}
.no-texts {
  position: absolute;
  width: 0;
  height: 0;
  span {
    top: -14px;
  }
}

.my-accordion {
  .v-expansion-panel-content__wrap {
    display: flex !important;
    flex-wrap: wrap !important;
    .v-input {
      width: auto;
      max-width: unset !important;
    }
  }
}

.my-size-table {
  td {
    min-width: 110px;
    width: 100px !important;
  }
}
</style>
