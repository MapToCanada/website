import React from "react";
import { connect } from "react-redux";
import Cookie from "js-cookie";

import { Upload, message, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { API_UPLOAD, API_IMAGE } from "@admin/constant/apis";

import { fetch } from "@admin/store/reducers/thumbnail";

import styles from "./index.less";

const token = Cookie.get("token") || sessionStorage.getItem("token");

const uploadButton = (
  <div>
    <PlusOutlined />
    <div className="ant-upload-text">Upload</div>
  </div>
);

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      thumb: null,
    };
  }

  componentDidMount = () => {
    this.props.fetchThumbnails({ page: 1, pageSize: 5 });
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.defaultValue != prevProps.defaultValue) {
      this.setState({ thumb: this.props.defaultValue });
    }
  };

  onUploadProgressChange = async (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status === "done") {
      this.setState({ thumb: info.file.response, loading: false });
      if (this.props.onThumbnailChanged) {
        this.props.onThumbnailChanged(info.file.response);
      }
      this.props.fetchThumbnails({ page: 1, pageSize: 5 });
      message.success(`${info.file.name} file uploaded successfully`);
      // const mediaItems = await this.props.archiveActions.getMediaItems();
      // this.setState({ mediaItems: mediaItems });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  beforeUpload = (file) => {
    const isImage =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif";
    const isVideo = file.type === "video/mp4";
    const isAudio = file.type === "audio/mp3";
    if (!isImage && !isVideo && !isAudio) {
      message.error("You can only upload image file!");
    }

    const limit = file.size / 1024 / 1024 < 100;
    if (!limit) {
      message.error("Media must smaller than 100MB!");
    }
    return (isImage || isVideo || isAudio) && limit;
  };

  changeThumbnail = (e, item) => {
    this.setState({ thumb: item.url });
    // Update image path for Outer Component
    if (this.props.onThumbnailChanged) {
      this.props.onThumbnailChanged(item.url);
    }
    e.preventDefault();
    return true;
  };

  render() {
    const { loading, thumb } = this.state;
    const imgUrl = API_IMAGE(thumb, 200, 200);

    const { thumbnails } = this.props;

    const mediaItems =
      thumbnails !== null &&
      thumbnails.results &&
      thumbnails.results.length &&
      thumbnails.results.length > 0
        ? thumbnails.results
        : [];

    const uploaderProps = {
      name: "file",
      listType: "picture-card",
      className: "thumbnail-uploader",
      showUploadList: false,
      action: API_UPLOAD,
      headers: {
        authorization: "Token " + token,
      },
      withCredentials: true,
    };

    return (
      <div>
        <div>
          <Upload
            {...uploaderProps}
            onChange={this.onUploadProgressChange}
            beforeUpload={this.beforeUpload}
          >
            {thumb ? (
              <div>
                <img src={imgUrl} alt="thumbnail" style={{ width: "100%" }} />
              </div>
            ) : loading ? (
              <Spin />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div>
          {mediaItems.length > 0 &&
            mediaItems.map((item, index) => {
              if (index > 5) return;
              return (
                <span key={item.id} className={styles.thumbMedia}>
                  <a href="#" onClick={(e) => this.changeThumbnail(e, item)}>
                    <img
                      src={API_IMAGE(item.url, 200, 200)}
                      style={{ width: 100, height: 100 }}
                    />
                  </a>
                </span>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.entity.thumbnail.loading,
  time: state.entity.thumbnail.time,
  status: state.entity.thumbnail.status,
  thumbnails: state.entity.thumbnail.thumbnails,
});

const mapDispatchToProps = (dispatch) => ({
  fetchThumbnails: (payload) => dispatch(fetch(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Thumbnail);
