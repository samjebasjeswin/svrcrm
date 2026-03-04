(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,56417,(e,a,s)=>{a.exports=e.r(28047)},73346,e=>{"use strict";var a=e.i(9639),s=e.i(73184),i=e.i(56417),r=e.i(32591);function n({isEmbedded:e=!1,targetCompanyId:n=null}){let l=(0,i.useRouter)(),{companyId:t}=(0,i.useParams)(),c=n||t,{addInquiry:o,companies:d}=(0,r.useApp)(),p=d.find(e=>e.id===Number(c)),[m,h]=(0,s.useState)({fullName:"",email:"",phone:"",company:"",subject:"",message:"",specifications:"",agreeToPolicy:!1}),[u,x]=(0,s.useState)(!1),g=e=>{let{name:a,value:s,type:i,checked:r}=e.target;h(e=>({...e,[a]:"checkbox"===i?r:s}))};return u?(0,a.jsx)("div",{className:"inquiry-form-container animate-fade-in",children:(0,a.jsxs)("div",{className:"success-message",children:[(0,a.jsx)("div",{className:"success-icon",children:"✓"}),(0,a.jsx)("h2",{children:"Thank You!"}),(0,a.jsx)("p",{children:"Your inquiry has been sent successfully. We typically respond within 24 hours."}),e?(0,a.jsx)("button",{className:"btn btn-primary",onClick:()=>x(!1),children:"Send Another Message"}):(0,a.jsx)("button",{className:"btn btn-primary",onClick:()=>l.push("/"),children:"Back to Home"})]})}):(0,a.jsx)("div",{className:"inquiry-form-wrapper animate-fade-in",children:(0,a.jsxs)("div",{className:"inquiry-form-container",children:[(0,a.jsxs)("div",{className:"inquiry-header",children:[(0,a.jsx)("h1",{children:p?`contactus form of ${p.name}`:"Send Us a Message"}),(0,a.jsx)("p",{children:"Fill out the form below and we'll get back to you shortly"})]}),(0,a.jsxs)("form",{onSubmit:e=>{e.preventDefault(),o(m,c),console.log("Form submitted:",m),x(!0)},className:"premium-form",children:[(0,a.jsxs)("div",{className:"form-row",children:[(0,a.jsxs)("div",{className:"form-group flex-1",children:[(0,a.jsxs)("label",{children:["Full Name ",(0,a.jsx)("span",{className:"required",children:"*"})]}),(0,a.jsx)("input",{type:"text",name:"fullName",value:m.fullName,onChange:g,placeholder:"John Doe",required:!0,className:"form-input"})]}),(0,a.jsxs)("div",{className:"form-group flex-1",children:[(0,a.jsxs)("label",{children:["Email Address ",(0,a.jsx)("span",{className:"required",children:"*"})]}),(0,a.jsx)("input",{type:"email",name:"email",value:m.email,onChange:g,placeholder:"email@domain.com",required:!0,className:"form-input"})]})]}),(0,a.jsxs)("div",{className:"form-row",children:[(0,a.jsxs)("div",{className:"form-group flex-1",children:[(0,a.jsx)("label",{children:"Phone Number (Optional)"}),(0,a.jsx)("input",{type:"tel",name:"phone",value:m.phone,onChange:g,placeholder:"+1 (555) 123-4567",className:"form-input"})]}),(0,a.jsxs)("div",{className:"form-group flex-1",children:[(0,a.jsx)("label",{children:"Company Name (Optional)"}),(0,a.jsx)("input",{type:"text",name:"company",value:m.company,onChange:g,placeholder:"Your Company Ltd",className:"form-input"})]})]}),(0,a.jsxs)("div",{className:"form-group",children:[(0,a.jsx)("label",{children:"Subject (Optional)"}),(0,a.jsx)("input",{type:"text",name:"subject",value:m.subject,onChange:g,placeholder:"Product inquiry, quote request, technical support...",className:"form-input"})]}),(0,a.jsxs)("div",{className:"form-group",children:[(0,a.jsxs)("label",{children:["Message ",(0,a.jsx)("span",{className:"required",children:"*"})]}),(0,a.jsx)("textarea",{name:"message",value:m.message,onChange:g,placeholder:"Tell us about your requirements, specifications, or questions...",required:!0,className:"form-textarea",rows:"5"}),(0,a.jsxs)("div",{className:"char-count",children:[m.message.length," characters"]})]}),(0,a.jsxs)("div",{className:"form-group technical-specs",children:[(0,a.jsx)("label",{children:"Technical Specifications (Optional)"}),(0,a.jsx)("p",{className:"field-hint",children:"Help us serve you better by providing technical details (size, material, temperature, etc.)"}),(0,a.jsx)("textarea",{name:"specifications",value:m.specifications,onChange:g,placeholder:"Size, pressure rating, material, temperature range, connection type, etc.",className:"form-textarea",rows:"3"})]}),(0,a.jsxs)("div",{className:"form-group checkbox-group",children:[(0,a.jsx)("input",{type:"checkbox",id:"agreeToPolicy",name:"agreeToPolicy",checked:m.agreeToPolicy,onChange:g,required:!0}),(0,a.jsxs)("label",{htmlFor:"agreeToPolicy",children:["I agree to the privacy policy and consent to the processing of my personal data. ",(0,a.jsx)("span",{className:"required",children:"*"})]})]}),(0,a.jsxs)("div",{className:"form-actions",children:[(0,a.jsx)("button",{type:"submit",className:"btn btn-primary btn-large",children:"Send Inquiry"}),(0,a.jsx)("p",{className:"form-note",children:"* Required fields. We typically respond within 24 hours."})]})]})]})})}function l(){let{companyId:e}=(0,i.useParams)(),s=(0,i.useRouter)(),{companies:l,pages:t,getPageEntries:c}=(0,r.useApp)(),o=l.find(a=>a.id===Number(e)),d=t[e]||[];return o?(0,a.jsxs)("div",{className:"public-profile-wrapper animate-fade-in",children:[(0,a.jsx)("header",{className:"public-hero",children:(0,a.jsxs)("div",{className:"container",children:[(0,a.jsx)("div",{className:"company-badge-large",children:o.initials}),(0,a.jsx)("h1",{children:o.name}),(0,a.jsx)("p",{className:"company-tagline",children:"Official Business Profile & Product Catalogs"})]})}),(0,a.jsx)("main",{className:"container public-content",children:(0,a.jsxs)("div",{className:"profile-grid",children:[(0,a.jsxs)("section",{className:"catalog-section",children:[(0,a.jsxs)("div",{className:"section-header",children:[(0,a.jsx)("h2",{children:"Our Product Catalogs"}),(0,a.jsx)("p",{children:"Explore our latest offerings and technical specifications"})]}),(0,a.jsxs)("div",{className:"public-catalog-grid",children:[d.map(s=>{let i=c?c(s.id,e).length:0;return(0,a.jsxs)("div",{className:"catalog-card card",children:[(0,a.jsx)("div",{className:"catalog-icon",children:"📦"}),(0,a.jsxs)("div",{className:"catalog-info",children:[(0,a.jsx)("h3",{children:s.name}),(0,a.jsxs)("p",{children:[i," ",1===i?"Product":"Products"," Available"]})]}),(0,a.jsx)("button",{className:"btn btn-outline btn-sm",disabled:!0,children:"View Details"})]},s.id)}),0===d.length&&(0,a.jsx)("div",{className:"empty-catalog",children:(0,a.jsx)("p",{children:"No catalogs are currently public."})})]})]}),(0,a.jsx)("aside",{className:"contact-sidebar",children:(0,a.jsx)("div",{className:"sticky-sidebar",children:(0,a.jsx)(n,{isEmbedded:!0,targetCompanyId:e})})})]})}),(0,a.jsx)("footer",{className:"public-footer",children:(0,a.jsx)("div",{className:"container",children:(0,a.jsxs)("p",{children:["© ",new Date().getFullYear()," ",o.name,". Powered by Antigravity CRM."]})})}),(0,a.jsx)("style",{children:`
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
            `})]}):(0,a.jsxs)("div",{className:"error-container",style:{textAlign:"center",padding:"100px 20px"},children:[(0,a.jsx)("h1",{style:{fontSize:"64px",marginBottom:"20px"},children:"404"}),(0,a.jsx)("h2",{children:"Company Not Found"}),(0,a.jsx)("p",{style:{color:"var(--text-muted)"},children:"The company profile you are looking for does not exist or has been removed."}),(0,a.jsx)("button",{className:"btn btn-primary",style:{marginTop:"24px"},onClick:()=>s.push("/"),children:"Return to Portal"})]})}function t(e){return(0,a.jsx)(s.Suspense,{fallback:(0,a.jsx)("div",{style:{padding:"2rem"},children:"Loading..."}),children:(0,a.jsx)(l,{...e})})}e.s(["default",()=>t],73346)}]);