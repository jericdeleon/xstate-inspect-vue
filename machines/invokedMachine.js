import { createMachine } from 'xstate'

export const invokedMachine = createMachine({
  id: 'invoked',
  initial: 'running',
  states: {
    running: {
      on: {
        finish: {
          target: 'finished'
        }
      }
    },
    finished: {
      type: 'final'
    }
  }
})
