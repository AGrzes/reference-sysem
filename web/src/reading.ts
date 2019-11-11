import { RouteConfig } from 'vue-router'

const config: RouteConfig = {
  name: 'reading',
  path: 'reading',
  component: {
    template: `
<div class="col-9">
    <h3>Read</h3>
    <div class="row">
      <div class="col-12 mt-1" v-for="book in read">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              {{book.title}}
              <small>{{book.author.name}}</small>
            </h3>
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
          </div>

        </div>
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
  }
}

export default config
