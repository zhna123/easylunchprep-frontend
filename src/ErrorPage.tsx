import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  
  const error = useRouteError();

  return (
    // <Flex direction='column' align='center' gap='24px' bg='main_green.50' minH='100vh' p={24} fontSize={20} color='main_green.900'>
    //   <h1>Oops!</h1>
    //   <p>Sorry, an unexpected error has occurred.</p>
    //   <p>
    //     <i>{error.statusText || error.message}</i>
    //   </p>
    // </Flex>
    <div></div>
  )
}