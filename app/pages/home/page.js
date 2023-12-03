"use client";
import Nav from "../../components/Navbar";
import HeaderPicture from "../../components/Header";
import FooterSec from "../../components/footer";
import ProductsPage from "../../components/productsSection";
import { useRouter } from "next/navigation";
const Home = () => {
  const router = useRouter();

  // const user = JSON.parse(localStorage.getItem("user"));

  // if (!user) {
  //   router.push("/");
  //   return null;
  // }
  return (
    <div>
      <Nav />
      <HeaderPicture />
      <div className="mx-40 my-10">
        <ProductsPage />
      </div>
      <FooterSec />
    </div>
  );
};

export default Home;
