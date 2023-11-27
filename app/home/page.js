import Head from "next/head";
import Nav from "../components/Navbar";
import HeaderPicture from "../components/Header";
import Cards from "../components/cards";

const Home = () => {
  return (
    <div>
      <Nav />
      <HeaderPicture />
      <Cards />
    </div>
  );
};

export default Home;
