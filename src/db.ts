import { PouchDB, propertyIndex } from 'yellow-common-server'

export const books = new PouchDB<any>('http://couchdb:5984/books')
propertyIndex(books, 'byKind', 'kind')

export const movies = new PouchDB<any>('http://couchdb:5984/movies')
propertyIndex(movies, 'byKind', 'kind')

export const music = new PouchDB<any>('http://couchdb:5984/music')
propertyIndex(music, 'byKind', 'kind')

export const games = new PouchDB<any>('http://couchdb:5984/games')
propertyIndex(music, 'byKind', 'games')
