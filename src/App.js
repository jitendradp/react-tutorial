import './App.css';
import React, { useState } from 'react';
import { render } from '@testing-library/react';

function SearchBox(props) {
  const onChangeEvent = (value) => {
    props.setfilterText(value);
  };

  return (
    <div>
      <label>SearchBox</label>
      <input name="searchBox" onChange={(e) => onChangeEvent(e.target.value)} />
    </div>
  );
}
function ProductCategoryRow(props) {
  let category = props.category;
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow(props) {
  const product = props.product;
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
function ProductRender(props) {
  const products = props.products;
  const filterText = props.filterText;
  //  const filteredProducts = products.filter(product => {
  //   return product.name.includes(props.filterText)
  //   // console.log(props);
  //   // return true;
  //  })
  let lastCategory = null;
  const rows = [];
  console.log(products);
  products.forEach((product) => {

    if (product.name.indexOf(filterText) === -1) {
      return;
    }
    // if (inStockOnly && !product.stocked) {
    //   return;
    // }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }

    rows.push(
      <ProductRow
        product={product}
        key={product.name}
      />
    );
    lastCategory = product.category;

  });
  console.log(rows);
  //  console.log(filteredProducts);
  return (
    <div>
      ProductionList
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

function DeleteProduct(props){
  console.log(props.products);
  // let products = props.products;
  const [products, setproducts] = useState(props.products)
  const deleteProduct = (e,productId) =>{
    setproducts(products.filter(product => product.id !== productId))
    console.log('id', products);
  }
  return(
    <div>{
    products.map(product => {
      return <div key={product.id}> 
      
      {product.name}   
      <button value="delete" onClick={(event) => deleteProduct(event, product.id)}> Delete</button>
      </div>
    })  
    }</div>
  )
}

function App() {
  const [filterText, setfilterText] = useState('');

  return (
    <div>
      {filterText}
      <SearchBox setfilterText={setfilterText}></SearchBox>
      <ProductRender
        filterText={filterText}
        products={PRODUCTS}
      ></ProductRender>
      <DeleteProduct products={PRODUCTS}></DeleteProduct>
    </div>
  );
}

const PRODUCTS = [
  {
    category: 'Sporting Goods',
    price: '$49.99',
    stocked: true,
    name: 'Football',
    id:'1'
  },
  {
    category: 'Sporting Goods',
    price: '$9.99',
    stocked: true,
    name: 'Baseball',
    id:'2'
  },
  {
    category: 'Sporting Goods',
    price: '$29.99',
    stocked: false,
    name: 'Basketball',
    id:'3'
  },
  {
    category: 'Electronics',
    price: '$99.99',
    stocked: true,
    name: 'iPod Touch',
    id:'4'
  },
  {
    category: 'Electronics',
    price: '$399.99',
    stocked: false,
    name: 'iPhone 5',
    id:'5'
  },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7',
  id:'6'},
];
export default App;
