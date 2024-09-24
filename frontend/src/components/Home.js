import { useEffect, useState } from 'react';
import axios from 'axios';
import SingleProduct from './SingleProduct';
import { useAuth } from '../Main';
import MostWatchedProducts from './MostWatchedProducts';
import MostSoldProducts from './MostSoldProducts';


const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { searchQuery } = useAuth();
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ecommerce/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ecommerce/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const finalFilteredProducts = selectedCategory 
    ? filteredProducts.filter(product => product.category === Number(selectedCategory))
    : filteredProducts;

  return (
      <div className='container mt-4'>
          <div className="row">
              <div className="col-md-3">
                  <div className="card">
                      <h5 className="card-header bg-warning">Product Category</h5>
                      <div className="card-body">
                      {categories.map((category) => (
                          <div className="form-check mt-2" key={category.id}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id={`category-${category.id}`}
                              value={category.id}
                              onChange={handleCategoryChange}
                            />
                            <label className="form-check-label" htmlFor={`category-${category.id}`}>
                              {category.name}
                            </label>
                          </div>
                      ))}
                      </div>
                  </div>
              </div>
              <div className='col-md-9'>
                  <div className='row'>
                      {finalFilteredProducts.map((product) => (
                          <SingleProduct product={product} key={product.id} />
                      ))}
                  </div>
                  <MostWatchedProducts />
                  <MostSoldProducts />
              </div>
          </div>
      </div>  
  )
}

export default Home