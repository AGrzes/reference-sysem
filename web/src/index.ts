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

const containerWrapper = (content) => `
<div class="col-9">
  ${content}
</div>
`

app({router: router([
  {
    name: 'root',
    path: '/',
    component: {
      template: `
<div class="container mt-3">
  <router-view></router-view>
</div>
      `
    },
    children: [{
      name: 'books-system',
      path: 'books',
      component: {
        template: `
<div class="row">
  <div class="col-3">
    <div class="nav flex-column nav-pills">
      <router-link :to="{name:'book-list'}" class="nav-link">Books</router-link>
      <router-link :to="{name:'author-list'}" class="nav-link">Authors</router-link>
      <router-link :to="{name:'series-list'}" class="nav-link">Series</router-link>
      <router-link :to="{name:'owned-list'}" class="nav-link">Owned</router-link>
      <router-link :to="{name:'wanted-list'}" class="nav-link">Wanted</router-link>
      <router-link :to="{name:'read-list'}" class="nav-link">Read</router-link>
    </div>
  </div>
  <router-view></router-view>
</div>
        `
      },
      children: [
        listHandler({name: 'book', fetch: api.list('book'), containerWrapper}),
        itemHandler({name: 'book', fetch: api.get('book'), containerWrapper}),
        listHandler({name: 'author', fetch: api.list('author'), containerWrapper}),
        itemHandler({name: 'author', fetch: api.get('author'), containerWrapper}),
        listHandler({name: 'series', listName: 'series', fetch: api.list('series'), containerWrapper}),
        itemHandler({name: 'series', listName: 'series', fetch: api.get('series'), containerWrapper}),
        listHandler({name: 'read', listName: 'read', fetch: api.list('read'), containerWrapper}),
        itemHandler({name: 'read', listName: 'read', fetch: api.get('read'), containerWrapper}),
        listHandler({name: 'owned', listName: 'owned', fetch: api.list('owned'), containerWrapper}),
        itemHandler({name: 'owned', listName: 'owned', fetch: api.get('owned'), containerWrapper}),
        listHandler({name: 'wanted', listName: 'wanted', fetch: api.list('wanted'), containerWrapper}),
        itemHandler({name: 'wanted', listName: 'wanted', fetch: api.get('wanted'), containerWrapper})
      ]
    }
  ]
}])})

bootstrap()
