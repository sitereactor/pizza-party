export const pizzas = [
  {id:'margarita',name:'Margarita',ingredients:'Tomato sauce + cheese'},
  {id:'pepperoni',name:'Pepperoni',ingredients:'Tomato sauce + cheese + pepperoni'},
  {id:'ham',name:'Ham',ingredients:'Tomato sauce + cheese + ham'},
  {id:'chicken',name:'Chicken',ingredients:'Tomato sauce + cheese + chicken'}
];
export const KEY='slice-club-orders-v1';
export function validateOrders(value){
  if(!Array.isArray(value)||value.some(o=>!o||typeof o.id!=='string'||typeof o.name!=='string'||!o.name.trim()||o.name.length>40||!pizzas.some(p=>p.id===o.pizza))||new Set(value.map(o=>o.id)).size!==value.length) throw new Error('Saved orders could not be read. Please keep this browser data and try reloading.');
  return value;
}
export function readOrders(storage){return validateOrders(JSON.parse(storage.getItem(KEY)||'[]'));}
export function saveOrders(storage,orders){validateOrders(orders);storage.setItem(KEY,JSON.stringify(orders));return orders;}
export function totals(orders){return Object.fromEntries(pizzas.map(p=>[p.id,orders.filter(o=>o.pizza===p.id).length]));}
