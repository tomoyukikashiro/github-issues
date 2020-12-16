export default function toResource<T>(promise: Promise<T>): () => T | never {
  let status = 'pending'
  let result: T

  console.log('toResource')

  const suspender = promise.then(
    (r) => {
      status = 'fulfilled'
      result = r
    },
    (e) => {
      status = 'rejected'
      result = e
    }
  )

  return () => {
    console.log(status)
    if (status === 'pending') {
      console.log('throw...')
      throw suspender
    } else if (status === 'rejected') {
      console.log('throw...')
      throw result
    } else {
      console.log('resutl')
      return result
    }
  }
}
