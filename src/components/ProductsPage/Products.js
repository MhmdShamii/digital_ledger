import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import ProductListItem from "./ProductListItem";
import ProductEditor from "./ProductEditor";
import AddProductModal from "./AddProductModal";

export default function Products({ products, addProduct, updateProduct }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [display, setDisplay] = useState(products);

  const types = [
    { id: "play", label: "Play Time" },
    { id: "snacks", label: "Snacks" },
    { id: "hubbly", label: "Hubbly Bubbly" },
  ];

  function filterType(type) {
    setDisplay(products.filter((p) => p.type === type));
    setSelectedProduct(null);
  }

  useEffect(() => {
    setDisplay(products);
  }, [products]);

  return (
    <div className="w-full max-w-6xl mt-6 grid grid-cols-12 gap-4">
      <div className="col-span-4 bg-white p-4 rounded-xl shadow border border-gray-200 h-[80vh] flex flex-col">
        <h2 className="text-xl font-bold text-blue-600 mb-3">Products</h2>

        <div className="space-y-2">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => filterType(t.id)}
              className="w-full p-2 rounded-lg border hover:bg-blue-50"
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-3 flex-1 overflow-y-auto space-y-2">
          {display.map((p) => (
            <ProductListItem
              key={p.id}
              product={p}
              selected={selectedProduct?.id === p.id}
              select={() => setSelectedProduct(p)}
            />
          ))}
        </div>

        <button
          onClick={() => setOpenAdd(true)}
          className="w-full bg-blue-500 text-white p-2 rounded-full shadow mt-2 flex items-center justify-center gap-2"
        >
          Add Product <AddIcon />
        </button>
      </div>

      <main className="col-span-8 bg-white p-6 rounded-xl shadow border border-gray-200 h-[80vh] overflow-y-auto">
        {selectedProduct ? (
          <ProductEditor
            product={selectedProduct}
            updateProduct={updateProduct}
          />
        ) : (
          <p className="text-gray-500">
            Select a product to edit or add a new one.
          </p>
        )}
      </main>

      <AddProductModal
        isOpen={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={addProduct}
      />
    </div>
  );
}
