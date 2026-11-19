import { createRemoteJWKSet, jwtVerify } from 'jose';
import publicSummary from '../data/oirs_curados.json';

const secureHeaders={
  'Cache-Control':'private, no-store, max-age=0',
  'Pragma':'no-cache',
  'X-Content-Type-Options':'nosniff',
  'Referrer-Policy':'no-referrer',
  'X-Frame-Options':'DENY',
  'Cross-Origin-Resource-Policy':'same-origin',
  'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
};
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{...secureHeaders,'Content-Type':'application/json; charset=utf-8'}});
let cachedIssuer='',cachedJwks;
async function identity(request,env){
  const issuer=String(env.CF_ACCESS_ISSUER||'').replace(/\/$/,'');
  const audience=String(env.CF_ACCESS_AUD||'');
  const allowlist=String(env.ALLOWED_EMAILS||'').toLowerCase().split(',').map(x=>x.trim()).filter(Boolean);
  const token=request.headers.get('Cf-Access-Jwt-Assertion');
  if(!issuer.startsWith('https://')||!issuer.endsWith('.cloudflareaccess.com')||!audience||!allowlist.length||!token)return null;
  if(cachedIssuer!==issuer){cachedIssuer=issuer;cachedJwks=createRemoteJWKSet(new URL(issuer+'/cdn-cgi/access/certs'))}
  try{
    const {payload}=await jwtVerify(token,cachedJwks,{issuer,audience,algorithms:['RS256']});
    const email=String(payload.email||'').trim().toLowerCase();
    return email&&allowlist.includes(email)?{email}:null;
  }catch{return null}
}
function validDataset(data){
  if(!data||data.schema!=='oirs_privadas_v3'||!Array.isArray(data.cases)||data.cases.length<1||data.cases.length>10000)return false;
  const ids=new Set();
  for(const item of data.cases){
    if(!item||!/^[0-9]{1,12}$/.test(String(item.case?.folio||''))||!Array.isArray(item.trees))return false;
    if(ids.has(String(item.case.folio)))return false;
    ids.add(String(item.case.folio));
    for(const tree of item.trees){
      if(!Number.isFinite(Number(tree.distance))||Math.abs(Number(tree.distance))>5)return false;
    }
  }
  return true;
}
async function loadCases(env){
  if(!env.OIRS_R2)return null;
  const obj=await env.OIRS_R2.get('oirs-v3.json');
  if(!obj)return null;
  const data=await obj.json();
  if(!validDataset(data))return null;
  return data;
}
const allowedGroups=new Set(['todos','misma_numeracion','proximidad_pm5','sin_candidato_pm5','sin_direccion_interpretable']);
const toList=item=>({
  folio:String(item.case.folio),address:String(item.case.address||''),date:String(item.case.date||''),
  candidates:item.trees.length,group:String(item.case.group||'')
});
export default {
  async fetch(request,env){
    if(request.method!=='GET')return json({error:'metodo_no_permitido'},405);
    const url=new URL(request.url);
    const path=url.pathname;
    if(path==='/healthz')return json({status:'service_configured',publicData:false});
    if(!path.startsWith('/consulta/')&&path!=='/data/oirs_curados.json')return json({error:'no_encontrado'},404);
    // Cloudflare Access protects ALL private pages and APIs, not only /api.
    const user=await identity(request,env);
    if(!user)return json({error:'acceso_denegado'},403);
    if(path==='/data/oirs_curados.json')return json(publicSummary);
    if(path==='/consulta/api/v1/session')return json({authenticated:true,authorized:true,mode:'SOLO_CONSULTA'});
    if(path==='/consulta/api/v1/oirs'||path.startsWith('/consulta/api/v1/oirs/')){
      const data=await loadCases(env).catch(()=>null);
      if(!data)return json({error:'origen_restringido_no_habilitado'},503);
      if(path==='/consulta/api/v1/oirs'){
        const search=String(url.searchParams.get('search')||'').toLowerCase().trim().slice(0,100);
        const group=String(url.searchParams.get('group')||'todos');
        if(!allowedGroups.has(group))return json({error:'filtro_invalido'},400);
        const offset=Math.max(0,Math.min(10000,Number.parseInt(url.searchParams.get('offset')||'0',10)||0));
        const limit=Math.max(1,Math.min(35,Number.parseInt(url.searchParams.get('limit')||'30',10)||30));
        const cases=data.cases.filter(x=>{
          if(group!=='todos'&&String(x.case.group||'')!==group)return false;
          if(!search)return true;
          return [x.case.folio,x.case.address,x.case.request].some(v=>String(v||'').toLowerCase().includes(search));
        });
        return json({total:cases.length,items:cases.slice(offset,offset+limit).map(toList)});
      }
      const folio=decodeURIComponent(path.slice('/consulta/api/v1/oirs/'.length));
      if(!/^[0-9]{1,12}$/.test(folio))return json({error:'folio_invalido'},400);
      const item=data.cases.find(x=>String(x.case.folio)===folio);
      return item?json({case:item.case,trees:item.trees,cutoff:data.source_cut||null}):json({error:'caso_no_encontrado'},404);
    }
    const assetPath=path==='/consulta/'||path==='/consulta/index.html'?'/index.html':
                    path==='/consulta/app.js'?'/app.js':null;
    if(!assetPath||!env.ASSETS)return json({error:'no_encontrado'},404);
    const assetUrl=new URL(assetPath,request.url);
    const response=await env.ASSETS.fetch(new Request(assetUrl,{method:'GET'}));
    if(!response.ok)return json({error:'recurso_no_encontrado'},404);
    const h=new Headers(response.headers);
    for(const [k,v] of Object.entries(secureHeaders))h.set(k,v);
    return new Response(response.body,{status:response.status,headers:h});
  }
};
