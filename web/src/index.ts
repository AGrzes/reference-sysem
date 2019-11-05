import * as _ from 'lodash'
import {Api, app, bootstrap, HandlerGenerator, router , Vue} from 'yellow-common-vue'

function listComponent({name, label, secondaryLabel}: {name: string, label?: string, secondaryLabel?: string}) {
  label = label || 'name'
  const sl = secondaryLabel ? `<small>{{${name}.${secondaryLabel}}}</small>` : ''
  Vue.component(`${name}-summary`, {
    props: [name],
    template:  `
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{${name}.${label}}} ${sl}</h5>
      <router-link :to="{name:'${name}',params:{${name}:${name}._id}}" class="nav-link">Details</router-link>
    </div>
  </div>
    `
  })
}

interface FieldDescriptor {
  name: string
  section?: string
  kind?: 'string' | 'reference'
  multiplicity?: 'single' | 'multiple'
}

function groupFields(groups: string[], fields: FieldDescriptor[]): {[group: string]: FieldDescriptor[]} {
  return _.groupBy(fields, (fd) => _.includes(groups, fd.section) ? fd.section : 'default')
}

function ensureSingle<T>(value: T|T[]): T {
  if (_.isArray(value)) {
    return value[0]
  } else {
    return value
  }
}

function ensureMultiple<T>(value: T|T[]): T[] {
  if (_.isArray(value)) {
    return value
  } else {
    return [value]
  }
}

function detailsComponent(name: string, fields: FieldDescriptor[]) {
  Vue.component(`${name}-details`, {
    props: [name],
    template:  `
  <generic-details :fields="fields" :item="${name}"></generic-details>
    `,
    data() {
      return {
        fields
      }
    }
  })
}

Vue.component('text-single', {
  props: ['field', 'item'],
  template:  `
  <span>{{value}}</span>
  `,
  computed: {
    value() {
      return ensureSingle(this.item[this.field.name])
    }
  }
})

Vue.component('text-bag', {
  props: ['field', 'item'],
  template:  `
  <span><span v-for="value in values" class="mr-1">{{value}}</span><span>
  `,
  computed: {
    values() {
      return ensureMultiple(this.item[this.field.name])
    }
  }
})

Vue.component('reference-single', {
  props: ['field', 'item'],
  template:  `
  <span>{{value}}</span>
  `,
  computed: {
    value() {
      return ensureSingle(this.item[this.field.name])
    }
  }
})

Vue.component('reference-bag', {
  props: ['field', 'item'],
  template:  `
  <span><span v-for="value in values" class="mr-1">{{value}}</span><span>
  `,
  computed: {
    values() {
      return ensureMultiple(this.item[this.field.name])
    }
  }
})

Vue.component('text-block', {
  props: ['field', 'item'],
  template:  `
  <div>{{value}}</div>
  `,
  computed: {
    value() {
      return ensureSingle(this.item[this.field.name])
    }
  }
})

Vue.component('text-list', {
  props: ['field', 'item'],
  template:  `
  <ul><li v-for="value in values" class="mr-1">{{value}}</li></ul>
  `,
  computed: {
    values() {
      return ensureMultiple(this.item[this.field.name])
    }
  }
})

Vue.component('reference-block', {
  props: ['field', 'item'],
  template:  `
  <div>{{value}}</div>
  `,
  computed: {
    value() {
      return ensureSingle(this.item[this.field.name])
    }
  }
})

Vue.component('reference-list', {
  props: ['field', 'item'],
  template:  `
    <ul><li  v-for="value in values" class="mr-1">{{value}}</li></ul>
  `,
  computed: {
    values() {
      return ensureMultiple(this.item[this.field.name])
    }
  }
})

const inlineComponents = {
  single: {
    string: 'text-single',
    reference: 'reference-single'
  },
  multiple: {
    string: 'text-bag',
    reference: 'reference-bag'
  }
}

Vue.component('field-inline', {
  props: ['field', 'item'],
  template:  `
  <component :is="component" :field="field" :item="item"></component>
  `,
  computed: {
    component() {
      return inlineComponents[this.field.multiplicity || 'single'][this.field.kind || 'string']
    }
  }
})

const blockComponents = {
  single: {
    string: 'text-block',
    reference: 'reference-block'
  },
  multiple: {
    string: 'text-list',
    reference: 'reference-list'
  }
}

Vue.component('field-block', {
  props: ['field', 'item'],
  template:  `
  <component :is="component" :field="field" :item="item"></component>
  `,
  computed: {
    component() {
      return blockComponents[this.field.multiplicity || 'single'][this.field.kind || 'string']
    }
  }
})

Vue.component('generic-details', {
  props: ['fields', 'item'],
  template:  `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">
      <field-inline :field="field" :item="item" v-for="field in sections.header" :key="field.name"></field-inline>
      <small><field-inline :field="field" :item="item" v-for="field in sections.subHeader" :key="field.name"></field-inline></small>
    </h5>
    <field-block :field="field" :item="item" v-for="field in sections.default" :key="field.name"></field-block>
  </div>
</div>
  `,
  computed: {
    sections(): {[section: string]: FieldDescriptor[]} {
      return groupFields(['header', 'subHeader'], this.fields)
    }
  }
})

listComponent({name: 'book', label: 'title', secondaryLabel: 'author'});
['author', 'series'].forEach((name) => listComponent({name}));
['owned', 'wanted', 'read'].forEach((name) => listComponent({name, label: 'book'}))

/*Vue.component('book-details', {
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
})*/

detailsComponent('book', [{name: 'name', kind: 'string', section: 'header'},
{name: 'author', kind: 'reference', section: 'subHeader'},
{name: 'description', kind: 'string'},
{name: 'labels', kind: 'string', multiplicity: 'multiple' }])

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
