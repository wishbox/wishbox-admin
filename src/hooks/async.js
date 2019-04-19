import { useState, useEffect, useRef } from 'react';

/*
 Async hooks.
 Take in async function & deps,
 returns [value, error, loading] object.
*/


const defaultState = [undefined, null, true]
export const useAsync = (fn, deps) => {
  const self = useRef({ state: defaultState }).current;
  const [, pushState] = useState();

  useEffect(
    () => {
      let isValid = true;

      self.state = defaultState

      pushState(self.state)
      let result = fn()

      // handle sync function / undefined result
      if (!result || !result.then) {
        self.state = [result, null, false]

        return pushState(self.state)
      }

      result
        .then((result) => {
          if (isValid) {
            self.state = [result, null, false];
          }
          pushState(self.state);
        })
        .catch((error) => {
          if (isValid) {
            self.state = [undefined, error, false];
          }
          pushState(self.state);
        });

      return () => {
        self.state = defaultState;
        isValid = false;
      };
    },
    deps
  )

  return self.state
};


export const useAsyncCall = (fn, deps) => {
  // indicates both loading flag and arguments for fn
  const [args, set] = useState();
  const self = useRef({
    start: async (...args) => {
      set(args)
      return new Promise((ok, nok) => {
        self.resolve = ok
        self.reject = nok
      })
    },
    result: null,
    error: null,
    resolve: null,
    reject: null
  }).current;

  // reset/init
  useEffect(() => {
    // edge case when start was called before this init and have args run planned
    if (args === undefined) return
    set(null)
  }, deps)

  // trigger whenever started changes
  useEffect(() => {
    if (!args) return

    let result = fn(...args)
    let isValid = true

    // handle sync function / undefined result
    if (!result || !result.then) {
      if (!isValid) return
      self.result = result
      self.resolve(result)
      set(null)
      return
    }

    result.then(result => {
      if (!isValid) return
      self.result = result
      self.resolve(result)
      set(null)
    }, error => {
      if (!isValid) return
      self.error = error
      self.reject(error)
      set(null)
    })

    return () => {isValid = false}
  }, [args])

  return [self.result, self.error, !!args, self.start]
}


