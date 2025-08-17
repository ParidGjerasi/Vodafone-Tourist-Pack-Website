"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  category: string;
  image: string;
  name: string;
  price: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    category: "Phones",
    image: "/assets/iphone.jpg",
    name: "iPhone 15",
    price: "89000",
    description: "Latest iPhone with A17 Pro chip and advanced camera."
  },
  {
    id: 2,
    category: "Phones",
    image: "/assets/samsung.jpg",
    name: "Samsung Galaxy S24",
    price: "75000",
    description: "Premium Android phone with AI features."
  },
  {
    id: 3,
    category: "Accessories",
    image: "/assets/airpods.jpg",
    name: "AirPods Pro 2",
    price: "28000",
    description: "Wireless earbuds with noise cancellation."
  },
  {
    id: 4,
    category: "Internet",
    image: "/assets/router.jpg",
    name: "Wi-Fi 6 Router",
    price: "12000",
    description: "High-speed router for GigaFibra plans."
  },
];

export default function EshopPage() {
  const router = useRouter();
  const [addingToCart, setAddingToCart] = useState<{[key: number]: boolean}>({});
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  // Fetch cart items on component mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cart/items');
      const data = await response.json();
      if (data.success) {
        setCartItems(data.items || []);
        setCartCount(data.totalItems || 0);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addToCart = async (product: Product) => {
    setAddingToCart(prev => ({ ...prev, [product.id]: true }));
    
    try {
      const response = await fetch('http://localhost:8080/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        })
      });

      const data = await response.json();
      
      if (data.success) {
        await fetchCartItems(); // Refresh cart
        // Show success message briefly
        setTimeout(() => {
          setAddingToCart(prev => ({ ...prev, [product.id]: false }));
        }, 1000);
      } else {
        throw new Error(data.message || 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding item to cart');
      setAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/remove/${productId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchCartItems();
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      
      if (response.ok) {
        await fetchCartItems();
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cart/clear', {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchCartItems();
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0).toFixed(2);
  };

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.productId === productId);
  };

  return (
    <>
      <div 
        className="page"
        style={{
          backgroundImage: "url(/assets/gjiro.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          minHeight: "100vh"
        }}
      >
        <Header />
        
        {/* Cart Header */}
        <div className="cart-header">
          <div className="cart-container">
            <button 
              className="cart-btn"
              onClick={() => setShowCartDropdown(!showCartDropdown)}
            >
              🛒 Cart ({cartCount})
            </button>

            {showCartDropdown && (
              <div className="cart-dropdown">
                <div className="cart-dropdown-header">
                  <h3>Shopping Cart</h3>
                  <button onClick={() => setShowCartDropdown(false)}>×</button>
                </div>
                
                <div className="cart-items">
                  {cartItems.length === 0 ? (
                    <p className="empty-cart">Your cart is empty</p>
                  ) : (
                    cartItems.map(item => (
                      <div key={item.productId} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                          <h4>{item.name}</h4>
                          <p>{parseFloat(item.price).toLocaleString()} ALL</p>
                        </div>
                        <div className="cart-item-controls">
                          <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                        </div>
                        <button 
                          className="remove-btn"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="cart-footer">
                    <div className="cart-total">
                      <strong>Total: {parseFloat(getTotalPrice()).toLocaleString()} ALL</strong>
                    </div>
                    <div className="cart-actions">
                      <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
                      <button className="checkout-btn">Checkout</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <main className="main">
          <div className="hero">
            <h1 className="hero-title">eShop Products</h1>
          </div>

          <div className="pack-grid">
            {products.map((product) => (
              <div key={product.id} className="pack-card">
                <div className="pack-header">
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "80px", height: "80px", objectFit: "contain", marginBottom: "1rem" }}
                  />
                  <div className="pack-title">{product.name}</div>
                  <div className="pack-subtitle">{product.category}</div>
                  <div className="pack-price">{parseFloat(product.price).toLocaleString()} ALL</div>
                </div>
                <div className="pack-body">
                  <p style={{ color: "#666", textAlign: "center", margin: 0 }}>
                    {product.description}
                  </p>
                </div>
                <div className="pack-footer">
                  <button
                    className={`pack-button ${isInCart(product.id) ? 'in-cart' : ''}`}
                    onClick={() => addToCart(product)}
                    disabled={addingToCart[product.id] || isInCart(product.id)}
                  >
                    {addingToCart[product.id] ? 'Adding...' : 
                     isInCart(product.id) ? 'In Cart ✓' : 
                     'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", margin: "3rem 0" }}>
            <button
              onClick={() => router.back()}
              style={{
                padding: "0.6rem 1.5rem",
                fontSize: "1rem",
                backgroundColor: "gray",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Back
            </button>
          </div>
        </main>
      </div>
      
      <Footer />

      <style jsx>{`
        .cart-header {
          position: fixed;
          top: 80px;
          right: 20px;
          z-index: 1000;
        }

        .cart-container {
          position: relative;
        }

        .cart-btn {
          background: #e60000;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 25px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(230, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .cart-btn:hover {
          background: #cc0000;
          transform: translateY(-2px);
        }

        .cart-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 400px;
          max-width: 90vw;
          background: white;
          border-radius: 10px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          margin-top: 10px;
          max-height: 500px;
          overflow-y: auto;
        }

        .cart-dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          border-bottom: 1px solid #eee;
        }

        .cart-dropdown-header h3 {
          margin: 0;
          color: #333;
        }

        .cart-dropdown-header button {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #666;
        }

        .cart-items {
          padding: 15px;
          max-height: 300px;
          overflow-y: auto;
        }

        .empty-cart {
          text-align: center;
          color: #666;
          padding: 20px;
          margin: 0;
        }

        .cart-item {
          display: flex;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
          gap: 10px;
        }

        .cart-item:last-child {
          border-bottom: none;
        }

        .cart-item-image {
          width: 50px;
          height: 50px;
          object-fit: contain;
          border-radius: 5px;
        }

        .cart-item-details {
          flex: 1;
        }

        .cart-item-details h4 {
          margin: 0 0 5px 0;
          font-size: 14px;
          color: #333;
        }

        .cart-item-details p {
          margin: 0;
          font-size: 12px;
          color: #e60000;
          font-weight: bold;
        }

        .cart-item-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cart-item-controls button {
          width: 25px;
          height: 25px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 3px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-item-controls button:hover {
          background: #f5f5f5;
        }

        .cart-item-controls span {
          min-width: 20px;
          text-align: center;
          font-weight: bold;
          color: #333;
        }

        .remove-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 11px;
        }

        .remove-btn:hover {
          background: #c82333;
        }

        .cart-footer {
          padding: 15px 20px;
          border-top: 1px solid #eee;
          background: #f8f9fa;
        }

        .cart-total {
          text-align: center;
          margin-bottom: 15px;
          font-size: 16px;
          color: #e60000;
        }

        .cart-actions {
          display: flex;
          gap: 10px;
        }

        .clear-btn, .checkout-btn {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }

        .clear-btn {
          background: #6c757d;
          color: white;
        }

        .clear-btn:hover {
          background: #5a6268;
        }

        .checkout-btn {
          background: #28a745;
          color: white;
        }

        .checkout-btn:hover {
          background: #218838;
        }

        .pack-button.in-cart {
          background: #28a745;
          cursor: not-allowed;
        }

        .pack-button.in-cart:hover {
          background: #28a745;
        }

        @media (max-width: 768px) {
          .cart-header {
            position: static;
            margin: 20px;
            text-align: center;
          }

          .cart-dropdown {
            width: 300px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            margin-top: 0;
          }
        }
      `}</style>
    </>
  );
}