import { TabsController } from 'stimulus-tabs'

export default class extends TabsController {
  static tabs = ['ideal', 'creditcard']
  static selectedTabClass = 'active'
}
