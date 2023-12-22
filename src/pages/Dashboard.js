import { Button, Card, Col, Row, Space, Upload, message } from "antd";
import {
  ClearOutlined,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { blue, red } from "@ant-design/colors";
import { useState } from "react";
import axios from "axios";
import { ENDPOINTS, FetchData } from "../utils/endpoints";

export default function Dashboard() {
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await FetchData(ENDPOINTS.UPLOAD_CV, "POST", formData);
      messageApi.success("Upload file berhasil");
      onSuccess();
    } catch (error) {
      onError();
      if (error.response.data.error) {
        messageApi.error(error.response.data.error[0]);
      } else {
        messageApi.error(error.response.data.message);
      }
    }
  };

  const onPreview = async (file) => {
    const url = URL.createObjectURL(file.originFileObj);
    window.open(url, "_blank");
  };

  const propsUpload = {
    onChange: onChange,
    customRequest: customRequest,
    fileList: fileList,
    listType: "picture",
    maxCount: 1,
    showUploadList: {
      showDownloadIcon: true,
      showRemoveIcon: true,
      removeIcon: (
        <ClearOutlined
          style={{ color: red[6] }}
          onClick={(e) => console.log(e, "custom downloadIcon event")}
        />
      ),
      downloadIcon: (
        <DownloadOutlined
          style={{ color: blue[6] }}
          onClick={() => onPreview(fileList[0])}
        />
      ),
    },
    onPreview: onPreview,
  };
  return (
    <>
      {contextHolder}
      <Row justify="center">
        <Col span={8}>
          <Space direction="vertical" style={{ width: "400px" }}>
            <Upload {...propsUpload}>
              <Button
                type="primary"
                icon={<UploadOutlined />}
                style={{ width: "400px" }}
              >
                Upload CV LinkedIn
              </Button>
            </Upload>
            {fileList.length >= 1 ? null : (
              <Card
                style={{ width: "100%", height: "66px" }}
                bordered={true}
              ></Card>
            )}
          </Space>
        </Col>
      </Row>
    </>
  );
}
