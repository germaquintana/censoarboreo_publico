import test from 'node:test';
import assert from 'node:assert/strict';
import worker, {validDataset} from '../worker.js';
import {generateKeyPair, exportJWK, SignJWT} from 'jose';

const sample=()=>({
  schema:'oirs_privadas_v3',source_cut:'2026-11-05',
  cases:[
    {case:{folio:'101',date:'2026-11-05',address:'CALLE DE PRUEBA 10',request:'Relato ficticio A',group:'misma_numeracion'},trees:[{treeId:'T1',distance:0,structuralState:'BUENO'}]},
    {case:{folio:'102',date:'2026-11-05',address:'CALLE DE PRUEBA 21',request:'Relato ficticio B',group:'sin_candidato_pm5'},trees:[]}
  ]
});
test('validador exige regla ±5, unicidad e ID OIRS admisible',()=>{
  assert.equal(validDataset(sample()),true);
  const outside=sample();outside.cases[0].trees[0].distance=40;assert.equal(validDataset(outside),false);
  const dupe=sample();dupe.cases[1].case.folio='101';assert.equal(validDataset(dupe),false);
  const bad=sample();bad.cases[0].case.folio='../data';assert.equal(validDataset(bad),false);
});
test('ningun expediente sale sin JWT incluso si R2 contiene dataset',async()=>{
  const env={OIRS_R2:{get:async()=>({json:async()=>sample()})}};
  for(const path of ['/consulta/','/consulta/api/v1/session','/consulta/api/v1/oirs','/consulta/api/v1/oirs/101']){
    const resp=await worker.fetch(new Request('https://private.example'+path),env);
    assert.equal(resp.status,403,path);
    assert.match(resp.headers.get('cache-control')||'',/no-store/);
    const content=await resp.text();
    assert.doesNotMatch(content,/Relato ficticio/);
  }
});
test('el resumen C0 es público, pero no contiene expedientes',async()=>{
  const resp=await worker.fetch(new Request('https://private.example/data/oirs_curados.json'),{});
  assert.equal(resp.status,200);
  const data=await resp.json();
  assert.equal(data.universo.oirs,300);
  assert.equal(Object.hasOwn(data,'cases'),false);
});
test('ruta de escritura denegada',async()=>{
  const r=await worker.fetch(new Request('https://private.example/consulta/api/v1/oirs/101',{method:'POST'}),{});
  assert.equal(r.status,405);
});
test('sin configuración de identidad falla cerrado',async()=>{
  const r=await worker.fetch(new Request('https://private.example/consulta/api/v1/session',{headers:{'Cf-Access-Jwt-Assertion':'no-verificado'}}),{CF_ACCESS_ISSUER:'https://team.cloudflareaccess.com',CF_ACCESS_AUD:'aud',ALLOWED_EMAILS:'gestionambiental@recoleta.cl'});
  assert.equal(r.status,403);
});

test('rechaza distancias ausentes, cadenas, decimales y valores no finitos',()=>{
  for(const distance of [undefined,null,'', '0', '5', 1.5, NaN, Infinity]){
    const data=sample();data.cases[0].trees[0].distance=distance;
    assert.equal(validDataset(data),false,String(distance));
  }
  for(const distance of [-5,0,5]){
    const data=sample();data.cases[0].trees[0].distance=distance;
    assert.equal(validDataset(data),true,String(distance));
  }
});
test('contrato de consulta: token firmado y allowlist, lista y detalle con/sin candidatos',async()=>{
  const {publicKey,privateKey}=await generateKeyPair('RS256');
  const jwk=await exportJWK(publicKey);jwk.kid='test-key';jwk.alg='RS256';jwk.use='sig';
  const issuer='https://recoleta-test.cloudflareaccess.com',aud='aud-ficticia';
  const originalFetch=globalThis.fetch;
  globalThis.fetch=async()=>new Response(JSON.stringify({keys:[jwk]}),{headers:{'content-type':'application/json'}});
  try{
    const sign=email=>new SignJWT({email}).setProtectedHeader({alg:'RS256',kid:'test-key'}).setIssuer(issuer).setAudience(aud).setIssuedAt().setExpirationTime('5m').sign(privateKey);
    const env={CF_ACCESS_ISSUER:issuer,CF_ACCESS_AUD:aud,ALLOWED_EMAILS:'autorizado@example.invalid',OIRS_R2:{get:async()=>({json:async()=>sample()})}};
    const request=(path,token)=>worker.fetch(new Request('https://private.example'+path,{headers:{'Cf-Access-Jwt-Assertion':token}}),env);
    const token=await sign('autorizado@example.invalid');
    let r=await request('/consulta/api/v1/session',token);assert.equal(r.status,200);assert.equal((await r.json()).authorized,true);
    r=await request('/consulta/api/v1/oirs?search=PRUEBA',token);assert.equal(r.status,200);assert.equal((await r.json()).total,2);
    r=await request('/consulta/api/v1/oirs/101',token);assert.equal(r.status,200);assert.equal((await r.json()).trees.length,1);
    r=await request('/consulta/api/v1/oirs/102',token);assert.equal(r.status,200);assert.equal((await r.json()).trees.length,0);
    r=await request('/consulta/api/v1/oirs/101',await sign('noautorizado@example.invalid'));assert.equal(r.status,403);
  }finally{globalThis.fetch=originalFetch}
});

test('dataset rechaza candidato nulo y URL malformada retorna 400',async()=>{
 const d=sample();d.cases[0].trees=[null];assert.equal(validDataset(d),false);
 const env={CF_ACCESS_ISSUER:'https://test.cloudflareaccess.com',CF_ACCESS_AUD:'aud',ALLOWED_EMAILS:'test@example.invalid'};
 const r=await worker.fetch(new Request('https://private.example/consulta/api/v1/oirs/%E0%A4%A'),env);
 assert.equal(r.status,403,'sin JWT siempre se deniega antes de analizar folio');
});
