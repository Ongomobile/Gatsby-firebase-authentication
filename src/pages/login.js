import React, { useState, useContext, useEffect } from "react"
import { FirebaseContext } from "../components/Firebase"
import { Form, Input, Button, ErrorMessage } from "../components/common"
import { useAuth } from "../components/Firebase"
import Layout from "../components/layout"

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const { firebase } = useAuth()
  // const { firebase } = useContext(FirebaseContext)
  const [errorMessage, setErrorMessage] = useState("")
  let isMounted = true

  useEffect(() => {
    return () => {
      isMounted = false
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    firebase
      .login({ email: formValues.email, password: formValues.password })
      .catch(error => {
        if (isMounted) {
          setErrorMessage(error.message)
        }
      })
  }

  function handleInputChange(e) {
    e.persist()
    setErrorMessage("")
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Layout>
      <section>
        <Form onSubmit={handleSubmit}>
          <Input
            required
            value={formValues.email}
            name="email"
            onChange={handleInputChange}
            placeholder="email"
            type="email"
          />
          <Input
            required
            value={formValues.password}
            name="password"
            onChange={handleInputChange}
            placeholder="password"
            type="password"
          />
          {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Button type="submit" block>
            Login
          </Button>
        </Form>
      </section>
    </Layout>
  )
}

export default Login
