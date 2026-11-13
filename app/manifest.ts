import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Elit Gym',
    short_name: 'Elit Gym',
    description: 'Personal training plans that adapt to your goal, level and equipment.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0A0A0B',
    theme_color: '#0A0A0B',
    icons: [
      { src: '/elit-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
