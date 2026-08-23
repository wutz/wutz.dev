import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    // 根 wrangler.toml 已改成 CI 引导用的部署配置,vite 的入口标记拆去了
    // wrangler.vite.toml,这里必须显式指过去
    cloudflare({ configPath: 'wrangler.vite.toml', viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
