import { RouteConfig } from 'vue-router'

const config: RouteConfig = {
  name: 'reading',
  path: 'reading',
  component: {
    template: `
<div class="col-9">
  <h3>Read</h3>
  <div class="row">
    <div class="col-12 mt-4" v-for="book in read">
      <h4>
        {{book.title}}
        <small>{{book.author.name}}</small>
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
  <h3>Backlog</h3>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">Book</th>
      <th scope="col">Scheduled</th>
      <th scope="col">Library</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="book in scheduled">
      <td>{{book.book.name}} <small>{{book.book.author.name}}</small></td>
      <td>{{book.scheduled}}</td>
      <td>{{book.library.name}}</td>
    </tr>
  </tbody>
</table>
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
        }],
        scheduled: [{
          book: {
            id: 'book:harry-porter-and-goblet-of-fire',
            name: 'Harry Porter and Goblet of Fire',
            author: {
              id: 'author:j-k-rowling',
              name: 'J. K. Rowling'
            }
          },
          priority: 1,
          scheduled: '2019-12',
          library: {
            id: 'library:play',
            name: 'Play Books'
          },
          owned: false
        }, {
          book: {
            id: 'book:getting-things-done',
            name: 'Getting Things Done',
            author: {
              id: 'author:david-allen',
              name: 'David Allen'
            }
          },
          priority: 2,
          scheduled: '2019-12',
          library: {
            id: 'library:home',
            name: 'Books at Home'
          },
          owned: true
        }]
      }
    }
  }
}

export default config
