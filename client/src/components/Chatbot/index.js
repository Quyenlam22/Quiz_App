import { MessageOutlined } from "@ant-design/icons";
import './Chatbot.scss';
import { useState } from "react";
import { Modal } from "antd";
import ChatMessage from "./ChatMessage";

function Chatbot () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    showModal();
  }

  return (
    <>
      <button className="chatbot" onClick={handleClick} >
        <MessageOutlined/>
      </button>
      <Modal
        open={isModalOpen}
        closable={false}
        footer={null}
        onCancel={handleCancel}
        width={800}
        styles={{
          body: { height: "90vh" },
          content: { maxWidth: "90vw", top: 20 },
        }}
      >
        <ChatMessage />
      </Modal>
    </>
  )
}

export default Chatbot;