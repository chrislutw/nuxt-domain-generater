import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  presetTypography,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
    presetTypography(),
    presetWebFonts({
      provider: "bunny",
      fonts: {
        sans: "DM Sans",
        mono: "DM Mono",
      },
    }),
  ],
  shortcuts: {},
  transformers: [transformerDirectives()],
});
