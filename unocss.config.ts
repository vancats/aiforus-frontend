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
    ['flex-start-end', 'flex-start justify-end'],
    ['flex-center-row', 'flex-center flex-row'],
    ['flex-center-between', 'flex-center justify-between'],
    ['flex-center-end', 'flex-center justify-end'],
    ['flex-start-between', 'flex-start justify-between'],
    ['flex-center-center', 'flex-center justify-center'],
    ['flex-center-around', 'flex-center justify-around'],
    ['flex-center-between-col', 'flex-center-between flex-col'],
    ['flex-start-between-col', 'flex-start-between flex-col'],
    ['flex-center-between-row', 'flex-center-between flex-row'],
    ['flex-center-center-col', 'flex-center-center flex-col'],

    ['fix-bottom', 'fixed left-0 right-0 bottom-0'],

    // sidebar
    ['side-icon', 'wh-15 sm:wh-20 sm:mb-2 rounded-lg cursor flex-center-center-col color-#9C9CA9 hover:color-#FFFFFF'],

    // layout
    ['layout-left', 'pl-4 sm:pl-10'],
    ['layout-right', 'pr-3 sm:pr-10'],
    ['layout-bottom', 'mb-19 sm:mb-0'],
    ['layout-right-bottom', 'layout-right layout-bottom'],

    // title
    ['title-tags', 'flex-center sm:h-8 mb-2.5 text-4 sm:mb-6 sm:text-5'],
    ['title-tag', 'title-brief px-3 py-2 sm:px-6 sm:py-4 rounded-5 bg-transparent hover:color-#FFFFFF hover:bg-#2B2C3E'],

    // tool
    ['tool-layout', 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5 sm:gap-6'],

    // prompt
    ['prompt-layout', 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-6'],

    // card
    ['card-more', 'w-10 sm:w-20 mr-2.5 sm:mr-6 rounded-2xl flex-shrink-0 cursor bg-#2B2C3E hover:bg-#393A52'],
    ['card-tool', 'card-more w-30 h-47 sm:w-50 sm:h-76'],

    ['card-detail', 'h-20 rounded-lg sm:h-37 sm:rounded-2xl cursor bg-#2B2C3E hover:bg-#393A52'],

    ['card-tag', 'h-4 px-1 text-3 rounded sm:h-7 sm:px-2 mr-2 sm:text-sm sm:rounded-lg text-#FFFFFF bg-#1F1E2C group-hover-bg-#3D3F58'],

    ['title-brief', 'text-3 sm:text-sm text-#9C9CA9'],

    // adaptor 可以使用 ruler 规则代替 数目不多，直接列出了
    ['text-3-4', 'text-3 sm:text-4'],
    ['text-3-sm', 'text-3 sm:text-sm'],
    ['text-3-xl', 'text-3 sm:text-xl'],
    ['text-4-4.5', 'text-4 sm:text-4.5'],
    ['text-4-5', 'text-4 sm:text-5'],
    ['text-4-5.5', 'text-4 sm:text-5.5'],
    ['leading-4-6', 'leading-4 sm:leading-6'],

    ['mt-1-3', 'mt-1 sm:mt-3'],
    ['mt-4-8', 'mt-4 sm:mt-8'],
    ['mt-4-10', 'mt-4 sm:mt-10'],

    ['ml-2-4', 'ml-2 sm:ml-4'],
    ['ml-12-22', 'ml-12 sm:ml-22'],

    ['mr-3-6', 'mr-3 sm:mr-6'],
    ['mr-12-22', 'mr-12 sm:mr-22'],

    ['mb-3-6', 'mb-3 sm:mb-6'],

    ['mx-2-6', 'mx-2 sm:mx-6'],
    ['mx-12-22', 'mx-12 sm:mx-22'],

    ['p-2-4', 'p-2 sm:p-4'],
    ['p-3-6', 'p-3 sm:p-6'],

    ['py-3-6', 'py-3 sm:py-6'],

    ['w-8-12', 'w-8 sm:w-12'],
    ['w-30-50', 'w-30 sm:w-50'],
    ['w-50-100', 'w-50 sm:w-100'],
    ['w-66-120', 'w-66 sm:w-120'],
    ['w-full-auto', 'w-full sm:w-auto'],

    ['max-w-30-full', 'max-w-30 sm:max-w-full'],

    ['h-4-6', 'h-4 sm:h-6'],
    ['h-18-35', 'h-18 sm:h-35'],
    ['h-20-37', 'h-20 sm:h-37'],
    ['h-22-36', 'h-22 sm:h-36'],
    ['h-25-40', 'h-25 sm:h-40'],
    ['h-47-76', 'h-47 sm:h-76'],
    ['h-120-150', 'h-120 sm:h-150'],

    ['wh-3-4', 'wh-3 sm:wh-4'],
    ['wh-8-10', 'wh-8 sm:wh-10'],
    ['wh-18-35', 'wh-18 sm:wh-35'],
    ['wh-20-37', 'wh-20 sm:wh-37'],
    ['wh-35-60', 'wh-35 sm:wh-60'],
    ['max-w-70-100', 'max-w-70 sm:max-w-100'],

    ['top-0-4', 'top-0 sm:top-4'],
    ['right-0-4', 'right-0 sm:right-4'],
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
