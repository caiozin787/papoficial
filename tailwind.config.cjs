const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}'
  ],
  theme: {
    // expose Tailwind's spacing scale explicitly so functions like --spacing() can resolve
    spacing: defaultTheme.spacing,
    extend: {}
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      const spacing = theme('spacing') || {}
      const vars = {}
      Object.entries(spacing).forEach(([key, val]) => {
        vars[`--spacing-${key}`] = val
      })
      vars['--spacing'] = vars['--spacing-4'] || '1rem'
      addBase({ ':root': vars })
    })
  ]
}
