import { createMachine, sendParent } from 'xstate'

export const spawnedMachine = createMachine({
  id: 'spawned',
  initial: 'offline',
  states: {
    offline: {
      on: {
        WAKE: 'online'
      }
    },
    online: {
      after: {
        1000: {
          actions: sendParent('REMOTE.ONLINE')
        }
      }
    }
  }
})
