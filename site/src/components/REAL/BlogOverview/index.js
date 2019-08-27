import React from "react";

import Widget from "components/Widget";
import { Row, Col, Card } from "antd";

class BlogOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      preview: []
    };
  }

  readManifestFile = callback => {
    fetch("blogs/manifest.json")
      .then(r => r.json())
      .then(json =>
        this.setState(
          { blogs: json.slice(json.length - 2, json.length) },
          callback
        )
      );
  };

  populatePreview = () => {
    if (this.state.blogs.length > 0) {
      this.state.blogs.forEach((blog, index) => {
        let dataEntry = {
          title: blog.title,
          excerpt: blog.excerpt,
          category: blog.category,
          date: blog.creationDate,
          image: blog.imageSrc
        };
        this.setState(prevState => ({ preview: [...prevState.preview, dataEntry] }));
      });
    } else {
      this.setState({
        preview: [{ title: "Nu a fost gasit niciun blog post." }]
      });
    }
  };

  componentDidMount() {
    this.readManifestFile(this.populatePreview);
  }

  render() {
    return (
      <Row gutter={16}>
        {this.state.preview.map((blog, index) => {
          if (this.state.preview.length > 0)
            return (
              <Col key={index} xl={12} md={12} sm={12} xs={24}>
                <Widget cover={<img src={blog.image} />}>
                  <h1 style={{margin: 0}}>{blog.title}</h1>
                  <span>
                    <i>
                      {blog.category} - {blog.date}
                    </i>
                  </span>
                  <p style={{fontSize:"1.15em", color:"black"}}>
                    {blog.excerpt.replace(/(([^\s]+\s\s*){30})(.*)/, "$1…")}
                  </p>
                </Widget>
              </Col>
            );
          else
            return (
              <Col key={index} span={24}>
                <Widget>
                  <h1 style={{ textAlign: "center", margin: 0 }}>
                    {blog.title}
                  </h1>
                </Widget>
              </Col>
            );
        })}
      </Row>
    );
  }
}

export default BlogOverview;
