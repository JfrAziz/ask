import "@/global.css";
import "@fontsource-variable/plus-jakarta-sans";

import { useState } from "react";
import { Logo } from "./components/logo";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import {
  Drawer,
  DrawerTitle,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerDescription,
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

function App() {
  const [sendingStatus, setSendingStatus] = useState<SendingStatus>({
    isSend: false,
    isSending: false,
  });

  const [message, setMessage] = useState<Message>();

  const onSubmit = () => {
    setSendingStatus({ ...sendingStatus, isSending: true });

    if (!message?.message || message.message.trim() === "") {
      return setMessage({ ...message, isError: true });
    }

    setSendingStatus({ isSend: true, isSending: false });
  };

  const onCloseDrawer = () => {
    setSendingStatus({ isSend: false, isSending: false });

    setMessage({ ...message, message: "", isError: false });
  };

  return (
    <div
      vaul-drawer-wrapper=""
      className="bg-background circle-background w-full h-svh "
    >
      <div className="container max-w-sm px-4 font-sans">
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
              value={message?.message}
              className="bg-background"
              onChange={(e) =>
                setMessage({ ...message, message: e.target.value })
              }
            />
            {message?.isError && (
              <div className="text-xs text-destructive font-semibold">
                Hmm, say a word please
              </div>
            )}
          </div>
          <Button onClick={onSubmit}>Send</Button>
          <Drawer shouldScaleBackground open={sendingStatus.isSend}>
            <DrawerContent>
              <div className="max-w-sm container">
                <DrawerHeader>
                  <DrawerTitle className="text-center">
                    Thank You For Filling this form
                  </DrawerTitle>
                  <DrawerDescription className="text-center">
                    here is a cat picture
                  </DrawerDescription>
                </DrawerHeader>
                <div></div>
                <DrawerFooter className="flex">
                  <Button className="w-full" onClick={onCloseDrawer}>
                    Another message?
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={onCloseDrawer}
                  >
                    No, just give me surprise
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
