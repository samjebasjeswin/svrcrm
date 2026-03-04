module.exports=[56704,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},20635,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},32319,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},43589,(a,b,c)=>{"use strict";b.exports=a.r(41254).vendored.contexts.AppRouterContext},16482,(a,b,c)=>{"use strict";b.exports=a.r(41254).vendored.contexts.HooksClientContext},565,(a,b,c)=>{"use strict";b.exports=a.r(41254).vendored.contexts.ServerInsertedHtml},57663,a=>{"use strict";var b=a.i(62343),c=a.i(68827),d=a.i(90076),e=a.i(95678);function f({isEmbedded:a=!1,targetCompanyId:f=null}){let g=(0,d.useRouter)(),{companyId:h}=(0,d.useParams)(),i=f||h,{addInquiry:j,companies:k}=(0,e.useApp)(),l=k.find(a=>a.id===Number(i)),[m,n]=(0,c.useState)({fullName:"",email:"",phone:"",company:"",subject:"",message:"",specifications:"",agreeToPolicy:!1}),[o,p]=(0,c.useState)(!1),q=a=>{let{name:b,value:c,type:d,checked:e}=a.target;n(a=>({...a,[b]:"checkbox"===d?e:c}))};return o?(0,b.jsx)("div",{className:"inquiry-form-container animate-fade-in",children:(0,b.jsxs)("div",{className:"success-message",children:[(0,b.jsx)("div",{className:"success-icon",children:"✓"}),(0,b.jsx)("h2",{children:"Thank You!"}),(0,b.jsx)("p",{children:"Your inquiry has been sent successfully. We typically respond within 24 hours."}),a?(0,b.jsx)("button",{className:"btn btn-primary",onClick:()=>p(!1),children:"Send Another Message"}):(0,b.jsx)("button",{className:"btn btn-primary",onClick:()=>g.push("/"),children:"Back to Home"})]})}):(0,b.jsx)("div",{className:"inquiry-form-wrapper animate-fade-in",children:(0,b.jsxs)("div",{className:"inquiry-form-container",children:[(0,b.jsxs)("div",{className:"inquiry-header",children:[(0,b.jsx)("h1",{children:l?`contactus form of ${l.name}`:"Send Us a Message"}),(0,b.jsx)("p",{children:"Fill out the form below and we'll get back to you shortly"})]}),(0,b.jsxs)("form",{onSubmit:a=>{a.preventDefault(),j(m,i),console.log("Form submitted:",m),p(!0)},className:"premium-form",children:[(0,b.jsxs)("div",{className:"form-row",children:[(0,b.jsxs)("div",{className:"form-group flex-1",children:[(0,b.jsxs)("label",{children:["Full Name ",(0,b.jsx)("span",{className:"required",children:"*"})]}),(0,b.jsx)("input",{type:"text",name:"fullName",value:m.fullName,onChange:q,placeholder:"John Doe",required:!0,className:"form-input"})]}),(0,b.jsxs)("div",{className:"form-group flex-1",children:[(0,b.jsxs)("label",{children:["Email Address ",(0,b.jsx)("span",{className:"required",children:"*"})]}),(0,b.jsx)("input",{type:"email",name:"email",value:m.email,onChange:q,placeholder:"email@domain.com",required:!0,className:"form-input"})]})]}),(0,b.jsxs)("div",{className:"form-row",children:[(0,b.jsxs)("div",{className:"form-group flex-1",children:[(0,b.jsx)("label",{children:"Phone Number (Optional)"}),(0,b.jsx)("input",{type:"tel",name:"phone",value:m.phone,onChange:q,placeholder:"+1 (555) 123-4567",className:"form-input"})]}),(0,b.jsxs)("div",{className:"form-group flex-1",children:[(0,b.jsx)("label",{children:"Company Name (Optional)"}),(0,b.jsx)("input",{type:"text",name:"company",value:m.company,onChange:q,placeholder:"Your Company Ltd",className:"form-input"})]})]}),(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsx)("label",{children:"Subject (Optional)"}),(0,b.jsx)("input",{type:"text",name:"subject",value:m.subject,onChange:q,placeholder:"Product inquiry, quote request, technical support...",className:"form-input"})]}),(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsxs)("label",{children:["Message ",(0,b.jsx)("span",{className:"required",children:"*"})]}),(0,b.jsx)("textarea",{name:"message",value:m.message,onChange:q,placeholder:"Tell us about your requirements, specifications, or questions...",required:!0,className:"form-textarea",rows:"5"}),(0,b.jsxs)("div",{className:"char-count",children:[m.message.length," characters"]})]}),(0,b.jsxs)("div",{className:"form-group technical-specs",children:[(0,b.jsx)("label",{children:"Technical Specifications (Optional)"}),(0,b.jsx)("p",{className:"field-hint",children:"Help us serve you better by providing technical details (size, material, temperature, etc.)"}),(0,b.jsx)("textarea",{name:"specifications",value:m.specifications,onChange:q,placeholder:"Size, pressure rating, material, temperature range, connection type, etc.",className:"form-textarea",rows:"3"})]}),(0,b.jsxs)("div",{className:"form-group checkbox-group",children:[(0,b.jsx)("input",{type:"checkbox",id:"agreeToPolicy",name:"agreeToPolicy",checked:m.agreeToPolicy,onChange:q,required:!0}),(0,b.jsxs)("label",{htmlFor:"agreeToPolicy",children:["I agree to the privacy policy and consent to the processing of my personal data. ",(0,b.jsx)("span",{className:"required",children:"*"})]})]}),(0,b.jsxs)("div",{className:"form-actions",children:[(0,b.jsx)("button",{type:"submit",className:"btn btn-primary btn-large",children:"Send Inquiry"}),(0,b.jsx)("p",{className:"form-note",children:"* Required fields. We typically respond within 24 hours."})]})]})]})})}function g(){let{companyId:a}=(0,d.useParams)(),c=(0,d.useRouter)(),{companies:g,pages:h,getPageEntries:i}=(0,e.useApp)(),j=g.find(b=>b.id===Number(a)),k=h[a]||[];return j?(0,b.jsxs)("div",{className:"public-profile-wrapper animate-fade-in",children:[(0,b.jsx)("header",{className:"public-hero",children:(0,b.jsxs)("div",{className:"container",children:[(0,b.jsx)("div",{className:"company-badge-large",children:j.initials}),(0,b.jsx)("h1",{children:j.name}),(0,b.jsx)("p",{className:"company-tagline",children:"Official Business Profile & Product Catalogs"})]})}),(0,b.jsx)("main",{className:"container public-content",children:(0,b.jsxs)("div",{className:"profile-grid",children:[(0,b.jsxs)("section",{className:"catalog-section",children:[(0,b.jsxs)("div",{className:"section-header",children:[(0,b.jsx)("h2",{children:"Our Product Catalogs"}),(0,b.jsx)("p",{children:"Explore our latest offerings and technical specifications"})]}),(0,b.jsxs)("div",{className:"public-catalog-grid",children:[k.map(c=>{let d=i?i(c.id,a).length:0;return(0,b.jsxs)("div",{className:"catalog-card card",children:[(0,b.jsx)("div",{className:"catalog-icon",children:"📦"}),(0,b.jsxs)("div",{className:"catalog-info",children:[(0,b.jsx)("h3",{children:c.name}),(0,b.jsxs)("p",{children:[d," ",1===d?"Product":"Products"," Available"]})]}),(0,b.jsx)("button",{className:"btn btn-outline btn-sm",disabled:!0,children:"View Details"})]},c.id)}),0===k.length&&(0,b.jsx)("div",{className:"empty-catalog",children:(0,b.jsx)("p",{children:"No catalogs are currently public."})})]})]}),(0,b.jsx)("aside",{className:"contact-sidebar",children:(0,b.jsx)("div",{className:"sticky-sidebar",children:(0,b.jsx)(f,{isEmbedded:!0,targetCompanyId:a})})})]})}),(0,b.jsx)("footer",{className:"public-footer",children:(0,b.jsx)("div",{className:"container",children:(0,b.jsxs)("p",{children:["© ",new Date().getFullYear()," ",j.name,". Powered by Antigravity CRM."]})})}),(0,b.jsx)("style",{children:`
                .public-profile-wrapper {
                    min-height: 100vh;
                    background: #f8fafc;
                }
                .public-hero {
                    background: linear-gradient(135deg, var(--primary) 0%, #312e81 100%);
                    color: white;
                    padding: 80px 0;
                    text-align: center;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                }
                .company-badge-large {
                    width: 100px;
                    height: 100px;
                    background: rgba(255,255,255,0.2);
                    backdrop-filter: blur(10px);
                    border: 2px solid rgba(255,255,255,0.4);
                    border-radius: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 36px;
                    font-weight: 800;
                    margin: 0 auto 24px;
                }
                .public-hero h1 {
                    font-size: 48px;
                    font-weight: 800;
                    margin: 0 0 12px;
                    letter-spacing: -0.02em;
                }
                .company-tagline {
                    font-size: 18px;
                    opacity: 0.8;
                }
                .public-content {
                    padding: 64px 24px;
                }
                .profile-grid {
                    display: grid;
                    grid-template-columns: 1fr 400px;
                    gap: 48px;
                }
                @media (max-width: 900px) {
                    .profile-grid {
                        grid-template-columns: 1fr;
                    }
                }
                .section-header {
                    margin-bottom: 32px;
                }
                .section-header h2 {
                    font-size: 32px;
                    font-weight: 700;
                    margin-bottom: 8px;
                }
                .public-catalog-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 24px;
                }
                .catalog-card {
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 16px;
                    transition: transform 0.2s;
                }
                .catalog-card:hover {
                    transform: translateY(-4px);
                }
                .catalog-icon {
                    font-size: 32px;
                    background: rgba(79, 70, 229, 0.1);
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 16px;
                }
                .catalog-info h3 {
                    font-size: 20px;
                    font-weight: 700;
                    margin-bottom: 4px;
                }
                .catalog-info p {
                    color: var(--text-muted);
                    font-size: 14px;
                }
                .sticky-sidebar {
                    position: sticky;
                    top: 40px;
                }
                .public-footer {
                    padding: 40px 0;
                    border-top: 1px solid var(--border);
                    text-align: center;
                    color: var(--text-muted);
                    font-size: 14px;
                }
            `})]}):(0,b.jsxs)("div",{className:"error-container",style:{textAlign:"center",padding:"100px 20px"},children:[(0,b.jsx)("h1",{style:{fontSize:"64px",marginBottom:"20px"},children:"404"}),(0,b.jsx)("h2",{children:"Company Not Found"}),(0,b.jsx)("p",{style:{color:"var(--text-muted)"},children:"The company profile you are looking for does not exist or has been removed."}),(0,b.jsx)("button",{className:"btn btn-primary",style:{marginTop:"24px"},onClick:()=>c.push("/"),children:"Return to Portal"})]})}function h(a){return(0,b.jsx)(c.Suspense,{fallback:(0,b.jsx)("div",{style:{padding:"2rem"},children:"Loading..."}),children:(0,b.jsx)(g,{...a})})}a.s(["default",()=>h],57663)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__c3f82597._.js.map