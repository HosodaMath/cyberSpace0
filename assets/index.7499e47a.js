var f=Object.defineProperty;var m=(e,t,r)=>t in e?f(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var s=(e,t,r)=>(m(e,typeof t!="symbol"?t+"":t,r),r);import{P as y}from"./vendor.6c0cdefa.js";const p=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}};p();class a{constructor(t,r,o){s(this,"x");s(this,"y");s(this,"z");this.x=t,this.y=r,this.z=o}toString(){return`(${this.x}, ${this.y}, ${this.z})`}set(t,r,o){return this.x=t,this.y=r,this.z=o,new a(this.x,this.y,this.z)}copy(){return new a(this.x,this.y,this.z)}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}mult(t){return this.x*=t,this.y*=t,this.z*=t,this}div(t){return this.x/=t,this.y/=t,this.z/=t,this}static add(t,r){return new a(t.x+r.x,t.y+r.y,t.z+r.z)}static mult(t,r){return new a(t.x*r,t.y*r,t.z*r)}static div(t,r){return new a(t.x/r,t.y/r,t.z/r)}}class v{constructor(t,r,o,n){s(this,"p");s(this,"position");s(this,"velocity");s(this,"acceleration");s(this,"mass");s(this,"text");this.p=t,this.position=r,this.velocity=new a(0,0,0),this.acceleration=new a(0,0,0),this.mass=o,this.text=n}applyForce(t){const r=a.div(t,this.mass);this.acceleration.add(r)}update(){this.velocity.add(this.acceleration),this.position.add(this.velocity),this.acceleration.mult(0)}draw(){this.p.push(),this.p.fill(this.p.color(150,255,150,255)),this.p.translate(this.position.x,this.position.y,this.position.z),this.p.text(this.text,0,0),this.p.pop()}isCheckEdge(){const t=this.p.width*.5;this.position.x<-t?(this.position.x=-t,this.velocity.x*=-1):this.position.x>t&&(this.position.x=t,this.velocity.x*=-1)}isRemove(){return this.position.y<this.p.height*.5}}class g{constructor(t){s(this,"p");s(this,"particlesText");this.p=t,this.particlesText=[]}addTextParticle(){const t=this.p.random(-this.p.width*.5,this.p.width*.5),r=-this.p.height*.5,o=0,n=new a(t,r,o),i=1,c=["0","1"],h=this.p.floor(this.p.random(0,c.length)),u=c[h],x=new v(this.p,n,i,u);this.particlesText.push(x)}update(){this.p.frameCount%12==1&&this.addTextParticle();const t=new a(0,.01,0);for(const r of this.particlesText)r.applyForce(t),r.update();this.particlesText=this.particlesText.filter(r=>r.isRemove())}draw(){for(const t of this.particlesText)t.draw(),t.isCheckEdge()}}const z=(e,t,r)=>{const o=e.frameCount*.05;e.push(),e.translate(-e.width*.5,-e.height*.5),e.shader(t),t.setUniform("uResolution",[e.width,e.height]),t.setUniform("uTime",o),e.rect(0,0,e.width,e.height),e.resetShader(),e.pop(),r.update(),r.draw()};var b="./assets/kenpixel.fd422260.ttf",w=`attribute vec3 aPosition;\r
attribute vec2 aTexCoord;\r
\r
uniform mat4 uProjectionMatrix;\r
uniform mat4 uModelViewMatrix;\r
\r
varying vec2 vTexCoord;\r
\r
void main(){\r
  vTexCoord = aTexCoord;\r
\r
  vec4 positionVec4 = vec4(aPosition, 1.0);\r
\r
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\r
}`,C=`// \u5E73\u884C\u5149\u6E90\u3068\u30EC\u30A4\u30DE\u30FC\u30C1\u3067\u7403\u4F53\u3068Box\u3092\u63CF\u304F\r
precision highp float;\r
precision highp int;\r
uniform vec2 uResolution;\r
uniform vec2 uMouse;\r
uniform float uTime;\r
varying vec2 vTexCoord;\r
const float PI = 3.141592653589793;\r
const float PI2 = 6.28318530718;\r
\r
\r
/*\r
  \u7E70\u308A\u8FD4\u3057\r
*/\r
vec3 map(vec3 position){\r
  return mod(position, 5.0) - 2.5;\r
}\r
\r
/*\r
  sphere\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u307E\u3067\u306E\u6700\u77ED\u8DDD\u96E2\u3092\u6C42\u3081\u308B\r
  \u7403\u4F53\u306F\u3069\u306E\u65B9\u5411\u304B\u3089\u898B\u3066\u3082\u5909\u308F\u3089\u306A\u3044\r
  \u30AB\u30E1\u30E9\u3067\u898B\u308B\u306E\u3067\u30AB\u30E1\u30E9\u304C\u7F6E\u304B\u308C\u3066\u3044\u308B\u5EA7\u6A19\u3092\u5165\u308C\u308B\r
  \u7403\u4F53\u306E\u5927\u304D\u3055\u30921.0\u3068\u3057\u3066\u30AB\u30E1\u30E9\u306E\u4F4D\u7F6E\u30923.0\u3068\u3057\u3066\u8A08\u7B97\u3059\u308B\u3068\u3002\r
  3.0 - 1.0 = 2.0\u3068\u306A\u308B\u3002\r
  \u7403\u4F53\u3068\u30AB\u30E1\u30E9\u306E\u6700\u77ED\u8DDD\u96E2\u306F2.0\u3068\u306A\u308B\u3002\r
*/\r
float sphere(vec3 position, float sphereSize){\r
  return length(map(position)) - sphereSize;\r
}\r
\r
float box(vec3 position, vec3 boxSize){\r
  vec3 d = abs(map(position)) - boxSize;\r
\r
  return length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0);\r
}\r
\r
/*\r
  \u6CD5\u7DDA\u3092\u6C42\u3081\u308B\r
*/\r
vec3 calcNormal(vec3 rayPosition, vec3 boxSize ){\r
  float d = 0.0001;\r
  float x = box(rayPosition + vec3(d, 0.0, 0.0), boxSize) - box(rayPosition + vec3(-d, 0.0, 0.0), boxSize);\r
  float y = box(rayPosition + vec3(0.0, d, 0.0), boxSize) - box(rayPosition + vec3(0.0, -d, 0.0), boxSize);\r
  float z = box(rayPosition + vec3(0.0, 0.0, d), boxSize) - box(rayPosition + vec3(0.0, 0.0, -d), boxSize);\r
  vec3 normal = normalize(vec3(x, y, z));\r
  return normal;\r
}\r
\r
void main(void){\r
  // vec2 coord = vTexCoord;\r
  vec2 coord = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);\r
  \r
  // \u30AB\u30E1\u30E9\u306E\u4F4D\u7F6E\r
  vec3 cameraPosition = vec3(0.0, 0.0, 2.0);\r
  \r
  // \u30AB\u30E1\u30E9\u306E\u5411\u304D\r
  // z\u304C\u30DE\u30A4\u30CA\u30B9\u306B\u306A\u3063\u3066\u3044\u308B\r
  vec3 cameraDirection = vec3(0.0, 0.0, -1.0);\r
  \r
  // \u30AB\u30E1\u30E9\u306E\u4E0A\u65B9\u5411\r
  vec3 cameraUp = vec3(0.0, 1.0, 0.0);\r
  \r
  // \u6A2A\u65B9\u5411\u306E\u7B97\u51FA\r
  // \u30AB\u30E1\u30E9\u306E\u5411\u304D\u3068\u30AB\u30E1\u30E9\u306E\u4E0A\u65B9\u5411\u304B\u3089\u7B97\u51FA\r
  vec3 cameraSide = cross(cameraDirection, cameraUp);\r
  \r
  // \u30D5\u30A9\u30FC\u30AB\u30B9\u306E\u6DF1\u5EA6\r
  float targetDepth = 0.1;\r
  \r
  // \u8996\u91CE\u89D2 field of view\r
  const float angle = 60.0;\r
  const float fov = angle * 0.5 * PI / 180.0;\r
\r
  // \u8996\u91CE\u89D2\u3092\u8003\u616E\u3057\u305Fray\u3092\u6C42\u3081\u308B\r
  float x = sin(fov) * coord.x;\r
  float y = sin(fov) * coord.y;\r
  float z = -cos(fov);\r
  vec3 ray = normalize(vec3(x, y, z));\r
\r
  const int rayLoopMax = 64;\r
  \r
  // \u7403\u4F53\u3068Box\u306E\u5927\u304D\u3055\r
  const float sphereSize = 1.0;\r
\r
  float size = abs(sin(uTime * 0.25));\r
  vec3 boxSize = vec3(size, size, size);\r
  \r
  // \u8DDD\u96E2\r
  float objectDistance = 0.0;\r
\r
  // ray\u306E\u9577\u3055\r
  float rayLength = 0.0;\r
  \r
  // ray\u306E\u521D\u671F\u4F4D\u7F6E\u306F\u30AB\u30E1\u30E9\u306E\u4F4D\u7F6E\u3068\u540C\u3058\r
  vec3 rayPosition = cameraPosition;\r
  \r
  // ray\u3092\u4F38\u3070\u3057\u3066\u3044\u304F\r
  for(int rayLoop = 0; rayLoop < rayLoopMax; rayLoop++){\r
    // ray\u306E\u4F4D\u7F6E\u304B\u3089\u8DDD\u96E2\u3092\u6C42\u3081\u308B\r
    objectDistance = box(rayPosition, boxSize);\r
    // ray\u306E\u9577\u3055\r
    // rayLength += objectDistance1;\r
    rayLength += objectDistance;\r
    // ray\u306E\u4F4D\u7F6E\u3092\u6C42\u3081\u308B\r
    // ray * ray\u306E\u9577\u3055 + \u30AB\u30E1\u30E9\u306E\u4F4D\u7F6E\r
    rayPosition = cameraPosition + ray * rayLength;\r
  }\r
\r
  // \u5E73\u884C\u5149\u6E90\r
  vec3 directionLigth = vec3(-0.5, 0.5, 0.5);\r
\r
  // ray\u306E\u885D\u7A81\u5224\u5B9A\r
  // ray\u304C\u7A81\u304D\u629C\u3051\u305F\u5834\u5408\u30DE\u30A4\u30CA\u30B9\u306B\u306A\u3063\u3066\u3057\u307E\u3046\u305F\u3081abs\u3092\u4F7F\u3044\u7D76\u5BFE\u5024\u306B\u3057\u3066\u3044\u308B\u3002\r
  if(abs(objectDistance) < 0.001){\r
    // \u6CD5\u7DDA\u3092\u6C42\u3081\u308B\r
    vec3 normal = calcNormal(rayPosition, boxSize);\r
    // \u30E9\u30A4\u30C6\u30A3\u30F3\u30B0\r
    float diffuese = clamp(dot(directionLigth, normal), 0.1, 1.0);\r
    vec4 color =  vec4(diffuese, diffuese, diffuese, 1.0);\r
    vec4 bgColor = vec4(0.0, 0.0, 0.1, 1.0);\r
    color += bgColor;\r
    gl_FragColor = color;\r
    //gl_FragColor = vec4(normal, 1.0);\r
  } else {\r
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\r
  }\r
}`;const P=e=>{let t,r,o;e.preload=()=>{t=e.loadFont(b)},e.setup=()=>{e.createCanvas(e.windowWidth,e.windowHeight,e.WEBGL),e.noStroke(),e.pixelDensity(1),e.textFont(t),e.textSize(e.width*.05),e.textAlign(e.CENTER,e.CENTER),r=e.createShader(w,C),o=new g(e)},e.draw=()=>{e.background(0,0,0),z(e,r,o)},e.windowResized=()=>{e.resizeCanvas(e.windowWidth,e.windowHeight)}},S=e=>{const t=document.createElement("button");t.className="fullScreenButton",t.textContent="fullScreen",e.appendChild(t),t.addEventListener("click",()=>{e.requestFullscreen()})},T=e=>{const t=document.createElement("div");t.className="startWindow";const r=document.createElement("h1");r.textContent="Cyber Space0";const o=document.createElement("p");o.textContent="\u30C7\u30B8\u30BF\u30EB\u306A\u4E16\u754C\u89B3\u3092\u63CF\u304D\u307E\u3057\u305F\u3002";const n=document.createElement("button");return n.textContent="Start!!",n.className="startButton",e.appendChild(t),t.appendChild(r),t.appendChild(o),t.appendChild(n),{startWindow:t,startButton:n}};const l=document.body,d=T(l);S(l);d.startButton.addEventListener("click",()=>{l.removeChild(d.startWindow),new y(P)});
