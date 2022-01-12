import { useEffect, useState } from "react"
import getFirebaseInstance from "./firebase"
import loadFirebaseDependencies from "./loadFirebaseDependencies"

function useAuth() {
  const [user, setUser] = useState(null)
  const [firebase, setFirebase] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe
    let publicProfileUnsubscribe

    loadFirebaseDependencies.then(app => {
      const firebaseInstance = getFirebaseInstance(app)
      setFirebase(firebaseInstance)

      unsubscribe = firebaseInstance.auth.onAuthStateChanged(userResult => {
        if (userResult) {
          publicProfileUnsubscribe = firebaseInstance.getUserProfile({
            userId: userResult.uid,
            handler: r => {
              firebaseInstance.auth.currentUser.getIdTokenResult(true).then(
                setUser({
                  ...userResult,
                  username: r.empty ? null : r.docs[0].id,
                })
              )
            },
          })
        } else {
          setUser(null)
        }

        setLoading(false)
      })
    })

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }

      if (publicProfileUnsubscribe) {
        publicProfileUnsubscribe()
      }
    }
  }, [])

  return { user, firebase, loading }
}

export default useAuth
