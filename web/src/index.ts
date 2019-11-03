import {Api, app, bootstrap, itemHandler, listHandler, router , Vue} from 'yellow-common-vue'
// import './components'

Vue.component('book-summary', {
  props: ['book'],
  template:  `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">{{book.name}} <small>{{book.author}}</small></h5>
    <router-link :to="{name:'book',params:{book:book._id}}" class="nav-link">Details</router-link>
  </div>
</div>
  `
})

Vue.component('book-details', {
  props: ['book'],
  template:  `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">{{book.name}} <small>{{book.author}}</small></h5>
    <p>{{book.description}}</p>
    <span class="badge badge-primary mr-1" v-for="label in book.labels">{{label}}</span>
  </div>
</div>
  `
})

Vue.component('author-summary', {
  props: ['author'],
  template:  `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">{{author.name}}</h5>
    <router-link :to="{name:'author',params:{author:author._id}}" class="nav-link">Details</router-link>
  </div>
</div>
  `
})

Vue.component('author-details', {
  props: ['author'],
  template:  `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">{{author.name}}</h5>
    <p>{{author.description}}</p>
    <ul>
      <router-link :to="{name:'book',params:{book}}" tag="li" v-for="book in author.books">book</router-link>
    </ul>
  </div>
</div>
  `
})

Vue.component('series-summary', {
  props: ['series'],
  template:  `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">{{series.name}}</h5>
    <router-link :to="{name:'series',params:{series:series._id}}" class="nav-link">Details</router-link>
  </div>
</div>
  `
})

Vue.component('series-details', {
  props: ['series'],
  template:  `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">{{series.name}}</h5>
    <p>{{series.description}}</p>
    <ul>
      <router-link :to="{name:'book',params:{book}}" tag="li" v-for="book in series.books">book</router-link>
    </ul>
  </div>
</div>
  `
})

Vue.component('owned-summary', {
  props: ['owned'],
  template:  `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">{{owned.book}}</h5>
    <router-link :to="{name:'owned',params:{owned:owned._id}}" class="nav-link">Details</router-link>
  </div>
</div>
  `
})

Vue.component('owned-details', {
  props: ['owned'],
  template:  `
<div class="card">
  <div class="card-body">
    <h5 class="card-title"><router-link :to="{name:'book',params:{book: owned.book}}">{{owned.book}}</router-link></h5>
    <p>{{owned.description}}</p>
    <span class="badge badge-primary mr-1">{{owned.form}}</span>
    <span class="badge badge-primary mr-1">{{owned.library}}</span>
  </div>
</div>
  `
})

Vue.component('wanted-summary', {
  props: ['wanted'],
  template:  `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">{{wanted.book}}</h5>
    <router-link :to="{name:'wanted',params:{wanted:wanted._id}}" class="nav-link">Details</router-link>
  </div>
</div>
  `
})

Vue.component('wanted-details', {
  props: ['wanted'],
  template:  `
<div class="card">
  <div class="card-body">
    <h5 class="card-title"><router-link :to="{name:'book',params:{book: wanted.book}}">{{wanted.book}}</router-link></h5>
    <p>{{wanted.description}}</p>
  </div>
</div>
  `
})

Vue.component('read-summary', {
  props: ['read'],
  template:  `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">{{read.book}}</h5>
    <router-link :to="{name:'read',params:{read:read._id}}" class="nav-link">Details</router-link>
  </div>
</div>
  `
})

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
        listHandler({name: 'book', fetch: api.list('books'), containerWrapper}),
        itemHandler({name: 'book', fetch: api.get('books'), containerWrapper}),
        listHandler({name: 'author', fetch: api.list('authors'), containerWrapper}),
        itemHandler({name: 'author', fetch: api.get('authors'), containerWrapper}),
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
