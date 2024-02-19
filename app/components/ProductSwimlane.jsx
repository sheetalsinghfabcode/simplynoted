import {ProductCard, Section} from '~/components';

const mockProducts = {
  nodes: new Array(12).fill(''),
};

export function ProductSwimlane({
  products = mockProducts,
  count = 12,
  ...props
}) {
  return (
    <div className='w-[95%] mx-auto mt-[40px]'>
      <div className='sm:text-[28px] text-[22px] font-bold pl-[1.5rem]'>Featured Products</div>

      <div className="swimlane mt-[25px]">
        {products.nodes.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            className="snap-start w-80"
          />
        ))}
      </div>
    </div>
  );
}
