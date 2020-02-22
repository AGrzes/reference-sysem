import {Vue} from 'yellow-common-vue'
import './editor'
import { modal } from './modal'

const ConfirmFinish = Vue.extend({
  props: ['book'],
  template: `
<p>Confirm finishing "{{book.title}}"</p>
  `
})

const ConfirmDelete = Vue.extend({
  props: ['book'],
  template: `
<p>Confirm removing reading attempt for "{{book.title}}"</p>
  `
})

const Edit = Vue.extend({
  props: ['content'],
  template: `
<edit-yaml v-model="current"></edit-yaml>
  `,
  data() {
    return {
      current: this.content
    }
  }
})

const AddProgress = Vue.extend({
  props: ['book'],
  template: `
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Record progress reading "{{book.title}}"</label>
    <div class="input-group">
      <input class="form-control" placeholder="progress" aria-label="progress"
        v-model="position"
        type="number"
        :min="this.book.progress[0].position"
        :max="book.pages">
      <div class="input-group-append">
        <span class="input-group-text">/{{book.pages}}</span>
        <span class="input-group-text">+{{position-this.book.progress[0].position}}</span>
      </div>
    </div>
  </div>
</form>
  `,
  data() {
    return {
      position: this.book.progress[0].position
    }
  }
})

export const CurrentReading = Vue.extend({
  template: `
<div class="col-9">
  <h3>Read</h3>
  <div class="row">
    <div class="col-12 mt-4" v-for="book in read">
      <h4 class="d-flex flex-wrap">
        <span>
          {{book.title}}
          <small class="mr-auto">{{book.author.name}}</small>
        </span>
        <span class="progress flex-grow-1 align-self-center">
          <span class="progress-bar"
            role="progressbar"
            :style="{width: book.progress[0].position/book.pages*100+'%'}"
            :aria-valuenow="book.progress[0].position"
            aria-valuemin="0"
            :aria-valuemax="book.pages">
              {{book.progress[0].position}}/{{book.pages}}
            </span>
        </span>
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link" @click="record(book)"><i class="fas fa-plus-circle"></i></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="finish(book)"><i class="fas fa-check"></i></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="dropdown"><i class="fas fa-ellipsis-h"></i></a>
            <div class="dropdown-menu">
              <a class="dropdown-item" @click="edit(book)"><i class="fas fa-edit"></i>Edit</a>
              <a class="dropdown-item" @click="cancel(book)"><i class="fas fa-minus-circle"></i>Delete</a>
            </div>
          </li>
        </ul>
      </h4>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Page</th>
            <th scope="col">Progress</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="progress in book.progress">
            <td>{{progress.date}}</td>
            <td>{{progress.position}}</td>
            <td><span class="badge badge-primary" v-if="progress.increment > 0">+{{progress.increment}}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
  `,
  methods: {
    finish(book) {
      modal({
        component: ConfirmFinish,
        host: this.$el,
        title: 'Confirm',
        props: {book},
        buttons: [
          {
            name: 'Confirm',
            onclick: (m) => {
              book.progress.unshift({
                date: '2019-11-11',
                position: book.pages,
                increment: book.pages - book.progress[0].position
              })
              m.close()
            },
            class: 'btn-primary'
          }, {
            name: 'Cancel',
            onclick(m) {
              m.close()
            },
            class: 'btn-secondary'
          }
        ]
      })
    },
    cancel(book) {
      modal({
        component: ConfirmDelete,
        host: this.$el,
        title: 'Confirm',
        props: {book},
        buttons: [
          {
            name: 'Confirm',
            onclick: (m) => {
              this.read.splice(this.read.indexOf(book), 1)
              m.close()
            },
            class: 'btn-primary'
          }, {
            name: 'Cancel',
            onclick(m) {
              m.close()
            },
            class: 'btn-secondary'
          }
        ]
      })
    },
    record(book) {
      modal({
        component: AddProgress,
        host: this.$el,
        title: 'Confirm',
        props: {book},
        buttons: [
          {
            name: 'Confirm',
            onclick: (m) => {
              book.progress.unshift({
                date: '2019-11-11',
                position: m.component.position,
                increment: m.component.position - book.progress[0].position
              })
              m.close()
            },
            class: 'btn-primary'
          }, {
            name: 'Cancel',
            onclick(m) {
              m.close()
            },
            class: 'btn-secondary'
          }
        ]
      })
    },
    edit(book) {
      modal({
        component: Edit,
        host: this.$el,
        title: 'Confirm',
        props: {content: book.progress},
        buttons: [
          {
            name: 'Confirm',
            onclick: (m) => {
              book.progress = m.component.current
              m.close()
            },
            class: 'btn-primary'
          }, {
            name: 'Cancel',
            onclick(m) {
              m.close()
            },
            class: 'btn-secondary'
          }
        ]
      })
    }
  },
  data() {
    return {
      read: [{
        title: 'Nawyk samodyscypliny',
        author: {
          id: 'author:neil-fiore',
          name: 'Neil Fiore'
        },
        pages: 215,
        progress: [{
          date: '2019-11-11',
          position: 15,
          increment: 15
        }, {
          date: '2019-11-04',
          position: 0,
          increment: 0
        }]
      }, {
        title: 'Nawyk samodyscypliny',
        author: {
          id: 'author:neil-fiore',
          name: 'Neil Fiore'
        },
        pages: 215,
        progress: [{
          date: '2019-11-11',
          position: 15,
          increment: 15
        }, {
          date: '2019-11-04',
          position: 0,
          increment: 0
        }]
      }]
    }
  }
})
Vue.component('current-reading', CurrentReading)
