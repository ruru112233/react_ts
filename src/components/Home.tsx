import { Button, ChakraProvider  } from "@chakra-ui/react";
import PersistentDrawerRight from "../components/PersistentDrawerRight";

export const Home = () => {
  return (
    <>
      <PersistentDrawerRight />
      <p>Home</p>
    </>
  );
};