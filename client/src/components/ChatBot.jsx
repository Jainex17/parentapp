import React, { useEffect } from 'react'
 
const ChatBot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)
 
    script.onload = () => {
        window.botpressWebChat.init({
            "composerPlaceholder": "Chat with bot",
            "botConversationDescription": "This chatbot was built surprisingly fast with Botpress",
            "botId": "38cfd426-b59e-4dab-8184-68ae149c5ff4",
            "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
            "messagingUrl": "https://messaging.botpress.cloud",
            "clientId": "38cfd426-b59e-4dab-8184-68ae149c5ff4",
            "webhookId": "37ddbc93-7c6c-4079-87a6-a05b5c076d87",
            // "lazySocket": true,
            "frontendVersion": "v1",
            "showPoweredBy": true,
            "containerWidth": "100%25",
            "layoutWidth": "100%25",
        });
    }
  }, [])
 
  return <div id="webchat" />
}

export default ChatBot;