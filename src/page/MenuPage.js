import React, { useState, useEffect } from "react";

// Composant pour afficher un plat
const MenuCard = ({ item, onAdd }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    if (quantity < 1) return;
    onAdd(item, quantity);
    setQuantity(0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
      <h5 className="text-xl font-bold text-black">{item.name}</h5>
      <h6 className="text-sm text-gray-600">{item.category}</h6>
      {item.englishName && item.englishName.trim() !== "" && (
        <h6 className="text-sm text-gray-600">{item.englishName}</h6>
      )}
      <p className="text-gray-700">{item.description}</p>
      <p className="text-black font-bold">{item.price}</p>
      <div className="flex items-center mt-2">
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
          className="border border-gray-300 rounded px-3 py-2 text-black w-20"
          placeholder="Quantité"
        />
        <button
          onClick={handleAdd}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

// Composant pour afficher une boisson
const BoissonCard = ({ item, onAdd }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    if (quantity < 1) return;
    onAdd(item, quantity);
    setQuantity(0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
      <h5 className="text-xl font-bold text-black">{item.name}</h5>
      <p className="text-black font-bold">{item.price}</p>
      {item.alternative && (
        <p className="text-gray-600 text-sm">
          {item.alternative.name} - {item.alternative.price}
        </p>
      )}
      {item.alternatives && (
        <p className="text-gray-600 text-sm">
          {item.alternatives.map((alt, index) => (
            <span key={index}>
              {alt.name} - {alt.price}
              {index < item.alternatives.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      )}
      {item.description && <p className="text-gray-700">{item.description}</p>}
      <div className="flex items-center mt-2">
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
          className="border border-gray-300 rounded px-3 py-2 text-black w-20"
          placeholder="Quantité"
        />
        <button
          onClick={handleAdd}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

// Composant pour afficher un cocktail
const CocktailCard = ({ item, onAdd }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    if (quantity < 1) return;
    // On transmet un objet avec des clés uniformisées (name et price)
    onAdd({ name: item.nom, price: item.prix }, quantity);
    setQuantity(0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
      {item.image && (
        <img
          src={item.image}
          alt={item.nom}
          className="w-full h-40 object-cover rounded mb-2"
        />
      )}
      <h5 className="text-xl font-bold text-black">{item.nom}</h5>
      <p className="text-gray-700">{item.category}</p>
      {item.recipe && (
        <p className="text-gray-700 text-sm">{item.recipe.join(", ")}</p>
      )}
      <p className="text-black font-bold">{item.prix}</p>
      <div className="flex items-center mt-2">
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
          className="border border-gray-300 rounded px-3 py-2 text-black w-20"
          placeholder="Quantité"
        />
        <button
          onClick={handleAdd}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState("plats");
  const [menuData, setMenuData] = useState(null);
  const [boissonData, setBoissonData] = useState(null);
  const [cocktailData, setCocktailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Chargement des données pour les plats, boissons et cocktails
  useEffect(() => {
    Promise.all([
      fetch("/db.json").then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des plats");
        return res.json();
      }),
      fetch("/dbBoisson.json").then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des boissons");
        return res.json();
      }),
      fetch("/cocktailMenu.json").then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des cocktails");
        return res.json();
      }),
    ])
      .then(([menuData, boissonData, cocktailData]) => {
        setMenuData(menuData);
        setBoissonData(boissonData);
        setCocktailData(cocktailData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // Conversion d'un prix (ex: "15,50 €") en nombre
  const parsePrice = (priceStr) =>
    parseFloat(priceStr.replace("€", "").replace(",", "."));

  // Ajoute un item au panier
  const handleAddToCart = (item, quantity) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex(
        (cartItem) => cartItem.name === item.name
      );
      if (index !== -1) {
        const newCart = [...prevCart];
        newCart[index].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prevCart,
          { name: item.name, price: parsePrice(item.price), quantity },
        ];
      }
    });
  };

  const total = cart.reduce(
    (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
    0
  );

  if (loading) return <div className="p-4 text-black">Chargement...</div>;
  if (error)
    return <div className="p-4 text-red-500">Erreur : {error.message}</div>;

  // Filtrer les plats selon le terme de recherche
  const filteredPlats = menuData.menu.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrer les boissons pour chaque catégorie
  const filteredBoissons = boissonData.boissons
    .map((cat) => {
      const filteredItems = cat.items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { ...cat, items: filteredItems };
    })
    .filter((cat) => cat.items.length > 0);

  // Filtrer les cocktails selon le terme de recherche
  const filteredCocktails = cocktailData.Cocktails.filter((item) =>
    item.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto relative pb-8 px-4">
      <h1 className="mt-4 mb-4 text-3xl font-bold text-black">Notre Menu</h1>

      {/* Onglets */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setActiveTab("plats")}
          className={`px-4 py-2 rounded ${
            activeTab === "plats"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Plats
        </button>
        <button
          onClick={() => setActiveTab("boissons")}
          className={`px-4 py-2 rounded ${
            activeTab === "boissons"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Boissons
        </button>
        <button
          onClick={() => setActiveTab("cocktails")}
          className={`px-4 py-2 rounded ${
            activeTab === "cocktails"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Cocktails
        </button>
      </div>

      {/* Champ de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 text-black"
        />
      </div>

      {/* Zone des cards (espace réservé pour le panier) */}
      <div className="mr-[300px]">
        {activeTab === "plats" && (
          <div className="flex flex-wrap gap-4">
            {filteredPlats.map((item, index) => (
              <div key={index} className="flex-1 basis-80">
                <MenuCard item={item} onAdd={handleAddToCart} />
              </div>
            ))}
          </div>
        )}
        {activeTab === "boissons" && (
          <div>
            {filteredBoissons.length === 0 && (
              <p className="text-black">Aucune boisson trouvée.</p>
            )}
            {filteredBoissons.map((cat, index) => (
              <div key={index}>
                <h4 className="mt-4 mb-2 text-2xl text-blue-500">
                  {cat.category}
                </h4>
                <div className="flex flex-wrap gap-4">
                  {cat.items.map((item, idx) => (
                    <div key={idx} className="flex-1 basis-80">
                      <BoissonCard item={item} onAdd={handleAddToCart} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "cocktails" && (
          <div className="flex flex-wrap gap-4">
            {filteredCocktails.length === 0 ? (
              <p className="text-black">Aucun cocktail trouvé.</p>
            ) : (
              filteredCocktails.map((item, index) => (
                <div key={index} className="flex-1 basis-80">
                  <CocktailCard item={item} onAdd={handleAddToCart} />
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Panier flottant */}
      <div className="fixed right-5 top-1/2 transform -translate-y-1/2 bg-white p-6 border border-gray-300 rounded-lg shadow-md max-w-xs text-black">
        <h5 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">
          Panier
        </h5>
        {cart.length === 0 ? (
          <p>Le panier est vide.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cart.map((cartItem, index) => (
              <li key={index} className="py-2">
                <span className="font-bold">{cartItem.name}</span>
                <br />
                Quantité: {cartItem.quantity}
                <br />
                Sous-total: {(cartItem.price * cartItem.quantity).toFixed(2)} €
              </li>
            ))}
          </ul>
        )}
        <hr className="my-4" />
        <p className="font-bold">Total: {total.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default MenuPage;
