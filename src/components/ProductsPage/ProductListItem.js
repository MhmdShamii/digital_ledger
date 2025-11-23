export default function ProductListItem({ product, selected, select }) {
  return (
    <div
      onClick={select}
      className={`p-3 border rounded-lg cursor-pointer flex items-center gap-3 hover:bg-gray-50 ${
        selected ? "bg-blue-50 border-blue-300" : ""
      }`}
    >
      {product.img && (
        <img
          src={product.img}
          alt={product.name}
          className="w-12 h-12 object-cover rounded-lg"
        />
      )}
      <div>
        <p className="font-semibold">{product.name}</p>
        <p className="text-sm text-gray-500">${product.price}</p>
      </div>
    </div>
  );
}
