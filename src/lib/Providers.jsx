



import { Provider } from "react-redux";
import { UserProvider } from "./UserContext";
import store from "../redux/store";
import { AuthProvider } from "../context/AuthContext";


const Providers = ({ children }) => {
  return (
    <UserProvider>
      <Provider store={store}>
        <AuthProvider>

          {children}
        </AuthProvider>
      </Provider>
    </UserProvider>
  );
};

export default Providers;