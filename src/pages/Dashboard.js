import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Upload,
  message,
  Alert,
  Skeleton,
  ConfigProvider,
} from "antd";
import {
  ClearOutlined,
  UploadOutlined,
  DownloadOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { blue, red } from "@ant-design/colors";
import { useEffect, useState } from "react";
import { ENDPOINTS, FetchData } from "../utils/endpoints";
import { Link } from "react-router-dom";
import { CopyBlock, github } from "react-code-blocks";

export default function Dashboard() {
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState([]);
  const [listData, setListData] = useState([]);
  const [loadingFetchData, setLoadingFetchData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [dataJSON, setDataJSON] = useState();
  const [dataJSONDetail, setDataJSONDetail] = useState();
  const [urlPDF, setUrlPDF] = useState();

  useEffect(() => {
    fetchData();
  }, [dataJSON]);

  const fetchData = async () => {
    setLoadingFetchData(true);
    try {
      const res = await FetchData(ENDPOINTS.GET_ALL_TRANS, "GET");
      setListData(res.result);
    } catch (error) {
      messageApi.error(error.response.data.message);
    } finally {
      setLoadingFetchData(false);
    }
  };

  const fetchDetailData = async (id) => {
    setLoading(true);
    try {
      const res = await FetchData(ENDPOINTS.GET_DETAIL_TRANS(id), "GET");
      setDataJSONDetail(res.result);
      setDataJSON(null);
      setUrlPDF(null);
    } catch (error) {
      messageApi.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadFile = async ({ file, onSuccess, onError }) => {
    setLoadingUpload(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await FetchData(ENDPOINTS.UPLOAD_CV, "POST", formData);
      setDataJSON(res.result);
      setDataJSONDetail(null);
      messageApi.success("Upload file berhasil");
      const url = URL.createObjectURL(fileList[0].originFileObj);
      setUrlPDF(url);
      onSuccess();
      setLoadingUpload(false);
    } catch (error) {
      console.log(error);
      onError();
      if (error.response && error.response.data && error.response.data.error) {
        messageApi.error(error.response.data.error[0]);
      } else {
        messageApi.error(error.response.data.message || "Upload failed");
      }
    } finally {
      setLoadingUpload(false);
    }
  };

  const onPreview = async (file) => {
    const url = URL.createObjectURL(file.originFileObj);
    window.open(url, "_blank");
  };

  const propsUpload = {
    onChange: onChange,
    customRequest: uploadFile,
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
        {loadingFetchData
          ? Array.from({ length: 10 }).map((_, index) => (
              <Col key={index} span={5} style={{ padding: "10px" }}>
                <Skeleton active />
              </Col>
            ))
          : listData.map((resume, index) => (
              <Col key={index} span={5} style={{ padding: "10px" }}>
                <Alert
                  message={
                    <Link
                      onClick={() => {
                        fetchDetailData(resume.id);
                      }}
                    >
                      {resume.fileName}
                    </Link>
                  }
                  type="info"
                />
              </Col>
            ))}
      </div>

      <Row justify="center" style={{ marginTop: "30px", marginBottom: "30px" }}>
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

      {loadingUpload ? (
        <Skeleton active paragraph={{ rows: 10 }} />
      ) : dataJSONDetail ? (
        <Row gutter={16}>
          <Col span={24}>
            <div
              style={{
                maxHeight: "700px",
                overflowY: "auto",
              }}
            >
              <CopyBlock
                text={JSON.stringify(dataJSONDetail, null, 10)}
                language="json"
                showLineNumbers={true}
                wrapLines={true}
                codeBlock
                theme={github}
                customStyle={{ fontSize: "14px" }}
                icon={<CopyOutlined />}
                onCopy={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify(dataJSONDetail, null, 10)
                  );
                  message.success("Code copied to clipboard");
                }}
              />
            </div>
          </Col>
        </Row>
      ) : null}

      {loadingUpload ? (
        <Skeleton active paragraph={{ rows: 10 }} />
      ) : urlPDF ? (
        <Row gutter={16}>
          <Col xs={24} md={24} lg={12} xl={12} style={{ marginTop: "20px" }}>
            <iframe
              title="PDF Viewer"
              src={urlPDF}
              width="100%"
              height="700px"
              style={{ border: "none" }}
            />
          </Col>
          <Col xs={24} md={24} lg={12} xl={12} style={{ marginTop: "20px" }}>
            <div
              style={{ maxHeight: "700px", width: "100%", overflowY: "auto" }}
            >
              <CopyBlock
                text={JSON.stringify(dataJSON, null, 10)}
                language="json"
                showLineNumbers={true}
                wrapLines={true}
                codeBlock
                theme={github}
                customStyle={{ fontSize: "14px" }}
                icon={<CopyOutlined />}
                onCopy={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify(dataJSON, null, 10)
                  );
                  message.success("Code copied to clipboard");
                }}
              />
            </div>
          </Col>
        </Row>
      ) : null}
    </>
  );
}
