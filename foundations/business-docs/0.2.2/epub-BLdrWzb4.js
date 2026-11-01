import{J as X}from"./jszip.min-DRE8DEUz.js";import{p as q}from"./_entry.generated-DQVImqnB.js";import{a as H}from"./fetch-CH5Du284.js";import{n as Y,E as _}from"./math-css-5UmauDVn.js";async function ct(t,e={}){const{sections:n=[],metadata:i=null}=t||{},{meta:o={},stylesheet:m,identifier:u,cover:d,loadAsset:y}=e,l={...i||{},...o},C=`${_}
${m||it}`,v=u||l.identifier||nt(),g=d||l.cover||l.coverImage;let T=1;const x=n.map(a=>{const s=Y(a,T);return T=s.next,s.html}).map((a,s)=>J(a,s)),$=new Set;for(const a of x)for(const s of a.images)$.add(s);g&&$.add(g);const p=$.size?await H($,{loadAsset:y}):new Map,h=[],S=new Map,L=new Set;let N=null;for(const[a,s]of p){if(s.error){console.warn(`@uniweb/press epub: failed to fetch image ${a}: ${s.error.message}`);continue}const U=`images/${`${s.hash}.${s.ext}`}`;S.set(a,U);const P=`img-${s.hash}`;L.has(U)||(L.add(U),h.push({id:P,path:U,mime:s.mime||"application/octet-stream",bytes:s.bytes,isCover:a===g})),a===g&&(N=P)}const M=x.map((a,s)=>{D(a.tree,S,"../");const A=et({title:a.title||l.title||`Chapter ${s+1}`,language:l.language||"en",body:k(a.tree),stylesheetHref:"../styles.css"});return{id:`ch-${F(s+1)}`,path:`chapters/ch-${F(s+1)}.xhtml`,title:a.title||`Chapter ${s+1}`,xhtml:A}}),z=N?h.find(a=>a.id===N):null,w=z?{id:"cover-page",path:"chapters/cover.xhtml",title:l.coverTitle||"Cover",xhtml:tt({language:l.language||"en",title:l.title||"Cover",imagePath:`../${z.path}`,alt:l.coverAlt||l.title||"Cover"}),isCover:true}:null,j=w?[w,...M]:M,E=new X;E.file("mimetype","application/epub+zip",{compression:"STORE"}),E.file("META-INF/container.xml",V());const b=E.folder("OEBPS");b.file("content.opf",K({id:v,meta:l,chapters:j,images:h,coverImageId:N,coverPageId:w?w.id:null})),b.file("nav.xhtml",Q({language:l.language||"en",title:l.title||"Contents",chapters:M,coverPage:w})),b.file("toc.ncx",W({id:v,title:l.title||"Book",chapters:j})),b.file("styles.css",C);for(const a of j)b.file(a.path,a.xhtml);for(const a of h)b.file(a.path,a.bytes);return await E.generateAsync({type:"blob",mimeType:"application/epub+zip",compression:"DEFLATE",compressionOptions:{level:6}})}function J(t,e){const n=q(t||""),i={title:"",images:new Set};return O(n,i),{tree:n,title:i.title,images:i.images,index:e}}function O(t,e){const n=t.childNodes||[];for(const i of n){if(i.nodeName==="#text")continue;const o=(i.tagName||"").toLowerCase();if(!e.title&&(o==="h1"||o==="h2"||o==="h3")&&(e.title=I(i).trim()),o==="img"){const m=B(i,"src");m&&!/^data:/i.test(m)&&e.images.add(m)}i.childNodes&&O(i,e)}}function D(t,e,n){const i=t.childNodes||[];for(const o of i){if(o.nodeName==="#text")continue;if((o.tagName||"").toLowerCase()==="img"){const u=B(o,"src"),d=u&&e.get(u);d&&R(o,"src",n+d)}o.childNodes&&D(o,e,n)}}function I(t){if(t.nodeName==="#text")return t.value||"";let e="";for(const n of t.childNodes||[])e+=I(n);return e}function B(t,e){for(const n of t.attrs||[])if(n.name===e)return n.value;return null}function R(t,e,n){t.attrs||(t.attrs=[]);for(const i of t.attrs)if(i.name===e){i.value=n;return}t.attrs.push({name:e,value:n})}const Z=new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);function k(t){if(t.nodeName==="#text")return c(t.value||"");if(t.nodeName==="#document-fragment")return(t.childNodes||[]).map(k).join("");const e=(t.tagName||"").toLowerCase();if(!e)return(t.childNodes||[]).map(k).join("");const n=G(t.attrs||[]);if(Z.has(e))return`<${e}${n}/>`;const i=(t.childNodes||[]).map(k).join("");return`<${e}${n}>${i}</${e}>`}function G(t){if(!t.length)return"";let e="";for(const n of t){const i=n.name,o=n.value==null?"":String(n.value);e+=` ${i}="${r(o)}"`}return e}function c(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function r(t){return String(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function V(){return`<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>
`}function K({id:t,meta:e,chapters:n,images:i,coverImageId:o,coverPageId:m}){const u=e.title||"Untitled",d=e.language||"en",y=e.author,l=e.publisher,C=e.description,v=e.subject,g=e.rights,T=e.date||new Date().toISOString().slice(0,19)+"Z",f=[`    <dc:identifier id="pub-id">${c(t)}</dc:identifier>`,`    <dc:title>${c(u)}</dc:title>`,`    <dc:language>${c(d)}</dc:language>`];y&&f.push(`    <dc:creator>${c(y)}</dc:creator>`),l&&f.push(`    <dc:publisher>${c(l)}</dc:publisher>`),C&&f.push(`    <dc:description>${c(C)}</dc:description>`),v&&f.push(`    <dc:subject>${c(v)}</dc:subject>`),g&&f.push(`    <dc:rights>${c(g)}</dc:rights>`),f.push(`    <meta property="dcterms:modified">${c(T)}</meta>`),o&&f.push(`    <meta name="cover" content="${r(o)}"/>`);const x=['    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>','    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>','    <item id="css" href="styles.css" media-type="text/css"/>'];for(const p of n){const h=[/<math[\s>]/.test(p.xhtml||"")&&"mathml",/<svg[\s>]/.test(p.xhtml||"")&&"svg"].filter(Boolean),S=h.length?` properties="${h.join(" ")}"`:"";x.push(`    <item id="${r(p.id)}" href="${r(p.path)}" media-type="application/xhtml+xml"${S}/>`)}for(const p of i){const h=p.id===o?' properties="cover-image"':"";x.push(`    <item id="${r(p.id)}" href="${r(p.path)}" media-type="${r(p.mime)}"${h}/>`)}const $=n.map(p=>`    <itemref${p.id===m?` idref="${r(p.id)}" linear="no"`:` idref="${r(p.id)}"`}/>`);return $.push('    <itemref idref="nav" linear="no"/>'),`<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="pub-id" xml:lang="${r(d)}">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
${f.join(`
`)}
  </metadata>
  <manifest>
${x.join(`
`)}
  </manifest>
  <spine toc="ncx">
${$.join(`
`)}
  </spine>
</package>
`}function Q({language:t,title:e,chapters:n,coverPage:i}){const o=n.map(d=>`        <li><a href="${r(d.path)}">${c(d.title)}</a></li>`).join(`
`),m=[];i&&m.push(`        <li><a epub:type="cover" href="${r(i.path)}">Cover</a></li>`),m.push('        <li><a epub:type="toc" href="nav.xhtml#toc">Table of Contents</a></li>'),n.length&&m.push(`        <li><a epub:type="bodymatter" href="${r(n[0].path)}">Start of Content</a></li>`);const u=`    <nav epub:type="landmarks" id="landmarks" hidden="hidden">
      <h2>Landmarks</h2>
      <ol>
${m.join(`
`)}
      </ol>
    </nav>`;return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${r(t)}">
  <head>
    <meta charset="utf-8"/>
    <title>${c(e)}</title>
  </head>
  <body>
    <nav epub:type="toc" id="toc">
      <h1>${c(e)}</h1>
      <ol>
${o}
      </ol>
    </nav>
${u}
  </body>
</html>
`}function W({id:t,title:e,chapters:n}){const i=n.map((o,m)=>`    <navPoint id="${r(o.id)}" playOrder="${m+1}">
      <navLabel><text>${c(o.title)}</text></navLabel>
      <content src="${r(o.path)}"/>
    </navPoint>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="${r(t)}"/>
    <meta name="dtb:depth" content="1"/>
  </head>
  <docTitle><text>${c(e)}</text></docTitle>
  <navMap>
${i}
  </navMap>
</ncx>
`}function tt({language:t,title:e,imagePath:n,alt:i}){return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${r(t)}">
  <head>
    <meta charset="utf-8"/>
    <title>${c(e)}</title>
    <style type="text/css">
      body { margin: 0; padding: 0; text-align: center; }
      img { max-width: 100%; max-height: 100vh; height: auto; }
    </style>
  </head>
  <body epub:type="cover">
    <div><img src="${r(n)}" alt="${r(i)}"/></div>
  </body>
</html>
`}function et({title:t,language:e,body:n,stylesheetHref:i}){const o=i?`    <link rel="stylesheet" type="text/css" href="${r(i)}"/>
`:"";return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${r(e)}">
  <head>
    <meta charset="utf-8"/>
    <title>${c(t)}</title>
${o}  </head>
  <body>
${n}
  </body>
</html>
`}function F(t){return String(t).padStart(2,"0")}function nt(){if(globalThis.crypto?.randomUUID)return"urn:uuid:"+globalThis.crypto.randomUUID();const t=()=>Math.floor(Math.random()*65536).toString(16).padStart(4,"0");return`urn:uuid:${t()}${t()}-${t()}-4${t().slice(1)}-a${t().slice(1)}-${t()}${t()}${t()}`}const it=`/* Minimal EPUB3 stylesheet — foundations can override via options.stylesheet. */
body {
  font-family: Georgia, "Times New Roman", serif;
  line-height: 1.5;
  margin: 0 5%;
}
h1, h2, h3, h4, h5, h6 {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.2;
  page-break-after: avoid;
}
h1 { font-size: 1.8em; margin-top: 2em; }
h2 { font-size: 1.4em; margin-top: 1.5em; }
h3 { font-size: 1.15em; margin-top: 1em; }
p { margin: 0 0 0.8em; text-indent: 1.25em; }
p:first-child, p.lead { text-indent: 0; }
img { max-width: 100%; height: auto; }
figure { margin: 1em 0; text-align: center; }
figcaption { font-size: 0.9em; color: #555; }
blockquote {
  margin: 1em 1.5em;
  padding-left: 1em;
  border-left: 3px solid #ccc;
  color: #444;
}
code { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 0.92em; }
pre {
  font-family: ui-monospace, Menlo, Consolas, monospace;
  font-size: 0.9em;
  background: #f5f5f5;
  padding: 0.75em;
  overflow: auto;
  white-space: pre-wrap;
}
`;export{it as DEFAULT_STYLESHEET,tt as buildCoverXhtml,Q as buildNav,W as buildNcx,K as buildOpf,ct as compileEpub,k as serializeXhtml,et as wrapChapterXhtml};
