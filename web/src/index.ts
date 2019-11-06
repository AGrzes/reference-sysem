import * as _ from 'lodash'
import {Api, app, bootstrap, components, detailsComponent , HandlerGenerator, listComponent, router, Vue} from 'yellow-common-vue'

components()

listComponent({name: 'book', label: 'title', secondaryLabel: 'author'});
['author', 'series'].forEach((name) => listComponent({name}));
['owned', 'wanted', 'read'].forEach((name) => listComponent({name, label: 'book'}))

detailsComponent('book', [{name: 'name', kind: 'string', section: 'header'},
{name: 'author', kind: 'reference', target: 'author', section: 'subHeader'},
{name: 'description', kind: 'string'},
{name: 'labels', kind: 'string', multiplicity: 'multiple' }])

detailsComponent('author', [{name: 'name', kind: 'string', section: 'header'},
{name: 'description', kind: 'string'},
{name: 'books', kind: 'reference', target: 'book', multiplicity: 'multiple'}])

detailsComponent('series', [{name: 'name', kind: 'string', section: 'header'},
{name: 'description', kind: 'string'},
{name: 'books', kind: 'reference', target: 'book', multiplicity: 'multiple'}])

detailsComponent('owned', [{name: 'book', kind: 'reference', target: 'book', section: 'header'},
{name: 'description', kind: 'string'},
{name: 'form', kind: 'string'},
{name: 'library', kind: 'string'}])

detailsComponent('wanted', [{name: 'book', kind: 'reference', target: 'book', section: 'header'},
{name: 'description', kind: 'string'}])

Vue.component('read-details', {
  props: ['read'],
  template:  `
<div class="card">
  <div class="card-body">
    <h5 class="card-title"><router-link :to="{name:'book',params:{book: read.book}}">{{read.book}}</router-link></h5>
    <p>{{read.description}}</p>
    <ul>
      <li v-for="progress in read.progress">{{progress.date}} page {{progress.position}} <span class="badge badge-primary mr-1">+{{progress.increment}}</span></li>
    </ul>
  </div>
</div>
  `
})

const api = new Api('/api/books/', false)

const hg = new HandlerGenerator({
  containerWrapper(content) {
    return `
<div class="col-9">
  ${content}
</div>
    `
  },
  listFetchGenerator(name) {
    return api.list(name)
  },
  itemFetchGenerator(name) {
    return api.get(name)
  }
})

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
        hg.list({name: 'book', path: 'books', fetch: api.list('books')}),
        hg.item({name: 'book', path: 'books/:book', fetch: api.get('books')}),
        hg.list({name: 'author', path: 'authors', fetch: api.list('authors')}),
        hg.item({name: 'author', path: 'authors/:author', fetch: api.get('authors')}),
        hg.list({name: 'series'}),
        hg.item({name: 'series'}),
        hg.list({name: 'read'}),
        hg.item({name: 'read'}),
        hg.list({name: 'owned'}),
        hg.item({name: 'owned'}),
        hg.list({name: 'wanted'}),
        hg.item({name: 'wanted'})
      ]
    }
  ]
}])})

bootstrap()
