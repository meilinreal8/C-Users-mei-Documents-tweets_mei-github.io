"use strict"

const listaTweets = document.getElementById("lista-tweets");
const formulario = document.querySelector("#formulario");
const txtTweet = document.getElementById("tweet");

// Arreglo para guardar los tweets en la memoria
let arregloTweets = [];

// Cuando se hace clic en AGREGAR
formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    const tweet = txtTweet.value;
    agregarElemento(tweet);
    agregarTweetLocalStorage(tweet);
});

function agregarElemento(mensajeTweet) {
    // Crear boton de eliminar
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";

    // Crear un elemento de lista y lo voy a añadir a listaTweets
    const elemento = document.createElement("li");
    elemento.innerHTML = mensajeTweet;
    elemento.appendChild(botonBorrar);
    listaTweets.appendChild(elemento);
}

// Para eliminar tweets
listaTweets.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.className === "borrar-tweet") {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
        console.log(e.target.parentElement.innerText);
    }
});

// Agregar tweet a localstorage
function agregarTweetLocalStorage(mensajeTweet) {
    arregloTweets = obtenerTweetsLocalStorage()
    arregloTweets.push(mensajeTweet);
    // Agregar al localstorage
    localStorage.setItem("tweets", JSON.stringify(arregloTweets));
}

// Recuperar los tweets del LocalStorage
function obtenerTweetsLocalStorage() {
    let tweetsTemporal;

    // Revisar los valores del localstorage
    if (localStorage.getItem("tweets") === null) {
        tweetsTemporal = []
    } else {
        tweetsTemporal = JSON.parse(localStorage.getItem("tweets"));
    }
    return tweetsTemporal;
}

// Este evento se llama cuando la página se carga
document.addEventListener("DOMContentLoaded", function (e) {
    e.preventDefault();
    arregloTweets = obtenerTweetsLocalStorage();
    arregloTweets.forEach(function (tweet) {
        agregarElemento(tweet);
    });
})

// Borrar el tweet especificado del LocalStorage
function borrarTweetLocalStorage(mensaje) {
    let tweetBorrar = mensaje.substring(0, mensaje.length -1); // Le quita la X
    arregloTweets = obtenerTweetsLocalStorage();
    arregloTweets.forEach(function (mensaje, index) {
        if (tweetBorrar === mensaje) {
            arregloTweets.splice(index, 1);
        }
    });
    localStorage.setItem("tweets", JSON.stringify(arregloTweets));
}