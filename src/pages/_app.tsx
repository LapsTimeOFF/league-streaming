import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
import Twemoji from "react-twemoji";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <IntlProvider locale="en">
      <Twemoji options={{ className: "twemoji" }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Twemoji>
    </IntlProvider>
  );
}
