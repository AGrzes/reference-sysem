import {readFileSync} from 'fs'
import * as YAML from 'js-yaml'
import * as _ from 'lodash'
import { merge } from 'yellow-common-server'
import { books } from './db'

function formatReference(reference: string | string[], kind: string): string|string[] {
    if (_.isUndefined(reference)) {
        return undefined
    } else if (_.isArray(reference)) {
        return reference.map((r) => `${kind}:${_.kebabCase(r)}`)
    } else {
        return `${kind}:${_.kebabCase(reference)}`
    }
}

YAML.safeLoadAll(readFileSync(process.argv[2], 'UTF-8')).map((document) => {
    document._id = `${document.kind}:${_.kebabCase(document.name || document.title || document.book)}`;
    [{field: 'books', kind: 'book'}, {field: 'book', kind: 'book'}, {field: 'author', kind: 'author'}]
    .map(({field, kind}) => document[field] = formatReference(document[field], kind))
    merge(books, document)

})
