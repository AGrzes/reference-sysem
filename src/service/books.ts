
import { listByIndex, simpleGet, simplePut } from 'yellow-common-server'
import { books as booksDb } from '../db'

export interface Book {
  kind: 'book'
  title: string
  description: string
  author: string | string[]
  series: string | string[]
  labels: string[]
}

export interface Author {
  kind: 'author'
  name: string
  description: string
  books: string[]
  labels: string[]
}

export interface Series {
  kind: 'series'
  name: string
  description: string
  books: string[]
  labels: string[]
  author: string | string[]
}

export interface WantedBook {
  kind: 'wantedBook'
  book: string
  description: string
}

export interface OwnedBook {
  kind: 'ownedBook'
  book: string
  description: string
  form: 'physical' | 'digital'
  library: string
}

export interface ReadingProgress {
  date: string
  increment: number
  position: number
}

export interface ReadBook {
  kind: 'readBook'
  book: string
  description: string
  progress: ReadingProgress[]
}

export default {
  books: {
    list: listByIndex<Book>(booksDb, 'byKind', {key: 'book'}),
    get: simpleGet<Book>(booksDb),
    put: simplePut<Book>(booksDb)
  },
  authors: {
    list: listByIndex<Author>(booksDb, 'byKind', {key: 'author'}),
    get: simpleGet<Author>(booksDb),
    put: simplePut<Author>(booksDb)
  },
  series: {
    list: listByIndex<Series>(booksDb, 'byKind', {key: 'series'}),
    get: simpleGet<Series>(booksDb),
    put: simplePut<Series>(booksDb)
  },
  wantedBook: {
    list: listByIndex<WantedBook>(booksDb, 'byKind', {key: 'wantedBook'}),
    get: simpleGet<WantedBook>(booksDb),
    put: simplePut<WantedBook>(booksDb)
  },
  ownedBook: {
    list: listByIndex<OwnedBook>(booksDb, 'byKind', {key: 'ownedBook'}),
    get: simpleGet<OwnedBook>(booksDb),
    put: simplePut<OwnedBook>(booksDb)
  },
  readBook: {
    list: listByIndex<ReadBook>(booksDb, 'byKind', {key: 'readBook'}),
    get: simpleGet<ReadBook>(booksDb),
    put: simplePut<ReadBook>(booksDb)
  }
}
