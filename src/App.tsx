import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Login from "./routes/Login";
import CreateAccount from "./routes/CreateAccount";
import { auth } from "./firebase";
import Writing from "./routes/Writing";
import ProtectedRoute from "./components/ProtectedRoute";
import Story from "./routes/Story";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/createAccount",
        element: <CreateAccount />,
      },
      {
        path: "/story/*",
        element: <Story />,
      },
      {
        path: "/writing",
        element: (
          <ProtectedRoute>
            <Writing />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  const [isLoading, setLoading] = useState(true);

  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      {isLoading ? <div>Loading</div> : <RouterProvider router={router} />}
    </div>
  );
}

export default App;
