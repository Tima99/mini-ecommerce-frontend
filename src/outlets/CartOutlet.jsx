import React, { useLayoutEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import req from "../api/request";
import { ProductCard } from "../components/ProductCard";

export const CartOutlet = () => {
    const { cart, setCart , setProducts} = useOutletContext();
    const navigate = useNavigate();
    let isAdding = false;

    useLayoutEffect(() => {
        if (cart !== null) return;
        (async function () {
            try {
                const res = await req.get("/cart");
                const cart = res.data.cart;
                setCart(cart);
            } catch (error) {
                console.log(error);
                setCart([])
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
        if (!e.target.matches("button")) return;

        const productId = e.target.getAttribute("id");

        try {
            isAdding = true;
            const res = await req.get(`/removetoCart/${productId}`);
            const cart = res.data.cart;
            setCart(cart);
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

    return (
        <div>
            <h3 className="pd-05">Cart</h3>
            {cart === null 
                ? <h3 className="pd-05">Loading...</h3>
                : <>
                    <Cart clickHandler={clickHandler} cart={cart} />
                    <Checkout cart={cart} />
                  </>
            }
        </div>
    );

    
};

function Checkout({ cart }) {
    return (
        <>
            <h3 className="pd-05">Checkout</h3>
            <div className="total pd-05">
                Total Price : $&nbsp;
                {cart ? cart.reduce((a, i) => {
                    return a + i.price;
                }, 0) : 0}
            </div>
        </>
    );
}

function Cart({ clickHandler, cart }) {
    return (
        <div className="cart-container" onClick={clickHandler}>
            {Array.isArray(cart) && cart.length > 0 
                ? (
                    cart.map((item) => {
                        return (
                            <React.Fragment key={item.id}>
                                <ProductCard
                                    product={item}
                                    btn={{
                                        text: "Remove",
                                        class: "remove",
                                    }}
                                />
                            </React.Fragment>
                        );
                    })
                ) 
            : <h3 className="flex center pd-05">No Cart Found!</h3>
            }
        </div>
    );
}
