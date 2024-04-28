import React, { useEffect } from "react";
import { SideBar } from "./SideBar";

function ChatBot() {
  useEffect(() => {
    window.botpressWebChat.init({
      botId: "38cfd426-b59e-4dab-8184-68ae149c5ff4",
      clientId: "38cfd426-b59e-4dab-8184-68ae149c5ff4",
      hostUrl: "https://cdn.botpress.cloud/webchat/v0",
      messagingUrl: "https://messaging.botpress.cloud",
      botName: "ChatBot",
      containerWidth: "83%25",
      layoutWidth: "100%25",
      hideWidget: true,
      disableAnimations: true,
    });
    window.botpressWebChat.onEvent(
      function () {
        window.botpressWebChat.sendEvent({ type: "show" });
      },
      ["LIFECYCLE.LOADED"]
    );
  }, []);

  return (
    <>
      <SideBar user={user} />
      <div id="botpress-webchat-container"></div>
    </>
  );
}

export default ChatBot;
