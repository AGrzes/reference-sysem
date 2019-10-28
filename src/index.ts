import * as debug from 'debug'
import * as express from 'express'
import {json, Router} from 'express'
import { webRouter, wrap } from 'yellow-common-server'
import books from './service/books'

const api = Router()
api.use(json())
api.use('/books/books', wrap(books.books))
api.use('/books/authors', wrap(books.authors))
api.use('/books/owned', wrap(books.ownedBook))
api.use('/books/read', wrap(books.readBook))
api.use('/books/series', wrap(books.series))
api.use('/books/wanted', wrap(books.wantedBook))

const trace = debug('home-requirements')
const port = process.env.LISTEN_PORT || 3000
const app = express()

app.use('/api', api)
app.use(webRouter())

app.listen(port, () => trace(`Listening on port ${port}!`))
