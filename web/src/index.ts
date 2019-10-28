import {Api, app, bootstrap, itemHandler, listHandler, router , Vue} from 'yellow-common-vue'
// import './components'

Vue.component('book-summary', {
  props: ['book'],
  template:  `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">{{book.name}} <small>{{book.author}}</small></h5>
  </div>
</div>
  `
})

const api = new Api('/api/books/')

app({router: router([
  listHandler({name: 'book', fetch: api.list('book')}),
  itemHandler({name: 'book', fetch: api.get('book')}),
  listHandler({name: 'author', fetch: api.list('author')}),
  itemHandler({name: 'author', fetch: api.get('author')}),
  listHandler({name: 'series', listName: 'series', fetch: api.list('series')}),
  itemHandler({name: 'series', fetch: api.get('series')}),
  listHandler({name: 'read', listName: 'read', fetch: api.list('read')}),
  itemHandler({name: 'read', fetch: api.get('read')}),
  listHandler({name: 'owned', listName: 'owned', fetch: api.list('owned')}),
  itemHandler({name: 'owned', fetch: api.get('owned')}),
  listHandler({name: 'wanted', listName: 'wanted', fetch: api.list('wanted')}),
  itemHandler({name: 'wanted', fetch: api.get('wanted')})
])})

bootstrap()
