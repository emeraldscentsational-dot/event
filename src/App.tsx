import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useScrollToTop } from "hooks/useScrollToTop";
import { Provider } from "react-redux";
import { store } from "./redux/store";
const App = () => {
  useScrollToTop();
  return (
    <Provider store={store}>
      <div className="w-full sm:fixed sm:top-0 bg-white z-50">
        <NavBar />
      </div>
      <main className="py-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        toastOptions={{
          style: {
            maxWidth: "700px",
            padding: "12px 16px",
            fontSize: "17px",
            fontWeight: "400",
          },
          error: {
            style: {
              color: "red",
            },
          },
          success: {
            style: {
              color: "green",
            },
          },
        }}
        position="top-center"
        reverseOrder={false}
      />
    </Provider>
  );
};
export default App;
