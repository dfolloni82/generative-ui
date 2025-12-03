type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type ECommerceProps = {
  products: Product[];
};

export function ECommerce({ products }: ECommerceProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-[#2a2a2a] border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="aspect-square bg-[#3a3a3a]">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-100 text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
              {product.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-400">
                {formatPrice(product.price)}
              </span>
            </div>
            <button className="w-full mt-3 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500 transition-colors">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
