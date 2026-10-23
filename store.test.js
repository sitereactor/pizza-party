import test from 'node:test';
import assert from 'node:assert/strict';
import {readOrders,saveOrders,totals,KEY} from './store.js';
const sample=[{id:'1',name:'Ava',pizza:'ham'},{id:'2',name:'Ava',pizza:'pepperoni'}];
test('orders persist across reads and allow guests with the same name',()=>{const data=new Map();const storage={getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)};assert.deepEqual(readOrders(storage),[]);saveOrders(storage,sample);assert.deepEqual(readOrders(storage),sample);assert.deepEqual(totals(readOrders(storage)),{margarita:0,pepperoni:1,ham:1,chicken:0});saveOrders(storage,[]);assert.equal(readOrders(storage).length,0);});
test('corrupt and invalid data is rejected without overwriting storage',()=>{for(const value of ['oops','{}','[{"id":"1","name":"Ava","pizza":"unknown"}]',JSON.stringify([sample[0],sample[0]])]){const storage={getItem:()=>value,setItem:()=>assert.fail('must not write')};assert.throws(()=>readOrders(storage));}});
test('storage failure propagates so the app cannot falsely confirm an order',()=>{assert.throws(()=>saveOrders({setItem:()=>{throw new Error('quota');}},sample),/quota/);});
