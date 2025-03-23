import Shop from '../components/Shop/Shop';

const Store = async () => {
  const response = await fetch('http://localhost:3000/api/products');
  const products = await response.json();

  return (
    <div>
      <Shop products={products} />
    </div>
  );
};

export default Store;