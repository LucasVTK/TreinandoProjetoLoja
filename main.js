const login = document.querySelector(".btn-login")
const modal = document.querySelector(".modal")
const fecharModalLogin = document.querySelector(".btn-fechar")
const btnLogout = document.querySelector(".btn-logout")
const btnLogar = document.querySelector(".btn-logar")
const registro = document.querySelector(".registro")
const ModalRegistro = document.querySelector(".modal-registro")
const fecharRegistro = document.querySelector(".btn-fechar-registro")
const btnRegistro = document.querySelector(".btn-registro")



login.addEventListener("click", () =>{
    modal.showModal()
})

fecharModalLogin.addEventListener("click", () =>{
    modal.close()
})

const usuarios = [{
    id: 1,
    nome: "Lucas Nogueira Andrade",
    email:"lucazim.vtk@gmail.com",
    senha: "12345"
},
{
    id: 2,
    nome: "Pedrinho jubileu",
    email:"pedrinho@gmail.com",
    senha: "12345"
}
]

verificaUsuarioLogado()
inicializarUsuarios()

function inicializarUsuarios(){
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios"))

    if(!usuariosSalvos){
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
}

btnLogar.addEventListener("click", () =>{
    const emailDigitado = document.querySelector("#email").value
    const senhaDigitada = document.querySelector("#senha").value

    const usuarios = JSON.parse(localStorage.getItem("usuarios"))

    const usuarioEncontrado = usuarios.find(function(usuario){
        return usuario.email === emailDigitado && usuario.senha === senhaDigitada
    })

    if(usuarioEncontrado){
        localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado))
        modal.close()
        mensagemSucesso()
        document.querySelector(".btn-login").classList.add("hide")
        document.querySelector(".logado").classList.remove("logado")
    }else{
        alert("O login parece ter dado errado... verifique os seus dados ou crie uma")
    }



    function mensagemSucesso(){
        const mensagemModal = document.querySelector(".ModalSucesso")
        mensagemModal.innerHTML = `Boas vindas ao nosso site, ${usuarioEncontrado.nome} explore nossas ofertas `
        mensagemModal.showModal()
        setTimeout( () =>{
            mensagemModal.close()
        }, 4000)
    }
})

// REGISTRO DE NOVOS USUARIOS

btnRegistro.addEventListener("click", (event) => {
    event.preventDefault(); // impede o formulário de recarregar a página

    const nomeRegistro = document.querySelector("#nome").value
    const emailRegistro = document.querySelector("#registro-email").value
    const senhaRegistro = document.querySelector("#registro-senha").value
    const registroConfirmSenha = document.querySelector("#registro-confirm-senha").value
    
    const usuarioJaExiste = JSON.parse(localStorage.getItem("usuarios")).find(usuario => usuario.email === emailRegistro)

    // const usuarioEncontrado = usuarios.find(function(usuario){
    //     return usuario.email === emailDigitado && usuario.senha === senhaDigitada
    // })

    if(usuarioJaExiste){
        alert("Ja existe alguem com este E-mail CARALHO")
        return
    }

    if (senhaRegistro !== registroConfirmSenha) {
    alert("As senhas não coincidem");
return;
    } else {
const novoUsuario = {
        nome: nomeRegistro,
        email: emailRegistro,
        senha: senhaRegistro,
}

const usuarios = JSON.parse(localStorage.getItem("usuarios"))
usuarios.push(novoUsuario);
localStorage.setItem("usuarios", JSON.stringify(usuarios))

alert("aguarde, estamos te registrando...")
    
    }setTimeout( () =>{
        ModalRegistro.close()
        modal.showModal()
    },2000)
})

registro.addEventListener("click", ()=> {
    ModalRegistro.showModal()
    modal.close()
})

fecharRegistro.addEventListener("click", () =>{
    ModalRegistro.close()
})

    btnLogout.addEventListener('click', () =>{
    localStorage.removeItem('usuario')

     location.reload() //sem isso o deslogue não funciona
})

function verificaUsuarioLogado(){
    const logado = document.querySelector(".logado")
    
    logado.addEventListener('click', ()=>{
    const menuInfoDesktop = document.querySelector(".lista-Perfil")
    menuInfoDesktop.classList.toggle('hide')
})

    const usuarioLogado = localStorage.getItem('usuario')

    if(usuarioLogado){
        document.querySelector(".btn-login").classList.add("hide")
        document.querySelector(".logado").classList.remove("logado")
    }

    
}




