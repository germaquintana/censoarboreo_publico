import test from 'node:test';
import assert from 'node:assert/strict';
import worker, {validDataset} from '../worker.js';

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
  for(const path of ['/consulta/','/consulta/api/v1/session','/consulta/api/v1/oirs','/consulta/api/v1/oirs/101','/data/oirs_curados.json']){
    const resp=await worker.fetch(new Request('https://private.example'+path),env);
    assert.equal(resp.status,403,path);
    assert.match(resp.headers.get('cache-control')||'',/no-store/);
    const content=await resp.text();
    assert.doesNotMatch(content,/Relato ficticio/);
  }
});
test('ruta de escritura denegada',async()=>{
  const r=await worker.fetch(new Request('https://private.example/consulta/api/v1/oirs/101',{method:'POST'}),{});
  assert.equal(r.status,405);
});
test('sin configuración de identidad falla cerrado',async()=>{
  const r=await worker.fetch(new Request('https://private.example/consulta/api/v1/session',{headers:{'Cf-Access-Jwt-Assertion':'no-verificado'}}),{CF_ACCESS_ISSUER:'https://team.cloudflareaccess.com',CF_ACCESS_AUD:'aud',ALLOWED_EMAILS:'gestionambiental@recoleta.cl'});
  assert.equal(r.status,403);
});
