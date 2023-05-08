import { defineConfig } from 'unocss'
import presetUno from 'unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  presets: [presetIcons(), presetUno()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      primary: '#1a73e8'
    }
  }
})
