module.exports=[56704,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},20635,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},32319,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},43589,(a,b,c)=>{"use strict";b.exports=a.r(41254).vendored.contexts.AppRouterContext},16482,(a,b,c)=>{"use strict";b.exports=a.r(41254).vendored.contexts.HooksClientContext},565,(a,b,c)=>{"use strict";b.exports=a.r(41254).vendored.contexts.ServerInsertedHtml},6034,a=>{"use strict";var b=a.i(62343),c=a.i(90076),d=a.i(95678);function e({children:a}){let e=(0,c.useRouter)(),f=(0,c.usePathname)(),g=(0,c.useSearchParams)(),{companies:h,currentCompanyId:i,getCompanyPages:j,getPageEntries:k,inquiries:l,user:m,logout:n}=(0,d.useApp)(),o=h.find(a=>a.id===i),p=j(),q=l.filter(a=>a.companyId===i&&"New"===a.status).length,r=[{label:"HUB ADMIN",items:p.map(a=>{let b=k(a.id).length,c=a.name.toLowerCase().trim(),d="form"===c,e=a.singleEntry||"static seo"===c||"mailer settings"===c,f=`/data-entry/${a.id}`;if(e){let b=k(a.id);f=b.length>0?`/data-entry/${a.id}/${b[0].id}`:`/data-entry/${a.id}/new`}return{icon:d?"📋":"📦",label:a.name,sublabel:`${b} ${1===b?"entry":"entries"}`,badge:d&&q>0?q:null,path:f}}),footer:m?.role==="System Admin"?{icon:"+",label:"Add Page",path:"/pages"}:null},...m?.role==="System Admin"||m?.role==="Super Admin"?[{label:"SYSTEM ADMIN",hideLabel:!0,items:[{icon:"🗺️",label:"Mapping",path:"/pages?tab=mapping"},...m?.role==="System Admin"?[{icon:"📄",label:"Pages",path:"/pages"},{icon:"🔗",label:"Linking",path:"/pages?tab=linking"},{icon:"📡",label:"API Report",path:"/pages?tab=api"},{icon:"🧪",label:"API IDE",path:"/api-ide"}]:[]]}]:[]],s=a=>{e.push(a)};return(0,b.jsxs)("div",{style:{display:"flex",height:"100vh",overflow:"hidden",background:"var(--bg)"},children:[(0,b.jsxs)("div",{style:{width:"240px",minWidth:"240px",background:"#0f172a",display:"flex",flexDirection:"column",height:"100vh",overflow:"hidden"},children:[(0,b.jsx)("div",{style:{padding:"20px 18px 16px",borderBottom:"1px solid rgba(255,255,255,0.08)",cursor:"pointer"},onClick:()=>e.push("/"),children:(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[(0,b.jsx)("div",{style:{width:"32px",height:"32px",borderRadius:"8px",background:"var(--primary)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800",fontSize:"14px",color:"white",flexShrink:0},children:o?.initials||"?"}),(0,b.jsx)("div",{style:{overflow:"hidden"},children:(0,b.jsx)("div",{style:{fontSize:"13px",fontWeight:"700",color:"white",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:o?.name||"Select Company"})})]})}),(0,b.jsx)("div",{style:{padding:"12px 14px 8px"},children:(0,b.jsxs)("button",{onClick:()=>e.push("/pages"),style:{width:"100%",padding:"9px 14px",background:"#1e293b",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"8px",color:"white",fontSize:"13px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",transition:"background 0.15s"},onMouseEnter:a=>a.currentTarget.style.background="#334155",onMouseLeave:a=>a.currentTarget.style.background="#1e293b",children:[(0,b.jsx)("span",{style:{fontSize:"16px",fontWeight:"300"},children:"+"})," Create"]})}),(0,b.jsx)("div",{style:{flex:1,overflowY:"auto",padding:"4px 0",scrollbarWidth:"none"},children:r.map(a=>(0,b.jsxs)("div",{style:{marginBottom:"4px"},children:[a.label&&!a.hideLabel&&(0,b.jsx)("div",{style:{padding:"10px 18px 4px",fontSize:"10px",fontWeight:"700",color:"rgba(255,255,255,0.35)",letterSpacing:"0.8px",textTransform:"uppercase"},children:a.label}),a.items.map(a=>{let c=f+(g.toString()?"?"+g.toString():"")===a.path||f===a.path&&!a.path.includes("?");return(0,b.jsxs)("button",{onClick:()=>s(a.path),style:{width:"100%",display:"flex",alignItems:"center",gap:"10px",padding:"8px 18px",background:c?"rgba(255,255,255,0.1)":"transparent",border:"none",cursor:"pointer",transition:"background 0.15s",borderRadius:0,textAlign:"left"},onMouseEnter:a=>{c||(a.currentTarget.style.background="rgba(255,255,255,0.05)")},onMouseLeave:a=>{c||(a.currentTarget.style.background="transparent")},children:[(0,b.jsx)("span",{style:{fontSize:"15px",flexShrink:0,opacity:.8},children:a.icon}),(0,b.jsx)("span",{style:{fontSize:"13px",fontWeight:c?"600":"400",color:c?"white":"rgba(255,255,255,0.65)",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textTransform:"capitalize"},children:a.label}),a.badge&&(0,b.jsx)("span",{style:{background:"#ef4444",color:"white",borderRadius:"10px",padding:"1px 6px",fontSize:"10px",fontWeight:"700",flexShrink:0},children:a.badge})]},a.label)}),a.footer&&(0,b.jsxs)("button",{onClick:()=>s(a.footer.path),style:{width:"100%",display:"flex",alignItems:"center",gap:"10px",padding:"6px 18px",background:"transparent",border:"none",cursor:"pointer",transition:"background 0.15s",textAlign:"left"},onMouseEnter:a=>a.currentTarget.style.background="rgba(255,255,255,0.05)",onMouseLeave:a=>a.currentTarget.style.background="transparent",children:[(0,b.jsx)("span",{style:{fontSize:"14px",opacity:.5,flexShrink:0},children:"+"}),(0,b.jsx)("span",{style:{fontSize:"12px",color:"rgba(255,255,255,0.4)"},children:a.footer.label})]})]},a.label))}),(0,b.jsx)("div",{style:{borderTop:"1px solid rgba(255,255,255,0.08)",padding:"14px 16px"},children:(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[(0,b.jsx)("div",{style:{width:"30px",height:"30px",borderRadius:"50%",background:"var(--primary)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"700",fontSize:"12px",color:"white",flexShrink:0},children:m?.username?.[0]?.toUpperCase()||"U"}),(0,b.jsxs)("div",{style:{flex:1,overflow:"hidden"},children:[(0,b.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"white",textTransform:"capitalize"},children:m?.username}),(0,b.jsx)("div",{style:{fontSize:"10px",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.5px"},children:m?.role?.toUpperCase()||"COMPANY_ADMIN"})]}),(0,b.jsx)("button",{title:"Logout",onClick:()=>{n(),e.push("/login")},style:{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.4)",fontSize:"16px",padding:"4px",borderRadius:"6px",flexShrink:0,transition:"color 0.2s"},onMouseEnter:a=>a.currentTarget.style.color="#ef4444",onMouseLeave:a=>a.currentTarget.style.color="rgba(255,255,255,0.4)",children:"⏻"})]})})]}),(0,b.jsx)("div",{style:{flex:1,overflowY:"auto",display:"flex",flexDirection:"column"},children:a})]})}a.s(["default",()=>e])},8923,a=>{"use strict";var b=a.i(62343),c=a.i(68827),d=a.i(90076),e=a.i(95678);function f(){let{mappingId:a}=(0,d.useParams)(),f=(0,d.useRouter)(),{fieldMappings:g,getPageEntries:h,getPage:i,updateFieldMapping:j,getLinkedEntryDisplayValue:k}=(0,e.useApp)(),l=g.find(b=>b.id===Number(a)),[m,n]=(0,c.useState)({}),[o,p]=(0,c.useState)([]),[q,r]=(0,c.useState)(""),[s,t]=(0,c.useState)(new Set),[u,v]=(0,c.useState)(!1),[w,x]=(0,c.useState)(""),y=(0,c.useRef)(null),[z,A]=(0,c.useState)(null),B=l?h(l.targetPageId):[];if((0,c.useEffect)(()=>{l&&(l.hierarchy&&n(l.hierarchy),l.selectedIds&&t(new Set(l.selectedIds)),x(l.label||l.targetPageName))},[l]),(0,c.useEffect)(()=>{B.length>0&&0===o.length&&p(B)},[B.length]),!l)return(0,b.jsxs)("div",{className:"page-center",children:[(0,b.jsx)("h2",{children:"Mapping not found"}),(0,b.jsx)("button",{className:"btn btn-primary",onClick:()=>f.push("/pages"),children:"Back to Pages"})]});i(l.targetPageId);let C=o.length>0?o:B,D=(a,b,c)=>{n(d=>({...d,[a]:{...d[a]||{parentId:null,role:"none"},[b]:c}}))},E=()=>{w.trim()&&(j(l.id,{label:w.trim()}),v(!1))},F=(a,b)=>{0!==s.size&&n(c=>{let d={...c};return s.forEach(c=>{d[c]={...d[c]||{parentId:null,role:"none"},[a]:b}}),d})},G=a=>k(l.targetPageId,a.id,l.targetFieldName)||`Entry #${a.id}`,H=C.filter(a=>G(a).toLowerCase().includes(q.toLowerCase())),I=()=>{y.current=null,A(null)},J=(a=null)=>(s.size>0?C.filter(a=>s.has(a.id)):C).filter(b=>{let c=m[b.id],d=c?.parentId||null,e=a=>""===a||void 0===a?null:Number(a);return e(s.size>0&&d&&!s.has(Number(d))?null:d)===e(a)}).map(a=>{let c=m[a.id]||{},d=z===a.id;return(0,b.jsxs)("div",{className:"tree-node",onDragOver:b=>{var c;return c=a.id,void(b.preventDefault(),b.dataTransfer.dropEffect="move",c!==y.current&&A(c))},onDrop:b=>((a,b)=>{a.preventDefault();let c=y.current;if(!c||c===b){y.current=null,A(null);return}p(a=>{let d=[...a],e=d.findIndex(a=>a.id===c),f=d.findIndex(a=>a.id===b);if(-1===e||-1===f)return a;let[g]=d.splice(e,1);return d.splice(f,0,g),d}),y.current=null,A(null)})(b,a.id),children:[(0,b.jsxs)("div",{className:`tree-node-content ${d?"drag-over":""}`,draggable:!0,onDragStart:b=>{y.current=a.id,b.dataTransfer.effectAllowed="move"},onDragEnd:I,children:[(0,b.jsx)("span",{className:"drag-handle",title:"Drag to reorder",children:"⠿"}),(0,b.jsx)("span",{className:"node-icon",children:"📄"}),(0,b.jsxs)("span",{className:`node-name ${"primary"===c.role?"role-primary":""} ${"leaf"===c.role?"role-leaf":""}`,children:[G(a),c.role&&"none"!==c.role&&(0,b.jsxs)("span",{className:"node-role",children:["(",c.role,")"]})]})]}),(0,b.jsx)("div",{className:"tree-children",children:J(a.id)})]},a.id)});return(0,b.jsxs)("div",{className:"hierarchy-manager animate-fade-in-up",children:[(0,b.jsxs)("div",{className:"view-header",style:{marginBottom:"32px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,b.jsxs)("div",{children:[u?(0,b.jsx)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:(0,b.jsx)("input",{className:"form-input",style:{fontSize:"24px",fontWeight:"bold",height:"42px",padding:"0 12px"},value:w,onChange:a=>x(a.target.value),onBlur:E,onKeyDown:a=>"Enter"===a.key&&E(),autoFocus:!0})}):(0,b.jsxs)("h1",{style:{margin:0,cursor:"pointer",display:"flex",alignItems:"center",gap:"10px"},onClick:()=>v(!0),title:"Click to rename",children:[l.label||"Hierarchy Management",(0,b.jsx)("span",{style:{fontSize:"14px",opacity:.5},children:"✏️"})]}),(0,b.jsxs)("p",{style:{color:"var(--text-secondary)",marginTop:"4px"},children:["Page: ",(0,b.jsx)("strong",{children:l.targetPageName})," | Field: ",(0,b.jsx)("strong",{children:l.targetFieldName})]})]}),(0,b.jsxs)("div",{style:{display:"flex",gap:"12px"},children:[(0,b.jsx)("button",{className:"btn btn-outline",onClick:()=>f.push("/pages"),children:"Cancel"}),(0,b.jsx)("button",{className:"btn btn-primary",onClick:()=>{j(l.id,{hierarchy:m,selectedIds:Array.from(s)}),alert("Hierarchy saved successfully!"),f.push("/pages")},children:"Save Hierarchy"})]})]}),(0,b.jsxs)("div",{className:"hierarchy-grid",children:[(0,b.jsx)("div",{className:"hierarchy-form-section",children:(0,b.jsxs)("div",{className:"card",children:[(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},children:[(0,b.jsx)("h3",{children:"Configure Entries"}),(0,b.jsx)("div",{style:{display:"flex",gap:"8px"},children:(0,b.jsx)("input",{type:"text",className:"form-input",placeholder:"Search entries...",value:q,onChange:a=>r(a.target.value),style:{width:"200px"}})})]}),s.size>0&&(0,b.jsxs)("div",{className:"bulk-actions-bar animate-fade-in-down",children:[(0,b.jsxs)("div",{className:"bulk-info",children:[(0,b.jsx)("strong",{children:s.size})," selected"]}),(0,b.jsxs)("div",{className:"bulk-controls",children:[(0,b.jsxs)("select",{className:"form-input form-input-sm",onChange:a=>F("parentId",a.target.value),value:"",children:[(0,b.jsx)("option",{value:"",disabled:!0,children:"Set Parent for all..."}),(0,b.jsx)("option",{value:"",children:"None (Root)"}),C.map(a=>(0,b.jsx)("option",{value:a.id,children:G(a)},a.id))]}),(0,b.jsxs)("select",{className:"form-input form-input-sm",onChange:a=>F("role",a.target.value),value:"",children:[(0,b.jsx)("option",{value:"",disabled:!0,children:"Set Role for all..."}),(0,b.jsx)("option",{value:"none",children:"Standard"}),(0,b.jsx)("option",{value:"primary",children:"Primary"}),(0,b.jsx)("option",{value:"leaf",children:"Leaf"})]}),(0,b.jsx)("button",{className:"btn btn-ghost btn-sm",onClick:()=>t(new Set),children:"Clear"})]})]}),(0,b.jsxs)("div",{className:"entries-config-header",children:[(0,b.jsxs)("label",{className:"checkbox-container",children:[(0,b.jsx)("input",{type:"checkbox",checked:H.length>0&&s.size===H.length,onChange:()=>{s.size===H.length?t(new Set):t(new Set(H.map(a=>a.id)))}}),(0,b.jsx)("span",{className:"checkmark"})]}),(0,b.jsx)("span",{style:{fontSize:"11px",fontWeight:"bold",color:"var(--text-secondary)"},children:"SELECT ALL"})]}),(0,b.jsx)("div",{className:"entries-config-list",children:H.map(a=>{let c=m[a.id]||{parentId:"",role:"none"};return(0,b.jsxs)("div",{className:"entry-config-row",children:[(0,b.jsxs)("div",{className:"entry-identity",children:[(0,b.jsxs)("label",{className:"checkbox-container",children:[(0,b.jsx)("input",{type:"checkbox",checked:s.has(a.id),onChange:()=>{var b;let c;return b=a.id,void((c=new Set(s)).has(b)?c.delete(b):c.add(b),t(c))}}),(0,b.jsx)("span",{className:"checkmark"})]}),(0,b.jsx)("strong",{children:G(a)})]}),(0,b.jsxs)("div",{className:"entry-controls",children:[(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsx)("label",{children:"Parent"}),(0,b.jsxs)("select",{className:"form-input",value:c.parentId||"",onChange:b=>D(a.id,"parentId",b.target.value),children:[(0,b.jsx)("option",{value:"",children:"None (Root)"}),C.filter(b=>b.id!==a.id).map(a=>(0,b.jsx)("option",{value:a.id,children:G(a)},a.id))]})]}),(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsx)("label",{children:"Role"}),(0,b.jsxs)("select",{className:"form-input",value:c.role||"none",onChange:b=>D(a.id,"role",b.target.value),children:[(0,b.jsx)("option",{value:"none",children:"Standard"}),(0,b.jsx)("option",{value:"primary",children:"Primary"}),(0,b.jsx)("option",{value:"leaf",children:"Leaf"})]})]})]})]},a.id)})})]})}),(0,b.jsx)("div",{className:"hierarchy-preview-section",children:(0,b.jsxs)("div",{className:"card",children:[(0,b.jsxs)("h3",{children:["Hierarchy Preview ",(0,b.jsx)("span",{className:"drag-hint",children:"← Drag items to reorder"})]}),(0,b.jsx)("div",{className:"tree-viz",children:0===C.length?(0,b.jsx)("p",{style:{textAlign:"center",color:"var(--text-secondary)"},children:"No entries found."}):J(null)})]})})]}),(0,b.jsx)("style",{children:`
                .hierarchy-manager {
                    padding: 40px;
                    max-width: 100%;
                    margin: 0;
                }
                .hierarchy-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 32px;
                    margin-top: 32px;
                }
                .entry-config-row {
                    padding: 20px;
                    border-bottom: 1px solid var(--border);
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    transition: background 0.2s;
                }
                .entry-config-row:last-child {
                    border-bottom: none;
                }
                .entry-controls {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }
                .tree-viz {
                    background: #f8fafc;
                    padding: 24px;
                    border-radius: 12px;
                    min-height: 400px;
                }
                .tree-node {
                    margin-left: 20px;
                    position: relative;
                }
                .tree-node::before {
                    content: '';
                    position: absolute;
                    left: -10px;
                    top: 0;
                    bottom: 0;
                    width: 1.5px;
                    background: #cbd5e1;
                }
                .tree-node:last-child::before {
                    height: 12px;
                }
                .tree-node-content {
                    padding: 8px 12px;
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 6px;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    width: fit-content;
                    position: relative;
                    cursor: grab;
                    user-select: none;
                    transition: box-shadow 0.15s, border-color 0.15s, transform 0.15s;
                }
                .tree-node-content:active {
                    cursor: grabbing;
                }
                .tree-node-content:hover {
                    border-color: #6366f1;
                    box-shadow: 0 2px 8px rgba(99,102,241,0.15);
                }
                .tree-node-content.drag-over {
                    border-color: #6366f1;
                    border-style: dashed;
                    background: #eef2ff;
                    box-shadow: 0 0 0 3px rgba(99,102,241,0.2);
                    transform: scale(1.02);
                }
                .tree-node-content::after {
                    content: '';
                    position: absolute;
                    left: -10px;
                    top: 18px;
                    width: 10px;
                    height: 1.5px;
                    background: #cbd5e1;
                }
                .drag-handle {
                    font-size: 16px;
                    color: #94a3b8;
                    cursor: grab;
                    line-height: 1;
                    letter-spacing: -1px;
                }
                .drag-hint {
                    font-size: 12px;
                    font-weight: 400;
                    color: #94a3b8;
                    margin-left: 8px;
                }
                .node-name {
                    font-weight: 500;
                }
                .role-primary {
                    color: #7b1fa2;
                    font-weight: 700;
                }
                .role-leaf {
                    color: #059669;
                }
                .node-role {
                    font-size: 11px;
                    margin-left: 6px;
                    opacity: 0.7;
                    text-transform: uppercase;
                }

                /* New Bulk & Select Styles */
                .bulk-actions-bar {
                    background: #eef2ff;
                    padding: 12px 16px;
                    border-radius: 8px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                    border: 1px solid #c7d2fe;
                }
                .bulk-controls {
                    display: flex;
                    gap: 8px;
                }
                .form-input-sm {
                    padding: 4px 8px;
                    font-size: 12px;
                    height: 32px;
                    width: auto !important;
                }
                .checkbox-container {
                    display: block;
                    position: relative;
                    padding-left: 24px;
                    cursor: pointer;
                    user-select: none;
                    height: 18px;
                }
                .checkbox-container input {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                    height: 0;
                    width: 0;
                }
                .checkmark {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 18px;
                    width: 18px;
                    background-color: #eee;
                    border-radius: 4px;
                    border: 1px solid var(--border);
                }
                .checkbox-container:hover input ~ .checkmark {
                    background-color: #ccc;
                }
                .checkbox-container input:checked ~ .checkmark {
                    background-color: var(--primary);
                    border-color: var(--primary);
                }
                .checkmark:after {
                    content: "";
                    position: absolute;
                    display: none;
                }
                .checkbox-container input:checked ~ .checkmark:after {
                    display: block;
                }
                .checkbox-container .checkmark:after {
                    left: 6px;
                    top: 2px;
                    width: 4px;
                    height: 8px;
                    border: solid white;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                }
                .entries-config-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 20px;
                    background: #f8fafc;
                    border-bottom: 1px solid var(--border);
                }
                .entry-identity {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .bulk-info {
                    font-size: 13px;
                    color: var(--primary);
                }
                .entries-config-list {
                    max-height: 70vh;
                    overflow-y: auto;
                }
            `})]})}a.s(["default",()=>f])},10214,a=>{"use strict";var b=a.i(62343),c=a.i(68827),d=a.i(6034),e=a.i(8923);function f(a){return(0,b.jsx)(c.Suspense,{fallback:(0,b.jsx)("div",{style:{padding:"2rem"},children:"Loading..."}),children:(0,b.jsx)(d.default,{children:(0,b.jsx)(e.default,{...a})})})}a.s(["default",()=>f])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__d2a8db74._.js.map