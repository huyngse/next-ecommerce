import { CartItemType, ProductType } from "@/types";
import { ReactNode, createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const Context = createContext<any>(null);
export const StateContext = ({ children }: { children: ReactNode }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [qty, setQty] = useState(1);
    const incQty = () => {
        setQty((prev) => prev + 1);
    }
    const onAdd = (product: ProductType, quantity: number) => {
        const checkProductInCart = cartItems.find((item) => item.product._id === product._id);
        setTotalPrice((prev) => prev + quantity * product.price);
        setTotalQuantity((prev) => prev + quantity);
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((item) => {
                if (item.product._id === product._id) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity
                    }
                }
                return item;
            });
            setCartItems(updatedCartItems);
        } else {
            const cartItem = {
                product,
                quantity
            };
            setCartItems((prev) => {
                return [
                    ...prev,
                    cartItem
                ]
            })
        }
        toast.success(`${qty} ${product.name} added to cart.`);
    }
    const decQty = () => {
        setQty((prev) => {
            if (prev - 1 < 1) {
                return 1;
            }
            return prev - 1
        });
    }
    return (
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantity,
            qty,
            incQty,
            decQty,
            onAdd,
            setShowCart,
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);