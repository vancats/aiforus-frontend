import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // normal
    ['cursor', 'cursor-pointer select-none'],

    // Flex flex + align-items + justify-content + flex-direction
    ['flex-col', 'flex flex-col'],
    ['flex-wrap', 'flex flex-wrap'],
    ['flex-center', 'flex items-center'],
    ['flex-center-row', 'flex-center flex-row'],
    ['flex-center-between', 'flex-center justify-between'],
    ['flex-center-center', 'flex-center justify-center'],
    ['flex-center-between-col', 'flex-center-between flex-col'],
    ['flex-center-between-row', 'flex-center-between flex-row'],
    ['flex-center-center-col', 'flex-center-center flex-col'],

    // sidebar
    ['side-icon', 'wh-20 mb-2 rounded-lg cursor flex-center-center-col color-#9C9CA9 hover:color-#FFFFFF'],

    ['web-only', 'hidden sm:block'], // 移动端不展示
    ['mobile-only', 'block sm:hidden'], // 移动端不展示

  ],

  rules: [
    [/^wh-(.*)$/, ([, d]) => {
      // 先考虑这两个场景
      switch (d) {
        case 'full': d = '100%'
          break
        case 'screen': d = '100vw'
          break
      }
      if (d === 'full')
        d = '100%'
      if (isNaN(Number(d)))
        return { width: d, height: d }
      else
        return { width: `${Number(d) / 4}rem`, height: `${Number(d) / 4}rem` }
    }],
  ],

  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
    //   scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
