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
    ['web-only', 'hidden sm:block'], // 移动端不展示
    ['mobile-only', 'block sm:hidden'], // 移动端不展示

    // Flex flex + align-items + justify-content + flex-direction
    ['flex-col', 'flex flex-col'],
    ['flex-wrap', 'flex flex-wrap'],
    ['flex-center', 'flex items-center'],
    ['flex-start', 'flex items-start'],
    ['flex-center-row', 'flex-center flex-row'],
    ['flex-center-between', 'flex-center justify-between'],
    ['flex-start-between', 'flex-start justify-between'],
    ['flex-center-center', 'flex-center justify-center'],
    ['flex-center-between-col', 'flex-center-between flex-col'],
    ['flex-start-between-col', 'flex-start-between flex-col'],
    ['flex-center-between-row', 'flex-center-between flex-row'],
    ['flex-center-center-col', 'flex-center-center flex-col'],

    // sidebar
    ['side-icon', 'wh-20 mb-2 rounded-lg cursor flex-center-center-col color-#9C9CA9 hover:color-#FFFFFF'],

    // title
    ['title-tags', 'flex-center pb-4 text-xl'],
    ['title-tag', 'title-brief px-6 py-4 rounded-3xl bg-transparent'],

    // tool
    ['tool-layout', 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'],

    // prompt
    ['prompt-layout', 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'],

    // card
    ['card-more', 'w-20 mr-4 rounded-2xl flex-shrink-0 cursor bg-#2B2C3E hover:bg-#393A52'],
    ['card-tool', 'card-more w-50 h-76'],
    ['card-prompt', 'h-44 rounded-2xl cursor bg-#2B2C3E hover:bg-#393A52'],
    ['card-detail', 'h-40 mb-4 rounded-2xl cursor bg-#2B2C3E hover:bg-#393A52'],

    ['card-tag', 'px-2 mr-2 text-sm rounded-lg text-#FFFFFF bg-#1F1E2C'],
    ['title-brief', 'text-sm text-#9C9CA9'],
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
