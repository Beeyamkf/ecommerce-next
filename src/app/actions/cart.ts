"use server";

import { getCart, saveCart } from "@/lib/cart";

export async function addToCart(productId: number) {
    const cart = await getCart();
    // chercher 
  const item = cart.find((i) => i.productId === productId);

    if (item) {
      //add 1 to qty
    item.quantity += 1;
    } else {
        //add qty
    cart.push({ productId, quantity: 1 });
  }

  await saveCart(cart);
}

export async function removeFromCart(productId: number) {
    const cart = await getCart();
    //display all sauf le supprimer 
  await saveCart(cart.filter((i) => i.productId !== productId));
}
// panier vide
export async function clearCart() {
  await saveCart([]);
}