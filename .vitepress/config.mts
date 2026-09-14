import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const SKIP_ROOT_DOCS = new Set(['readme.md', 'index.md'])

function getMarkdownTitle(filePath: string): string {
  const content = fs.readFileSync(filePath, 'utf-8')

  const frontmatterTitle = content.match(
    /^---[\s\S]*?^title:\s*(.+?)\s*$[\s\S]*?^---/m,
  )
  if (frontmatterTitle?.[1]) {
    return frontmatterTitle[1].trim().replace(/^['"]|['"]$/g, '')
  }

  const heading = content.match(/^#\s+(.+)$/m)
  if (heading?.[1]) {
    return heading[1].trim()
  }

  return path.basename(filePath, '.md')
}

function toUrlPath(relativePath: string): string {
  return (
    '/' +
    relativePath
      .replace(/\\/g, '/')
      .replace(/\.md$/i, '')
      .replace(/\/index$/i, '/')
  )
}

function compareEntries(a: fs.Dirent, b: fs.Dirent): number {
  if (a.name.toLowerCase() === 'index.md') return -1
  if (b.name.toLowerCase() === 'index.md') return 1
  if (a.isDirectory() && !b.isDirectory()) return -1
  if (!a.isDirectory() && b.isDirectory()) return 1
  return a.name.localeCompare(b.name, 'zh-CN')
}

function generateSidebar(
  directory: string,
  urlPrefix: string,
): DefaultTheme.SidebarItem[] {
  if (!fs.existsSync(directory)) {
    return []
  }

  const entries = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => {
      if (entry.name.startsWith('.')) return false
      if (entry.isFile() && entry.name.toLowerCase() === 'readme.md') {
        return false
      }
      return (
        entry.isDirectory() ||
        (entry.isFile() && entry.name.endsWith('.md'))
      )
    })
    .sort(compareEntries)

  const items: DefaultTheme.SidebarItem[] = []

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name)

    if (entry.isFile() && entry.name.endsWith('.md')) {
      if (entry.name.toLowerCase() === 'index.md') continue

      items.push({
        text: getMarkdownTitle(absolutePath),
        link: toUrlPath(path.relative(ROOT, absolutePath)),
      })
      continue
    }

    if (entry.isDirectory()) {
      const childItems = generateSidebar(
        absolutePath,
        `${urlPrefix}/${entry.name}`,
      )
      if (childItems.length === 0) continue

      const indexPath = path.join(absolutePath, 'index.md')
      const group: DefaultTheme.SidebarItem = {
        text: entry.name,
        collapsed: false,
        items: childItems,
      }

      if (fs.existsSync(indexPath)) {
        group.link = `${urlPrefix}/${entry.name}/`
      }

      items.push(group)
    }
  }

  return items
}

function getReferencesSidebar() {
  return generateSidebar(path.join(ROOT, 'references'), '/references')
}

function getExamplesSidebar() {
  return generateSidebar(path.join(ROOT, 'examples'), '/examples')
}

function getRootDocsSidebar(): DefaultTheme.SidebarItem[] {
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith('.md') &&
        !SKIP_ROOT_DOCS.has(entry.name.toLowerCase()),
    )
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
    .map((entry) => {
      const filePath = path.join(ROOT, entry.name)
      return {
        text: getMarkdownTitle(filePath),
        link: toUrlPath(entry.name),
      }
    })
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'dev-skill',
  description:
    '通用全栈开发 Agent Skill —— 前端、后端、数据库、联调、缺陷修复、代码审查与发布前检查',
  base: '/dev-skill/',
  srcExclude: ['**/README.md'],
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  head: [
    ['meta', { name: 'theme-color', content: '#4f46e5' }],
    ['link', { rel: 'icon', href: '/dev-skill/favicon.svg' }],
  ],

  themeConfig: {
    siteTitle: 'dev-skill',

    nav: [
      { text: '首页', link: '/' },
      { text: '核心 Skill', link: '/SKILL' },
      { text: '参考资料', link: '/references/' },
      { text: '使用案例', link: '/examples/' },
      {
        text: 'GitHub',
        link: 'https://github.com/dddz-007/dev-skill',
      },
    ],

    sidebar: {
      '/references/': [
        {
          text: '参考资料',
          collapsed: false,
          items: [
            { text: '目录', link: '/references/' },
            ...getReferencesSidebar(),
          ],
        },
      ],
      '/examples/': [
        {
          text: '使用案例',
          collapsed: false,
          items: [
            { text: '目录', link: '/examples/' },
            ...getExamplesSidebar(),
          ],
        },
      ],
      '/': [
        {
          text: '核心 Skill',
          collapsed: false,
          items: getRootDocsSidebar(),
        },
        {
          text: '参考资料',
          collapsed: false,
          items: [
            { text: '目录', link: '/references/' },
            ...getReferencesSidebar(),
          ],
        },
        {
          text: '使用案例',
          collapsed: false,
          items: [
            { text: '目录', link: '/examples/' },
            ...getExamplesSidebar(),
          ],
        },
      ],
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '没有找到相关结果',
            resetButtonTitle: '清除查询',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    outline: {
      label: '本页目录',
      level: [2, 3],
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/dddz-007/dev-skill',
      },
    ],

    editLink: {
      pattern:
        'https://github.com/dddz-007/dev-skill/edit/master/:path',
      text: '在 GitHub 上编辑此页',
    },

    footer: {
      message: 'Released under the <a href="https://github.com/dddz-007/dev-skill/blob/master/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2026 dddz-007',
    },
  },
})
