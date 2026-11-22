
<template>
<router-view />
</template>

  <main class ="content">
  </main>


<script setup>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Hero from './components/Hero.vue';
</script>

<style>
body{
    margin:0;
    background:#09090b;
    font-family:Inter,sans-serif;
}
html[lang='fa'] body,
html[lang='fa'] body *:not(i):not(svg):not(path){
    font-family:'Vazirmatn',Inter,Tahoma,sans-serif;
}
html[lang='fa'] .header{
    direction:ltr;
}
html[lang='fa'] .header .nav{
    direction:rtl;
}
html[lang='fa'] .header .actions{
    direction:ltr;
}
html[lang='fa'] .header .search-input{
    direction:rtl;
    text-align:right;
}
:is(html[lang='en'],html[lang='tr'],html[lang='de']) .header{
    direction:ltr;
    flex-direction:row;
    justify-content:space-between;
}
:is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .logo{
    order:0;
    justify-content:flex-start;
}
:is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .nav{
    order:1;
}
:is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .actions{
    order:2;
    direction:ltr;
    width:auto;
    min-width:0;
    flex:0 0 auto;
    flex-wrap:nowrap;
    justify-content:flex-end;
    gap:8px;
}
:is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .search-wrapper{
    position:relative;
    width:42px;
    height:42px;
    flex:0 0 42px;
    transition:width .3s ease;
}
:is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .search-wrapper.open{
    width:clamp(68px,calc(100vw - 320px),260px);
    height:42px;
    flex:0 1 clamp(68px,calc(100vw - 320px),260px);
}
:is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .search-input{
    position:absolute;
    inset:0;
    box-sizing:border-box;
    width:100%;
    height:100%;
    padding:0;
    opacity:0;
    pointer-events:none;
    direction:ltr;
    text-align:left;
}
:is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .search-wrapper.open .search-input{
    width:100%;
    height:100%;
    padding:0 52px 0 12px;
    opacity:1;
    pointer-events:auto;
    border:1px solid rgba(155,92,255,.25);
}
:is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .search{
    position:absolute;
    top:0;
    right:0;
    width:42px;
    height:42px;
    transform:none;
}
:is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .search-wrapper.open .search{
    transform:rotate(360deg);
}
.container{
    width:92%;
    margin:auto;
}
@media (max-width:768px){
    :is(html[lang='en'],html[lang='tr'],html[lang='de']) .header{
        height:auto;
        min-height:72px;
        padding:14px 16px;
        flex-wrap:wrap;
        gap:14px;
    }
    :is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .nav{
        order:3;
    }
    :is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .actions{
        margin-left:auto;
    }
    :is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .search-wrapper{
        width:38px;
        height:38px;
        flex-basis:38px;
    }
    :is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .search-wrapper.open{
        width:clamp(68px,calc(100vw - 320px),220px);
        height:38px;
        flex-basis:clamp(68px,calc(100vw - 320px),220px);
    }
    :is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .search{
        width:38px;
        height:38px;
    }
}
@media (max-width:480px){
    :is(html[lang='en'],html[lang='tr'],html[lang='de']) .header{
        align-items:center;
        padding:12px 10px;
        gap:8px;
    }
    :is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .logo{
        flex:0 0 auto;
    }
    :is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .actions{
        width:auto;
        margin-left:auto;
    }
    :is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .search-wrapper{
        width:38px;
        height:38px;
        flex-basis:38px;
    }
    :is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .search-wrapper.open{
        width:clamp(68px,calc(100vw - 320px),180px);
        height:38px;
        flex-basis:clamp(68px,calc(100vw - 320px),180px);
    }
    :is(html[lang='en'],html[lang='tr'],html[lang='de']) .header .search{
        width:38px;
        height:38px;
    }
    html[lang='fa'] .header{
        box-sizing:border-box;
        width:100%;
        min-width:0;
        flex-direction:row;
        flex-wrap:nowrap;
        align-items:center;
        gap:8px;
        padding:12px 10px;
    }
    html[lang='fa'] .header .logo{
        flex:0 0 auto;
        justify-content:flex-start;
        gap:6px;
        font-size:16px;
    }
    html[lang='fa'] .header .logo-icon{
        width:26px;
        height:26px;
    }
    html[lang='fa'] .header .actions{
        width:auto;
        min-width:0;
        margin-left:auto;
        justify-content:flex-end;
        gap:4px;
    }
    html[lang='fa'] .header .search-wrapper.open{
        flex:0 1 auto;
        width:clamp(68px,calc(100vw - 330px),145px);
        height:38px;
    }
    html[lang='fa'] .header .search-wrapper.open .search-input{
        box-sizing:border-box;
        width:100%;
        height:38px;
        padding:0 44px 0 10px;
        opacity:1;
        pointer-events:auto;
        border:1px solid rgba(155,92,255,.2);
    }
    html[lang='fa'] .header .search-wrapper.open .search{
        position:absolute;
        top:0;
        right:0;
        width:38px;
        height:38px;
        transform:none;
    }
    html[lang='fa'] .header .search-wrapper:not(.open),
    html[lang='fa'] .header .search-wrapper:not(.open) .search{
        width:34px;
        height:38px;
    }
    html[lang='fa'] .header .search-wrapper:not(.open){
        flex:0 0 34px;
    }
    html[lang='fa'] .header .login{
        width:46px;
        flex:0 0 46px;
    }
    html[lang='fa'] .header .signup{
        width:58px;
        flex:0 0 58px;
    }
    html[lang='fa'] .header .login,
    html[lang='fa'] .header .signup{
        height:38px;
        white-space:nowrap;
        font-size:11px;
    }
}
</style>