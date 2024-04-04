let participantes = [
  {
    nome: "Maria Vitória",
    email: "vitoria@gmail",
    dataInscricao: new Date(2024, 2, 22, 20,30),
    dataCheckIn: new Date(2024, 2, 24, 22, 00)
  },
  {
    nome: "João Silva",
    email: "joao.silva@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 15, 45),
    dataCheckIn: new Date(2024, 2, 25, 10, 30)
  },
  {
    nome: "Ana Souza",
    email: "ana.souza@hotmail.com",
    dataInscricao: new Date(2024, 2, 24, 10, 0),
    dataCheckIn: new Date(2024, 2, 26, 9, 15)
  },
  {
    nome: "Carlos Ferreira",
    email: "cferreira@yahoo.com",
    dataInscricao: new Date(2024, 2, 25, 18, 20),
    dataCheckIn: new Date(2024, 2, 27, 20, 45)
  },
  {
    nome: "Mariana Santos",
    email: "mariana.santos@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 12, 15),
    dataCheckIn: new Date(2024, 2, 28, 11, 30)
  },
  {
    nome: "Pedro Oliveira",
    email: "pedro.oliveira@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 9, 30),
    dataCheckIn: new Date(2024, 2, 29, 8, 45)
  },
  {
    nome: "Juliana Lima",
    email: "juliana.lima@yahoo.com",
    dataInscricao: new Date(2024, 2, 28, 17, 40),
    dataCheckIn: new Date(2024, 2, 30, 19, 0)
  },
  {
    nome: "Rafael Martins",
    email: "rafael.martins@hotmail.com",
    dataInscricao: new Date(2024, 2, 29, 22, 0),
    dataCheckIn: new Date(2024, 3, 1, 8, 30)
  },
  {
    nome: "Sara Costa",
    email: "sara.costa@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 14, 10),
    dataCheckIn: new Date(2024, 3, 2, 12, 20)
  },
  {
    nome: "Lucas Oliveira",
    email: "lucas.oliveira@yahoo.com",
    dataInscricao: new Date(2024, 2, 31, 11, 20),
    dataCheckIn: new Date(2024, 3, 3, 10, 45)
  }
];


const criarNovoParticipante = (participante) =>{
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null){
    dataCheckIn = `
    <button 
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
      >
      Confirmar check-in
    </button>
    `
  }
  return `
  <tr>
    <td>
      <strong>
        ${participante.nome} 
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
      
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarlist = (participantes) => {
  let output = ""
  //estrutura de repetição - loop
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }
  //pegar informação do HTML


  //substituir informações do HTML
  document.querySelector('tbody').innerHTML = output

}

atualizarlist(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)
  
  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //verificar se o participante ja existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email

  )

  if(participanteExiste) {
    alert('Email ja cadastrado!')
  }

  participantes = [participante, ...participantes]
  atualizarlist(participantes)

  //limpar o formulario
  event.target.querySelector('[name="nome]').value = ""
  event.target.querySelector('[name="email]').value = ""

}

const fazerCheckIn = (event) => {
  //confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return 
  }
  //encontrar o participante dentro da lista
  const participante = participantes.find((p) =>{
    return p.email == event.target.dataset.email
  })
  //atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  //atualizar a lista de participante
  atualizarlist(participantes)
}