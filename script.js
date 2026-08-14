/* =======================================================
   MUSEU VIRTUAL - PARQUE ESTADUAL DE VILA VELHA
   Desenvolvido por Douglas Fronja
======================================================= */


/* =======================================================
   PRELOADER
======================================================= */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if (preloader) {

        preloader.style.opacity = "0";

        setTimeout(() => {

            preloader.style.display = "none";

        }, 700);

    }

});



/* =======================================================
   HEADER AO ROLAR A PÁGINA
======================================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});



/* =======================================================
   BOTÃO VOLTAR AO TOPO
======================================================= */

const botaoTopo = document.getElementById("topo");

window.addEventListener("scroll", () => {

    if (!botaoTopo) return;

    if (window.scrollY > 500) {

        botaoTopo.style.opacity = "1";

        botaoTopo.style.pointerEvents = "all";

    } else {

        botaoTopo.style.opacity = "0";

        botaoTopo.style.pointerEvents = "none";

    }

});

if (botaoTopo) {

    botaoTopo.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}



/* =======================================================
   ANIMAÇÃO AO APARECER NA TELA
======================================================= */

const elementos = document.querySelectorAll(

    ".fade, .cardMuseu, .formacaoCard, .animalCard, .plantaCard, .curiosidadeCard, .imagemGaleria"

);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

        }

    });

}, {

    threshold: 0.15

});

elementos.forEach(item => observer.observe(item));



/* =======================================================
   CONTADORES ANIMADOS
======================================================= */

const numeros = document.querySelectorAll(".numeroItem h2");

let contadoresExecutados = false;

function animarNumero(elemento) {

    const destino = parseInt(

        elemento.innerText.replace(/\D/g, "")

    );

    let atual = 0;

    const incremento = Math.max(1, Math.ceil(destino / 100));

    const timer = setInterval(() => {

        atual += incremento;

        if (atual >= destino) {

            atual = destino;

            clearInterval(timer);

        }

        elemento.innerText = atual + "+";

    }, 25);

}

window.addEventListener("scroll", () => {

    const secao = document.querySelector(".numeros");

    if (!secao || contadoresExecutados) return;

    const topo = secao.getBoundingClientRect().top;

    if (topo < window.innerHeight - 150) {

        numeros.forEach(animarNumero);

        contadoresExecutados = true;

    }

});
/* =======================================================
   MENU MOBILE
======================================================= */

const menuMobile = document.getElementById("menuMobile");
const menu = document.querySelector("nav");

if (menuMobile && menu) {

    menuMobile.addEventListener("click", () => {

        menu.classList.toggle("ativo");

    });

    document.querySelectorAll("nav a").forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("ativo");

        });

    });

}




/* =======================================================
   QUIZ
======================================================= */

const respostas = document.querySelectorAll(".resposta");
const pontuacao = document.getElementById("pontuacao");
const reiniciarQuiz = document.getElementById("reiniciarQuiz");

let pontos = 0;
let respondidas = [];

respostas.forEach((botao, indice) => {

    botao.addEventListener("click", () => {

        const pergunta = botao.closest(".pergunta");

        const numeroPergunta = [...document.querySelectorAll(".pergunta")].indexOf(pergunta);

        if (respondidas.includes(numeroPergunta)) return;

        respondidas.push(numeroPergunta);

        pergunta.querySelectorAll(".resposta").forEach(resposta => {

            resposta.disabled = true;

            if (resposta.dataset.correta === "true") {

                resposta.style.background = "#2e7d32";
                resposta.style.color = "#fff";

            }

        });

        if (botao.dataset.correta === "true") {

            pontos++;

            if (pontuacao) {

                pontuacao.textContent = pontos;

            }

        } else {

            botao.style.background = "#c62828";
            botao.style.color = "#fff";

        }

    });

});

if (reiniciarQuiz) {

    reiniciarQuiz.addEventListener("click", () => {

        pontos = 0;
        respondidas = [];

        if (pontuacao) {

            pontuacao.textContent = "0";

        }

        respostas.forEach(botao => {

            botao.disabled = false;
            botao.removeAttribute("style");

        });

    });

}




/* =======================================================
   EFEITO PARALLAX NO HERO
======================================================= */

const hero = document.querySelector(".heroImage");

window.addEventListener("scroll", () => {

    if (!hero) return;

    hero.style.transform = `translateY(${window.scrollY * 0.25}px)`;

});




/* =======================================================
   SCROLL SUAVE DOS LINKS
======================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        const destino = document.querySelector(this.getAttribute("href"));

        if(!destino) return;

        e.preventDefault();

        destino.scrollIntoView({

            behavior:"smooth"

        });

    });

});




/* =======================================================
   EFEITO HOVER NOS CARDS
======================================================= */

document.querySelectorAll(

    ".cardMuseu, .animalCard, .formacaoCard, .plantaCard, .curiosidadeCard"

).forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        card.style.setProperty("--x", x + "px");
        card.style.setProperty("--y", y + "px");

    });

});




/* =======================================================
   REVELAR SEÇÕES
======================================================= */

const secoes = document.querySelectorAll("section");

const revelar = new IntersectionObserver((entradas)=>{

    entradas.forEach((entrada)=>{

        if(entrada.isIntersecting){

            entrada.target.style.opacity="1";
            entrada.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:0.12
});

secoes.forEach(secao=>{

    secao.style.opacity="0";
    secao.style.transform="translateY(40px)";
    secao.style.transition="1s";

    revelar.observe(secao);

});




/* =======================================================
   ANO AUTOMÁTICO NO FOOTER
======================================================= */

const ano = document.getElementById("ano");

if (ano) {

    ano.textContent = new Date().getFullYear();

}




/* =======================================================
   CONSOLE
======================================================= */

console.log("%cMuseu Virtual - Parque Estadual de Vila Velha",

"color:#1d5c3b;font-size:18px;font-weight:bold;");

console.log("Projeto desenvolvido por Douglas Fronja.");