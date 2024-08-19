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
    let foundProduct: CartItemType | undefined;
    const incQty = () => {
        setQty((prev) => prev + 1);
    }

    const onRemove = (itemToRemove: CartItemType) => {
        setCartItems((prev) => prev.filter((item) => item.product._id != itemToRemove.product._id));
        setTotalPrice((prev) => prev - itemToRemove.product.price * itemToRemove.quantity);
        setTotalQuantity(prev => prev - itemToRemove.quantity);
    }
    const toggleCartItemQuantity = (id: string, value: 'inc' | 'dec') => {
        let index: number | undefined = undefined;
        foundProduct = cartItems.find((item, i) => {
            if (item.product._id === id) {
                index = i;
                return true;
            }
            return false;
        });
        if (!foundProduct || index == undefined) return;
        const newCartItems = [...cartItems];
        if (value === 'inc') {
            foundProduct.quantity += 1;
            newCartItems[index] = foundProduct;
            setCartItems(newCartItems);
            setTotalPrice((prev) => prev + foundProduct!.product.price);
            setTotalQuantity(prev => prev + 1);
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                foundProduct.quantity -= 1;
                newCartItems[index] = foundProduct;
                setCartItems(newCartItems);
                setTotalPrice((prev) => prev - foundProduct!.product.price);
                setTotalQuantity(prev => prev - 1);
            }
        }
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
            toggleCartItemQuantity,
            onRemove,
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);