import { ReactElement } from "react";
import { ToastContainer } from "react-toastify";

import Navbar from "../Nav/index";

const Layout = ({children} : {children: ReactElement}) => {
  return (
    <>
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <Navbar />
      <main
        className="page-height"
      >{children}</main>
    </>
  )
}

export default Layout;
