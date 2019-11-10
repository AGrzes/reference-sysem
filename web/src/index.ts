import * as _ from 'lodash'
import {Api, app, bootstrap, components, detailsComponent , HandlerGenerator, listComponent, router, Vue} from 'yellow-common-vue'

components()

listComponent({name: 'book', label: 'title', secondaryLabel: 'author'});
['author', 'series'].forEach((name) => listComponent({name}));
['owned', 'wanted', 'read'].forEach((name) => listComponent({name, label: 'book'}))

detailsComponent('book', [{name: 'name', kind: 'string', section: 'header'},
{name: 'author', kind: 'reference', target: 'author', section: 'subHeader'},
{name: 'description', kind: 'string'},
{name: 'labels', kind: 'enum', multiplicity: 'multiple' }])

detailsComponent('author', [{name: 'name', kind: 'string', section: 'header'},
{name: 'description', kind: 'string'},
{name: 'books', kind: 'reference', target: 'book', multiplicity: 'multiple'}])

detailsComponent('series', [{name: 'name', kind: 'string', section: 'header'},
{name: 'description', kind: 'string'},
{name: 'books', kind: 'reference', target: 'book', multiplicity: 'multiple'}])

detailsComponent('owned', [{name: 'book', kind: 'reference', target: 'book', section: 'header'},
{name: 'description', kind: 'string'},
{name: 'form', kind: 'string'},
{name: 'library', kind: 'enum'}])

detailsComponent('wanted', [{name: 'book', kind: 'reference', target: 'book', section: 'header'},
{name: 'description', kind: 'string'}])

detailsComponent('read', [{name: 'book', kind: 'reference', target: 'book', section: 'header'},
{name: 'description', kind: 'string'},
{name: 'progress', kind: 'nested', fields: [
  {name: 'date', kind: 'string', section: 'inline'},
  {name: 'position', kind: 'string', section: 'inline'},
  {name: 'increment', kind: 'enum', section: 'inline'}
]}])

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
      <router-link :to="{name:'reading'}" class="nav-link">Reading</router-link>
      <router-link :to="{name:'explore'}" class="nav-link">Explore</router-link>
      <router-link :to="{name:'inbox'}" class="nav-link">Inbox</router-link>
      <div class="pl-4">
        <h3>Model</h3>
        <router-link :to="{name:'book-list'}" class="nav-link">Books</router-link>
        <router-link :to="{name:'author-list'}" class="nav-link">Authors</router-link>
        <router-link :to="{name:'series-list'}" class="nav-link">Series</router-link>
        <router-link :to="{name:'owned-list'}" class="nav-link">Owned</router-link>
        <router-link :to="{name:'wanted-list'}" class="nav-link">Wanted</router-link>
        <router-link :to="{name:'read-list'}" class="nav-link">Read</router-link>
      </div>
    </div>
  </div>
  <router-view></router-view>
</div>
        `
      },
      children: [
        {
          name: 'reading',
          path: 'reading',
          component: {
            template: `
<h1>Reading</h1>
            `
          }
        }, {
          name: 'explore',
          path: 'explore',
          component: {
            template: `
<div>
  <h1>Explore</h1>
  <router-view></router-view>
</div>
            `
          },
          children: [
            {
              name: 'explore-book',
              path: 'book',
              component: {
                template: `
<h1>Book</h1>
                `
              }
            }, {
              name: 'explore-author',
              path: 'author',
              component: {
                template: `
<h1>Author</h1>
                `
              }
            }
          ]
        }, {
          name: 'inbox',
          path: 'inbox',
          component: {
            template: `
<h1>Inbox</h1>
            `
          }
        }, {
        name: 'model',
        path: 'model',
        component: {
          template: `
  <router-view></router-view>
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
    }
  ]
}])})

bootstrap()
