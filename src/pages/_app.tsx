import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import BoardProvider from "./game/BoardContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <BoardProvider>
      <Component {...pageProps} />
    </BoardProvider>
  );
};

export default api.withTRPC(MyApp);
