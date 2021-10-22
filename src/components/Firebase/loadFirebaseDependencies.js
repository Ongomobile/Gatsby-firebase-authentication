const app = import("firebase/app")
const auth = import("firebase/auth")
const database = import("firebase/firestore")
const functions = import("firebase/functions")

const loadFirebaseDependencies = Promise.all([
  app,
  auth,
  database,
  functions,
]).then(values => {
  return values[0].default
})

export default loadFirebaseDependencies
