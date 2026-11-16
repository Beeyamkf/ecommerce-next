"use server";

import { getCart, saveCart } from "@/lib/cart";
import { getProductsByIds } from "@/db/queries";


async function getStock(productId: number) {
  const [product] = await getProductsByIds([productId]);
  return product?.stock ?? 0;
}


export async function addToCart(productId: number) {
  const stock = await getStock(productId);
  const cart = await getCart();
 
  const item = cart.find((i) => i.productId === productId);
  const current = item?.quantity ?? 0;

  if (current >= stock) return;

  if (item) {
    
    item.quantity += 1;
  } else {
    
    cart.push({ productId, quantity: 1 });
  }

  await saveCart(cart);
}


export async function updateQuantity(productId: number, delta: number) {
  const cart = await getCart();
  const item = cart.find((i) => i.productId === productId);
  if (!item) return;

  const newQuantity = item.quantity + delta;

  if (newQuantity <= 0) {
    await saveCart(cart.filter((i) => i.productId !== productId));
    return;
  }

  
  const stock = await getStock(productId);
  if (newQuantity > stock) return;

  item.quantity = newQuantity;
  await saveCart(cart);
}


export async function removeFromCart(productId: number) {
  const cart = await getCart();
 
  await saveCart(cart.filter((i) => i.productId !== productId));
}


export async function clearCart() {
  await saveCart([]);
}