import { ProductCard } from "../components/ProductCard";
import React, { useLayoutEffect } from "react";
import req from "../api/request";
import { useNavigate, useOutletContext } from "react-router-dom";

export const ProductsOutlet = () => {
    const { products, setProducts, cart, setCart } = useOutletContext();
    const navigate = useNavigate();
    let isAdding = false;

    useLayoutEffect(() => {
        if(Array.isArray(products)) return

        (async function () {
            try {
                const res = await req.get("/products");
                let myCart = null;
                if (cart === null) {
                    const res = await req.get("/cart");
                    myCart = res.data.cart;
                    setCart(cart);
                } else {
                    myCart = cart;
                }
                const products = res.data.map((p) => {
                    const carted = myCart ? myCart.every((i) => i.id != p.id) : true;
                    p.cart = !carted;
                    return p;
                });
                setProducts(products);
            } catch (error) {
                console.log(error);
                setProducts(false);
                const msg = error.response.data;
                if (
                    typeof msg === "string" &&
                    msg.toLowerCase().includes("unauthorised")
                ) {
                    navigate("/", { replace: true });
                }
            }
        })();
    }, []);

    
    async function clickHandler(e) {
        if (
            !e.target.matches("button") ||
            !e.target.className.includes("addToCart")
        )
            return;
        if (isAdding) return;
        const productId = e.target.getAttribute("id");
        const product = products.filter((product) => product.id == productId);

        try {
            isAdding = true;
            const res = await req.post('/addtoCart', product);
            const cart = res.data.cart;

            setCart(cart)
            setProducts((prev) => {
                return prev.map((p) => {
                    const carted = cart && cart.every((i) => i.id != p.id);
                    p.cart = !carted;
                    return p;
                });
            });
        } catch (error) {
            console.log(error);
        } finally {
            isAdding = false;
        }
    }

    if (products === null)
        return <h3 className="flex center pd-05">Loading...</h3>;
    else if (products === false)
        return <h4 className="flex center pd-05">No products found!</h4>;

    return (
        <div>
            <h3 className="pd-05">Products</h3>
            <div className="products-container" onClick={clickHandler}>
                {products.map((product) => {
                    return (
                        <React.Fragment key={product.id}>
                            <ProductCard
                                product={product}
                                btn={
                                    product.cart
                                        ? { text: "Added", class: "added" }
                                        : {
                                              text: "Add to Cart",
                                              class: "addToCart",
                                          }
                                }
                            />
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );

};
