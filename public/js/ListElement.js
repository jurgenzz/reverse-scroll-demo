import React from "react";

export default class ListElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.mounted = true;
    setTimeout(() => {
      if (!this.mounted) {
        return;
      }
      this.setState(
        {
          loaded: true
        },
        () => {
          let { height } = this.node.getBoundingClientRect();
          this.props.onLoad(height);
        }
      );
    }, 500);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let { loaded } = this.state;
    let { count, index } = this.props;
    if (!loaded) {
      // return <p>loading at index: {index}</p>;
      return `loading at index ${index}`;
    }
    const content = [];

    count = count || 1;

    for (let i = 0; i < count; i++) {
      content.push(
        <p style={{ margin: 0}} key={i}>{`row: ${i}`}</p>
      );
    }
    return (
      <div ref={node => (this.node = node)}>
        <p style={{ margin: 0 }}>index: {index}</p> {content}
      </div>
    );
  }
}
