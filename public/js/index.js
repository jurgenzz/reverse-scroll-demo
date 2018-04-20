import React from "react";
import ReactDOM from "react-dom";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";

import ListElement from "./ListElement";

const data = new Array(1000).fill(1).map(_ => Math.floor(Math.random() * 10));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollTop: 0
    };
  }
  cache = new CellMeasurerCache({
    fixedWidth: true
  });

  customCache = {};

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        scrollTop: 50000
      });
    }, 500);
  }

  onRef = node => {
    this.List = node;
  };

  getHeight = ({index}) => {
    return this.customCache[index] || 51;
  };

  handleScroll = e => {
    let { scrollTop } = e;

    if (this.scrollTop !== scrollTop) {
      this.scrollDirection =
        this.scrollTop < scrollTop ? "SCROLL_DOWN" : "SCROLL_UP";

      this.scrollTop = scrollTop;

      this.setState({
        scrollTop
      });
    }
  };

  handleMount(index, height, cb) {
    if (!this.customCache[index]) {
      this.customCache[index] = height;
      // default is 52
      // get diff

      let diff = height - 51;

      if (diff && this.scrollDirection === "SCROLL_UP") {
        let newScrollTop = this.scrollTop + diff;
        this.scrollTop = newScrollTop;
        this.setState(
          {
            scrollTop: newScrollTop
          },
          () => {
            this.List.recomputeRowHeights(index);
          }
        );
      } else {
        this.List.recomputeRowHeights(index);
      }

      cb();
    }
  }

  rowRenderer = ({ index, style, parent }) => {
    // {({ measure }) => (
    return (
      <CellMeasurer
        cache={this.cache}
        key={index}
        parent={parent}
        rowIndex={index}
        columnIndex={0}
      >
        <div key={index} style={{ ...style, borderBottom: "1px solid tomato" }}>
          <ListElement
            index={index}
            onLoad={height => this.handleMount(index, height, () => {})}
            count={data[index]}
          />
        </div>
      </CellMeasurer>
      //  )}
    );
  };
  render() {
    let { scrollTop } = this.state;
    return (
      <div>
        <h1>Hello World </h1>
        <List
          ref={this.onRef}
          width={200}
          height={600}
          rowHeight={index => this.getHeight(index)}
          rowCount={data.length}
          rowRenderer={this.rowRenderer}
          deferredMeasurementCache={this.cache}
          onScroll={this.handleScroll}
          scrollTop={scrollTop}
          style={{
            border: "1px solid #ccc"
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
