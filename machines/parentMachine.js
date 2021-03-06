import { createMachine, assign, send, spawn } from 'xstate'
import { spawnedMachine } from '~/machines/spawnedMachine'
import { invokedMachine } from '~/machines/invokedMachine'

export const parentMachine = createMachine({
  id: 'parent',
  initial: 'step_one',
  context: {
    localOne: null
  },
  states: {
    step_one: {
      src: invokedMachine,
      onDone: 'step_two'
    },
    step_two: {
      entry: assign({
        localOne: () => spawn(spawnedMachine)
      }),
      on: {
        'LOCAL.WAKE': {
          actions: send({ type: 'WAKE' }, { to: context => context.localOne })
        },
        'REMOTE.ONLINE': { target: 'step_three' }
      }
    },
    step_three: {
      type: 'final'
    }
  }
})
