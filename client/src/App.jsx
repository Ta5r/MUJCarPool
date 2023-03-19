import { ChakraProvider, theme } from '@chakra-ui/react'
import { useState } from 'react'
import Home from "./pages/Home"
// import Login from "./pages/Login"
// import Signup from "./pages/Signup"
// import Results from "./pages/Results"
// import  from "./pages/

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChakraProvider theme={theme}>
    <Home/>
    {/* <Login/> */}
    {/* <Results/> */}
    {/* <Signup/> */}
    </ChakraProvider>
  )
}

export default App
