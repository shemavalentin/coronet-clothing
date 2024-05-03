import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";
//import Navigation from "./routes/navigation/navigation.component";
//import Authentication from "./routes/authentication/authentication.component";
// import Shop from "./routes/shop/shop.component";
//import Checkout from "./routes/checkout/checkout.component";
import Spinner from "./components/spinner/spinner.component";
import { checkUserSession } from "./store/user/user.action";
//import PaymentForm from "./components/payment-form/payment-form.component";

// To make code splitting and chunking we need to download js loggin page when  we need it
// Then we use dynamic import pettern and it is an async and await

// import Home from "./routes/home/home.component";

// But react doesn't know the dynamic import until you tell it using lazy function

//const Home = await import("./routes/home/home.component");
// Convert the above import to react lazy function whether to use await

const Navigation = lazy(() =>
  import("./routes/navigation/navigation.component")
);

const Shop = lazy(() => import("./routes/shop/shop.component"));

const Checkout = lazy(() => import("./routes/checkout/checkout.component"));

const Home = lazy(() => import("./routes/home/home.component")); // This page will not render untill it is required

const Authentication = lazy(() =>
  import("./routes/authentication/authentication.component")
);

const App = () => {
  // Need to dispatch the setCurrentUser action object to the rootReducer
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    // Then use suspense function to tell react what to render while waiting the lazy load
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index={true} element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
