import { defineConfig } from 'unocss'
import presetUno from 'unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        mingcute: () => import('@iconify-json/mingcute').then((i) => i.icons as any)
      }
    }),
    presetUno()
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      primary: '#1a73e8'
    }
  },
  safelist: ['bg-yellow-500', 'bg-orange-500', 'bg-red-700', 'bg-gray-400']
})
