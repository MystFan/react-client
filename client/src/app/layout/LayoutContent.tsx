import { Route, Routes } from 'react-router-dom';

import { useStyletron } from 'baseui';

import ProductList from '../../features/products/ProductList'
import Overview from '../../features/overview/Overview';
import PageNotFound from '../PageNotFound';

type LayoutContentProps = {
}

const LayoutContent = (props: LayoutContentProps) => {
  const [css] = useStyletron();

  return <div className={css({
    width: '100%',
    borderRadius: '0.5rem',
    background: '#fff',
    border: "1px solid #DFE0EB",
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      margin: '0 1.5rem'
    }
  })}>
    <div>
      <Routes>
        <Route path="" element={<Overview />}></Route>
        <Route path="overview" element={<Overview />}></Route>
        <Route path="products" element={<ProductList />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  </div>
};

export default LayoutContent;
