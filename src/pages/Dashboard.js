import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Upload,
  List,
  message,
  Carousel,
  Alert,
} from "antd";
import {
  ClearOutlined,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { blue, red } from "@ant-design/colors";
import { useEffect, useState } from "react";
import { ENDPOINTS, FetchData } from "../utils/endpoints";

const listData = [
  { title: "Card 1", content: "Content of Card 1" },
  { title: "Card 2", content: "Content of Card 2" },
  { title: "Card 2", content: "Content of Card 2" },
  { title: "Card 2", content: "Content of Card 2" },
  { title: "Card 2", content: "Content of Card 2" },
  { title: "Card 2", content: "Content of Card 2" },
  { title: "Card 2", content: "Content of Card 2" },
  { title: "Card 2", content: "Content of Card 2" },
  { title: "Card 2", content: "Content of Card 2" },
  { title: "Card 2", content: "Content of Card 2" },
  { title: "Card 2", content: "Content of Card 2" },
  { title: "Card 2", content: "Content of Card 2" },
];
export default function Dashboard() {
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState([]);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await FetchData(ENDPOINTS.GET_ALL_TRANS, "GET");
      setListData(res.result);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        messageApi.error(error.response.data.error[0]);
      } else {
        messageApi.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

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
      if (error.response && error.response.data && error.response.data.error) {
        messageApi.error(error.response.data.error[0]);
      } else {
        messageApi.error(error.message || "Upload failed");
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
      <div style={{ display: "flex", overflowX: "auto", padding: "8px" }}>
        {listData.map((resume, index) => (
          <Col key={index} span={5} style={{ padding: "10px" }}>
            <Alert message={<a href={""}>{resume.fileName}</a>} type="info" />
          </Col>
        ))}
      </div>

      <Row justify="center" style={{ marginTop: "30px" }}>
        <Col>
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