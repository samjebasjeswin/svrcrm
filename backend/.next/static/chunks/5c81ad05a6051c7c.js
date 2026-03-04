(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,56417,(e,r,t)=>{r.exports=e.r(28047)},98653,e=>{"use strict";var r=e.i(9639),t=e.i(56417),n=e.i(32591);function i({children:e}){let i=(0,t.useRouter)(),a=(0,t.usePathname)(),l=(0,t.useSearchParams)(),{companies:o,currentCompanyId:s,getCompanyPages:d,getPageEntries:c,inquiries:p,user:x,logout:h}=(0,n.useApp)(),g=o.find(e=>e.id===s),u=d(),f=p.filter(e=>e.companyId===s&&"New"===e.status).length,m=[{label:"HUB ADMIN",items:u.map(e=>{let r=c(e.id).length,t=e.name.toLowerCase().trim(),n="form"===t,i=e.singleEntry||"static seo"===t||"mailer settings"===t,a=`/data-entry/${e.id}`;if(i){let r=c(e.id);a=r.length>0?`/data-entry/${e.id}/${r[0].id}`:`/data-entry/${e.id}/new`}return{icon:n?"📋":"📦",label:e.name,sublabel:`${r} ${1===r?"entry":"entries"}`,badge:n&&f>0?f:null,path:a}}),footer:x?.role==="System Admin"?{icon:"+",label:"Add Page",path:"/pages"}:null},...x?.role==="System Admin"||x?.role==="Super Admin"?[{label:"SYSTEM ADMIN",hideLabel:!0,items:[{icon:"🗺️",label:"Mapping",path:"/pages?tab=mapping"},...x?.role==="System Admin"?[{icon:"📄",label:"Pages",path:"/pages"},{icon:"🔗",label:"Linking",path:"/pages?tab=linking"},{icon:"📡",label:"API Report",path:"/pages?tab=api"},{icon:"🧪",label:"API IDE",path:"/api-ide"}]:[]]}]:[]],b=e=>{i.push(e)};return(0,r.jsxs)("div",{style:{display:"flex",height:"100vh",overflow:"hidden",background:"var(--bg)"},children:[(0,r.jsxs)("div",{style:{width:"240px",minWidth:"240px",background:"#0f172a",display:"flex",flexDirection:"column",height:"100vh",overflow:"hidden"},children:[(0,r.jsx)("div",{style:{padding:"20px 18px 16px",borderBottom:"1px solid rgba(255,255,255,0.08)",cursor:"pointer"},onClick:()=>i.push("/"),children:(0,r.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[(0,r.jsx)("div",{style:{width:"32px",height:"32px",borderRadius:"8px",background:"var(--primary)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800",fontSize:"14px",color:"white",flexShrink:0},children:g?.initials||"?"}),(0,r.jsx)("div",{style:{overflow:"hidden"},children:(0,r.jsx)("div",{style:{fontSize:"13px",fontWeight:"700",color:"white",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:g?.name||"Select Company"})})]})}),(0,r.jsx)("div",{style:{padding:"12px 14px 8px"},children:(0,r.jsxs)("button",{onClick:()=>i.push("/pages"),style:{width:"100%",padding:"9px 14px",background:"#1e293b",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"8px",color:"white",fontSize:"13px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",transition:"background 0.15s"},onMouseEnter:e=>e.currentTarget.style.background="#334155",onMouseLeave:e=>e.currentTarget.style.background="#1e293b",children:[(0,r.jsx)("span",{style:{fontSize:"16px",fontWeight:"300"},children:"+"})," Create"]})}),(0,r.jsx)("div",{style:{flex:1,overflowY:"auto",padding:"4px 0",scrollbarWidth:"none"},children:m.map(e=>(0,r.jsxs)("div",{style:{marginBottom:"4px"},children:[e.label&&!e.hideLabel&&(0,r.jsx)("div",{style:{padding:"10px 18px 4px",fontSize:"10px",fontWeight:"700",color:"rgba(255,255,255,0.35)",letterSpacing:"0.8px",textTransform:"uppercase"},children:e.label}),e.items.map(e=>{let t=a+(l.toString()?"?"+l.toString():"")===e.path||a===e.path&&!e.path.includes("?");return(0,r.jsxs)("button",{onClick:()=>b(e.path),style:{width:"100%",display:"flex",alignItems:"center",gap:"10px",padding:"8px 18px",background:t?"rgba(255,255,255,0.1)":"transparent",border:"none",cursor:"pointer",transition:"background 0.15s",borderRadius:0,textAlign:"left"},onMouseEnter:e=>{t||(e.currentTarget.style.background="rgba(255,255,255,0.05)")},onMouseLeave:e=>{t||(e.currentTarget.style.background="transparent")},children:[(0,r.jsx)("span",{style:{fontSize:"15px",flexShrink:0,opacity:.8},children:e.icon}),(0,r.jsx)("span",{style:{fontSize:"13px",fontWeight:t?"600":"400",color:t?"white":"rgba(255,255,255,0.65)",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textTransform:"capitalize"},children:e.label}),e.badge&&(0,r.jsx)("span",{style:{background:"#ef4444",color:"white",borderRadius:"10px",padding:"1px 6px",fontSize:"10px",fontWeight:"700",flexShrink:0},children:e.badge})]},e.label)}),e.footer&&(0,r.jsxs)("button",{onClick:()=>b(e.footer.path),style:{width:"100%",display:"flex",alignItems:"center",gap:"10px",padding:"6px 18px",background:"transparent",border:"none",cursor:"pointer",transition:"background 0.15s",textAlign:"left"},onMouseEnter:e=>e.currentTarget.style.background="rgba(255,255,255,0.05)",onMouseLeave:e=>e.currentTarget.style.background="transparent",children:[(0,r.jsx)("span",{style:{fontSize:"14px",opacity:.5,flexShrink:0},children:"+"}),(0,r.jsx)("span",{style:{fontSize:"12px",color:"rgba(255,255,255,0.4)"},children:e.footer.label})]})]},e.label))}),(0,r.jsx)("div",{style:{borderTop:"1px solid rgba(255,255,255,0.08)",padding:"14px 16px"},children:(0,r.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[(0,r.jsx)("div",{style:{width:"30px",height:"30px",borderRadius:"50%",background:"var(--primary)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"700",fontSize:"12px",color:"white",flexShrink:0},children:x?.username?.[0]?.toUpperCase()||"U"}),(0,r.jsxs)("div",{style:{flex:1,overflow:"hidden"},children:[(0,r.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"white",textTransform:"capitalize"},children:x?.username}),(0,r.jsx)("div",{style:{fontSize:"10px",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.5px"},children:x?.role?.toUpperCase()||"COMPANY_ADMIN"})]}),(0,r.jsx)("button",{title:"Logout",onClick:()=>{h(),i.push("/login")},style:{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.4)",fontSize:"16px",padding:"4px",borderRadius:"6px",flexShrink:0,transition:"color 0.2s"},onMouseEnter:e=>e.currentTarget.style.color="#ef4444",onMouseLeave:e=>e.currentTarget.style.color="rgba(255,255,255,0.4)",children:"⏻"})]})})]}),(0,r.jsx)("div",{style:{flex:1,overflowY:"auto",display:"flex",flexDirection:"column"},children:e})]})}e.s(["default",()=>i])},35210,e=>{"use strict";var r=e.i(9639),t=e.i(73184),n=e.i(56417),i=e.i(32591);function a(){let{mappingId:e}=(0,n.useParams)(),a=(0,n.useRouter)(),{fieldMappings:l,getPageEntries:o,getPage:s,updateFieldMapping:d,getLinkedEntryDisplayValue:c}=(0,i.useApp)(),p=l.find(r=>r.id===Number(e)),[x,h]=(0,t.useState)({}),[g,u]=(0,t.useState)([]),[f,m]=(0,t.useState)(""),[b,y]=(0,t.useState)(new Set),[v,j]=(0,t.useState)(!1),[k,w]=(0,t.useState)(""),S=(0,t.useRef)(null),[N,C]=(0,t.useState)(null),z=p?o(p.targetPageId):[];if((0,t.useEffect)(()=>{p&&(p.hierarchy&&h(p.hierarchy),p.selectedIds&&y(new Set(p.selectedIds)),w(p.label||p.targetPageName))},[p]),(0,t.useEffect)(()=>{z.length>0&&0===g.length&&u(z)},[z.length]),!p)return(0,r.jsxs)("div",{className:"page-center",children:[(0,r.jsx)("h2",{children:"Mapping not found"}),(0,r.jsx)("button",{className:"btn btn-primary",onClick:()=>a.push("/pages"),children:"Back to Pages"})]});s(p.targetPageId);let I=g.length>0?g:z,P=(e,r,t)=>{h(n=>({...n,[e]:{...n[e]||{parentId:null,role:"none"},[r]:t}}))},T=()=>{k.trim()&&(d(p.id,{label:k.trim()}),j(!1))},A=(e,r)=>{0!==b.size&&h(t=>{let n={...t};return b.forEach(t=>{n[t]={...n[t]||{parentId:null,role:"none"},[e]:r}}),n})},E=e=>c(p.targetPageId,e.id,p.targetFieldName)||`Entry #${e.id}`,L=I.filter(e=>E(e).toLowerCase().includes(f.toLowerCase())),M=()=>{S.current=null,C(null)},R=(e=null)=>(b.size>0?I.filter(e=>b.has(e.id)):I).filter(r=>{let t=x[r.id],n=t?.parentId||null,i=e=>""===e||void 0===e?null:Number(e);return i(b.size>0&&n&&!b.has(Number(n))?null:n)===i(e)}).map(e=>{let t=x[e.id]||{},n=N===e.id;return(0,r.jsxs)("div",{className:"tree-node",onDragOver:r=>{var t;return t=e.id,void(r.preventDefault(),r.dataTransfer.dropEffect="move",t!==S.current&&C(t))},onDrop:r=>((e,r)=>{e.preventDefault();let t=S.current;if(!t||t===r){S.current=null,C(null);return}u(e=>{let n=[...e],i=n.findIndex(e=>e.id===t),a=n.findIndex(e=>e.id===r);if(-1===i||-1===a)return e;let[l]=n.splice(i,1);return n.splice(a,0,l),n}),S.current=null,C(null)})(r,e.id),children:[(0,r.jsxs)("div",{className:`tree-node-content ${n?"drag-over":""}`,draggable:!0,onDragStart:r=>{S.current=e.id,r.dataTransfer.effectAllowed="move"},onDragEnd:M,children:[(0,r.jsx)("span",{className:"drag-handle",title:"Drag to reorder",children:"⠿"}),(0,r.jsx)("span",{className:"node-icon",children:"📄"}),(0,r.jsxs)("span",{className:`node-name ${"primary"===t.role?"role-primary":""} ${"leaf"===t.role?"role-leaf":""}`,children:[E(e),t.role&&"none"!==t.role&&(0,r.jsxs)("span",{className:"node-role",children:["(",t.role,")"]})]})]}),(0,r.jsx)("div",{className:"tree-children",children:R(e.id)})]},e.id)});return(0,r.jsxs)("div",{className:"hierarchy-manager animate-fade-in-up",children:[(0,r.jsxs)("div",{className:"view-header",style:{marginBottom:"32px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,r.jsxs)("div",{children:[v?(0,r.jsx)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:(0,r.jsx)("input",{className:"form-input",style:{fontSize:"24px",fontWeight:"bold",height:"42px",padding:"0 12px"},value:k,onChange:e=>w(e.target.value),onBlur:T,onKeyDown:e=>"Enter"===e.key&&T(),autoFocus:!0})}):(0,r.jsxs)("h1",{style:{margin:0,cursor:"pointer",display:"flex",alignItems:"center",gap:"10px"},onClick:()=>j(!0),title:"Click to rename",children:[p.label||"Hierarchy Management",(0,r.jsx)("span",{style:{fontSize:"14px",opacity:.5},children:"✏️"})]}),(0,r.jsxs)("p",{style:{color:"var(--text-secondary)",marginTop:"4px"},children:["Page: ",(0,r.jsx)("strong",{children:p.targetPageName})," | Field: ",(0,r.jsx)("strong",{children:p.targetFieldName})]})]}),(0,r.jsxs)("div",{style:{display:"flex",gap:"12px"},children:[(0,r.jsx)("button",{className:"btn btn-outline",onClick:()=>a.push("/pages"),children:"Cancel"}),(0,r.jsx)("button",{className:"btn btn-primary",onClick:()=>{d(p.id,{hierarchy:x,selectedIds:Array.from(b)}),alert("Hierarchy saved successfully!"),a.push("/pages")},children:"Save Hierarchy"})]})]}),(0,r.jsxs)("div",{className:"hierarchy-grid",children:[(0,r.jsx)("div",{className:"hierarchy-form-section",children:(0,r.jsxs)("div",{className:"card",children:[(0,r.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},children:[(0,r.jsx)("h3",{children:"Configure Entries"}),(0,r.jsx)("div",{style:{display:"flex",gap:"8px"},children:(0,r.jsx)("input",{type:"text",className:"form-input",placeholder:"Search entries...",value:f,onChange:e=>m(e.target.value),style:{width:"200px"}})})]}),b.size>0&&(0,r.jsxs)("div",{className:"bulk-actions-bar animate-fade-in-down",children:[(0,r.jsxs)("div",{className:"bulk-info",children:[(0,r.jsx)("strong",{children:b.size})," selected"]}),(0,r.jsxs)("div",{className:"bulk-controls",children:[(0,r.jsxs)("select",{className:"form-input form-input-sm",onChange:e=>A("parentId",e.target.value),value:"",children:[(0,r.jsx)("option",{value:"",disabled:!0,children:"Set Parent for all..."}),(0,r.jsx)("option",{value:"",children:"None (Root)"}),I.map(e=>(0,r.jsx)("option",{value:e.id,children:E(e)},e.id))]}),(0,r.jsxs)("select",{className:"form-input form-input-sm",onChange:e=>A("role",e.target.value),value:"",children:[(0,r.jsx)("option",{value:"",disabled:!0,children:"Set Role for all..."}),(0,r.jsx)("option",{value:"none",children:"Standard"}),(0,r.jsx)("option",{value:"primary",children:"Primary"}),(0,r.jsx)("option",{value:"leaf",children:"Leaf"})]}),(0,r.jsx)("button",{className:"btn btn-ghost btn-sm",onClick:()=>y(new Set),children:"Clear"})]})]}),(0,r.jsxs)("div",{className:"entries-config-header",children:[(0,r.jsxs)("label",{className:"checkbox-container",children:[(0,r.jsx)("input",{type:"checkbox",checked:L.length>0&&b.size===L.length,onChange:()=>{b.size===L.length?y(new Set):y(new Set(L.map(e=>e.id)))}}),(0,r.jsx)("span",{className:"checkmark"})]}),(0,r.jsx)("span",{style:{fontSize:"11px",fontWeight:"bold",color:"var(--text-secondary)"},children:"SELECT ALL"})]}),(0,r.jsx)("div",{className:"entries-config-list",children:L.map(e=>{let t=x[e.id]||{parentId:"",role:"none"};return(0,r.jsxs)("div",{className:"entry-config-row",children:[(0,r.jsxs)("div",{className:"entry-identity",children:[(0,r.jsxs)("label",{className:"checkbox-container",children:[(0,r.jsx)("input",{type:"checkbox",checked:b.has(e.id),onChange:()=>{var r;let t;return r=e.id,void((t=new Set(b)).has(r)?t.delete(r):t.add(r),y(t))}}),(0,r.jsx)("span",{className:"checkmark"})]}),(0,r.jsx)("strong",{children:E(e)})]}),(0,r.jsxs)("div",{className:"entry-controls",children:[(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{children:"Parent"}),(0,r.jsxs)("select",{className:"form-input",value:t.parentId||"",onChange:r=>P(e.id,"parentId",r.target.value),children:[(0,r.jsx)("option",{value:"",children:"None (Root)"}),I.filter(r=>r.id!==e.id).map(e=>(0,r.jsx)("option",{value:e.id,children:E(e)},e.id))]})]}),(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{children:"Role"}),(0,r.jsxs)("select",{className:"form-input",value:t.role||"none",onChange:r=>P(e.id,"role",r.target.value),children:[(0,r.jsx)("option",{value:"none",children:"Standard"}),(0,r.jsx)("option",{value:"primary",children:"Primary"}),(0,r.jsx)("option",{value:"leaf",children:"Leaf"})]})]})]})]},e.id)})})]})}),(0,r.jsx)("div",{className:"hierarchy-preview-section",children:(0,r.jsxs)("div",{className:"card",children:[(0,r.jsxs)("h3",{children:["Hierarchy Preview ",(0,r.jsx)("span",{className:"drag-hint",children:"← Drag items to reorder"})]}),(0,r.jsx)("div",{className:"tree-viz",children:0===I.length?(0,r.jsx)("p",{style:{textAlign:"center",color:"var(--text-secondary)"},children:"No entries found."}):R(null)})]})})]}),(0,r.jsx)("style",{children:`
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
            `})]})}e.s(["default",()=>a])},72632,e=>{"use strict";var r=e.i(9639),t=e.i(73184),n=e.i(98653),i=e.i(35210);function a(e){return(0,r.jsx)(t.Suspense,{fallback:(0,r.jsx)("div",{style:{padding:"2rem"},children:"Loading..."}),children:(0,r.jsx)(n.default,{children:(0,r.jsx)(i.default,{...e})})})}e.s(["default",()=>a])}]);