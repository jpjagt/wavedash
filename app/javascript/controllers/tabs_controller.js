import { TabsController } from 'stimulus-tabs'

export default class extends TabsController {
  static tabs = ['creditcard', 'ideal']
  static selectedTabClass = 'active'
}
