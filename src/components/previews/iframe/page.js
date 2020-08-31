/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import React from "react";
import PropTypes from "prop-types";
import styles from "./IframePreview.css";
import axios from "axios";

const assembleProjectUrl = ({ displayed, options }) => {
  const { slug } = displayed;
  const { previewURL, page } = options;
  if (!page || !previewURL) {
    console.warn("Missing slug or previewURL", { slug, previewURL });
    return "";
  }
  return `${previewURL}/${page}`;
};

class IframePreview extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    document: null,
  };

  state = {
    isLoading: true,
    url: "",
    error: false,
  };

  componentDidMount() {
    axios
      .post(
        "https://yskeo5mgc0.execute-api.us-west-2.amazonaws.com/dev/startSandbox",
        {
          sanity: {
            id: "wl4jtnj7",
            token: "sk4gHsW4zX5qQPgAKuXGzgPjYtMeFjZ1qGllyOVuJfrGyAgFhzjoXX24SBUqlrxBc6iQ8zG80IYYatDqwK5F43UNVi9pGroNPgXwCrZfSHFgXcntVqS4AevPBRm6i5NV5L3wgeoPSAaHPCfeG8TrjPBqHg4Z7KmMuK6tZBUk8pwie1OyKp4O",
          },
        }
      )
      .then((response) => {
        console.log("response", response);
        this.setState({
          isLoading: false,
          url: response.url,
          error: false,
        });
      })
      .catch((e) => {
        console.log("e", e);
        this.setState({
          isLoading: false,
          url: "",
          error: e,
        });
      });
  }

  render() {
    // const {options} = this.props
    // const {displayed} = this.props.document
    // console.log('displayed', displayed);
    // if (!displayed) {
    //   return (<div className={styles.componentWrapper}>
    //     <p>There is no document to preview</p>
    //   </div>)
    // }

    // const url = assembleProjectUrl({displayed, options})

    // if (!url) {
    //   return (<div className={styles.componentWrapper}>
    //     <p>Hmm. Having problems constructing the web front-end URL.</p>
    //   </div>)
    // }

    const { isLoading, url, error } = this.state;

    if (error) {
      return <div>Error</div>;
    }

    console.log("error", error);
    console.log("url", url);
    console.log("isLoading", isLoading);
    if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className={styles.componentWrapper}>
          <div className={styles.iframeContainer}>
            <iframe src={url} frameBorder={"0"} />
          </div>
        </div>
      );
    }
  }
}

export default IframePreview;
