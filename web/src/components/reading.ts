import {Vue} from 'yellow-common-vue'

export const CurrentReading = Vue.extend({
  template: `
<div class="col-9">
  <h3>Read</h3>
  <div class="row">
    <div class="col-12 mt-4" v-for="book in read">
      <h4>
        {{book.title}}
        <small>{{book.author.name}}</small>
        <button type="button" class="btn btn-outline-dark"><i class="fas fa-plus-circle"></i></button>
      </h4>
      <div class="progress">
        <div class="progress-bar"
          role="progressbar"
          :style="{width: book.progress[0].position/book.pages*100+'%'}"
          :aria-valuenow="book.progress[0].position"
          aria-valuemin="0"
          :aria-valuemax="book.pages">
            {{book.progress[0].position}}/{{book.pages}}
          </div>
      </div>
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
