import React, { Component } from 'react';
import {ProductListingContainer} from './js/components/container/product-listing/product-listing-component-container';



class App extends Component {
  render() {
    return (
      <div className="App">
        <ProductListingContainer/>
      </div>
    );
  }
}

export default App;
