import { defineDb, defineTable, column } from 'astro:db'

const BlogPost = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    description: column.text(),
    author: column.text(),
    date: column.text(),
    content: column.text(),
  },
})

export default defineDb({
  tables: { BlogPost },
})
