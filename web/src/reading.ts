import { RouteConfig } from 'vue-router'
import { CurrentReading } from './components/reading'

const config: RouteConfig = {
  name: 'reading',
  path: 'reading',
  component: CurrentReading
}

export default config
