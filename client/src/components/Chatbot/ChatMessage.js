import { Avatar, Button, Flex, Form, Image, Input, Upload } from "antd";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { SmileOutlined, SendOutlined, FileImageOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { sendMessage } from "../../services/chatbotService";

function ChatMessage() {
  const [form] = Form.useForm();
  const [showPicker, setShowPicker] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [preview, setPreview] = useState(null);
  const messageContainerRef = useRef(null);
  const [isSending, setIsSending] = useState(false);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, []);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onFinish = async (values) => {
    const newMsg = {
      role: "user",
      text: values.message,
    };

    try {
      setIsSending(true); 
      const data = await sendMessage(newMsg);
      setMessages((prev) => [...prev, ...data]);
      form.resetFields();
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error);
    } finally {
      setIsSending(false);
    }
  };

  const beforeUpload = (file) => {
    // setFile(file);
    console.log(file);
    setPreview(URL.createObjectURL(file)); 
    setFileList([file]);
    return false; 
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setFileList([]); // xoá file trong Upload
  };

  return (
    <div
      className="message"
      ref={messageContainerRef}
    >
      {messages.map((message) =>
        message.role === "user" ? (
          <div key={message._id} className="message__box message__box--me">
            <p className="message__content message__content--me">
              {message.text}
            </p>
          </div>
        ) : (
          <div className="message__box" key={message._id}>
            <Flex align="center" gap={8}>
              <Avatar src={"https://i.pravatar.cc/100?img=3"}>
                {/* {message.photoURL
                  ? ""
                  : message.displayName?.charAt(0)?.toUpperCase()} */}
              </Avatar>
              <span className="message__name">AI Agent</span>
              <span className="message__time">
                {new Date(message.createdAt).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </Flex>
            <p className="message__content">{message.text}</p>
          </div>
        )
      )}
      <Form style={{position: "sticky", bottom: 0}} form={form} onFinish={onFinish}>
        <Flex gap={4}>
          <Form.Item name="message" style={{ flex: 1, marginBottom: 0 }}>
            <Input placeholder="Nhập tin nhắn..." disabled={isSending} />
          </Form.Item>

          <Form.Item>
            <div>
              <Button onClick={() => setShowPicker(!showPicker)}><SmileOutlined /></Button>
              
              {showPicker && (
                <div>
                  {/* <Button 
                    type="text" 
                    onClick={() => setShowPicker(false)}
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      zIndex: 1000
                    }}
                    icon={<MdCancel size={24} />}
                  /> */}
                    <EmojiPicker
                      onEmojiClick={(emojiObject) => {
                        form.setFieldsValue({
                          message: (form.getFieldValue("message") || "") + emojiObject.emoji,
                        });
                        setShowPicker(false); 
                    }}
                  />
                </div>
              )}
            </div>
          </Form.Item>

          <Form.Item>
            <Upload 
              beforeUpload={beforeUpload} 
              fileList={fileList}         
              onRemove={handleRemoveImage}
              showUploadList={false}
            >
              <Button icon={<FileImageOutlined />}></Button>
            </Upload>
          </Form.Item>
          
          <Button disabled={isSending} color="pink" variant="solid" htmlType="submit">
            <SendOutlined />
          </Button>
        </Flex>
      </Form>

      {preview && (
        <Flex justify="flex-end" align="center" className="upload">
          <Image
            className="upload__image"
            src={preview}
            // alt="Preview"
            width={80}
            style={{ borderRadius: 8, border: "#ddd" }}
          />
          <Button 
            className="upload__close" 
            type="text" 
            icon={<CloseCircleOutlined />}
            onClick={handleRemoveImage}
          />
        </Flex>
      )}
    </div>
  );
}

export default ChatMessage;