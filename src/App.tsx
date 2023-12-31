import "@/global.css";
import "@fontsource-variable/plus-jakarta-sans";

import { Logo } from "./components/logo";
import { Database } from "./lib/supabase";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { createClient } from "@supabase/supabase-js";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import {
  Drawer,
  DrawerTitle,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
} from "./components/ui/drawer";

interface Message {
  isError?: boolean;
  message?: string;
  identifier?: string;
}

interface SendingStatus {
  isSend: boolean;
  isSending: boolean;
}

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const surpriseLinks: string[] = [
  "https://jafaraziz.com",
  "https://justforfunnoreally.dev/",
];

function App() {
  const [sendingStatus, setSendingStatus] = useState<SendingStatus>({
    isSend: false,
    isSending: false,
  });

  const [message, setMessage] = useState<Message>();

  /**
   * set identifier to message, or genereate a new identifier
   */
  const checkIdentifier = () => {
    const IDENTIFIER_KEY = "you-got-me";

    const setNewIdentifier = () => {
      const identifier = navigator.userAgent + `;key: ${Math.random() * 10000}`;

      localStorage.setItem(IDENTIFIER_KEY, JSON.stringify(identifier));

      setMessage({ identifier: identifier });
    };

    const value = localStorage.getItem(IDENTIFIER_KEY);

    if (!value) return setNewIdentifier();

    try {
      const identifier = JSON.parse(value);

      if (typeof identifier !== "string") throw Error("invalid idenfifier");

      return setMessage({ identifier: identifier });
    } catch (error) {
      return setNewIdentifier();
    }
  };

  /**
   * submit a data
   *
   * @returns
   */
  const onSubmit = async () => {
    setSendingStatus({ ...sendingStatus, isSending: true });

    if (!message?.message || message.message.trim() === "") {
      return setMessage({ ...message, isError: true });
    }

    await supabase.from("questions").insert({
      message: message.message,
      identifier: message.identifier,
    });

    setSendingStatus({ isSend: true, isSending: false });
  };

  /**
   * close drawer and reset the form
   */
  const onCloseDrawer = () => {
    setSendingStatus({ isSend: false, isSending: false });

    setMessage({ ...message, message: "", isError: false });
  };

  const goToSurpriseLink = () => {
    const index = Math.floor(Math.random() * surpriseLinks.length);

    const a = document.createElement("a");
    a.target = "_blank";
    a.href = surpriseLinks[index];
    return a.click();
  };

  useEffect(() => {
    checkIdentifier();
  }, []);

  return (
    <div
      vaul-drawer-wrapper=""
      className="bg-background circle-background w-full h-svh "
    >
      <div className="container max-w-md px-4 font-sans">
        <header className="flex justify-between items-center py-4">
          <div className="font-semibold">Jafar.Aziz</div>
          <a
            target="__blank"
            referrerPolicy="no-referrer"
            href="https://jafaraziz.com"
          >
            <Logo />
          </a>
        </header>
        <main className="flex flex-col gap-4 ">
          <h1 className="space-y-2">
            <div className="text-2xl font-mono font-extrabold text-primary">
              Ask Me
            </div>
            <div className="text-4xl font-extrabold flex">
              <div className="bg-primary px-4 text-primary-foreground">
                Anything
              </div>
            </div>
          </h1>
          <div>
            <Textarea
              rows={5}
              autoFocus
              value={message?.message}
              className="bg-background"
              onChange={(e) =>
                setMessage({ ...message, message: e.target.value })
              }
            />
            {message?.isError && (
              <div className="text-xs text-destructive font-semibold">
                Can you say a word for me? Thanks!
              </div>
            )}
          </div>
          <Button onClick={onSubmit}>
            {!sendingStatus.isSending ? (
              <div className="flex items-center gap-1">
                <span>Send</span>
                <ChevronRightIcon />
              </div>
            ) : (
              "Sending...."
            )}
          </Button>
          <Drawer
            shouldScaleBackground
            onClose={onCloseDrawer}
            open={sendingStatus.isSend}
          >
            <DrawerContent>
              <div className="max-w-sm container">
                <DrawerHeader>
                  <DrawerTitle className="text-center">
                    Thanks for filling out this form!
                  </DrawerTitle>
                </DrawerHeader>
                <div></div>
                <DrawerFooter className="flex">
                  <Button className="w-full" onClick={onCloseDrawer}>
                    Send another message?
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={goToSurpriseLink}
                  >
                    Nah, surprise me
                  </Button>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </main>
        <footer className="flex justify-center w-full">
          <a
            target="__blank"
            referrerPolicy="no-referrer"
            href="https://twitter.com/jfrAziz"
            className="text-center text-xs pt-4"
          >
            @jfrAziz
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
